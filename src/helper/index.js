const fs = require('fs');

exports.saveFile = function (fileName, json) {
    fs.writeFile(fileName, JSON.stringify(json), 'utf8', function () {
        console.log('save file successful');
    });
}