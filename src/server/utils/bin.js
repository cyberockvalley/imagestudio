const exec = require('child_process').execFile//get child_process module
const path = require('path')

module.exports.getProgram = (name, executor) => {
    if (process.platform === 'darwin') {
        
        return path.join(__dirname, "../", `/bin/osx/${name}/bin/${executor}`);//return osx library path

    } else if (process.platform === 'linux') {
        return path.join(__dirname, "../", `/bin/linux/${name}/bin/${executor}`);//return linux library path
        
    } else if (process.platform === 'win32') {

        if (process.arch === 'x64') {
            return path.join(__dirname, "../", `\\bin\\win64\\${name}\\bin\\${executor}.exe`);//return windows 64bit library path
        } else {
            console.log('Unsupported platform:', process.platform, process.arch);//show unsupported platform message
        }

    } else {
        console.log('Unsupported platform:', process.platform, process.arch);//show unsupported platform message 
        return null
    }
}

module.exports.runProgram = (program, command) => {
    return new Promise((resolve, reject) => {
        exec(`"${program}"`, command, { shell: true }, (error, stdout, stderr) => {
            if(error) {
                reject(`STD::${error}: ${program}`)
    
            } else {
              resolve(`stdout: ${stdout || stderr} => ${program}`)
            }
        });
    })

}
