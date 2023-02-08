const bounds = [
    [36.333, 50.031], // Southwest coordinates
    [36.3790, 50.046] // Northeast coordinates
];

//Якщо в тебе є мапбокс-токен свій, то додай
mapboxgl.accessToken = 'pk.eyJ1IjoiZXZnZXNoYWRyb3pkb3ZhIiwiYSI6ImNsZGQyY2w5dDBjb2gzcG8xeXQ3c2EzczEifQ.lYkv8Hg7kFKNdNJF7wx4mg';


const map = new mapboxgl.Map({
    container: 'map',
    // в мене є гіпотеза, що якщо не ставити мапбоксівські тайли, то він не рахує завантаження...
    style: "./data/osm_liberty.json",
    center: [36.37, 50.03],
    zoom: 14,
    pitch: 100,
    bearing: 160,
    antialias: true,
    maxBounds: bounds
});

map.on('load', () => {
    map.addSource('floorplan', {
        'type': 'geojson',
        'data': './data/buildings_2.geojson'
    });
    map.addLayer({
        'id': 'room-extrusion',
        'type': 'fill-extrusion',
        'source': 'floorplan',
        'paint': {
            'fill-extrusion-color': "#d0d0d0",
            'fill-extrusion-height': ['get', 'level_heigt'],
            // 'fill-extrusion-base': ['get', 'base_height'],
            'fill-extrusion-opacity': 1
        }
    });

    map.addSource('highlighted', {
        'type': 'geojson',
        'data': './data/damaged_building_2.geojson',
        'generateId': true
    });
    map.addLayer({
        'id': 'red',
        'type': 'fill-extrusion',
        'source': 'highlighted',
        'paint': {
            'fill-extrusion-color': [
                'case', ['boolean', ['feature-state', 'click'], false],
                '#8b2f42 ',
                '#D3999A'
            ],
            'fill-extrusion-height': ['get', 'level_heigt'],
            // 'fill-extrusion-base': ['get', 'base_height'],
            'fill-extrusion-opacity': 1
        }
    });
});
var clickedStateId = null;
map.on("click", 'red', function(e) {
    console.log(e.features[0].properties)

    if (e.features.length > 0) {
        if (clickedStateId) {
            map.setFeatureState({ source: 'highlighted', id: clickedStateId }, { click: false });
        }
        clickedStateId = e.features[0].id;
        map.setFeatureState({ source: 'highlighted', id: clickedStateId }, { click: true });
    }
    d3.select('#infoboard').html(
        // 'id ' + userData.properties[0] + '<br/>' +
        '<span class="info-head">Адреса:</span><br> <span class="info-info">' + e.features[0].properties['name'] + '</span><br>' +
        '<span class="info-head">Категорія:</span><br> <span class="info-info">' + e.features[0].properties['опис'] + '</span><br>' +
        '<span class="info-head">Опис:</span><br> <span class="info-info">' + e.features[0].properties['як пошкоджено'] + '</span><br>' +
        '<video class="vid-info"width="100%" autoplay loop muted poster="./photo/' + e.features[0].properties['фото'] + '"><source src="./video_s/' + e.features[0].properties['відео'] +
        '" type="video/mp4"></video>' + '<br>'
        // 'photo ' + userData.properties[23] + '<br>'
        // 'video ' + userData.properties[18] + '<br>'
    )

    //ось тут логіка, що має бути по кліку
})

map.on("mouseenter", 'red', function(e) {
    map.getCanvas().style.cursor = "pointer";
});

map.on('mouseleave', 'red', () => {
    map.getCanvas().style.cursor = ''
})