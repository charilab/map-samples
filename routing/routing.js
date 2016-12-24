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
var heatmap = L.tileLayer('http://globalheat.strava.com/tiles/cycling/color1/{z}/{x}/{y}.png', {
    attribution: 'Strava Heatmap',
    maxZoom: 18
});

L.YimgTileLayer = L.TileLayer.extend({
    getTileUrl: function (coords) {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hours = now.getHours();
        var minutes = now.getMinutes();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        if (hours < 10) hours = '0' + hours;
        minutes *= 0.1;
        minutes = Math.floor(minutes);
        minutes *= 10;
        if (minutes < 10) minutes = '0' + minutes;
        date = "" + year + month + day + hours + minutes;
        return L.Util.template(this._url, L.extend({
            d: date,
            x: coords.x,
            y: Math.pow(2, this._getZoomForUrl() - 1) - 1 - coords.y,
            z: this._getZoomForUrl() + 1
        }, this.options));
    }
});

var rainmap = new L.YimgTileLayer('http://weather.map.c.yimg.jp/weather?x={x}&y={y}&z={z}&size=256&date={d}', {
    attribution: 'Rain map',
    maxZoom: 18,
    opacity: 0.5
});

/* set base and overlay layers */
var baseLayers = {
    "OpenStreetMap": osm,
    "OpenCycleMap": ocm,
    "Mapbox(charilog)": mapbox
};

var overlays = {
    "Strava Heatmap": heatmap,
    "雨雲マップ": rainmap
};

/* Main routine */
var map = L.map('map', {
    fullscreenControl: true
}).setView([35.126847, 138.909589], 9);

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

// OSRM
var osrm = L.Routing.control({
    language: 'ja',
    serviceUrl: 'http://charilog.net:5000/route/v1',
    profile: 'cycling',
    geocoder: L.Control.Geocoder.nominatim(),
    routeWhileDragging: true,
    reverseWaypoints: true,
    routeDragInterval: 100,
    lineOptions: {
        styles: [
            {color: 'black', opacity: 0.1, weight: 9},
            {color: 'fuchsia', opacity: 0.4, weight: 8}
        ]
    },
    altLineOptions: {
        styles: [
            {color: 'black', opacity: 0.1, weight: 9},
            {color: 'aqua', opacity: 0.5, weight: 8}
        ]
    },
    showAlternatives: false
});
osrm.addTo(map);

// Routine for 'click'
map.on('click', mapClick);

function mapClick(e) {
    var wp = osrm.getWaypoints().filter(function(pnt) {
        return pnt.latLng;
    });
    switch(wp.length) {
    case 0:
        osrm.spliceWaypoints(0, 1, e.latlng);
        break;
    case 1:
        osrm.spliceWaypoints(1, 1, e.latlng);
        break;
    default:
        osrm.spliceWaypoints(osrm.getWaypoints().length, 0, e.latlng);
        break
    }
}

