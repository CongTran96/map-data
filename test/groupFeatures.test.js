const assert = require('assert');
const getGroupFeatures = require('../src/helper/groupRegions').getGroupFeatures;

let rawGeoJson = {};
describe('groupFeatures', () => {
    // runs once before the first test in this block
    before(() => {
        rawGeoJson = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "region_name": "Indonesia( Gorontalo)"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            [
                                [
                                    71.0870361328125,
                                    24.686952411999155
                                ]
                            ]
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "region_name": "Indonesia ( Yogyakarta)"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            [
                                [
                                    71.0870361328125,
                                    24.686952411999155
                                ]
                            ]
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "region_name": "Indonesia (Banten)"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            [
                                [
                                    71.0870361328125,
                                    24.686952411999155
                                ]
                            ]
                        ]
                    }
                }
            ]
        }
    });


    it('group with multiple groups', () => {
        const groupFeatures = [
            {
                region_names: ['Indonesia( Gorontalo)','Indonesia ( Yogyakarta)'],
                features: []
            },
            {
                region_names: ['Indonesia (Banten)'],
                features: []
            }
        ];

        const expectGroupFeatures = [
            {
                region_names: ['Indonesia( Gorontalo)','Indonesia ( Yogyakarta)'],
                features: [
                    {
                        "type": "Feature",
                        "properties": {
                            "region_name": "Indonesia( Gorontalo)"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        71.0870361328125,
                                        24.686952411999155
                                    ]
                                ]
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "region_name": "Indonesia ( Yogyakarta)"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        71.0870361328125,
                                        24.686952411999155
                                    ]
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                region_names: ['Indonesia (Banten)'],
                features: [
                    {
                        "type": "Feature",
                        "properties": {
                            "region_name": "Indonesia (Banten)"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        71.0870361328125,
                                        24.686952411999155
                                    ]
                                ]
                            ]
                        }
                    }
                ]
            }
        ];

        const finalGroupFeatures = getGroupFeatures(rawGeoJson.features, groupFeatures);
        assert.deepEqual(finalGroupFeatures, expectGroupFeatures);
    });

    it('group with only groups', () => {
        assert.equal(true, true);
    });

    it('group with no groups', () => {
        assert.equal(true, true);
    });
})