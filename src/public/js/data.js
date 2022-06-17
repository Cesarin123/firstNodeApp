///making the map and the tiles
const myMap = L.map('issMap').setView([0,0], 5);
const attribution = "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>";
const tileUrl =  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(myMap);

///make the marker
const myIcon = L.icon({
    iconUrl: 'https://icons.iconarchive.com/icons/goodstuff-no-nonsense/free-space/512/international-space-station-icon.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
})

const marker = L.marker([0,0]).addTo(myMap);

// var popup = L.popup()
//     .setLatLng([0,0])
//     .setContent('<p>Hello world!<br />This is a nice popup.</p>')
//     .openOn(myMap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getData() {
    const response = await fetch(api_url);
    const data = await response.json();
    console.log("velocity", data.velocity);
    const {latitude, longitude } =  data;
    marker.bindPopup("Im moving at a velocity of: " + data.velocity + " km/h").openPopup();
    marker.setIcon(myIcon);
    myMap.setView([latitude, longitude]);
    marker.setLatLng([latitude, longitude]);
    document.getElementById('lat').textContent =  latitude;
    document.getElementById('long').textContent =  longitude;

}

function updateData(){
    setInterval(getData, 4000);
    // console.log("Data has been updated, 4 seconds have elapsed")
}

updateData();
