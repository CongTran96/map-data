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

function mergeAllRegionsToOne(features) {
    const firstRegion = JSON.parse(JSON.stringify(features[0]));;
    const allFeatures = JSON.parse(JSON.stringify(features));
    
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

    return firstRegion;
}

exports.mergeAllRegionsToOne = mergeAllRegionsToOne;