const fs = require('fs');

exports.saveFile = function (fileName, json) {
    console.log('json:', json);
    fs.writeFile('final-data/' + fileName, JSON.stringify(json), 'utf8', function () {
        console.log('save file successful');
    });
}