const { default: Func } = require("../utils/func")

/**
* This method will return a file buffer from the last fileProccessor specified in the @options
* Each proccessor takes a file buffer and @options, proccess the file buffer based on the options
* before passing the output of the proccess to the next proccessor. The output of the last proccessor 
* is what the method returns.
* Note that if a proccessor fails, the other proccessors will not be called, thus returning null as
* the output
* @param {*} data 
* @param {*} options 
* @param {*} proccessors 
*/
module.exports.proccessFileData = (data, options, proccessors) => {
   return new Promise(async (resolve, reject) => {
       var proccessorKeys = options && options.p? options.p.split(".") : []
       var allProccessorsExist = proccessorKeys.length > 0? true : false
       if(allProccessorsExist) {
           for(var i = 0; i < proccessorKeys.length; i++) {
               var key = proccessorKeys[i]
               if(!proccessors.hasOwnProperty(key)) {
                   allProccessorsExist = false
                   break

               }
           }
       }
       if(!allProccessorsExist) {
           reject("No proccessor specified")

       } else {
           //delete identifiers like p(proccessors)
           //delete options.p;
           var shell = await proccessors[proccessorKeys[0]](data, options)
           for(var i = 1; i < proccessorKeys.length; i++) {
               shell = await proccessors[proccessorKeys[i]](shell, options)
               if(!shell) break
           }
           if(shell) {
               resolve(shell)

           } else {
               reject("Error")
           }
       }
   })
}

module.exports.getQueryFilename = (filename, query) => {
    if(!query || !query.p) return filename
    var q = JSON.parse(JSON.stringify(query))
    //delete identifiers like p(proccessors)
    delete q.p; delete q.orig_ext

    var fileNameAndExtension = Func.fileNameAndExtension(filename)
    var filenameWithoutExtension = Func.fileNameAndExtension(filename)[0]
    var extension = fileNameAndExtension[1]
    var queries = "";
    var keys = Object.keys(q)
    keys.sort()
    for (var i = 0; i < keys.length; i++) {
        queries += `X${keys[i]}-${(q[keys[i]] + "").toLowerCase()}`
    }

    var proccessors = ""
    var proccessorsKeys = query.p? query.p.split(".") : []
    proccessorsKeys.sort()
    for (var i = 0; i < proccessorsKeys.length; i++) {
        proccessors += `.${proccessorsKeys[i].toLowerCase()}`
    }
    return queries.length > 0? `${filenameWithoutExtension}_${queries.substring(1)}${proccessors}.${extension}` : `${filename}.${extension}`

}