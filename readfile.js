const fs = require('fs')

let file = "./raw_data.json";

exports.get= function readJsonFile(file) {
    let bufferData = fs.readFileSync(file)
    let stData = bufferData.toString()
    let data = JSON.parse(stData)
    return data
}




