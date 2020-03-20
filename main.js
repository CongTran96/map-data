const getGroupFeatures = require('./src/helper/groupRegions').getGroupFeatures;
const removeRegions = require('./src/removeRegions').removeRegions;
const mergeAllRegions = require('./src/mergeAllRegions').mergeAllRegionsToOne;
const helper = require('./src/helper');

const fileName = 'geo.json';
const data = require('./raw-data/' + fileName);

const initGeoJson = () => {
    return {
        type: "FeatureCollection",
        features: []
    };
}

let groupFeatures = [
    {
        groupNames: 'Indonesia Central Sumatra',
        region_names: [
            'Indonesia (Central Sumatra)',
            'West Sumatra'
        ],
        features: []
    },
    {
        groupNames: 'Indonesia (West Java)',
        region_names: [
            'Indonesia (West Java)', 
            'Indonesia Jakasta'
        ],
        features: []
    },
    {
        groupNames: 'Indonesia (Papua)',
        region_names: [
            'Indonesia (Papua)', 
            'Indonesia west Papue'
        ],
        features: []
    },
    {
        groupNames: 'Indonesia (North Sulawesi)',
        region_names: [
            'Indonesia (North Sulawesi)', 
            'Indonesia Gorontalo'
        ],
        features: []
    }
];

const regionsNameWillRemove = [
    'China (Heilongjiang)',
    'China (Inner Mongolia)',
    'China (Jilin)',
    'China (Liaoning)',
    'China (Ningxia)',
    'China (Shandong)',
    'China(Tianjin)'
];

function main() {
    // groupFeatures = getGroupFeatures(data.features, groupFeatures);

    let finalGeoJson = initGeoJson(); 
    finalGeoJson.features = removeRegions(data.features, regionsNameWillRemove);

    // for (let i = 0; i < groupFeatures.length; i++) {
    //     const features = groupFeatures[i].features;
        
    //     const finalFeature = mergeAllRegions(features);
    //     finalGeoJson.features.push(finalFeature);
    // }

    helper.saveFile(fileName, finalGeoJson);
}

main();