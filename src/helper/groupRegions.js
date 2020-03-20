function getGroupFeatures(features, groupFeatures) {
    let specificFeatures = [];

    for (let i = 0; i < groupFeatures.length; i++) {
        const feature = groupFeatures[i];
        specificFeatures = specificFeatures.concat(feature.region_names);
    }

    for (let i = 0; i < features.length; i++) {
        const feature = features[i];

        if (feature.properties && specificFeatures.includes(feature.properties.region_name)) {
            for (let j = 0; j < groupFeatures.length; j++) {
                if (groupFeatures[j].region_names.includes(feature.properties.region_name)) {
                    groupFeatures[j].features.push(feature);
                }
            }
        }
    }

    return groupFeatures;
}

exports.getGroupFeatures = getGroupFeatures;