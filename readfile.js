
var file = "./raw_data.json";
const fs = require('fs')

exports.get= function readJsonFile(file) {
    let bufferData = fs.readFileSync(file)
    let stData = bufferData.toString()
    let data = JSON.parse(stData)
    return data
}




