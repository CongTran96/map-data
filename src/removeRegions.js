// import * as data from './data.json';
const fileName = 'geo_prod.json';
const data = require('../raw-data/' + fileName);
// const prev_coutries = require('./prev_coutries.json');
const fs = require('fs');

const regionsNameWillRemove = ['China', 'India', 'Philippines', 'Indonesia'];

function saveFile(name, json) {
    fs.writeFile('../final-data/' + name, JSON.stringify(json), 'utf8', function () {
        console.log('save file'  + name  + 'to final-data directory success');
    });
}

const initGeoFormat = () => {
    return {
        type: "FeatureCollection",
        features: []
    }
};

function removeRegions(geoJson) {
    const newGeoJson = initGeoFormat();

    for (let i = 0; i < geoJson.features.length; i++) {
        const feature = geoJson.features[i];

        if (feature.properties && !regionsNameWillRemove.includes(feature.properties.region_name)) {
            newGeoJson.features.push(feature);
        }
    }

    return newGeoJson;
}

function main() {
    const geoJson = removeRegions(data);
    // const regions = mergeRegions(data);
    console.log('geoJson:', geoJson);
    saveFile(fileName, geoJson);
}

main();