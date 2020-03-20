// import * as data from './data.json';
const fileName = 'center-indo.json';
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

const initFeatureFormat = () => {
    return {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": []
        },
        "properties": {
        }
    };
}

function detachAllRegions(geoJson) {
    const newGeoJson = initGeoFormat();

    // loop each features
    // pharse 1: feature geometry type is MultiPolygon
    // - loop each coordinates
    // - create new feature with Polygon geometry type
    // - set current coordinate to new feature
    // - add feature to new geo json features 
    // phares 2: feature geometry type is Polygon
    // - add feature to new geo json features 

    for (let i = 0; i < geoJson.features.length; i++) {
        const feature = geoJson.features[i];

        if (feature.geometry.type == "MultiPolygon") {
            for (let j = 0; j < feature.geometry.coordinates.length; j++) {
                const coordinate = feature.geometry.coordinates[j];

                const newFeature = initFeatureFormat();

                // set properties for new feature
                newFeature.properties = feature.properties;

                // set current coordinate
                newFeature.geometry.coordinates = coordinate;

                newGeoJson.features.push(newFeature);
            }
        } else {
            newGeoJson.features.push(feature);
        }
    }

    return newGeoJson;
}

function main() {
    const geoJson = detachAllRegions(data);
    // const regions = mergeRegions(data);
    saveFile(fileName, geoJson);
}

main();

exports.detachAllRegions = detachAllRegions;