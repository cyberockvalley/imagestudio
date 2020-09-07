import GridFSBucketAdapter from 'parse-server/lib/Adapters/Files/GridFSBucketAdapter'
import Func from '../../utils/func'
import { proccessFileData, getQueryFilename } from '../bufferProcessor'
const mime = require("mime")
var _defaults = require("parse-server/lib/defaults")

class GridFSBucketDynamicAdapter extends GridFSBucketAdapter {
    constructor(mongoDatabaseURI = _defaults.DefaultMongoURI, mongoOptions = {}, fileKey = undefined, fileProccessors = {}) {
        super(mongoDatabaseURI, mongoOptions, fileKey)
        this.fileProccessors = fileProccessors
    }

    async getFileData(filename, query) {
        var queryFilename = getQueryFilename(filename, query)
        
        return super.getFileData(queryFilename)
        .then(data => {
            return data
        })
        .catch(e => {
            var notFound = true;//e.message && e.message.toLowerCase().replace(/\s/g, "").includes("filenotfound")
            if(notFound) {
                //get the original/source file, pass it to the specified proccessors, 
                // return the output and save the output underground
                var filenameAndExt = Func.fileNameAndExtension(filename)

                var fallbackFilename = filenameAndExt[0] + "." + (query.orig_ext? query.orig_ext : filenameAndExt[1])
                
                return super.getFileData(fallbackFilename)
                .then(async data => {

                    var options = JSON.parse(JSON.stringify(query))
                    options.filename_alone = filenameAndExt[0]
                    options.filename_ext = filenameAndExt[1]
                    options.contentType = mime.getType(queryFilename)
                    options.orig_mime = options.orig_ext? mime.getType("X." + options.orig_ext) : null
                    return proccessFileData(data, options, this.fileProccessors)
                    .then(proccessedData => {
                        if(proccessedData) {
                            this.createFile(queryFilename, proccessedData)
                            return proccessedData

                        } else {
                            throw "file proccessedData null response"
                        }
                    })
                    .catch(e => {
                        throw "file proccessedData null response2"
                    })
                })

            } else {
                throw e
            }
        })
    }

    getFileLocation = (config, filename) => {
        var location = super.getFileLocation(config, filename)
        return location
    }

    handleFileStream(filename, req, res, contentType) {
        //console.log("GRID_FS3", "handleFileStream", "filename", filename, "url", req.url, "url-o", req.originalUrl, "contentType", contentType)
        return super.handleFileStream(filename, req, res, contentType)
    }

}

export default GridFSBucketDynamicAdapter