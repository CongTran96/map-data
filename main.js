const getGroupFeatures = require('./src/helper/groupRegions').getGroupFeatures;
const removeRegions = require('./src/removeRegions').removeRegions;
const mergeAllRegions = require('./src/mergeAllRegions').mergeAllRegionsToOne;
const helper = require('./src/helper');

const fileName = 'geo_v4.json';
const data = require('./raw-data/' + fileName);

const initGeoJson = () => {
    return {
        type: "FeatureCollection",
        features: []
    };
}

let groupFeatures = [
    {
        groupNames: 'Indonesia North',
        region_names: [
            'Indonesia (North Sumatra)', 
            'Indonesia (Aceh)'],
        features: []
    },
    {
        groupNames: 'Indonesia Center',
        region_names: [
            'Indonesia (Across Central Sumatra)', 
            'Indonesia (Across Sumatra)'],
        features: []
    },
    {
        groupNames: 'Indonesia South',
        region_names: [
            'Indonesia (South Sumatra)', 
            'Indonesia (Pangkalpinang)', 
            'Indonesia (Bengkulu)', 
            'Indonesia (Bandar Lampung)'],
        features: []
    }
];

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
    'Indonesia (South Sumatra)',
    'Indonesia (West Sumatra)'
];

function main() {
    groupFeatures = getGroupFeatures(data.features, groupFeatures);

    let finalGeoJson = initGeoJson(); 
    finalGeoJson.features = removeRegions(data.features, regionsNameWillRemove);

    for (let i = 0; i < groupFeatures.length; i++) {
        const features = groupFeatures[i].features;
        
        const finalFeature = mergeAllRegions(features);
        finalGeoJson.features.push(finalFeature);
    }

    helper.saveFile(fileName, finalGeoJson);
}

main();