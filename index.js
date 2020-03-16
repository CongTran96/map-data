// import * as data from './data.json';
const data = require('./data.json');
const prev_coutries = require('./prev_coutries.json');
const fs = require('fs');

// coutries
const china = require('./test/map.china.v1.geo.json');
const ind = require('./test/map.ind.v1.geo.json');
const indo = require('./test/map.indo.v1.geo.json');
const myanmar = require('./test/map.myanmar.v1.geo.json');
const philip = require('./test/map.philip.v1.geo.json');
const vn = require('./test/map.vn.v1.geo.json');

const japan = require('./test/map.japan.v1.geo.json');
const korea = require('./test/map.korea.v1.geo.json');
const timor = require('./test/map.timor-lest.v1.geo.json');
const iran = require('./test/map.iran.v1.geo.json');

console.log('japan:', japan);
console.log('korea:', korea);
console.log('timor:', timor);
console.log('iran:', iran);


function saveFile(json) {
    fs.writeFile('myjsonfile.json', JSON.stringify(json), 'utf8', function () {
        console.log('save file successful');
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

    const listCoutryIocs = [
        'NP',
        'MY',
        'TH',
        'KH',
        'LA',
        'PK',
        'AF',
        'RU',
        'MN',
        'BT',
        'LK',
        'SG',
        'BN',
        'BD',
        'KZ',
        'UZ',
        'PG'
    ];

    const add_coutries = [
        china,
        ind,
        indo,
        myanmar,
        philip,
        vn,
        japan,
        korea,
        timor,
        iran
    ];

    const used_features = prev_coutries.features.filter(feature => {
        return feature.properties.ioc && listCoutryIocs.includes(feature.properties.ioc);
    });

    prev_coutries.features = used_features;

    add_coutries.forEach(coutry => {
        prev_coutries.features = prev_coutries.features.concat(coutry.features)
    });

    prev_coutries.features = prev_coutries.features.map(feature => {
        feature.properties.animals = [];
        return feature
    })
    // const regions = mergeAllRegionsToOne(data);
    // const regions = mergeRegions(data);
    saveFile(prev_coutries);
}

main();