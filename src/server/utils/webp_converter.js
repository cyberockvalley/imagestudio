const path = require('path');
const fs = require('fs');
const { getProgram, runProgram } = require('./bin');
//get os type then return path of respective platform library 
const tempPath = function() {
    if (process.platform === 'darwin') {
        
        return path.join(__dirname, "../", "/temp/");//return osx library path

    }else if (process.platform === 'linux') {
        return path.join(__dirname, "../", "/temp/");//return linux library path
    }else if (process.platform === 'win32') {

        if (process.arch === 'x64') {
            return path.join(__dirname, "../", "\\temp\\");//return windows 64bit library path
        } else {
            console.log('Unsupported platform:', process.platform, process.arch);//show unsupported platform message
        }

    } else {
        console.log('Unsupported platform:', process.platform, process.arch);//show unsupported platform message 
    }
}
/**
 * @param  {string} base64str
 * @param  {string} path
 */
const base64_to_image = (base64str, path) =>{
    let buf = Buffer.from(base64str, 'base64');

    fs.writeFileSync(path, buf, function(error) {
        if (error) {
          throw error;
        } else {
          console.log('File created from base64 string!');
        }
      });
    return true;
}
/**
 * @param  {string} filepath
 * @param  {string} type
 */
function encode_image(filepath, type) {
    let data = fs.readFileSync(filepath);
    let buf = Buffer.from(data);
    if(type == "base64"){
        let base64 = buf.toString('base64');
        // console.log('Base64 ' + filepath + ': ' + base64);
        return base64;
    } else {
        return buf
    }
}

const cwebp = (input_image, output_image, option) => {

    // input_image: input image(.jpeg, .pnp ....)
    //output_image: output image .webp 
    //option: options and quality,it should be given between 0 to 100
    
    const query = `${option} "${input_image}" -o "${output_image}"`; //command to convert image 
    
    console.log(query);
    
    //enwebp() return which platform webp library should be used for conversion
    return new Promise((resolve, reject) => {
      //execute command 
      runProgram(getProgram('webp', 'cwebp'), query.split(/\s+/))
      .then(output => {
        resolve(output)
      })
      .catch(e => {
        reject(e)
      })
    });
}
module.exports.buffer2webp = (buffer, filename, image_type, option, webp_save_file) => {

    let buf = Buffer.from(buffer);
    let base64str = buf.toString('base64');

    let input_file_path = `${tempPath()}${filename}.${image_type}`;

    let webp_image_path  = webp_save_file || `${tempPath()}${filename}.webp`;

    let status = base64_to_image(base64str, input_file_path)

    if(status){
        const result = cwebp(input_file_path, webp_image_path, option);
        return result.then((response) => {
            //console.log("to_webp:v6", "aa", response)
            try {
                let webp_buffer = encode_image(webp_image_path, "buffer")
                //console.log("to_webp:v6", "aa", 123)
                fs.unlinkSync(input_file_path);
                if(!webp_save_file) fs.unlinkSync(webp_image_path);
                //console.log("to_webp:v6", "aa", 124)
                return webp_buffer

            } catch(e) {
                //console.log("to_webp:v6", "aa", 125)
                return null
            }
        });
    } else {
        //console.log("to_webp:v6", "aa", 126)
        return null
    }
    
}