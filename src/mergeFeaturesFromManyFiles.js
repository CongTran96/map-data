// import * as data from './data.json';
const fileName = 'geo_prod.json';
const data = require('../raw-data/' + fileName);
// const prev_coutries = require('./prev_coutries.json');
const fs = require('fs');

const india = require('../raw-data/ind.v2.json');
const indo = require('../raw-data/indo.v2.json');
const philip = require('../raw-data/philip.v2.json');
const china = require('../raw-data/china.v2.json');

const featureWillAdded = [india, indo, philip, china];

function saveFile(name, json) {
    fs.writeFile('../final-data/' + name, JSON.stringify(json), 'utf8', function () {
        console.log('save file'  + name  + 'to final-data directory success');
    });
}

function mergeFeatures(geoJson) {
    for (let i = 0; i < featureWillAdded.length; i++) {
        const geoCountry = featureWillAdded[i];

        for (let j = 0; j < geoCountry.features.length; j++) {
            const feature = geoCountry.features[j];
            geoJson.features.push(feature);
        }
    }

    return geoJson;
}

function main() {
    const geoJson = mergeFeatures(data);
    // const regions = mergeRegions(data);
    console.log('geoJson:', geoJson);
    saveFile(fileName, geoJson);
}

main();