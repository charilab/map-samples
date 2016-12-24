var convIcons = {
    "セブン-イレブン": L.icon({
        iconUrl: '/images/conv_711_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "セブンイレブン": L.icon({
        iconUrl: '/images/conv_711_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "ローソン": L.icon({
        iconUrl: '/images/conv_lawson_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "LAWSON": L.icon({
        iconUrl: '/images/conv_lawson_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "Lawson": L.icon({
        iconUrl: '/images/conv_lawson_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "ファミリーマート": L.icon({
        iconUrl: '/images/conv_famima_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "Family": L.icon({
        iconUrl: '/images/conv_famima_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "FamilyMart": L.icon({
        iconUrl: '/images/conv_famima_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "Familymart": L.icon({
        iconUrl: '/images/conv_famima_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "ミニストップ": L.icon({
        iconUrl: '/images/conv_ministop_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "サークルK": L.icon({
        iconUrl: '/images/conv_circlek_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "デイリーヤマザキ": L.icon({
        iconUrl: '/images/conv_daily_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "ポプラ": L.icon({
        iconUrl: '/images/conv_poplar_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "スリーエフ": L.icon({
        iconUrl: '/images/conv_threef_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "サンクス": L.icon({
        iconUrl: '/images/conv_sunkus_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "ココストア": L.icon({
        iconUrl: '/images/conv_coco_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "セイコーマート": L.icon({
        iconUrl: '/images/conv_seico_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
    "others": L.icon({
        iconUrl: '/images/conv_others_32.png',
        iconSize: [32, 32], 
        iconAnchor: [16, 16]}),
};

var passIcon = L.icon({
    iconUrl: '/images/flag.png',
    iconSize:     [48, 48],
    iconAnchor:   [24, 48],
    popupAnchor:  [-3, -76]
});

var spaIcon = L.icon({
    iconUrl: '/images/hotspring_32.png',
    iconSize: [32, 32], 
    iconAnchor: [16, 16]});

var bicycleIcon = L.icon({
    iconUrl: '/images/bicycle_32.png',
    iconSize: [32, 32], 
    iconAnchor: [16, 16]});

function selectIcon(feature) {
    var icon = convIcons["others"];
    if (feature.properties.name) {
        var strs = feature.properties.name.split(/[\s\(]/);
        var name = strs[0];
        icon = (convIcons[name]) ? convIcons[name] : convIcons["others"];
    }
    return icon;
}

function createMarker(feature, latlng) {
    if (feature.properties.shop == "convenience") {
        icon = selectIcon(feature);
        var marker = new L.Marker(latlng, {icon: icon});
        if (feature.properties.branch) {
            marker.bindPopup(feature.properties.branch);
        }
    } else if (feature.properties.mountain_pass == "yes") {
        var marker = new L.Marker(latlng, {icon: passIcon});
    } else if ((feature.properties.amenity == "spa")
        || (feature.properties.amenity == "public_bath")) {
        var marker = new L.Marker(latlng, {icon: spaIcon});
    } else if ((feature.properties.shop == "bicycle")
        || (feature.properties.shop == "sports")) {
        var marker = new L.Marker(latlng, {icon: bicycleIcon});
    } else {
        var marker = new L.CircleMarker(latlng);
    }
    return marker;
}
