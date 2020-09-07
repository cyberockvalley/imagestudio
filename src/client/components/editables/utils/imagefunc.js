import { fileAndExt } from "../../../../both/Functions"

export const convertFilename = (url, ext) => {
    if(!ext || !url) return url
    var filenameAndExt = fileAndExt(url)
    return filenameAndExt[0] + "." + ext + "?orig_ext=" + filenameAndExt[1]
}

export const getSrc = (url, manifest) => {
    return `${url}${manifest.queries? `${url.includes("?")? "&" : "?"}${manifest.queries}&p=${manifest.proccessors}` : ""}`
}

export const getSrcSet = (url, manifests, proccessorEditor) => {
    var srcSet = ""
    if(manifests) {
        for(var i = 0; i < manifests.length; i++) {
            var manifest = manifests[i]
            srcSet += `, ${url}${manifest.queries? `${url.includes("?")? "&" : "?"}${manifest.queries}&p=${proccessorEditor? proccessorEditor(manifest.proccessors) : manifest.proccessors}` : ""}${manifest.at? ` ${manifest.at}w` : ""}`
        }
        //console.log("Manifest", "getSrcSet", srcSet)
        //console.log("Manifest", "getSrcSet", 2, manifests)
        return srcSet.length > 0? srcSet.substring(2) : ""

    } else {
        return url
    }
}

export const buildFileTags = (url, display) => {
    var tags = []
    if(display) {
        var manifests = display.manifests
        var image_exts = display.image_exts
        if(image_exts) {
            for(var i = 0; i < image_exts.length; i++) {
                tags.push({
                    tag: "source",
                    srcSet: getSrcSet(convertFilename(url, image_exts[i].name), manifests, (proccessors) => {
                        return (proccessors? proccessors + "." : "") + image_exts[i].proccessors
                    })
                })
            }
        }
        
    }
    tags.push({
        tag: "img",
        srcSet: getSrcSet(url, manifests, null)
    })

    return tags
}