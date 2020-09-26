
import view from './view'
import error404 from './errors/error404'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { matchPath, StaticRouter as Router } from 'react-router-dom'
import ComponentsRoutes from '../client/ComponentsRoutes'
import Paths, {FILE_PATHS} from './utils/Paths'
import { Helmet } from 'react-helmet'
import { BASE_URL, API_PORT, API_ROOT_DIR, API_SECONDARY_ROOT_DIR, SESSION_LENGTH } from '../both/Constants'
import InitialData from './InitialData'
import SecondaryApi from './SecondaryApi'
import GridFSBucketDynamicAdapter from './parse-server-route/adapters/grid-fs-bucket-dynamic-adapter'
import FileProccessors from './utils/FileProccessors'
import { fileAndExt } from '../both/Functions'
import { getQueryFilename, proccessFileData } from './parse-server-route/adapters/bufferProcessor'
import Youtube from './routes/Youtube'
import CacheRoute from './routes/CacheRoute'

const fs = require("fs")
const mime = require('mime')


var express = require("express")
var path = require("path")
var logger = require("morgan")
var ParseServer = require('parse-server').ParseServer
var ParseDashboard = require("parse-dashboard")
const dotenv = require("dotenv")
const dotenvConfig = dotenv.config({path: "env/.env"})
//logger.disableLogger()
if(dotenvConfig.error) {
    throw dotenvConfig.error

} else {
    //console.log("DOT_ENV_DATA", dotenvConfig.parsed)
}
var app = express()

app.use(`*`, CacheRoute)
app.set('etag', 'strong')

const compression = require('compression')

const isStreamable = req => {
  return req.get('Range')
}

const getUploadLocation = (req, filename) => {
  return path.resolve(__dirname, '../client/images/uploads/' + (req.params.year_folder? `${req.params.year_folder}/${req.params.month_folder}/` : "") + filename)
}

app.use("/youtube", Youtube)

app.get(FILE_PATHS, (req, res, next) => {
  var query = req.query
  var queryFilename = getQueryFilename(req.params.filename, query)
  if(queryFilename == req.params.filename) {
    next()

  } else {
    var fileLocation = getUploadLocation(req, queryFilename)
    if(isStreamable(req)) {
      // This line opens the file as a readable stream
      var readStream = fs.createReadStream(fileLocation);

      // This will wait until we know the readable stream is actually valid before piping
      readStream.on('open', function () {
        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(res);
      });

      // This catches any errors that happen while creating the readable stream (usually invalid names)
      readStream.on('error', function(err) {
        res.end(err);
      })

    } else {
      fs.readFile(fileLocation, (e, data) => {
        if(data) {
          res.status(200);
          res.set('Content-Type', mime.getType(req.params.filename));
          res.set('Content-Length', data.length);
          res.end(data);

        } else {
          var notFound = true//e.message.toLowerCase().replace(/\s/g, "").includes("nosuchfile")
          if(notFound) {
            var filenameAndExt = fileAndExt(req.params.filename)
            var fallbackFilename = filenameAndExt[0] + "." + (query.orig_ext? query.orig_ext : filenameAndExt[1])
            //read file again
            fs.readFile(getUploadLocation(req, fallbackFilename), (e, data) => {
              if(data) {
                var options = JSON.parse(JSON.stringify(query))
                options.filename_alone = filenameAndExt[0]
                options.filename_ext = filenameAndExt[1]
                options.contentType = mime.getType(queryFilename)
                options.orig_mime = options.orig_ext? mime.getType("X." + options.orig_ext) : null
                options.webp_save_file = fileLocation
                proccessFileData(data, options, FileProccessors)
                .then(proccessedData => {
                    if(proccessedData) {
                        res.status(200);
                        res.set('Content-Type', mime.getType(req.params.filename));
                        res.set('Content-Length', proccessedData.length);
                        res.end(proccessedData);

                    } else {
                      res.status(404);
                      res.set('Content-Type', 'text/plain');
                      res.end("File not found1!");
                    }
                })
                .catch(e => {
                  res.status(404);
                  res.set('Content-Type', 'text/plain');
                  res.end("File not found2!");
                })

              } else {
                res.status(404);
                res.set('Content-Type', 'text/plain');
                res.end("File not found3!");
              }
            })

          } else {
            res.status(404);
            res.set('Content-Type', 'text/plain');
            res.end("File not found4!");
          }

        }
      })
    }
  }
})

app.use(compression({
  filter: (req, res) => {
    if(req.params && req.params.filename) {
      //console.log("to_webp:v66", "Cfilename", req.params.filename)
      var ext = fileAndExt(req.params.filename)[1]
      return ext && ext.toLowerCase() != "webp"? true : false

    } else {
      return true
    }
  }
}))

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/client', express.static(path.resolve(__dirname, '../client'), {maxAge: "356d"}))

var api = new ParseServer({
    databaseURI: process.env.DATABASE_URL,
    cloud: process.env.CLOUD_CODE_MAIN || __dirname + "/cloud/index.js",
    appId: process.env.appId,
    restAPIKey: process.env.restAPIKey,
    javascriptKey: process.env.javascriptKey,
    serverURL: `${BASE_URL + API_ROOT_DIR}`,
    masterKey: process.env.masterKey,
    
    allowClientClassCreation: false,
    maxUploadSize: "25mb",
    

    sessionLength: SESSION_LENGTH,
    // Enable email verification
    verifyUserEmails: true,
    // in seconds (2 hours = 7200 seconds)
    mailVerifyTokenValidityDuration: 2 * 60 * 60, 

    // defaults to false
    preventLoginWithUnverifiedEmail: true, 

    // The public URL of your app.
    // This will appear in the link that is used to verify email addresses and reset passwords.
    // Set the mount path as it is in serverURL
    publicServerURL: `${BASE_URL + API_ROOT_DIR}`,
    // Your apps name. This will appear in the subject and body of the emails that are sent.
    appName: 'Image Studio',
    // The email adapter
    emailAdapter: {
        module: 'parse-server-dedicated-email-adapter',
        options: {
            host: 'mail.imagestudio.com',
            port: 465,
            secure: true,
            // The address that your emails come from
            email: 'noreply@imagestudio.com',
            password: process.env.AUTO_MAIL_SERVER_PASSWORD,
            from: 'ImageStudio <noreply@imagestudio.com>'
        }
    },

    accountLockout: {
        // duration policy setting determines the number of minutes that a locked-out account remains locked out before automatically becoming unlocked. Set it to a value greater than 0 and less than 100000.
        duration: 1, 
        // threshold policy setting determines the number of failed sign-in attempts that will cause a user account to be locked. Set it to an integer value greater than 0 and less than 1000.
        threshold: 3, 
    },
    // optional settings to enforce password policies
    /*
    passwordPolicy: {
        // Two optional settings to enforce strong passwords. Either one or both can be specified.
        // If both are specified, both checks must pass to accept the password
        // 1. a RegExp object or a regex string representing the pattern to enforce
        validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, // enforce password with at least 8 char with at least 1 lower case, 1 upper case and 1 digit
        // 2. a callback function to be invoked to validate the password
        validatorCallback: (password) => { return validatePassword(password) },
        validationError: 'Password must contain at least 1 digit.', // optional error message to be sent instead of the default "Password does not meet the Password Policy requirements." message.
        doNotAllowUsername: true, // optional setting to disallow username in passwords
        maxPasswordAge: 90, // optional setting in days for password expiry. Login fails if user does not reset the password within this period after signup/last reset.
        maxPasswordHistory: 5, // optional setting to prevent reuse of previous n passwords. Maximum value that can be specified is 20. Not specifying it or specifying 0 will not enforce history.
        //optional setting to set a validity duration for password reset links (in seconds)
        resetTokenValidityDuration: 24*60*60, // expire after 24 hours
    }*/
    filesAdapter: new GridFSBucketDynamicAdapter(process.env.DATABASE_URL, {}, undefined, FileProccessors)
})

// make the Parse Server available at /parse
app.use(`/${API_ROOT_DIR}`, api)

var dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: `${BASE_URL + API_ROOT_DIR}`,
        appId: process.env.appId,
        restAPIKey: process.env.restAPIKey,
        javascriptKey: process.env.javascriptKey,
        masterKey: process.env.masterKey,
        appName: process.env.appName,
        iconName: "MyAppIcon.png",
        primaryBackgroundColor: "#FFA500",
        secondaryBackgroundColor: "#FF4500",
        production: false
      }
    ],
    users: [
      {
        user: process.env.masterUsername,
        pass: process.env.masterPassword,
        masterKey: process.env.masterKey,
        "apps": [{
          "appId": process.env.appId,
        }]
      }
    ]
  },
  { allowInsecureHTTP: true }
)

// make the Parse Dashboard available at /parse/dashboard
app.use("/dashboard", dashboard);

app.use("/" + API_SECONDARY_ROOT_DIR, SecondaryApi)

app.use(Paths, InitialData)
app.get(Paths, (req, res) => {
  var state = res.locals.state
  matchPath

  var body = ReactDOMServer.renderToString(
    <Router location={req.url}>
      <ComponentsRoutes state={state}/>
    </Router>
  )

  res.set("Content-Type", "text/html")
  
  const helmet = Helmet.renderStatic();
  res.status(200).send(view(helmet, state, body))
})

app.use("*", (req, res) => {
  res.set("Content-Type", "text/html")
  res.status(404).send(error404())
})


app.listen(API_PORT, () => {
  console.log(`parse-server-example running on port ${API_PORT}.`);
})