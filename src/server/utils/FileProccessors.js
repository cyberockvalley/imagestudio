import { buffer2webp } from './webp_converter';

const Jimp = require('jimp')
const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
}
const FileProccessors = {
    image_resizer: async (data, options) => {
        var image = null
        try {
            image = await Jimp.read(data)
        } catch(e) {
            return null
        }
        if(!image) return null
        var currentWidth = image.getWidth();
        var currentHeight = image.getHeight();
        var w = options.w && !isNaN(options.w)? parseInt(options.w) : 0
        var h = options.h && !isNaN(options.h)? parseInt(options.h) : 0
        var s = options.s && !isNaN(options.s)? parseInt(options.s) : 0
        var thumbnail = options.thumbnail && !isNaN(options.thumbnail)? parseInt(options.thumbnail) : 0

        if(thumbnail && thumbnail > 0) {
            w = parseInt(options.thumbnail)
            h = parseInt(options.thumbnail)

        }

        if((!w || w <= 0) && (!h || h <= 0) && s) {
            var aspectRatio = calculateAspectRatioFit(currentWidth, currentHeight, s, s)
            w = aspectRatio.width; h = aspectRatio.height
        }

        if(!w || w <= 0) {
            w = Math.round((h * currentWidth) / currentHeight)

        } else if(!h || h <= 0) {
            h = Math.round((w * currentHeight) / currentWidth)
        }

        if(w == 0 || h == 0) return null

        image.resize(w, h)
        var imageBuffer = null
        image.getBuffer(options.orig_mime || options.contentType, (err, buff) => {
            if(buff) {
                imageBuffer = buff

            } else {
                imageBuffer = null
            }
        })
        return imageBuffer
        
    },
    to_webp: async (data, options) => {
        try {
            var buff = await buffer2webp(data, options.filename_alone, options.orig_ext, "-q 80", options.webp_save_file)
            return buff
        } catch (e) {
            return null
        }
    }
}

export default FileProccessors