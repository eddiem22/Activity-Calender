const fs = require('fs')
const path = require('path');
let file = path.join(__dirname, '../_data/raw_data.json');

exports.get= function readJsonFile(file) {
    let bufferData = fs.readFileSync(file)
    let stData = bufferData.toString()
    let data = JSON.parse(stData)
    return data
}




