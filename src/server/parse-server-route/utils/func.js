
const Func = {
    fileNameAndExtension: (filename) => {
        if(!filename) return ["", ""]
        var extBoundaryIndex = filename.lastIndexOf(".")
        var filenamePath = extBoundaryIndex < 0? filename : filename.substring(0, extBoundaryIndex)
        var ext = extBoundaryIndex < 0? "" : filename.substring(extBoundaryIndex + 1)
        return [filenamePath, ext]
    }
}

export default Func