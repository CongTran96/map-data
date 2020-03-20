### Check Tools

* geoman editor map:
[https://geoman.io/geojson-editor](https://geoman.io/geojson-editor)

* geojson.io
[http://geojson.io/](http://geojson.io/)

### Features

#### Merge one regions with many features to one feature (`\src\mergeAllRegions.js`)

* How to run
    * Put preprocess data in `raw-data` directory. 
    * Open `mergeAllRegions.js`. Change `fileName` variable to name of data file. Ex: file name `kazakhstan.json` so chanage variable likes `const fileName = 'kazakhstan.json'`.
    * Run file with terminal `node mergeAllRegions.js`.
    * Get final data with same name in `final-data` directory.

* Example
From many features with one polygon geometry
```
{
    "type": "FeatureCollection",
    "features": [
        
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": []
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": []
            }
        },
        ...
    ]
}  
```

To one feature with multiPolygon geometry

```
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                ]
            }
        }
    ]
}  
```

#### Merge many regions from many file to one file (\src\mergeFeaturesFromManyFiles.js)

* How to run
    * Put preprocess data in `raw-data` directory. 
    * Open `mergeAllRegions.js`. Change `fileName` variable to name of data file. Ex: file name `kazakhstan.json` so chanage variable likes `const fileName = 'kazakhstan.json'`.
    * Import all files(merged from) to bellow comment `raw geoInput` and add to array `featureWillAdded`.
    * Run file with terminal `node mergeAllRegions.js`.
    * Get final data with same name in `final-data` directory.

* Example
From three files (`file 1`, `file 2`, `file 3`).
```
    \\ file 1
    {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            },
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            },
            ...
        ]
    }  

    \\ file 2
    {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            },
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            },
            ...
        ]
    } 

    \\ file 3
    {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            },
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            },
            ...
        ]
    }  
```

Merge all data from file `file 2`, `file 3` to `file 1`.

```
    \\ file 1
    {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                    ]
                }
            }
        ]
    }  
```

#### remove many regions (\src\removeRegions.js)

* How to run
    * Put preprocess data in `raw-data` directory. 
    * Open `removeRegions.js`. Change `fileName` variable to name of data file. Ex: file name `kazakhstan.json` so chanage variable likes `const fileName = 'kazakhstan.json'`.
    * add to array `regionsNameWillRemove` is list of regions name.
    * out put of function `removeRegions` is geoJson without regions name in `regionsNameWillRemove`


* Example
From file.
```
    {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    region_name: 'Indo'
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            },
            {
                "type": "Feature",
                "properties": {
                    region_name: 'VietNam'
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            },
            ...
        ]
    } 
```

Set `regionsNameWillRemove` = `['Indo']`. The the new json will remove `Indo` features.

```
    {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    region_name: 'VietNam'
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            },
            ...
        ]
    } 
```

#### group regions (\src\groupRegions.js)

group all features to exactly predefine groups

* Function name: `function getGroupFeatures(features, groupFeatures)`

* Required
  * predefine `groupFeatures` that contain group of regions by using region_name to group.

* Example
From geojson.
```
    {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    region_name: 'Indo'
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            },
            {
                "type": "Feature",
                "properties": {
                    region_name: 'VietNam (North)'
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            },
            {
                "type": "Feature",
                "properties": {
                    region_name: 'VietNam (South)'
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            }
        ]
    } 
```

The `groupFeatures` format is 
```
    [
        {
            groupNames: '',
            region_names: [],
            features: []
        },
        {
            groupNames: '',
            region_names: [],
            features: []
        },
        ...
    ]
```
That you can change groupNames and region_name in each features of `groupFeatures`. If you want group many regions to one regions. Just push region_name of that region in to `region_names` in one of `groupFeatures`. In this example, I want group `VietNam (North)` and `VietNam (South)` to one regions, so I will put themes like.

```js
    const groupFeatures = [
        {
            groupNames: 'VietName',
            region_names: [
                'VietNam (North)', 
                'VietNam (South)'],
            features: []
        }
    ];
```

And after through of function `getGroupFeatures` this will of put group of function like

```
    [
        {
            groupNames: 'VietName',
            region_names: [
                'VietNam (North)', 
                'VietNam (South)'],
            features: [
                {
                    "type": "Feature",
                    "properties": {
                        region_name: 'VietNam (North)'
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": []
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        region_name: 'VietNam (South)'
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": []
                    }
                }             
            ]
        }
    ]
```