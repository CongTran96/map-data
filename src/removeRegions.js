// import * as data from './data.json';
const fileName = 'geo_v4.json';
const data = require('../raw-data/' + fileName);
// const prev_coutries = require('./prev_coutries.json');
const fs = require('fs');

function saveFile(name, json) {
    fs.writeFile('../final-data/' + name, JSON.stringify(json), 'utf8', function () {
        console.log('save file'  + name  + ' to final-data directory success');
    });
}

const initGeoFormat = () => {
    return {
        type: "FeatureCollection",
        features: []
    }
};

function removeRegions(features, regionsNameWillRemove) {
    const newFeatures = [];
    for (let i = 0; i < features.length; i++) {
        const feature = features[i];

        if (feature.properties && !regionsNameWillRemove.includes(feature.properties.region_name)) {
            newFeatures.push(feature);
        }
    }

    return newFeatures;
}

function main() {
    const regionsNameWillRemove = [
        'Indonesia( Gorontalo)', 
        'Indonesia ( Yogyakarta)', 
        'Indonesia (Banten)', 
        'Indonesia (North Maluku)',
        'Indonesia (DKI JAKARTA)',
        'Indonesia (Pangkalpinang)',
        'Indonesia (Across Sumatra)',
        'Indonesia (Across Central Sumatra)',
        'Indonesia (Bengkulu)',
        'Indonesia (Aceh)',
        'Indonesia (Bandar Lampung)',
        'Indonesia (West Papua)',
        'Indonesia (North Sumatra)',
        'Indonesia (South Sumatra)'
    ];

    const geoJson = initGeoFormat();
    geoJson.features = removeRegions(data.features, regionsNameWillRemove);
    // const regions = mergeRegions(data);
    console.log('geoJson:', geoJson);
    saveFile(fileName, geoJson);
}

// main();

exports.removeRegions = removeRegions;