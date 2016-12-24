/* define geoJsonDynamic layer */
L.GeoJsonDynamic = L.GeoJSON.extend({
    initialize: function(options) {
        this._url = options.jsonUrl;
        this._reload = options.reload;
        this._limit = options.limit;
        options = L.setOptions(this, options);
        this._layers = {};
        this._events = {
            viewreset: this._update,
            zoom: this._update,
            moveend: this._update
        };
    },

    _query: function(layer, url) {
        console.log("Getting JSON with " + url);
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState === 4 && req.status === 200) {
                var data = JSON.parse(req.responseText);
                layer.clearLayers();
                layer.addData(data);
            }
        };
        req.open('GET', url, true);
        req.send();
    },

    _load: function () {
        var query = this._url;
        this._query(this, query);
    },

    _update: function () {
        var bounds = this._map.getBounds();
        var pmin = bounds.getSouthWest();
        var pmax = bounds.getNorthEast();
        var center = this._map.getCenter();
        var query = this._url+"&xmin="+pmin.lng+"&ymin="+pmin.lat+"&xmax="+pmax.lng+"&ymax="+pmax.lat;
        this._query(this, query);
    },

    onAdd: function (map) {
        console.log("GeoJsonDynamic: onAdd() is called.");
        this._map = map;
        if (this._reload) {
            this._update();
            map.on(this._events, this);
        } else {
            this._load();
        }
        map.addLayer(this);
    },

    onRemove: function (map) {
        console.log("GeoJsonDynamic: onRemove() is called.");
        this.clearLayers();
        if (this._reload) {
            this._map.off(this._events, this);
        }
    }
})

L.geoJsonDynamic = function(geojson, options) {
    return new L.GeoJsonDynamic(geojson,options);
}

