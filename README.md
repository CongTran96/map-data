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