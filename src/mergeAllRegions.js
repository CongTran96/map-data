// import * as data from './data.json';
const fileName = 'kazakhstan.json';
const data = require('../raw-data/' + fileName);
// const prev_coutries = require('./prev_coutries.json');
const fs = require('fs');

function saveFile(name, json) {
    fs.writeFile('../final-data/' + name, JSON.stringify(json), 'utf8', function () {
        console.log('save file'  + name  + 'to final-data directory success');
    });
}

function groupRegions(geoJson) {
    const regions = {};
    const features = geoJson.features;

    for (var i = 0; i < features.length; i++) {
        const feature = features[i];

        var region_name = feature.properties.region_name;

        if (!region_name) {
            region_name = "Indonesia";
        }

        if (!regions[region_name]) {
            regions[region_name] = [];
        }
        regions[region_name].push(feature);
    }

    return regions;
}

function mergeFeaturesBaseRegion(allFeatures) {
    const firstRegion = allFeatures[0];

    if (!(firstRegion.geometry.type == "MultiPolygon")) {
        firstRegion.geometry.coordinates = [firstRegion.geometry.coordinates];
    }
    
    // prepare region to multi polygone
    firstRegion.geometry.type = "MultiPolygon";

    if (allFeatures.length > 1) {
        for(let i = 1; i < allFeatures.length; i++) {
            const feature = allFeatures[i];
            if (feature.geometry.type == "MultiPolygon") {
                firstRegion.geometry.coordinates = firstRegion.geometry.coordinates.concat(feature.geometry.coordinates)
            } else {
                firstRegion.geometry.coordinates.push(feature.geometry.coordinates);
            }
        }
    }

    console.log('firstRegion:', firstRegion);

    return firstRegion;
}

function mergeRegions(geoJson) {
    var features = [];
    const regions = groupRegions(geoJson);

    for (var region_name in regions) {
        const feature = mergeFeaturesBaseRegion(regions[region_name]);
        features.push(feature);
    }

    geoJson.features = features;
    return geoJson;
}

function mergeAllRegionsToOne(geoJson) {
    const firstRegion = geoJson.features[0];
    const allFeatures = geoJson.features;
    
    // prepare region to multi polygone
    if (firstRegion.geometry.type != "MultiPolygon") {
        firstRegion.geometry.coordinates = [firstRegion.geometry.coordinates];
    }
    firstRegion.geometry.type = "MultiPolygon";

    for(let i = 1; i < allFeatures.length; i++) {
        const feature = allFeatures[i];
        if (feature.geometry.type == "MultiPolygon") {
            firstRegion.geometry.coordinates = firstRegion.geometry.coordinates.concat(feature.geometry.coordinates)
        } else {
            firstRegion.geometry.coordinates.push(feature.geometry.coordinates);
        }
    }
    geoJson.features = [firstRegion];

    return geoJson;
}

function main() {

    // const listCoutryIocs = [
    //     'NP',
    //     'MY',
    //     'TH',
    //     'KH',
    //     'LA',
    //     'PK',
    //     'AF',
    //     'RU',
    //     'MN',
    //     'BT',
    //     'LK',
    //     'SG',
    //     'BN',
    //     'BD',
    //     'KZ',
    //     'UZ',
    //     'PG'
    // ];

    // const add_coutries = [
    //     china,
    //     ind,
    //     indo,
    //     myanmar,
    //     philip,
    //     vn,
    //     japan,
    //     korea,
    //     timor,
    //     iran
    // ];

    // const used_features = prev_coutries.features.filter(feature => {
    //     return feature.properties.ioc && listCoutryIocs.includes(feature.properties.ioc);
    // });

    // prev_coutries.features = used_features;

    // add_coutries.forEach(coutry => {
    //     prev_coutries.features = prev_coutries.features.concat(coutry.features)
    // });

    // prev_coutries.features = prev_coutries.features.map(feature => {
    //     feature.properties.animals = [];
    //     return feature
    // })

    const geoJson = mergeAllRegionsToOne(data);
    // const regions = mergeRegions(data);
    console.log('geoJson:', geoJson);
    saveFile(fileName, geoJson);
}

main();