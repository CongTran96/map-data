const assert = require('assert');
const removeRegions = require('../src/removeRegions').removeRegions;

let features = [];
describe('removeRegions', () => {
    before(() => {
        features = [
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
    });

    it ('remove multiple regions', () => {
        const regionsNameWillRemove = [
            'Indonesia( Gorontalo)', 
            'Indonesia ( Yogyakarta)'
        ];
        
        const expectedFeature = [
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
        ];

        const finalFeatures = removeRegions(features, regionsNameWillRemove);
        assert.deepEqual(finalFeatures, expectedFeature);
    });

    it('remove all regions', () => {
        const regionsNameWillRemove = [
            'Indonesia( Gorontalo)', 
            'Indonesia ( Yogyakarta)',
            'Indonesia (Banten)'
        ];

        const expectedFeature = [];

        const finalFeatures = removeRegions(features, regionsNameWillRemove);
        assert.deepEqual(finalFeatures, expectedFeature);
    })
})