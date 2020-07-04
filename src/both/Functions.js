export const isNullOrEmpty = value => {
    return !value || value.length == 0
}

export const isClient = () => {
    return (typeof window !== 'undefined')
}

/**
 * 
 * @param  {...any} args the object to return and the value to return if the object is null
 * note that the 
 * ---first argument must be an object, 
 * ---the arguments between the first and the last are the keys that points to the object to be rerturned,
 * one level at a time(from the higest(left-most) to the lowest (right-most) level)
 * ---The last argument is the value returned if the object the middle arguments points to is not defined
 * e.g: 
 * x = {levelOne: {levelTwo: "Thanks! You found me :)"}}
 * y = {levelOne: {levelTwo: null}}
 * z = {levelOne: null}
 * empty = {}
 * 
 * //returns "Thanks! You found me :)"
 * lastValueOrThis(x, "levelOne", "levelTwo", "We can't find you :(. Please make some noise" )
 * 
 * //returns "We can't find you :(. Please make some noise"
 * lastValueOrThis(y, "levelOne", "levelTwo", "We can't find you :(. Please make some noise" )
 * 
 * //returns "We can't find you :(. Please make some noise"
 * lastValueOrThis(z, "levelOne", "levelTwo", "We can't find you :(. Please make some noise" )
 * 
 * //returns "We can't find you :(. Please make some noise"
 * lastValueOrThis(empty, "levelOne", "levelTwo", "We can't find you :(. Please make some noise" )
 */
export const lastValueOrThis = (...args) => {
    var nullValue = args[args.length - 1]

    var parentObject = args[0]

    for(var i = 1; i < args.length - 1; i++) {
        if(!parentObject || !parentObject[args[i]]) {
            parentObject = null
            break
        } else {
            parentObject = parentObject[args[i]]
        }

    }
    //console.log("lastValueOrThis", "final", args[args.length - 2], parentObject || nullValue)
    return parentObject || nullValue
}
export const truncText = (str, n) => {
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
}

export const isObject = value => {
    return value && JSON.stringify(value).startsWith("{") && JSON.stringify(value).endsWith("}")
}

export const slugify = (string, lang) => {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
}