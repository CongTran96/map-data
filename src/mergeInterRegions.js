let helper = require('./helper');

const rawData = require('../data/indo.json');
const coordinates = [];

const regionWillMerge = 'Philippin';
const regionPropertiesName = 'region_name';

const initGeoFormat = () => {
    return {
        type: "FeatureCollection",
        features: []
    }
};

const main = () => {
    const finalGeo = initGeoFormat();

    console.log('rawData.features:', rawData.features);

    for (let i = 0; i < rawData.features.length; i++) {
        // console.log('feature:', feature);
        const feature = rawData.features[i];

        // if (!feature.properties.name) {
        //     finalGeo.features.push(feature);
        // } else {
        //     coordinates.push(feature.geometry.coordinates)
        // }

        coordinates.push(feature.geometry.coordinates)
    }

    // let featureIndexWillMerge = 0;
    // for (let i = 0; i < finalGeo.features.length; i++) {
    //     const feature = finalGeo.features[i];

    //     if (feature.properties[regionPropertiesName] === regionWillMerge) {
    //         featureIndexWillMerge = i;
    //     }
    // }

    // const featureWillMerge = finalGeo.features[featureIndexWillMerge];

    // featureWillMerge.geometry.coordinates = featureWillMerge.geometry.coordinates.concat(coordinates);


    helper.saveFile('finalGeo.json', finalGeo);
}

main();