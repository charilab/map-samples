/* define baselayers */
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: "&copy <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>",
});

var ocm = L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: "&copy <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>",
});

var mapbox = L.tileLayer('https://api.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={id}', {
    maxZoom: 19,
    mapid: '<Your MapID>',
    attribution: "&copy <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> &copy <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
    id: '<Your Access Token>'
});

/* define overlays */
/* Strava heatmap */
var heatmap = L.tileLayer('http://globalheat.strava.com/tiles/cycling/color1/{z}/{x}/{y}.png', {
    attribution: 'Strava Heatmap',
    maxZoom: 18
});

/* convenience store */
var convenience = L.geoJsonDynamic({
        jsonUrl: "http://charilab.sakura.ne.jp/geoapi/getGeoInfo.php?kind=convenience",
        reload: true,
        limit: null,
        pointToLayer: createMarker,
        onEachFeature: function (feature, layer) {
            if (feature.properties.name) {
                if (feature.properties.branch) {
                    label = feature.properties.name+":"+feature.properties.branch;
                } else {
                    label = feature.properties.name;
                }
                layer.bindPopup(label);
            }
        }
    });

/* toilets */
var toilets = L.geoJsonDynamic({
        jsonUrl: "http://charilab.sakura.ne.jp/geoapi/getGeoInfo.php?kind=toilets",
        reload: true,
        limit: null,
        pointToLayer: createMarker,
        onEachFeature: function (feature, layer) {
            if (feature.properties.name) {
                layer.bindPopup(feature.properties.name);
            }
        }
    });

/* spa or public bath */
var spa = L.geoJsonDynamic({
        jsonUrl: "http://charilab.sakura.ne.jp/geoapi/getGeoInfo.php?kind=spa",
        reload: true,
        limit: null,
        pointToLayer: createMarker,
        onEachFeature: function (feature, layer) {
            if (feature.properties.name) {
                layer.bindPopup(feature.properties.name);
            }
        }
    });

/* bike shop */
var bicycle = L.geoJsonDynamic({
        jsonUrl: "http://charilab.sakura.ne.jp/geoapi/getGeoInfo.php?kind=bicycle",
        reload: true,
        limit: null,
        pointToLayer: createMarker,
        onEachFeature: function (feature, layer) {
            if (feature.properties.name) {
                layer.bindPopup(feature.properties.name);
            }
        }
    });

/* mountain pass */
var pass = L.geoJsonDynamic({
        jsonUrl: "http://charilab.sakura.ne.jp/geoapi/getGeoInfo.php?kind=pass",
        reload: true,
        limit: null,
        pointToLayer: createMarker,
        onEachFeature: function (feature, layer) {
            if (feature.properties.name) {
                layer.bindPopup(feature.properties.name);
            }
        }
    });

/* set base and overlay layers */
var baseLayers = {
    "OpenStreetMap": osm,
    "OpenCycleMap": ocm,
    "Mapbox(charilog)": mapbox
};

var overlays = {
    "Strava Heatmap": heatmap,
    "コンビニエンスストア": convenience,
    "トイレ": toilets,
    "温泉施設": spa,
    "自転車店": bicycle,
    "峠": pass
};

/* Main routine */
var map = L.map('map', {
    fullscreenControl: true
}).setView([35.126847, 138.909589], 14);

osm.addTo(map);

L.control.layers(baseLayers, overlays, {
    position: 'topleft'
}).addTo(map);

// add scalebar
L.control.scale({
    position: 'topright',
    metric: true,
    imperial: false
}).addTo(map);
