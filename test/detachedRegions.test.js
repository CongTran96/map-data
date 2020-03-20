const assert = require('assert');
const detachAllRegions = require('../src/detachedRegions').detachAllRegions;

const rawGeoJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "region_name": "Central India"
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            71.0870361328125,
                            24.686952411999155
                        ],
                        [
                            70.9716796875,
                            24.617057340809524
                        ]
                    ],
                    [
                        [
                            71.0870361328125,
                            24.686952411999155
                        ],
                        [
                            70.9716796875,
                            24.617057340809524
                        ]
                    ]
                ]
            }
        }
    ]
}

describe('detach regions', () => {
    it('detach one regions with multiples polygon', () => {
        const finalGeoJson = detachAllRegions(rawGeoJson);

        const expectGeoJson = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "region_name": "Central India"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                71.0870361328125,
                                24.686952411999155
                            ],
                            [
                                70.9716796875,
                                24.617057340809524
                            ]
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "region_name": "Central India"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                71.0870361328125,
                                24.686952411999155
                            ],
                            [
                                70.9716796875,
                                24.617057340809524
                            ]
                        ]
                    }
                }
            ]
        }

        assert.deepEqual(finalGeoJson, expectGeoJson);
    });
});