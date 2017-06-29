(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
// ================ variables ======================

var mapPanel = Object.create(panelModule);
var suvery = Object.create(surveyModule);
var bounds = [[-83.3437, 42.2102], // Southwest coordinates
[-82.8754, 42.5197] // Northeast coordinates
];
var baseMapStyles = ['cj2m68vfx001s2rs0nyherr29', 'cj2m1f9k400132rmr1jhjq2gn'];
var parcelData = {
  'rental-status': null,
  'parcel-data': null
};
var currentURLParams = {
  'zoom': 0,
  'lng': 0,
  'lat': 0,
  'parcel': '',
  'district': '',
  'neighborhood': ''
};
mapboxgl.accessToken = 'pk.eyJ1Ijoic2x1c2Fyc2tpZGRldHJvaXRtaSIsImEiOiJjaXZsNXlwcXQwYnY5MnlsYml4NTJ2Mno4In0.8wKUnlMPIlxq-eWH0d10-Q';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/slusarskiddetroitmi/' + baseMapStyles[0], //stylesheet location
  center: [-83.15, 42.36], // starting position
  zoom: 11.5, // starting zoom
  keyboard: true
});
// ================== functions =====================
window.onload = function () {
  console.log(getQueryVariable('zoom'));
  console.log(getQueryVariable('lat'));
  console.log(getQueryVariable('lng'));
  console.log(getQueryVariable('parcel'));
  console.log(getQueryVariable('neighborhood'));
  console.log(getQueryVariable('district'));
  if (getQueryVariable('zoom')) {
    if (getQueryVariable('lat')) {
      switch (true) {
        case getQueryVariable('district') !== false:
          console.log('load district panel');
          updateURLParams([getQueryVariable('zoom'), getQueryVariable('lng'), getQueryVariable('lat'), '', getQueryVariable('district')]);
          console.log(currentURLParams);
          mapPanel.createFeatureData();
          break;
        case getQueryVariable('neighborhood') !== false:
          console.log('load neighborhood panel');
          updateURLParams([getQueryVariable('zoom'), getQueryVariable('lng'), getQueryVariable('lat'), '', '', getQueryVariable('neighborhood')]);
          mapPanel.createFeatureData();
          break;
        case getQueryVariable('parcel') !== false:
          updateURLParams([getQueryVariable('zoom'), getQueryVariable('lng'), getQueryVariable('lat'), getQueryVariable('parcel'), '', '']);
          mapPanel.createFeatureData();
          break;
        default:
          mapPanel.createPanel('city');
          map.flyTo({
            center: [getQueryVariable('lng'), getQueryVariable('lat')],
            zoom: getQueryVariable('zoom'),
            bearing: 0,
            // These options control the flight curve, making it move
            // slowly and zoom out almost completely before starting
            // to pan.
            speed: 2, // make the flying slow
            curve: 1, // change the speed at which it zooms out
            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            easing: function (t) {
              return t;
            }
          });
      }
    } else {
      map.flyTo({
        center: [-83.15, 42.36],
        zoom: getQueryVariable('zoom'),
        bearing: 0,
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 2, // make the flying slow
        curve: 1, // change the speed at which it zooms out
        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function (t) {
          return t;
        }
      });
      updateURLParams([getQueryVariable('zoom'), -83.15, 42.36]);
      if (getQueryVariable('parcel')) {
        console.log('there is parcel');
      } else {
        console.log('no parcel');
      }
    }
  } else {
    if (getQueryVariable('lat')) {
      map.flyTo({
        center: [getQueryVariable('lng'), getQueryVariable('lat')],
        zoom: 11.5,
        bearing: 0,
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 2, // make the flying slow
        curve: 1, // change the speed at which it zooms out
        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function (t) {
          return t;
        }
      });
      updateURLParams([11.5, getQueryVariable('lat'), getQueryVariable('lng')]);
      if (getQueryVariable('parcel')) {
        console.log('there is parcel');
      } else {
        console.log('no parcel');
        if (getQueryVariable('district')) {
          console.log('there is district');
        } else {
          console.log('no district');
          if (getQueryVariable('neighborhood')) {
            console.log('there is neighborhood');
          } else {
            console.log('no neighborhood - loading city');
            mapPanel.createPanel('city');
          }
        }
      }
    } else {
      mapPanel.createPanel('city');
    }
  }
};
var getQueryVariable = function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      if (pair[1] !== '') {
        return pair[1];
      }
    }
  }
  return false;
};
var updateURLParams = function updateURLParams(params) {
  console.log(params);
  console.log(params.length);
  switch (true) {
    case params.length === 1:
      currentURLParams.zoom = params[0];
      break;
    case params.length === 2:
      currentURLParams.lng = params[0];
      currentURLParams.lat = params[1];
      break;
    case params.length === 3:
      currentURLParams.zoom = params[0];
      currentURLParams.lng = params[1];
      currentURLParams.lat = params[2];
      break;
    case params.length === 4:
      currentURLParams.lng = params[1];
      currentURLParams.lat = params[2];
      currentURLParams.parcel = params[3];
      break;
    case params.length === 5:
      currentURLParams.zoom = params[0];
      currentURLParams.lng = params[1];
      currentURLParams.lat = params[2];
      currentURLParams.district = params[4];
      break;
    default:
      currentURLParams.zoom = params[0];
      currentURLParams.lng = params[1];
      currentURLParams.lat = params[2];
      currentURLParams.parcel = params[3];
      currentURLParams.district = params[4];
      currentURLParams.neighborhood = params[5];
  }
  console.log(currentURLParams);
  var newTempURL = '';
  for (var property in currentURLParams) {
    if (currentURLParams.hasOwnProperty(property)) {
      console.log(property);
      console.log(currentURLParams[property]);
      switch (true) {
        case property !== 0:
          newTempURL += property + '=' + currentURLParams[property] + '&';
          break;
        default:

      }
    }
  }
  console.log(newTempURL);
  if (history.pushState) {
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + newTempURL;
    window.history.pushState({ path: newurl }, '', newurl);
  }
};
var startGeocoderResults = function startGeocoderResults(ev) {
  document.querySelector('.overall-number').innerHTML = '';
  document.querySelector('.parcel-info').innerHTML = '';
  document.querySelector('.info-container > .not-rental').innerHTML = '';
  document.querySelector('.info-container > .rental').innerHTML = '';
  document.querySelector('.info-container > .total-rentals').innerHTML = '';
  document.querySelector('.parcel-data.owner').innerHTML = '';
  document.querySelector('.parcel-data.building').innerHTML = '';
  document.querySelector('.parcel-info.display-section').innerHTML = '';
  // console.log(ev.result.geometry);
  map.flyTo({
    center: [ev.result.geometry.coordinates[0], ev.result.geometry.coordinates[1]],
    zoom: 16,
    bearing: 0,

    // These options control the flight curve, making it move
    // slowly and zoom out almost completely before starting
    // to pan.
    speed: 2, // make the flying slow
    curve: 1, // change the speed at which it zooms out

    // This can be any easing function: it takes a number between
    // 0 and 1 and returns another number between 0 and 1.
    easing: function (t) {
      return t;
    }
  });
  updateURLParams([ev.result.geometry.coordinates[0], ev.result.geometry.coordinates[1]]);
  var tempInputList = document.querySelectorAll('.mapboxgl-ctrl-geocoder.mapboxgl-ctrl > input');
  var tempAddr = '';
  for (var i = 0; i < tempInputList.length; i++) {
    if (tempInputList[i].value.split(',')[0] !== '') {
      // console.log(tempInputList[i].value.split(',')[0]);
      tempAddr = tempInputList[i].value.split(',')[0];
      tempAddr = tempAddr.split(' ');
      break;
    } else {
      // console.log("Empty input");
    }
  }
  var newTempAddr = '';
  var size = tempAddr.length;
  tempAddr.forEach(function (item, index) {
    newTempAddr += item;
    index < size && index + 1 !== size ? newTempAddr += '+' : 0;
  });
  // console.log(newTempAddr);
  //================ get parcel data ==========================
  $.getJSON('https://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/findAddressCandidates?Street=&City=&ZIP=&SingleLine=' + newTempAddr + '&category=&outFields=User_fld&maxLocations=&outSR=&searchExtent=&location=&distance=&magicKey=&f=pjson', function (data) {
    //console.log(data.candidates[0].attributes.User_fld);
    map.setFilter("parcel-fill-hover", ["==", "parcelno", data.candidates[0].attributes.User_fld]);
    $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/Rental_Inspections/FeatureServer/0/query?where=" + encodeURI('ParcelNo=\'' + data.candidates[0].attributes.User_fld + '\'') + "&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=ACTION_DESCRIPTION%2C+ParcelNo%2C+CSM_RECD_DATE&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=pjson&token=", function (Rental_Inspections) {
      console.log(Rental_Inspections);
      var tempParcelDataHTML = '';
      if (Rental_Inspections.features.length) {
        tempParcelDataHTML += '<article class="info-items"><span>RENTAL STATUS</span> ';
        switch (Rental_Inspections.features[0].attributes.ACTION_DESCRIPTION) {
          case 'Issue Initial Registration ':
            tempParcelDataHTML += '<initial><strong>Certificate of Registration</strong></initial></article>';
            break;
          case 'Issue Renewal Registration':
            tempParcelDataHTML += '<initial><strong>Certificate of Registration</strong></initial></article>';
            break;
          default:
            tempParcelDataHTML += '<cofc><strong>Certificate of Compliance</strong></cofc></article>';
        }
        document.querySelector('.parcel-info.rental-info').innerHTML = tempParcelDataHTML;
        document.querySelector('.info-container > .rental').innerHTML = '<a href="https://app.smartsheet.com/b/form?EQBCT=91c0d55e47064373835ce198802764e2" target="_blank"><article class="form-btn">SUBMIT A RENTER\'S COMPLAINT</article></a>';
        document.querySelector('.info-container > .not-rental').innerHTML = '';
        parcelData['rental-status'] = Rental_Inspections.features[0].attributes.ACTION_DESCRIPTION;
      } else {
        document.querySelector('.parcel-info.rental-info').innerHTML = '<article class="info-items"><span>RENTAL STATUS</span> Not a Rental</article>';
        document.querySelector('.info-container > .not-rental').innerHTML = '<a href="https://app.smartsheet.com/b/form?EQBCT=7b3746bd20a048a5919ae07bd9ed89de" target="_blank"><article class="form-btn">REGISTER MY RENTAL</article></a>';
        parcelData['rental-status'] = 'Not a Rental';
      }
      $.getJSON("https://apis.detroitmi.gov/assessments/parcel/" + data.candidates[0].attributes.User_fld.replace(/\./g, '_') + "/", function (parcel) {
        //console.log(parcel);
        document.querySelector('.info-container > .street-name').innerHTML = parcel.propstreetcombined;
        // parcelData['owner-display'] += '<article class="info-items"><span>OWNER</span> ' + parcel.ownername1 + '</article>';
        // parcelData['building-display'] += '<article class="info-items"><span>BUILDING TYPE</span> ' + parcel.resb_style + '</article>';
        // parcelData['building-display'] += '<article class="info-items"><span>PARCEL NUMBER</span> ' + parcel.pnum + '</article>';
        // parcelData['building-display'] += '<article class="info-items"><span>YEAR BUILT</span> ' + parcel.resb_yearbuilt + '</article>';
        // document.querySelector('.parcel-info').innerHTML = tempParcelDataHTML;
        document.querySelector('.parcel-data.owner').innerHTML = '<div class="data-view-btn" data-view="owner" onclick="switchParcelDataViews(this)">OWNER INFORMATION <span>&#10095;</span></div>';
        document.querySelector('.parcel-data.building').innerHTML = '<div class="data-view-btn" data-view="building" onclick="switchParcelDataViews(this)">PROPERTY INFORMATION <span>&#10095;</span></div>';
        parcelData['parcel-data'] = parcel;
      });
    });
    var allGeocoders = document.querySelectorAll('.mapboxgl-ctrl-geocoder input[type="text"]');
    for (var t = 0; t < allGeocoders.length; t++) {
      allGeocoders[t].value = "";
    }
  });
  document.querySelector('#info').className === 'active' ? 0 : document.querySelector('#info').className = 'active';
};
var toggleBaseMap = function toggleBaseMap(e) {
  //console.log(e);
  if (e.target.className !== '') {
    //console.log(e.target.className);
    e.target.className === 'map-view' ? map.setStyle('mapbox://styles/slusarskiddetroitmi/' + baseMapStyles[0]) : map.setStyle('mapbox://styles/slusarskiddetroitmi/' + baseMapStyles[1]);
  } else {
    //console.log(e.target.parentElement);
    e.target.parentElement.className === 'map-view' ? map.setStyle('mapbox://styles/slusarskiddetroitmi/' + baseMapStyles[0]) : map.setStyle('mapbox://styles/slusarskiddetroitmi/' + baseMapStyles[1]);
  }
};
var closeInfo = function closeInfo() {
  //console.log('closing');
  // (document.querySelector('#info').className === 'active') ? document.querySelector('#info').className = '' : document.querySelector('#info').className = 'active';
  document.querySelector('.info-container > .street-name').innerHTML === 'CITY OF DETROIT' ? document.querySelector('#info').className = '' : mapPanel.createPanel('city');
  document.querySelector('.mapboxgl-ctrl-geocoder > input[type="text"]').value = '';
  //console.log('going back to city view');
  map.flyTo({
    center: [-83.15, 42.36], // starting position
    zoom: 11.5,
    bearing: 0,

    // These options control the flight curve, making it move
    // slowly and zoom out almost completely before starting
    // to pan.
    speed: 2, // make the flying slow
    curve: 1, // change the speed at which it zooms out

    // This can be any easing function: it takes a number between
    // 0 and 1 and returns another number between 0 and 1.
    easing: function (t) {
      return t;
    }
  });
  updateURLParams(['', -83.15, 42.36, '', '', '']);
};
var addDataLayers = function addDataLayers() {
  map.addSource('parcels', {
    type: 'vector',
    url: 'mapbox://slusarskiddetroitmi.cwobdjn0'
  });
  map.addSource('councils', {
    type: 'geojson',
    data: "https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson"
  });
  map.addSource('councils_labels', {
    type: 'geojson',
    data: "https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson"
  });
  map.addSource('neighborhoods', {
    type: 'geojson',
    data: 'https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Neighborhoods/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=2898&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });
  map.addSource('neighborhoods-labels', {
    type: 'geojson',
    data: 'http://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Neighborhoods/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=2898&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });
  map.addLayer({
    'id': 'councils_labels',
    'type': 'symbol',
    'source': 'councils_labels', maxzoom: 12,
    'layout': {
      "text-font": ["Mark SC Offc Pro Bold"],
      "text-field": "{name}",
      "symbol-placement": "point",
      "text-size": 22
    },
    'paint': {
      'text-color': 'black'
    }
  });
  map.addLayer({
    "id": "council-borders",
    "type": "line",
    "source": "councils", maxzoom: 12,
    "layout": {},
    "paint": {
      "line-color": "#004b90",
      "line-width": 3
    }
  });
  map.addLayer({
    "id": "council-fill",
    "type": "fill",
    "source": "councils", maxzoom: 12,
    "layout": {},
    "paint": {
      "fill-color": '#0065c3',
      "fill-opacity": 0
    }
  });
  map.addLayer({
    "id": "council-fill-hover",
    "type": "fill",
    "source": "councils", maxzoom: 12,
    "layout": {},
    "paint": {
      "fill-color": '#0065c3',
      "fill-opacity": .5
    },
    "filter": ["==", "name", ""]
  });
  map.addLayer({
    "id": "neighborhoods-borders",
    "type": "line",
    "source": "neighborhoods", minzoom: 12, maxzoom: 15.5,
    "layout": {},
    "paint": {
      "line-color": "#004b90",
      "line-width": 3
    }
  });
  map.addLayer({
    "id": "neighborhoods-fill",
    "type": "fill",
    "source": "neighborhoods", minzoom: 12, maxzoom: 15.5,
    "paint": {
      "fill-color": '#fff',
      'fill-opacity': 0
    }
  });
  map.addLayer({
    'id': 'neighborhoods-labels',
    'type': 'symbol',
    'source': 'neighborhoods-labels',
    'minzoom': 12, maxzoom: 15.5,
    'layout': {
      "text-font": ["Mark SC Offc Pro Bold"],
      'text-field': '{name}'
    },
    'paint': {
      'text-color': 'black'
    }
  });
  map.addLayer({
    "id": "parcel-fill",
    "type": "fill",
    "source": "parcels", minzoom: 15.5,
    "layout": {},
    "paint": {
      "fill-color": "#fff",
      "fill-opacity": 0
    },
    'source-layer': 'parcelsgeojson'
  });
  map.addLayer({
    "id": "parcel-line",
    "type": "line",
    "source": "parcels", minzoom: 15.5,
    "layout": {},
    "paint": {
      "line-color": "#cbcbcb"
    },
    'source-layer': 'parcelsgeojson'
  });
  map.addLayer({
    "id": "parcel-fill-hover",
    "type": "line",
    "source": "parcels", minzoom: 15.5,
    "layout": {},
    "paint": {
      "line-color": '#BD0019'
    },
    'source-layer': 'parcelsgeojson',
    "filter": ["==", "parcelno", ""]
  });

  $.getJSON("http://gis.detroitmi.gov/arcgis/rest/services/DoIT/Commercial/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json", function (data) {
    console.log(data);
    var new_Filter = ["in", 'parcelno'];
    for (var i = 0; i < data.features.length; i++) {
      new_Filter.push(data.features[i].attributes.PARCELNO);
    }
    map.addLayer({
      "id": "parcel-fill-cofc",
      "type": "fill",
      "source": "parcels",
      'source-layer': 'parcelsgeojson',
      'filter': new_Filter,
      "paint": {
        "fill-color": "#DF5800",
        "fill-opacity": 0.3
      }
    });
  });
  //  $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+Initial+Registration%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=parcelno&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=pjson&token=", function( data ) {
  //    //console.log(data);
  //    var new_Filter = ["in",'parcelno'];
  //    for (var i = 0; i < data.features.length; i++) {
  //      new_Filter.push(data.features[i].attributes.ParcelNo);
  //    }
  //    map.addLayer({
  //     "id": "parcel-fill-initial",
  //     "type": "fill",
  //     "source": "parcels",
  //     'source-layer': 'parcelsgeojson',
  //     'filter': new_Filter,
  //     "paint": {
  //       "fill-color":"#114BC7",
  //       "fill-opacity":0.5
  //     }
  //   });
  //  });
};
map.on('style.load', function () {
  addDataLayers();
  map.resize();
});
map.on('load', function (window) {
  map.on("mousemove", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["council-fill"]
    });
    if (features.length) {
      map.setFilter("council-fill-hover", ["==", "districts", features[0].properties.districts]);
    } else {
      map.setFilter("council-fill-hover", ["==", "districts", ""]);
      features = map.queryRenderedFeatures(e.point, {
        layers: ["neighborhoods-fill"]
      });
      if (!features.length) {
        features = map.queryRenderedFeatures(e.point, {
          layers: ["parcel-fill"]
        });
        // console.log(features);
        // if (features.length) {
        //   map.setFilter("parcel-fill-hover", ["==", "parcelno", features[0].properties.parcelno]);
        // }else{
        //   map.setFilter("parcel-fill-hover", ["==", "parcelno", ""]);
        // }
      }
    }
    map.getCanvas().style.cursor = features.length ? 'pointer' : '';
  });
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    bbox: [-83.3437, 42.2102, -82.8754, 42.5197]
  });
  map.addControl(geocoder, 'top-left');
  var sideBarGeocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    bbox: [-83.3437, 42.2102, -82.8754, 42.5197]
  });
  document.getElementById('geocoder').appendChild(sideBarGeocoder.onAdd(map));
  var allGeocoders = document.querySelectorAll('.mapboxgl-ctrl-geocoder input[type="text"]');
  for (var i = 0; i < allGeocoders.length; i++) {
    allGeocoders[i].placeholder = "Lookup an address";
  }
  geocoder.on('result', function (ev) {
    startGeocoderResults(ev);
  });
  sideBarGeocoder.on('result', function (ev) {
    startGeocoderResults(ev);
  });
});
map.on('zoom', function () {
  console.log(map.getZoom());
  updateURLParams([map.getZoom()]);
});
document.getElementById('close-emergency-modal-btn').addEventListener('click', closeInfo);
var toggleBaseMapBtns = document.querySelectorAll('#basemap-toggle > article');
for (var i = 0; i < toggleBaseMapBtns.length; i++) {
  toggleBaseMapBtns[i].addEventListener('click', function (e) {
    toggleBaseMap(e);
  });
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQUNBLElBQUksV0FBVyxPQUFPLE1BQVAsQ0FBYyxXQUFkLENBQWY7QUFDQSxJQUFJLFNBQVMsT0FBTyxNQUFQLENBQWMsWUFBZCxDQUFiO0FBQ0EsSUFBSSxTQUFTLENBQ1QsQ0FBRyxDQUFDLE9BQUosRUFBYyxPQUFkLENBRFMsRUFDZTtBQUN4QixDQUFHLENBQUMsT0FBSixFQUFjLE9BQWQsQ0FGUyxDQUVlO0FBRmYsQ0FBYjtBQUlBLElBQUksZ0JBQWdCLENBQ2xCLDJCQURrQixFQUVsQiwyQkFGa0IsQ0FBcEI7QUFJQSxJQUFJLGFBQWE7QUFDZixtQkFBc0IsSUFEUDtBQUVmLGlCQUFzQjtBQUZQLENBQWpCO0FBSUEsSUFBSSxtQkFBbUI7QUFDckIsVUFBZ0IsQ0FESztBQUVyQixTQUFnQixDQUZLO0FBR3JCLFNBQWdCLENBSEs7QUFJckIsWUFBZ0IsRUFKSztBQUtyQixjQUFnQixFQUxLO0FBTXJCLGtCQUFnQjtBQU5LLENBQXZCO0FBUUEsU0FBUyxXQUFULEdBQXVCLDJHQUF2QjtBQUNBLElBQUksTUFBTSxJQUFJLFNBQVMsR0FBYixDQUFpQjtBQUN6QixhQUFXLEtBRGMsRUFDUDtBQUNsQixTQUFPLHlDQUF5QyxjQUFjLENBQWQsQ0FGdkIsRUFFeUM7QUFDbEUsVUFBUSxDQUFDLENBQUMsS0FBRixFQUFTLEtBQVQsQ0FIaUIsRUFHQTtBQUN6QixRQUFNLElBSm1CLEVBSWI7QUFDWixZQUFXO0FBTGMsQ0FBakIsQ0FBVjtBQU9BO0FBQ0EsT0FBTyxNQUFQLEdBQWdCLFlBQVU7QUFDeEIsVUFBUSxHQUFSLENBQVksaUJBQWlCLE1BQWpCLENBQVo7QUFDQSxVQUFRLEdBQVIsQ0FBWSxpQkFBaUIsS0FBakIsQ0FBWjtBQUNBLFVBQVEsR0FBUixDQUFZLGlCQUFpQixLQUFqQixD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LEVBQWE7QUFDakMseUJBQXFCLEVBQXJCO0FBQ0QsR0FGRDtBQUdBLGtCQUFnQixFQUFoQixDQUFtQixRQUFuQixFQUE2QixVQUFTLEVBQVQsRUFBYTtBQUN4Qyx5QkFBcUIsRUFBckI7QUFDRCxHQUZEO0FBR0QsQ0FwREQ7QUFxREEsSUFBSSxFQUFKLENBQU8sTUFBUCxFQUFlLFlBQVc7QUFDeEIsVUFBUSxHQUFSLENBQVksSUFBSSxPQUFKLEVBQVo7QUFDQSxrQkFBZ0IsQ0FBQyxJQUFJLE9BQUosRUFBRCxDQUFoQjtBQUNELENBSEQ7QUFJQSxTQUFTLGNBQVQsQ0FBd0IsMkJBQXhCLEVBQXFELGdCQUFyRCxDQUFzRSxPQUF0RSxFQUE4RSxTQUE5RTtBQUNBLElBQUksb0JBQW9CLFNBQVMsZ0JBQVQsQ0FBMEIsMkJBQTFCLENBQXhCO0FBQ0EsS0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLGtCQUFrQixNQUF0QyxFQUE4QyxHQUE5QyxFQUFtRDtBQUNqRCxvQkFBa0IsQ0FBbEIsRUFBcUIsZ0JBQXJCLENBQXNDLE9BQXRDLEVBQThDLFVBQVMsQ0FBVCxFQUFXO0FBQ3ZELGtCQUFjLENBQWQ7QUFDRCxHQUZEO0FBR0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vID09PT09PT09PT09PT09PT0gdmFyaWFibGVzID09PT09PT09PT09PT09PT09PT09PT1cclxudmFyIG1hcFBhbmVsID0gT2JqZWN0LmNyZWF0ZShwYW5lbE1vZHVsZSk7XHJcbnZhciBzdXZlcnkgPSBPYmplY3QuY3JlYXRlKHN1cnZleU1vZHVsZSk7XHJcbnZhciBib3VuZHMgPSBbXHJcbiAgICBbXHRcdC04My4zNDM3LCBcdDQyLjIxMDJdLCAvLyBTb3V0aHdlc3QgY29vcmRpbmF0ZXNcclxuICAgIFtcdFx0LTgyLjg3NTQsIFx0NDIuNTE5N10gIC8vIE5vcnRoZWFzdCBjb29yZGluYXRlc1xyXG5dO1xyXG52YXIgYmFzZU1hcFN0eWxlcyA9IFtcclxuICAnY2oybTY4dmZ4MDAxczJyczBueWhlcnIyOScsXHJcbiAgJ2NqMm0xZjlrNDAwMTMycm1yMWpoanEyZ24nXHJcbl07XHJcbnZhciBwYXJjZWxEYXRhID0ge1xyXG4gICdyZW50YWwtc3RhdHVzJyAgICAgOiBudWxsLFxyXG4gICdwYXJjZWwtZGF0YScgICAgICAgOiBudWxsXHJcbn07XHJcbnZhciBjdXJyZW50VVJMUGFyYW1zID0ge1xyXG4gICd6b29tJyAgICAgICAgOiAwLFxyXG4gICdsbmcnICAgICAgICAgOiAwLFxyXG4gICdsYXQnICAgICAgICAgOiAwLFxyXG4gICdwYXJjZWwnICAgICAgOiAnJyxcclxuICAnZGlzdHJpY3QnICAgIDogJycsXHJcbiAgJ25laWdoYm9yaG9vZCc6ICcnXHJcbn07XHJcbm1hcGJveGdsLmFjY2Vzc1Rva2VuID0gJ3BrLmV5SjFJam9pYzJ4MWMyRnljMnRwWkdSbGRISnZhWFJ0YVNJc0ltRWlPaUpqYVhac05YbHdjWFF3WW5ZNU1ubHNZbWw0TlRKMk1ubzRJbjAuOHdLVW5sTVBJbHhxLWVXSDBkMTAtUSc7XHJcbnZhciBtYXAgPSBuZXcgbWFwYm94Z2wuTWFwKHtcclxuICBjb250YWluZXI6ICdtYXAnLCAvLyBjb250YWluZXIgaWRcclxuICBzdHlsZTogJ21hcGJveDovL3N0eWxlcy9zbHVzYXJza2lkZGV0cm9pdG1pLycgKyBiYXNlTWFwU3R5bGVzWzBdLCAvL3N0eWxlc2hlZXQgbG9jYXRpb25cclxuICBjZW50ZXI6IFstODMuMTUsIDQyLjM2XSwgLy8gc3RhcnRpbmcgcG9zaXRpb25cclxuICB6b29tOiAxMS41LCAvLyBzdGFydGluZyB6b29tXHJcbiAga2V5Ym9hcmQgOiB0cnVlXHJcbn0pO1xyXG4vLyA9PT09PT09PT09PT09PT09PT0gZnVuY3Rpb25zID09PT09PT09PT09PT09PT09PT09PVxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKXtcclxuICBjb25zb2xlLmxvZyhnZXRRdWVyeVZhcmlhYmxlKCd6b29tJykpO1xyXG4gIGNvbnNvbGUubG9nKGdldFF1ZXJ5VmFyaWFibGUoJ2xhdCcpKTtcclxuICBjb25zb2xlLmxvZyhnZXRRdWVyeVZhcmlhYmxlKCdsbmcnKSk7XHJcbiAgY29uc29sZS5sb2coZ2V0UXVlcnlWYXJpYWJsZSgncGFyY2VsJykpO1xyXG4gIGNvbnNvbGUubG9nKGdldFF1ZXJ5VmFyaWFibGUoJ25laWdoYm9yaG9vZCcpKTtcclxuICBjb25zb2xlLmxvZyhnZXRRdWVyeVZhcmlhYmxlKCdkaXN0cmljdCcpKTtcclxuICBpZihnZXRRdWVyeVZhcmlhYmxlKCd6b29tJykpe1xyXG4gICAgaWYgKGdldFF1ZXJ5VmFyaWFibGUoJ2xhdCcpKSB7XHJcbiAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgIGNhc2UgZ2V0UXVlcnlWYXJpYWJsZSgnZGlzdHJpY3QnKSAhPT0gZmFsc2U6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZCBkaXN0cmljdCBwYW5lbCcpO1xyXG4gICAgICAgICAgdXBkYXRlVVJMUGFyYW1zKFtnZXRRdWVyeVZhcmlhYmxlKCd6b29tJyksZ2V0UXVlcnlWYXJpYWJsZSgnbG5nJyksZ2V0UXVlcnlWYXJpYWJsZSgnbGF0JyksJycsZ2V0UXVlcnlWYXJpYWJsZSgnZGlzdHJpY3QnKV0pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coY3VycmVudFVSTFBhcmFtcyk7XHJcbiAgICAgICAgICBtYXBQYW5lbC5jcmVhdGVGZWF0dXJlRGF0YSgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBnZXRRdWVyeVZhcmlhYmxlKCduZWlnaGJvcmhvb2QnKSAhPT0gZmFsc2U6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZCBuZWlnaGJvcmhvb2QgcGFuZWwnKTtcclxuICAgICAgICAgIHVwZGF0ZVVSTFBhcmFtcyhbZ2V0UXVlcnlWYXJpYWJsZSgnem9vbScpLGdldFF1ZXJ5VmFyaWFibGUoJ2xuZycpLGdldFF1ZXJ5VmFyaWFibGUoJ2xhdCcpLCcnLCcnLGdldFF1ZXJ5VmFyaWFibGUoJ25laWdoYm9yaG9vZCcpXSk7XHJcbiAgICAgICAgICBtYXBQYW5lbC5jcmVhdGVGZWF0dXJlRGF0YSgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBnZXRRdWVyeVZhcmlhYmxlKCdwYXJjZWwnKSAhPT0gZmFsc2U6XHJcbiAgICAgICAgICB1cGRhdGVVUkxQYXJhbXMoW2dldFF1ZXJ5VmFyaWFibGUoJ3pvb20nKSxnZXRRdWVyeVZhcmlhYmxlKCdsbmcnKSxnZXRRdWVyeVZhcmlhYmxlKCdsYXQnKSxnZXRRdWVyeVZhcmlhYmxlKCdwYXJjZWwnKSwnJywnJ10pO1xyXG4gICAgICAgICAgbWFwUGFuZWwuY3JlYXRlRmVhdHVyZURhdGEoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBtYXBQYW5lbC5jcmVhdGVQYW5lbCgnY2l0eScpO1xyXG4gICAgICAgICAgbWFwLmZseVRvKHtcclxuICAgICAgICAgICAgICBjZW50ZXI6IFtnZXRRdWVyeVZhcmlhYmxlKCdsbmcnKSxnZXRRdWVyeVZhcmlhYmxlKCdsYXQnKV0sXHJcbiAgICAgICAgICAgICAgem9vbTogZ2V0UXVlcnlWYXJpYWJsZSgnem9vbScpLFxyXG4gICAgICAgICAgICAgIGJlYXJpbmc6IDAsXHJcbiAgICAgICAgICAgICAgLy8gVGhlc2Ugb3B0aW9ucyBjb250cm9sIHRoZSBmbGlnaHQgY3VydmUsIG1ha2luZyBpdCBtb3ZlXHJcbiAgICAgICAgICAgICAgLy8gc2xvd2x5IGFuZCB6b29tIG91dCBhbG1vc3QgY29tcGxldGVseSBiZWZvcmUgc3RhcnRpbmdcclxuICAgICAgICAgICAgICAvLyB0byBwYW4uXHJcbiAgICAgICAgICAgICAgc3BlZWQ6IDIsIC8vIG1ha2UgdGhlIGZseWluZyBzbG93XHJcbiAgICAgICAgICAgICAgY3VydmU6IDEsIC8vIGNoYW5nZSB0aGUgc3BlZWQgYXQgd2hpY2ggaXQgem9vbXMgb3V0XHJcbiAgICAgICAgICAgICAgLy8gVGhpcyBjYW4gYmUgYW55IGVhc2luZyBmdW5jdGlvbjogaXQgdGFrZXMgYSBudW1iZXIgYmV0d2VlblxyXG4gICAgICAgICAgICAgIC8vIDAgYW5kIDEgYW5kIHJldHVybnMgYW5vdGhlciBudW1iZXIgYmV0d2VlbiAwIGFuZCAxLlxyXG4gICAgICAgICAgICAgIGVhc2luZzogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1lbHNle1xyXG4gICAgICBtYXAuZmx5VG8oe1xyXG4gICAgICAgICAgY2VudGVyOiBbLTgzLjE1LCA0Mi4zNl0sXHJcbiAgICAgICAgICB6b29tOiBnZXRRdWVyeVZhcmlhYmxlKCd6b29tJyksXHJcbiAgICAgICAgICBiZWFyaW5nOiAwLFxyXG4gICAgICAgICAgLy8gVGhlc2Ugb3B0aW9ucyBjb250cm9sIHRoZSBmbGlnaHQgY3VydmUsIG1ha2luZyBpdCBtb3ZlXHJcbiAgICAgICAgICAvLyBzbG93bHkgYW5kIHpvb20gb3V0IGFsbW9zdCBjb21wbGV0ZWx5IGJlZm9yZSBzdGFydGluZ1xyXG4gICAgICAgICAgLy8gdG8gcGFuLlxyXG4gICAgICAgICAgc3BlZWQ6IDIsIC8vIG1ha2UgdGhlIGZseWluZyBzbG93XHJcbiAgICAgICAgICBjdXJ2ZTogMSwgLy8gY2hhbmdlIHRoZSBzcGVlZCBhdCB3aGljaCBpdCB6b29tcyBvdXRcclxuICAgICAgICAgIC8vIFRoaXMgY2FuIGJlIGFueSBlYXNpbmcgZnVuY3Rpb246IGl0IHRha2VzIGEgbnVtYmVyIGJldHdlZW5cclxuICAgICAgICAgIC8vIDAgYW5kIDEgYW5kIHJldHVybnMgYW5vdGhlciBudW1iZXIgYmV0d2VlbiAwIGFuZCAxLlxyXG4gICAgICAgICAgZWFzaW5nOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdXBkYXRlVVJMUGFyYW1zKFtnZXRRdWVyeVZhcmlhYmxlKCd6b29tJyksLTgzLjE1LCA0Mi4zNl0pO1xyXG4gICAgICBpZihnZXRRdWVyeVZhcmlhYmxlKCdwYXJjZWwnKSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3RoZXJlIGlzIHBhcmNlbCcpO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBjb25zb2xlLmxvZygnbm8gcGFyY2VsJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9ZWxzZXtcclxuICAgIGlmIChnZXRRdWVyeVZhcmlhYmxlKCdsYXQnKSkge1xyXG4gICAgICBtYXAuZmx5VG8oe1xyXG4gICAgICAgICAgY2VudGVyOiBbZ2V0UXVlcnlWYXJpYWJsZSgnbG5nJyksZ2V0UXVlcnlWYXJpYWJsZSgnbGF0JyldLFxyXG4gICAgICAgICAgem9vbTogMTEuNSxcclxuICAgICAgICAgIGJlYXJpbmc6IDAsXHJcbiAgICAgICAgICAvLyBUaGVzZSBvcHRpb25zIGNvbnRyb2wgdGhlIGZsaWdodCBjdXJ2ZSwgbWFraW5nIGl0IG1vdmVcclxuICAgICAgICAgIC8vIHNsb3dseSBhbmQgem9vbSBvdXQgYWxtb3N0IGNvbXBsZXRlbHkgYmVmb3JlIHN0YXJ0aW5nXHJcbiAgICAgICAgICAvLyB0byBwYW4uXHJcbiAgICAgICAgICBzcGVlZDogMiwgLy8gbWFrZSB0aGUgZmx5aW5nIHNsb3dcclxuICAgICAgICAgIGN1cnZlOiAxLCAvLyBjaGFuZ2UgdGhlIHNwZWVkIGF0IHdoaWNoIGl0IHpvb21zIG91dFxyXG4gICAgICAgICAgLy8gVGhpcyBjYW4gYmUgYW55IGVhc2luZyBmdW5jdGlvbjogaXQgdGFrZXMgYSBudW1iZXIgYmV0d2VlblxyXG4gICAgICAgICAgLy8gMCBhbmQgMSBhbmQgcmV0dXJucyBhbm90aGVyIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEuXHJcbiAgICAgICAgICBlYXNpbmc6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB1cGRhdGVVUkxQYXJhbXMoWzExLjUsZ2V0UXVlcnlWYXJpYWJsZSgnbGF0JyksZ2V0UXVlcnlWYXJpYWJsZSgnbG5nJyldKTtcclxuICAgICAgaWYoZ2V0UXVlcnlWYXJpYWJsZSgncGFyY2VsJykpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGVyZSBpcyBwYXJjZWwnKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25vIHBhcmNlbCcpO1xyXG4gICAgICAgIGlmKGdldFF1ZXJ5VmFyaWFibGUoJ2Rpc3RyaWN0Jykpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3RoZXJlIGlzIGRpc3RyaWN0Jyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm8gZGlzdHJpY3QnKTtcclxuICAgICAgICAgIGlmKGdldFF1ZXJ5VmFyaWFibGUoJ25laWdoYm9yaG9vZCcpKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZXJlIGlzIG5laWdoYm9yaG9vZCcpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBuZWlnaGJvcmhvb2QgLSBsb2FkaW5nIGNpdHknKTtcclxuICAgICAgICAgICAgbWFwUGFuZWwuY3JlYXRlUGFuZWwoJ2NpdHknKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1lbHNle1xyXG4gICAgICBtYXBQYW5lbC5jcmVhdGVQYW5lbCgnY2l0eScpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxudmFyIGdldFF1ZXJ5VmFyaWFibGUgPSBmdW5jdGlvbiBnZXRRdWVyeVZhcmlhYmxlKHZhcmlhYmxlKXtcclxuICAgdmFyIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcbiAgIHZhciB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xyXG4gICBmb3IgKHZhciBpPTA7aTx2YXJzLmxlbmd0aDtpKyspIHtcclxuICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoXCI9XCIpO1xyXG4gICAgIGlmKHBhaXJbMF0gPT0gdmFyaWFibGUpe1xyXG4gICAgICAgaWYocGFpclsxXSAhPT0gJycpe1xyXG4gICAgICAgIHJldHVybiBwYWlyWzFdO1xyXG4gICAgICAgfVxyXG4gICAgIH1cclxuICAgfVxyXG4gICByZXR1cm4oZmFsc2UpO1xyXG59O1xyXG52YXIgdXBkYXRlVVJMUGFyYW1zID0gZnVuY3Rpb24gdXBkYXRlVVJMUGFyYW1zKHBhcmFtcyl7XHJcbiAgY29uc29sZS5sb2cocGFyYW1zKTtcclxuICBjb25zb2xlLmxvZyhwYXJhbXMubGVuZ3RoKTtcclxuICBzd2l0Y2ggKHRydWUpIHtcclxuICAgIGNhc2UgcGFyYW1zLmxlbmd0aCA9PT0gMTpcclxuICAgICAgY3VycmVudFVSTFBhcmFtcy56b29tID0gcGFyYW1zWzBdO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgcGFyYW1zLmxlbmd0aCA9PT0gMjpcclxuICAgICAgY3VycmVudFVSTFBhcmFtcy5sbmcgPSBwYXJhbXNbMF07XHJcbiAgICAgIGN1cnJlbnRVUkxQYXJhbXMubGF0ID0gcGFyYW1zWzFdO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgcGFyYW1zLmxlbmd0aCA9PT0gMzpcclxuICAgICAgY3VycmVudFVSTFBhcmFtcy56b29tID0gcGFyYW1zWzBdO1xyXG4gICAgICBjdXJyZW50VVJMUGFyYW1zLmxuZyA9IHBhcmFtc1sxXTtcclxuICAgICAgY3VycmVudFVSTFBhcmFtcy5sYXQgPSBwYXJhbXNbMl07XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBwYXJhbXMubGVuZ3RoID09PSA0OlxyXG4gICAgICBjdXJyZW50VVJMUGFyYW1zLmxuZyA9IHBhcmFtc1sxXTtcclxuICAgICAgY3VycmVudFVSTFBhcmFtcy5sYXQgPSBwYXJhbXNbMl07XHJcbiAgICAgIGN1cnJlbnRVUkxQYXJhbXMucGFyY2VsID0gcGFyYW1zWzNdO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgcGFyYW1zLmxlbmd0aCA9PT0gNTpcclxuICAgICAgY3VycmVudFVSTFBhcmFtcy56b29tID0gcGFyYW1zWzBdO1xyXG4gICAgICBjdXJyZW50VVJMUGFyYW1zLmxuZyA9IHBhcmFtc1sxXTtcclxuICAgICAgY3VycmVudFVSTFBhcmFtcy5sYXQgPSBwYXJhbXNbMl07XHJcbiAgICAgIGN1cnJlbnRVUkxQYXJhbXMuZGlzdHJpY3QgPSBwYXJhbXNbNF07XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgY3VycmVudFVSTFBhcmFtcy56b29tID0gcGFyYW1zWzBdO1xyXG4gICAgICBjdXJyZW50VVJMUGFyYW1zLmxuZyA9IHBhcmFtc1sxXTtcclxuICAgICAgY3VycmVudFVSTFBhcmFtcy5sYXQgPSBwYXJhbXNbMl07XHJcbiAgICAgIGN1cnJlbnRVUkxQYXJhbXMucGFyY2VsID0gcGFyYW1zWzNdO1xyXG4gICAgICBjdXJyZW50VVJMUGFyYW1zLmRpc3RyaWN0ID0gcGFyYW1zWzRdO1xyXG4gICAgICBjdXJyZW50VVJMUGFyYW1zLm5laWdoYm9yaG9vZCA9IHBhcmFtc1s1XTtcclxuICB9XHJcbiAgY29uc29sZS5sb2coY3VycmVudFVSTFBhcmFtcyk7XHJcbiAgdmFyIG5ld1RlbXBVUkwgPSAnJztcclxuICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBjdXJyZW50VVJMUGFyYW1zKSB7XHJcbiAgICAgIGlmIChjdXJyZW50VVJMUGFyYW1zLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocHJvcGVydHkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coY3VycmVudFVSTFBhcmFtc1twcm9wZXJ0eV0pO1xyXG4gICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgcHJvcGVydHkgIT09IDA6XHJcbiAgICAgICAgICAgICAgbmV3VGVtcFVSTCArPSBwcm9wZXJ0eSArICc9JyArIGN1cnJlbnRVUkxQYXJhbXNbcHJvcGVydHldICsgJyYnXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKG5ld1RlbXBVUkwpO1xyXG4gIGlmIChoaXN0b3J5LnB1c2hTdGF0ZSkge1xyXG4gICAgICB2YXIgbmV3dXJsID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyAnPycgKyBuZXdUZW1wVVJMO1xyXG4gICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe3BhdGg6bmV3dXJsfSwnJyxuZXd1cmwpO1xyXG4gIH1cclxufTtcclxudmFyIHN0YXJ0R2VvY29kZXJSZXN1bHRzID0gZnVuY3Rpb24gc3RhcnRHZW9jb2RlclJlc3VsdHMoZXYpe1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVyYWxsLW51bWJlcicpLmlubmVySFRNTCA9ICcnO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJjZWwtaW5mbycpLmlubmVySFRNTCA9ICcnO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLWNvbnRhaW5lciA+IC5ub3QtcmVudGFsJykuaW5uZXJIVE1MID0gJyc7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tY29udGFpbmVyID4gLnJlbnRhbCcpLmlubmVySFRNTCA9ICcnO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLWNvbnRhaW5lciA+IC50b3RhbC1yZW50YWxzJykuaW5uZXJIVE1MID0gJyc7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcmNlbC1kYXRhLm93bmVyJykuaW5uZXJIVE1MID0gJyc7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcmNlbC1kYXRhLmJ1aWxkaW5nJykuaW5uZXJIVE1MID0gJyc7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcmNlbC1pbmZvLmRpc3BsYXktc2VjdGlvbicpLmlubmVySFRNTCA9ICcnO1xyXG4gIC8vIGNvbnNvbGUubG9nKGV2LnJlc3VsdC5nZW9tZXRyeSk7XHJcbiAgbWFwLmZseVRvKHtcclxuICAgICAgY2VudGVyOiBbZXYucmVzdWx0Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLCBldi5yZXN1bHQuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV1dLFxyXG4gICAgICB6b29tOiAxNixcclxuICAgICAgYmVhcmluZzogMCxcclxuXHJcbiAgICAgIC8vIFRoZXNlIG9wdGlvbnMgY29udHJvbCB0aGUgZmxpZ2h0IGN1cnZlLCBtYWtpbmcgaXQgbW92ZVxyXG4gICAgICAvLyBzbG93bHkgYW5kIHpvb20gb3V0IGFsbW9zdCBjb21wbGV0ZWx5IGJlZm9yZSBzdGFydGluZ1xyXG4gICAgICAvLyB0byBwYW4uXHJcbiAgICAgIHNwZWVkOiAyLCAvLyBtYWtlIHRoZSBmbHlpbmcgc2xvd1xyXG4gICAgICBjdXJ2ZTogMSwgLy8gY2hhbmdlIHRoZSBzcGVlZCBhdCB3aGljaCBpdCB6b29tcyBvdXRcclxuXHJcbiAgICAgIC8vIFRoaXMgY2FuIGJlIGFueSBlYXNpbmcgZnVuY3Rpb246IGl0IHRha2VzIGEgbnVtYmVyIGJldHdlZW5cclxuICAgICAgLy8gMCBhbmQgMSBhbmQgcmV0dXJucyBhbm90aGVyIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEuXHJcbiAgICAgIGVhc2luZzogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICB9XHJcbiAgfSk7XHJcbiAgdXBkYXRlVVJMUGFyYW1zKFtldi5yZXN1bHQuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0sZXYucmVzdWx0Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdXSk7XHJcbiAgdmFyIHRlbXBJbnB1dExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWFwYm94Z2wtY3RybC1nZW9jb2Rlci5tYXBib3hnbC1jdHJsID4gaW5wdXQnKTtcclxuICB2YXIgdGVtcEFkZHIgPSAnJztcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBJbnB1dExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmICh0ZW1wSW5wdXRMaXN0W2ldLnZhbHVlLnNwbGl0KCcsJylbMF0gIT09ICcnKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRlbXBJbnB1dExpc3RbaV0udmFsdWUuc3BsaXQoJywnKVswXSk7XHJcbiAgICAgIHRlbXBBZGRyID0gdGVtcElucHV0TGlzdFtpXS52YWx1ZS5zcGxpdCgnLCcpWzBdO1xyXG4gICAgICB0ZW1wQWRkciA9IHRlbXBBZGRyLnNwbGl0KCcgJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcIkVtcHR5IGlucHV0XCIpO1xyXG4gICAgfVxyXG4gIH1cclxuICB2YXIgbmV3VGVtcEFkZHIgPSAnJztcclxuICB2YXIgc2l6ZSA9IHRlbXBBZGRyLmxlbmd0aDtcclxuICB0ZW1wQWRkci5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XHJcbiAgICBuZXdUZW1wQWRkciArPSBpdGVtO1xyXG4gICAgKChpbmRleCA8IHNpemUpICYmIChpbmRleCArIDEpICE9PSBzaXplKSA/IG5ld1RlbXBBZGRyICs9ICcrJzogMDtcclxuICB9KTtcclxuICAvLyBjb25zb2xlLmxvZyhuZXdUZW1wQWRkcik7XHJcbiAgLy89PT09PT09PT09PT09PT09IGdldCBwYXJjZWwgZGF0YSA9PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICQuZ2V0SlNPTignaHR0cDovL2dpcy5kZXRyb2l0bWkuZ292L2FyY2dpcy9yZXN0L3NlcnZpY2VzL0RvSVQvQ29tcG9zaXRlR2VvY29kZXIvR2VvY29kZVNlcnZlci9maW5kQWRkcmVzc0NhbmRpZGF0ZXM/U3RyZWV0PSZDaXR5PSZaSVA9JlNpbmdsZUxpbmU9JysgbmV3VGVtcEFkZHIgKycmY2F0ZWdvcnk9Jm91dEZpZWxkcz1Vc2VyX2ZsZCZtYXhMb2NhdGlvbnM9Jm91dFNSPSZzZWFyY2hFeHRlbnQ9JmxvY2F0aW9uPSZkaXN0YW5jZT0mbWFnaWNLZXk9JmY9cGpzb24nICwgZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKGRhdGEuY2FuZGlkYXRlc1swXS5hdHRyaWJ1dGVzLlVzZXJfZmxkKTtcclxuICAgIG1hcC5zZXRGaWx0ZXIoXCJwYXJjZWwtZmlsbC1ob3ZlclwiLCBbXCI9PVwiLCBcInBhcmNlbG5vXCIsIGRhdGEuY2FuZGlkYXRlc1swXS5hdHRyaWJ1dGVzLlVzZXJfZmxkXSk7XHJcbiAgICAkLmdldEpTT04oXCJodHRwczovL3NlcnZpY2VzMi5hcmNnaXMuY29tL3F2a2JlYW03V2lycHM2ekMvQXJjR0lTL3Jlc3Qvc2VydmljZXMvUmVudGFsX0luc3BlY3Rpb25zL0ZlYXR1cmVTZXJ2ZXIvMC9xdWVyeT93aGVyZT1cIisgZW5jb2RlVVJJKCdQYXJjZWxObz1cXCcnK2RhdGEuY2FuZGlkYXRlc1swXS5hdHRyaWJ1dGVzLlVzZXJfZmxkKydcXCcnKStcIiZvYmplY3RJZHM9JnRpbWU9Jmdlb21ldHJ5PSZnZW9tZXRyeVR5cGU9ZXNyaUdlb21ldHJ5RW52ZWxvcGUmaW5TUj0mc3BhdGlhbFJlbD1lc3JpU3BhdGlhbFJlbEludGVyc2VjdHMmcmVzdWx0VHlwZT1ub25lJmRpc3RhbmNlPTAuMCZ1bml0cz1lc3JpU1JVbml0X01ldGVyJnJldHVybkdlb2RldGljPWZhbHNlJm91dEZpZWxkcz1BQ1RJT05fREVTQ1JJUFRJT04lMkMrUGFyY2VsTm8lMkMrQ1NNX1JFQ0RfREFURSZyZXR1cm5HZW9tZXRyeT10cnVlJm11bHRpcGF0Y2hPcHRpb249eHlGb290cHJpbnQmbWF4QWxsb3dhYmxlT2Zmc2V0PSZnZW9tZXRyeVByZWNpc2lvbj0mb3V0U1I9JnJldHVybklkc09ubHk9ZmFsc2UmcmV0dXJuQ291bnRPbmx5PWZhbHNlJnJldHVybkV4dGVudE9ubHk9ZmFsc2UmcmV0dXJuRGlzdGluY3RWYWx1ZXM9ZmFsc2Umb3JkZXJCeUZpZWxkcz0mZ3JvdXBCeUZpZWxkc0ZvclN0YXRpc3RpY3M9Jm91dFN0YXRpc3RpY3M9JnJlc3VsdE9mZnNldD0mcmVzdWx0UmVjb3JkQ291bnQ9JnJldHVyblo9ZmFsc2UmcmV0dXJuTT1mYWxzZSZxdWFudGl6YXRpb25QYXJhbWV0ZXJzPSZzcWxGb3JtYXQ9bm9uZSZmPXBqc29uJnRva2VuPVwiLCBmdW5jdGlvbiggUmVudGFsX0luc3BlY3Rpb25zICkge1xyXG4gICAgICBjb25zb2xlLmxvZyhSZW50YWxfSW5zcGVjdGlvbnMpO1xyXG4gICAgICB2YXIgdGVtcFBhcmNlbERhdGFIVE1MID0gJyc7XHJcbiAgICAgIGlmKFJlbnRhbF9JbnNwZWN0aW9ucy5mZWF0dXJlcy5sZW5ndGgpe1xyXG4gICAgICAgIHRlbXBQYXJjZWxEYXRhSFRNTCArPSAnPGFydGljbGUgY2xhc3M9XCJpbmZvLWl0ZW1zXCI+PHNwYW4+UkVOVEFMIFNUQVRVUzwvc3Bhbj4gJztcclxuICAgICAgICBzd2l0Y2ggKFJlbnRhbF9JbnNwZWN0aW9ucy5mZWF0dXJlc1swXS5hdHRyaWJ1dGVzLkFDVElPTl9ERVNDUklQVElPTikge1xyXG4gICAgICAgICAgY2FzZSAnSXNzdWUgSW5pdGlhbCBSZWdpc3RyYXRpb24gJzpcclxuICAgICAgICAgICAgdGVtcFBhcmNlbERhdGFIVE1MICs9ICc8aW5pdGlhbD48c3Ryb25nPkNlcnRpZmljYXRlIG9mIFJlZ2lzdHJhdGlvbjwvc3Ryb25nPjwvaW5pdGlhbD48L2FydGljbGU+JztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdJc3N1ZSBSZW5ld2FsIFJlZ2lzdHJhdGlvbic6XHJcbiAgICAgICAgICAgIHRlbXBQYXJjZWxEYXRhSFRNTCArPSAnPGluaXRpYWw+PHN0cm9uZz5DZXJ0aWZpY2F0ZSBvZiBSZWdpc3RyYXRpb248L3N0cm9uZz48L2luaXRpYWw+PC9hcnRpY2xlPic7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGVtcFBhcmNlbERhdGFIVE1MICs9ICc8Y29mYz48c3Ryb25nPkNlcnRpZmljYXRlIG9mIENvbXBsaWFuY2U8L3N0cm9uZz48L2NvZmM+PC9hcnRpY2xlPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJjZWwtaW5mby5yZW50YWwtaW5mbycpLmlubmVySFRNTCA9IHRlbXBQYXJjZWxEYXRhSFRNTDtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1jb250YWluZXIgPiAucmVudGFsJykuaW5uZXJIVE1MID0gJzxhIGhyZWY9XCJodHRwczovL2FwcC5zbWFydHNoZWV0LmNvbS9iL2Zvcm0/RVFCQ1Q9OTFjMGQ1NWU0NzA2NDM3MzgzNWNlMTk4ODAyNzY0ZTJcIiB0YXJnZXQ9XCJfYmxhbmtcIj48YXJ0aWNsZSBjbGFzcz1cImZvcm0tYnRuXCI+U1VCTUlUIEEgUkVOVEVSXFwnUyBDT01QTEFJTlQ8L2FydGljbGU+PC9hPic7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tY29udGFpbmVyID4gLm5vdC1yZW50YWwnKS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBwYXJjZWxEYXRhWydyZW50YWwtc3RhdHVzJ10gPSBSZW50YWxfSW5zcGVjdGlvbnMuZmVhdHVyZXNbMF0uYXR0cmlidXRlcy5BQ1RJT05fREVTQ1JJUFRJT047XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJjZWwtaW5mby5yZW50YWwtaW5mbycpLmlubmVySFRNTCA9ICc8YXJ0aWNsZSBjbGFzcz1cImluZm8taXRlbXNcIj48c3Bhbj5SRU5UQUwgU1RBVFVTPC9zcGFuPiBOb3QgYSBSZW50YWw8L2FydGljbGU+JztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1jb250YWluZXIgPiAubm90LXJlbnRhbCcpLmlubmVySFRNTCA9ICc8YSBocmVmPVwiaHR0cHM6Ly9hcHAuc21hcnRzaGVldC5jb20vYi9mb3JtP0VRQkNUPTdiMzc0NmJkMjBhMDQ4YTU5MTlhZTA3YmQ5ZWQ4OWRlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGFydGljbGUgY2xhc3M9XCJmb3JtLWJ0blwiPlJFR0lTVEVSIE1ZIFJFTlRBTDwvYXJ0aWNsZT48L2E+JztcclxuICAgICAgICBwYXJjZWxEYXRhWydyZW50YWwtc3RhdHVzJ10gPSAnTm90IGEgUmVudGFsJztcclxuICAgICAgfVxyXG4gICAgICAkLmdldEpTT04oXCJodHRwOi8vYXBpcy5kZXRyb2l0bWkuZ292L2Fzc2Vzc21lbnRzL3BhcmNlbC9cIitkYXRhLmNhbmRpZGF0ZXNbMF0uYXR0cmlidXRlcy5Vc2VyX2ZsZC5yZXBsYWNlKC9cXC4vZywnXycpK1wiL1wiLCBmdW5jdGlvbiggcGFyY2VsICkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocGFyY2VsKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1jb250YWluZXIgPiAuc3RyZWV0LW5hbWUnKS5pbm5lckhUTUwgPSBwYXJjZWwucHJvcHN0cmVldGNvbWJpbmVkO1xyXG4gICAgICAgIC8vIHBhcmNlbERhdGFbJ293bmVyLWRpc3BsYXknXSArPSAnPGFydGljbGUgY2xhc3M9XCJpbmZvLWl0ZW1zXCI+PHNwYW4+T1dORVI8L3NwYW4+ICcgKyBwYXJjZWwub3duZXJuYW1lMSArICc8L2FydGljbGU+JztcclxuICAgICAgICAvLyBwYXJjZWxEYXRhWydidWlsZGluZy1kaXNwbGF5J10gKz0gJzxhcnRpY2xlIGNsYXNzPVwiaW5mby1pdGVtc1wiPjxzcGFuPkJVSUxESU5HIFRZUEU8L3NwYW4+ICcgKyBwYXJjZWwucmVzYl9zdHlsZSArICc8L2FydGljbGU+JztcclxuICAgICAgICAvLyBwYXJjZWxEYXRhWydidWlsZGluZy1kaXNwbGF5J10gKz0gJzxhcnRpY2xlIGNsYXNzPVwiaW5mby1pdGVtc1wiPjxzcGFuPlBBUkNFTCBOVU1CRVI8L3NwYW4+ICcgKyBwYXJjZWwucG51bSArICc8L2FydGljbGU+JztcclxuICAgICAgICAvLyBwYXJjZWxEYXRhWydidWlsZGluZy1kaXNwbGF5J10gKz0gJzxhcnRpY2xlIGNsYXNzPVwiaW5mby1pdGVtc1wiPjxzcGFuPllFQVIgQlVJTFQ8L3NwYW4+ICcgKyBwYXJjZWwucmVzYl95ZWFyYnVpbHQgKyAnPC9hcnRpY2xlPic7XHJcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcmNlbC1pbmZvJykuaW5uZXJIVE1MID0gdGVtcFBhcmNlbERhdGFIVE1MO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJjZWwtZGF0YS5vd25lcicpLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZGF0YS12aWV3LWJ0blwiIGRhdGEtdmlldz1cIm93bmVyXCIgb25jbGljaz1cInN3aXRjaFBhcmNlbERhdGFWaWV3cyh0aGlzKVwiPk9XTkVSIElORk9STUFUSU9OIDxzcGFuPiYjMTAwOTU7PC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcmNlbC1kYXRhLmJ1aWxkaW5nJykuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJkYXRhLXZpZXctYnRuXCIgZGF0YS12aWV3PVwiYnVpbGRpbmdcIiBvbmNsaWNrPVwic3dpdGNoUGFyY2VsRGF0YVZpZXdzKHRoaXMpXCI+UFJPUEVSVFkgSU5GT1JNQVRJT04gPHNwYW4+JiMxMDA5NTs8L3NwYW4+PC9kaXY+JztcclxuICAgICAgICBwYXJjZWxEYXRhWydwYXJjZWwtZGF0YSddID0gcGFyY2VsO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGFsbEdlb2NvZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYXBib3hnbC1jdHJsLWdlb2NvZGVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbiAgICBmb3IgKHZhciB0ID0gMDsgdCA8IGFsbEdlb2NvZGVycy5sZW5ndGg7IHQrKykge1xyXG4gICAgICBhbGxHZW9jb2RlcnNbdF0udmFsdWUgPSBcIlwiO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5mbycpLmNsYXNzTmFtZSA9PT0gJ2FjdGl2ZScpID8gMCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbmZvJykuY2xhc3NOYW1lID0gJ2FjdGl2ZSc7XHJcbn07XHJcbnZhciB0b2dnbGVCYXNlTWFwID0gZnVuY3Rpb24gdG9nZ2xlQmFzZU1hcChlKSB7XHJcbiAgLy9jb25zb2xlLmxvZyhlKTtcclxuICBpZihlLnRhcmdldC5jbGFzc05hbWUgIT09ICcnKXtcclxuICAgIC8vY29uc29sZS5sb2coZS50YXJnZXQuY2xhc3NOYW1lKTtcclxuICAgIChlLnRhcmdldC5jbGFzc05hbWUgPT09ICdtYXAtdmlldycpPyBtYXAuc2V0U3R5bGUoJ21hcGJveDovL3N0eWxlcy9zbHVzYXJza2lkZGV0cm9pdG1pLycgKyBiYXNlTWFwU3R5bGVzWzBdKSA6IG1hcC5zZXRTdHlsZSgnbWFwYm94Oi8vc3R5bGVzL3NsdXNhcnNraWRkZXRyb2l0bWkvJyArIGJhc2VNYXBTdHlsZXNbMV0pO1xyXG4gIH1lbHNle1xyXG4gICAgLy9jb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnRFbGVtZW50KTtcclxuICAgIChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZSA9PT0gJ21hcC12aWV3Jyk/IG1hcC5zZXRTdHlsZSgnbWFwYm94Oi8vc3R5bGVzL3NsdXNhcnNraWRkZXRyb2l0bWkvJyArIGJhc2VNYXBTdHlsZXNbMF0pIDogbWFwLnNldFN0eWxlKCdtYXBib3g6Ly9zdHlsZXMvc2x1c2Fyc2tpZGRldHJvaXRtaS8nICsgYmFzZU1hcFN0eWxlc1sxXSk7XHJcbiAgfVxyXG59O1xyXG52YXIgY2xvc2VJbmZvID0gZnVuY3Rpb24gY2xvc2VJbmZvKCkge1xyXG4gIC8vY29uc29sZS5sb2coJ2Nsb3NpbmcnKTtcclxuICAvLyAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luZm8nKS5jbGFzc05hbWUgPT09ICdhY3RpdmUnKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbmZvJykuY2xhc3NOYW1lID0gJycgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5mbycpLmNsYXNzTmFtZSA9ICdhY3RpdmUnO1xyXG4gIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1jb250YWluZXIgPiAuc3RyZWV0LW5hbWUnKS5pbm5lckhUTUwgPT09ICdDSVRZIE9GIERFVFJPSVQnKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbmZvJykuY2xhc3NOYW1lID0gJycgOiBtYXBQYW5lbC5jcmVhdGVQYW5lbCgnY2l0eScpO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXBib3hnbC1jdHJsLWdlb2NvZGVyID4gaW5wdXRbdHlwZT1cInRleHRcIl0nKS52YWx1ZSA9ICcnO1xyXG4gIC8vY29uc29sZS5sb2coJ2dvaW5nIGJhY2sgdG8gY2l0eSB2aWV3Jyk7XHJcbiAgbWFwLmZseVRvKHtcclxuICAgICAgY2VudGVyOiBbLTgzLjE1LCA0Mi4zNl0sIC8vIHN0YXJ0aW5nIHBvc2l0aW9uXHJcbiAgICAgIHpvb206IDExLjUsXHJcbiAgICAgIGJlYXJpbmc6IDAsXHJcblxyXG4gICAgICAvLyBUaGVzZSBvcHRpb25zIGNvbnRyb2wgdGhlIGZsaWdodCBjdXJ2ZSwgbWFraW5nIGl0IG1vdmVcclxuICAgICAgLy8gc2xvd2x5IGFuZCB6b29tIG91dCBhbG1vc3QgY29tcGxldGVseSBiZWZvcmUgc3RhcnRpbmdcclxuICAgICAgLy8gdG8gcGFuLlxyXG4gICAgICBzcGVlZDogMiwgLy8gbWFrZSB0aGUgZmx5aW5nIHNsb3dcclxuICAgICAgY3VydmU6IDEsIC8vIGNoYW5nZSB0aGUgc3BlZWQgYXQgd2hpY2ggaXQgem9vbXMgb3V0XHJcblxyXG4gICAgICAvLyBUaGlzIGNhbiBiZSBhbnkgZWFzaW5nIGZ1bmN0aW9uOiBpdCB0YWtlcyBhIG51bWJlciBiZXR3ZWVuXHJcbiAgICAgIC8vIDAgYW5kIDEgYW5kIHJldHVybnMgYW5vdGhlciBudW1iZXIgYmV0d2VlbiAwIGFuZCAxLlxyXG4gICAgICBlYXNpbmc6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgfVxyXG4gIH0pO1xyXG4gIHVwZGF0ZVVSTFBhcmFtcyhbJycsLTgzLjE1LDQyLjM2LCcnLCcnLCcnXSk7XHJcbn07XHJcbnZhciBhZGREYXRhTGF5ZXJzID0gZnVuY3Rpb24gYWRkRGF0YUxheWVycygpe1xyXG4gIG1hcC5hZGRTb3VyY2UoJ3BhcmNlbHMnLCB7XHJcbiAgICB0eXBlOiAndmVjdG9yJyxcclxuICAgIHVybDogJ21hcGJveDovL3NsdXNhcnNraWRkZXRyb2l0bWkuY3dvYmRqbjAnXHJcbiAgfSk7XHJcbiAgbWFwLmFkZFNvdXJjZSgnY291bmNpbHMnLCB7XHJcbiAgICB0eXBlOiAnZ2VvanNvbicsXHJcbiAgICBkYXRhOiBcImh0dHBzOi8vZ2lzLmRldHJvaXRtaS5nb3YvYXJjZ2lzL3Jlc3Qvc2VydmljZXMvTmVpZ2hib3Job29kc0FwcC9jb3VuY2lsX2Rpc3RyaWN0L01hcFNlcnZlci8xL3F1ZXJ5P3doZXJlPTElM0QxJnRleHQ9Jm9iamVjdElkcz0mdGltZT0mZ2VvbWV0cnk9Jmdlb21ldHJ5VHlwZT1lc3JpR2VvbWV0cnlFbnZlbG9wZSZpblNSPSZzcGF0aWFsUmVsPWVzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cyZyZWxhdGlvblBhcmFtPSZvdXRGaWVsZHM9KiZyZXR1cm5HZW9tZXRyeT10cnVlJnJldHVyblRydWVDdXJ2ZXM9ZmFsc2UmbWF4QWxsb3dhYmxlT2Zmc2V0PSZnZW9tZXRyeVByZWNpc2lvbj0mb3V0U1I9NDMyNiZyZXR1cm5JZHNPbmx5PWZhbHNlJnJldHVybkNvdW50T25seT1mYWxzZSZvcmRlckJ5RmllbGRzPSZncm91cEJ5RmllbGRzRm9yU3RhdGlzdGljcz0mb3V0U3RhdGlzdGljcz0mcmV0dXJuWj1mYWxzZSZyZXR1cm5NPWZhbHNlJmdkYlZlcnNpb249JnJldHVybkRpc3RpbmN0VmFsdWVzPWZhbHNlJnJlc3VsdE9mZnNldD0mcmVzdWx0UmVjb3JkQ291bnQ9JmY9Z2VvanNvblwiXHJcbiAgfSk7XHJcbiAgbWFwLmFkZFNvdXJjZSgnY291bmNpbHNfbGFiZWxzJywge1xyXG4gICAgdHlwZTogJ2dlb2pzb24nLFxyXG4gICAgZGF0YTogXCJodHRwczovL2dpcy5kZXRyb2l0bWkuZ292L2FyY2dpcy9yZXN0L3NlcnZpY2VzL05laWdoYm9yaG9vZHNBcHAvY291bmNpbF9kaXN0cmljdC9NYXBTZXJ2ZXIvMS9xdWVyeT93aGVyZT0xJTNEMSZ0ZXh0PSZvYmplY3RJZHM9JnRpbWU9Jmdlb21ldHJ5PSZnZW9tZXRyeVR5cGU9ZXNyaUdlb21ldHJ5RW52ZWxvcGUmaW5TUj0mc3BhdGlhbFJlbD1lc3JpU3BhdGlhbFJlbEludGVyc2VjdHMmcmVsYXRpb25QYXJhbT0mb3V0RmllbGRzPSomcmV0dXJuR2VvbWV0cnk9dHJ1ZSZyZXR1cm5UcnVlQ3VydmVzPWZhbHNlJm1heEFsbG93YWJsZU9mZnNldD0mZ2VvbWV0cnlQcmVjaXNpb249Jm91dFNSPTQzMjYmcmV0dXJuSWRzT25seT1mYWxzZSZyZXR1cm5Db3VudE9ubHk9ZmFsc2Umb3JkZXJCeUZpZWxkcz0mZ3JvdXBCeUZpZWxkc0ZvclN0YXRpc3RpY3M9Jm91dFN0YXRpc3RpY3M9JnJldHVyblo9ZmFsc2UmcmV0dXJuTT1mYWxzZSZnZGJWZXJzaW9uPSZyZXR1cm5EaXN0aW5jdFZhbHVlcz1mYWxzZSZyZXN1bHRPZmZzZXQ9JnJlc3VsdFJlY29yZENvdW50PSZmPWdlb2pzb25cIlxyXG4gIH0pO1xyXG4gIG1hcC5hZGRTb3VyY2UoJ25laWdoYm9yaG9vZHMnLCB7XHJcbiAgICB0eXBlOiAnZ2VvanNvbicsXHJcbiAgICBkYXRhOiAnaHR0cHM6Ly9naXMuZGV0cm9pdG1pLmdvdi9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9OZWlnaGJvcmhvb2RzQXBwL05laWdoYm9yaG9vZHMvTWFwU2VydmVyLzEvcXVlcnk/d2hlcmU9MSUzRDEmdGV4dD0mb2JqZWN0SWRzPSZ0aW1lPSZnZW9tZXRyeT0mZ2VvbWV0cnlUeXBlPWVzcmlHZW9tZXRyeUVudmVsb3BlJmluU1I9Mjg5OCZzcGF0aWFsUmVsPWVzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cyZyZWxhdGlvblBhcmFtPSZvdXRGaWVsZHM9KiZyZXR1cm5HZW9tZXRyeT10cnVlJnJldHVyblRydWVDdXJ2ZXM9ZmFsc2UmbWF4QWxsb3dhYmxlT2Zmc2V0PSZnZW9tZXRyeVByZWNpc2lvbj0mb3V0U1I9NDMyNiZyZXR1cm5JZHNPbmx5PWZhbHNlJnJldHVybkNvdW50T25seT1mYWxzZSZvcmRlckJ5RmllbGRzPSZncm91cEJ5RmllbGRzRm9yU3RhdGlzdGljcz0mb3V0U3RhdGlzdGljcz0mcmV0dXJuWj1mYWxzZSZyZXR1cm5NPWZhbHNlJmdkYlZlcnNpb249JnJldHVybkRpc3RpbmN0VmFsdWVzPWZhbHNlJnJlc3VsdE9mZnNldD0mcmVzdWx0UmVjb3JkQ291bnQ9JmY9Z2VvanNvbidcclxuICB9KTtcclxuICBtYXAuYWRkU291cmNlKCduZWlnaGJvcmhvb2RzLWxhYmVscycsIHtcclxuICAgIHR5cGU6ICdnZW9qc29uJyxcclxuICAgIGRhdGE6ICdodHRwOi8vZ2lzLmRldHJvaXRtaS5nb3YvYXJjZ2lzL3Jlc3Qvc2VydmljZXMvTmVpZ2hib3Job29kc0FwcC9OZWlnaGJvcmhvb2RzL01hcFNlcnZlci8wL3F1ZXJ5P3doZXJlPTElM0QxJnRleHQ9Jm9iamVjdElkcz0mdGltZT0mZ2VvbWV0cnk9Jmdlb21ldHJ5VHlwZT1lc3JpR2VvbWV0cnlFbnZlbG9wZSZpblNSPTI4OTgmc3BhdGlhbFJlbD1lc3JpU3BhdGlhbFJlbEludGVyc2VjdHMmcmVsYXRpb25QYXJhbT0mb3V0RmllbGRzPSomcmV0dXJuR2VvbWV0cnk9dHJ1ZSZyZXR1cm5UcnVlQ3VydmVzPWZhbHNlJm1heEFsbG93YWJsZU9mZnNldD0mZ2VvbWV0cnlQcmVjaXNpb249Jm91dFNSPTQzMjYmcmV0dXJuSWRzT25seT1mYWxzZSZyZXR1cm5Db3VudE9ubHk9ZmFsc2Umb3JkZXJCeUZpZWxkcz0mZ3JvdXBCeUZpZWxkc0ZvclN0YXRpc3RpY3M9Jm91dFN0YXRpc3RpY3M9JnJldHVyblo9ZmFsc2UmcmV0dXJuTT1mYWxzZSZnZGJWZXJzaW9uPSZyZXR1cm5EaXN0aW5jdFZhbHVlcz1mYWxzZSZyZXN1bHRPZmZzZXQ9JnJlc3VsdFJlY29yZENvdW50PSZmPWdlb2pzb24nXHJcbiAgfSk7XHJcbiAgbWFwLmFkZExheWVyKHtcclxuICAgICdpZCc6ICdjb3VuY2lsc19sYWJlbHMnLFxyXG4gICAgJ3R5cGUnOiAnc3ltYm9sJyxcclxuICAgICdzb3VyY2UnOiAnY291bmNpbHNfbGFiZWxzJywgbWF4em9vbTogMTIsXHJcbiAgICAnbGF5b3V0Jzoge1xyXG4gICAgICBcInRleHQtZm9udFwiOiBbXCJNYXJrIFNDIE9mZmMgUHJvIEJvbGRcIl0sXHJcbiAgICAgIFwidGV4dC1maWVsZFwiOiBcIntuYW1lfVwiLFxyXG4gICAgICBcInN5bWJvbC1wbGFjZW1lbnRcIjogXCJwb2ludFwiLFxyXG4gICAgICBcInRleHQtc2l6ZVwiOiAyMlxyXG4gICAgfSxcclxuICAgICdwYWludCc6IHtcclxuICAgICAgJ3RleHQtY29sb3InOiAnYmxhY2snXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbWFwLmFkZExheWVyKHtcclxuICAgIFwiaWRcIjogXCJjb3VuY2lsLWJvcmRlcnNcIixcclxuICAgIFwidHlwZVwiOiBcImxpbmVcIixcclxuICAgIFwic291cmNlXCI6IFwiY291bmNpbHNcIiwgbWF4em9vbTogMTIsXHJcbiAgICBcImxheW91dFwiOiB7fSxcclxuICAgIFwicGFpbnRcIjoge1xyXG4gICAgICBcImxpbmUtY29sb3JcIjogXCIjMDA0YjkwXCIsXHJcbiAgICAgIFwibGluZS13aWR0aFwiOiAzXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbWFwLmFkZExheWVyKHtcclxuICAgIFwiaWRcIjogXCJjb3VuY2lsLWZpbGxcIixcclxuICAgIFwidHlwZVwiOiBcImZpbGxcIixcclxuICAgIFwic291cmNlXCI6IFwiY291bmNpbHNcIiwgIG1heHpvb206IDEyLFxyXG4gICAgXCJsYXlvdXRcIjoge30sXHJcbiAgICBcInBhaW50XCI6IHtcclxuICAgICAgXCJmaWxsLWNvbG9yXCI6ICcjMDA2NWMzJyxcclxuICAgICAgXCJmaWxsLW9wYWNpdHlcIjogMFxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIG1hcC5hZGRMYXllcih7XHJcbiAgICBcImlkXCI6IFwiY291bmNpbC1maWxsLWhvdmVyXCIsXHJcbiAgICBcInR5cGVcIjogXCJmaWxsXCIsXHJcbiAgICBcInNvdXJjZVwiOiBcImNvdW5jaWxzXCIsICBtYXh6b29tOiAxMixcclxuICAgIFwibGF5b3V0XCI6IHt9LFxyXG4gICAgXCJwYWludFwiOiB7XHJcbiAgICAgIFwiZmlsbC1jb2xvclwiOiAnIzAwNjVjMycsXHJcbiAgICAgIFwiZmlsbC1vcGFjaXR5XCI6IC41XHJcbiAgICB9LFxyXG4gICAgXCJmaWx0ZXJcIjogW1wiPT1cIiwgXCJuYW1lXCIsIFwiXCJdXHJcbiAgfSk7XHJcbiAgbWFwLmFkZExheWVyKHtcclxuICAgIFwiaWRcIjogXCJuZWlnaGJvcmhvb2RzLWJvcmRlcnNcIixcclxuICAgIFwidHlwZVwiOiBcImxpbmVcIixcclxuICAgIFwic291cmNlXCI6IFwibmVpZ2hib3Job29kc1wiLCAgbWluem9vbTogMTIsbWF4em9vbToxNS41LFxyXG4gICAgXCJsYXlvdXRcIjoge30sXHJcbiAgICBcInBhaW50XCI6IHtcclxuICAgICAgXCJsaW5lLWNvbG9yXCI6IFwiIzAwNGI5MFwiLFxyXG4gICAgICBcImxpbmUtd2lkdGhcIjogM1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIG1hcC5hZGRMYXllcih7XHJcbiAgICBcImlkXCI6IFwibmVpZ2hib3Job29kcy1maWxsXCIsXHJcbiAgICBcInR5cGVcIjogXCJmaWxsXCIsXHJcbiAgICBcInNvdXJjZVwiOiBcIm5laWdoYm9yaG9vZHNcIiwgIG1pbnpvb206IDEyLG1heHpvb206MTUuNSxcclxuICAgIFwicGFpbnRcIjp7XHJcbiAgICAgIFwiZmlsbC1jb2xvclwiOiAnI2ZmZicsXHJcbiAgICAgICdmaWxsLW9wYWNpdHknOiAwXHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gIG1hcC5hZGRMYXllcih7XHJcbiAgICAnaWQnOiAnbmVpZ2hib3Job29kcy1sYWJlbHMnLFxyXG4gICAgJ3R5cGUnOiAnc3ltYm9sJyxcclxuICAgICdzb3VyY2UnOiAnbmVpZ2hib3Job29kcy1sYWJlbHMnLFxyXG4gICAgICAgICAgICAnbWluem9vbSc6IDEyLG1heHpvb206MTUuNSxcclxuICAgICdsYXlvdXQnOiB7XHJcbiAgICAgIFwidGV4dC1mb250XCI6IFtcIk1hcmsgU0MgT2ZmYyBQcm8gQm9sZFwiXSxcclxuICAgICAgJ3RleHQtZmllbGQnOiAne25hbWV9J1xyXG4gICAgfSxcclxuICAgICdwYWludCc6IHtcclxuICAgICAgJ3RleHQtY29sb3InOiAnYmxhY2snXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbWFwLmFkZExheWVyKHtcclxuICAgICAgXCJpZFwiOiBcInBhcmNlbC1maWxsXCIsXHJcbiAgICAgIFwidHlwZVwiOiBcImZpbGxcIixcclxuICAgICAgXCJzb3VyY2VcIjogXCJwYXJjZWxzXCIsIG1pbnpvb206IDE1LjUsXHJcbiAgICAgIFwibGF5b3V0XCI6IHtcclxuICAgICAgfSxcclxuICAgICAgXCJwYWludFwiOiB7XHJcbiAgICAgICAgICAgXCJmaWxsLWNvbG9yXCI6XCIjZmZmXCIsXHJcbiAgICAgICAgICAgXCJmaWxsLW9wYWNpdHlcIjowXHJcbiAgICAgIH0sXHJcbiAgICAgICdzb3VyY2UtbGF5ZXInOiAncGFyY2Vsc2dlb2pzb24nXHJcbiAgIH0pO1xyXG4gICBtYXAuYWRkTGF5ZXIoe1xyXG4gICAgICBcImlkXCI6IFwicGFyY2VsLWxpbmVcIixcclxuICAgICAgXCJ0eXBlXCI6IFwibGluZVwiLFxyXG4gICAgICBcInNvdXJjZVwiOiBcInBhcmNlbHNcIiwgbWluem9vbTogMTUuNSxcclxuICAgICAgXCJsYXlvdXRcIjoge1xyXG4gICAgICB9LFxyXG4gICAgICBcInBhaW50XCI6IHtcclxuICAgICAgICAgICBcImxpbmUtY29sb3JcIjpcIiNjYmNiY2JcIixcclxuICAgICAgfSxcclxuICAgICAgJ3NvdXJjZS1sYXllcic6ICdwYXJjZWxzZ2VvanNvbidcclxuICAgfSk7XHJcbiAgIG1hcC5hZGRMYXllcih7XHJcbiAgICAgXCJpZFwiOiBcInBhcmNlbC1maWxsLWhvdmVyXCIsXHJcbiAgICAgXCJ0eXBlXCI6IFwibGluZVwiLFxyXG4gICAgIFwic291cmNlXCI6IFwicGFyY2Vsc1wiLCAgbWluem9vbTogMTUuNSxcclxuICAgICBcImxheW91dFwiOiB7fSxcclxuICAgICBcInBhaW50XCI6IHtcclxuICAgICAgIFwibGluZS1jb2xvclwiOiAnI0JEMDAxOSdcclxuICAgICB9LFxyXG4gICAgICdzb3VyY2UtbGF5ZXInOiAncGFyY2Vsc2dlb2pzb24nLFxyXG4gICAgIFwiZmlsdGVyXCI6IFtcIj09XCIsIFwicGFyY2Vsbm9cIiwgXCJcIl1cclxuICAgfSk7XHJcblxyXG4gICAkLmdldEpTT04oXCJodHRwOi8vZ2lzLmRldHJvaXRtaS5nb3YvYXJjZ2lzL3Jlc3Qvc2VydmljZXMvRG9JVC9Db21tZXJjaWFsL01hcFNlcnZlci8wL3F1ZXJ5P3doZXJlPTElM0QxJnRleHQ9Jm9iamVjdElkcz0mdGltZT0mZ2VvbWV0cnk9Jmdlb21ldHJ5VHlwZT1lc3JpR2VvbWV0cnlFbnZlbG9wZSZpblNSPSZzcGF0aWFsUmVsPWVzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cyZyZWxhdGlvblBhcmFtPSZvdXRGaWVsZHM9KiZyZXR1cm5HZW9tZXRyeT10cnVlJnJldHVyblRydWVDdXJ2ZXM9ZmFsc2UmbWF4QWxsb3dhYmxlT2Zmc2V0PSZnZW9tZXRyeVByZWNpc2lvbj0mb3V0U1I9NDMyNiZyZXR1cm5JZHNPbmx5PWZhbHNlJnJldHVybkNvdW50T25seT1mYWxzZSZvcmRlckJ5RmllbGRzPSZncm91cEJ5RmllbGRzRm9yU3RhdGlzdGljcz0mb3V0U3RhdGlzdGljcz0mcmV0dXJuWj1mYWxzZSZyZXR1cm5NPWZhbHNlJmdkYlZlcnNpb249JnJldHVybkRpc3RpbmN0VmFsdWVzPWZhbHNlJnJlc3VsdE9mZnNldD0mcmVzdWx0UmVjb3JkQ291bnQ9JmY9anNvblwiLCBmdW5jdGlvbiggZGF0YSApIHtcclxuICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICB2YXIgbmV3X0ZpbHRlciA9IFtcImluXCIsJ3BhcmNlbG5vJ107XHJcbiAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICBuZXdfRmlsdGVyLnB1c2goZGF0YS5mZWF0dXJlc1tpXS5hdHRyaWJ1dGVzLlBBUkNFTE5PKTtcclxuICAgICB9XHJcbiAgICAgbWFwLmFkZExheWVyKHtcclxuICAgICAgXCJpZFwiOiBcInBhcmNlbC1maWxsLWNvZmNcIixcclxuICAgICAgXCJ0eXBlXCI6IFwiZmlsbFwiLFxyXG4gICAgICBcInNvdXJjZVwiOiBcInBhcmNlbHNcIixcclxuICAgICAgJ3NvdXJjZS1sYXllcic6ICdwYXJjZWxzZ2VvanNvbicsXHJcbiAgICAgICdmaWx0ZXInOiBuZXdfRmlsdGVyLFxyXG4gICAgICBcInBhaW50XCI6IHtcclxuICAgICAgICBcImZpbGwtY29sb3JcIjpcIiNERjU4MDBcIixcclxuICAgICAgICBcImZpbGwtb3BhY2l0eVwiOjAuM1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgfSk7XHJcbiAgLy8gICQuZ2V0SlNPTihcImh0dHBzOi8vc2VydmljZXMyLmFyY2dpcy5jb20vcXZrYmVhbTdXaXJwczZ6Qy9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9SZW50YWxfSW5zcGVjdGlvbnMvRmVhdHVyZVNlcnZlci8wL3F1ZXJ5P3doZXJlPUFDVElPTl9ERVNDUklQVElPTiUzRCUyN0lzc3VlK0luaXRpYWwrUmVnaXN0cmF0aW9uJTI3K0FORCtQYXJjZWxObytJUytOT1QrTlVMTCZvYmplY3RJZHM9JnRpbWU9Jmdlb21ldHJ5PSZnZW9tZXRyeVR5cGU9ZXNyaUdlb21ldHJ5RW52ZWxvcGUmaW5TUj0mc3BhdGlhbFJlbD1lc3JpU3BhdGlhbFJlbEludGVyc2VjdHMmcmVzdWx0VHlwZT1ub25lJmRpc3RhbmNlPTAuMCZ1bml0cz1lc3JpU1JVbml0X01ldGVyJnJldHVybkdlb2RldGljPWZhbHNlJm91dEZpZWxkcz1wYXJjZWxubyZyZXR1cm5HZW9tZXRyeT10cnVlJm11bHRpcGF0Y2hPcHRpb249eHlGb290cHJpbnQmbWF4QWxsb3dhYmxlT2Zmc2V0PSZnZW9tZXRyeVByZWNpc2lvbj0mb3V0U1I9JnJldHVybklkc09ubHk9ZmFsc2UmcmV0dXJuQ291bnRPbmx5PWZhbHNlJnJldHVybkV4dGVudE9ubHk9ZmFsc2UmcmV0dXJuRGlzdGluY3RWYWx1ZXM9ZmFsc2Umb3JkZXJCeUZpZWxkcz0mZ3JvdXBCeUZpZWxkc0ZvclN0YXRpc3RpY3M9Jm91dFN0YXRpc3RpY3M9JnJlc3VsdE9mZnNldD0mcmVzdWx0UmVjb3JkQ291bnQ9JnJldHVyblo9ZmFsc2UmcmV0dXJuTT1mYWxzZSZxdWFudGl6YXRpb25QYXJhbWV0ZXJzPSZzcWxGb3JtYXQ9bm9uZSZmPXBqc29uJnRva2VuPVwiLCBmdW5jdGlvbiggZGF0YSApIHtcclxuICAvLyAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG4gIC8vICAgIHZhciBuZXdfRmlsdGVyID0gW1wiaW5cIiwncGFyY2Vsbm8nXTtcclxuICAvLyAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEuZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAvLyAgICAgIG5ld19GaWx0ZXIucHVzaChkYXRhLmZlYXR1cmVzW2ldLmF0dHJpYnV0ZXMuUGFyY2VsTm8pO1xyXG4gIC8vICAgIH1cclxuICAvLyAgICBtYXAuYWRkTGF5ZXIoe1xyXG4gIC8vICAgICBcImlkXCI6IFwicGFyY2VsLWZpbGwtaW5pdGlhbFwiLFxyXG4gIC8vICAgICBcInR5cGVcIjogXCJmaWxsXCIsXHJcbiAgLy8gICAgIFwic291cmNlXCI6IFwicGFyY2Vsc1wiLFxyXG4gIC8vICAgICAnc291cmNlLWxheWVyJzogJ3BhcmNlbHNnZW9qc29uJyxcclxuICAvLyAgICAgJ2ZpbHRlcic6IG5ld19GaWx0ZXIsXHJcbiAgLy8gICAgIFwicGFpbnRcIjoge1xyXG4gIC8vICAgICAgIFwiZmlsbC1jb2xvclwiOlwiIzExNEJDN1wiLFxyXG4gIC8vICAgICAgIFwiZmlsbC1vcGFjaXR5XCI6MC41XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0pO1xyXG4gIC8vICB9KTtcclxufTtcclxubWFwLm9uKCdzdHlsZS5sb2FkJywgZnVuY3Rpb24oKXtcclxuICBhZGREYXRhTGF5ZXJzKCk7XHJcbiAgbWFwLnJlc2l6ZSgpO1xyXG59KTtcclxubWFwLm9uKCdsb2FkJywgZnVuY3Rpb24od2luZG93KSB7XHJcbiAgbWFwLm9uKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBmZWF0dXJlcyA9IG1hcC5xdWVyeVJlbmRlcmVkRmVhdHVyZXMoZS5wb2ludCwge1xyXG4gICAgICBsYXllcnM6IFtcImNvdW5jaWwtZmlsbFwiXVxyXG4gICAgfSk7XHJcbiAgICBpZiAoZmVhdHVyZXMubGVuZ3RoKSB7XHJcbiAgICAgIG1hcC5zZXRGaWx0ZXIoXCJjb3VuY2lsLWZpbGwtaG92ZXJcIiwgW1wiPT1cIiwgXCJkaXN0cmljdHNcIiwgZmVhdHVyZXNbMF0ucHJvcGVydGllcy5kaXN0cmljdHNdKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBtYXAuc2V0RmlsdGVyKFwiY291bmNpbC1maWxsLWhvdmVyXCIsIFtcIj09XCIsIFwiZGlzdHJpY3RzXCIsIFwiXCJdKTtcclxuICAgICAgZmVhdHVyZXMgPSBtYXAucXVlcnlSZW5kZXJlZEZlYXR1cmVzKGUucG9pbnQsIHtcclxuICAgICAgICBsYXllcnM6IFtcIm5laWdoYm9yaG9vZHMtZmlsbFwiXVxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFmZWF0dXJlcy5sZW5ndGgpIHtcclxuICAgICAgICBmZWF0dXJlcyA9IG1hcC5xdWVyeVJlbmRlcmVkRmVhdHVyZXMoZS5wb2ludCwge1xyXG4gICAgICAgICAgbGF5ZXJzOiBbXCJwYXJjZWwtZmlsbFwiXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGZlYXR1cmVzKTtcclxuICAgICAgICAvLyBpZiAoZmVhdHVyZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gICBtYXAuc2V0RmlsdGVyKFwicGFyY2VsLWZpbGwtaG92ZXJcIiwgW1wiPT1cIiwgXCJwYXJjZWxub1wiLCBmZWF0dXJlc1swXS5wcm9wZXJ0aWVzLnBhcmNlbG5vXSk7XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICBtYXAuc2V0RmlsdGVyKFwicGFyY2VsLWZpbGwtaG92ZXJcIiwgW1wiPT1cIiwgXCJwYXJjZWxub1wiLCBcIlwiXSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBtYXAuZ2V0Q2FudmFzKCkuc3R5bGUuY3Vyc29yID0gKGZlYXR1cmVzLmxlbmd0aCkgPyAncG9pbnRlcicgOiAnJztcclxuICB9KTtcclxuICB2YXIgZ2VvY29kZXIgPSBuZXcgTWFwYm94R2VvY29kZXIoe1xyXG4gICAgYWNjZXNzVG9rZW46IG1hcGJveGdsLmFjY2Vzc1Rva2VuLFxyXG4gICAgYmJveDogW1xyXG4gICAgICAgIC04My4zNDM3LDQyLjIxMDIsXHJcbiAgICAgICAgLTgyLjg3NTQsIDQyLjUxOTdcclxuICAgICAgXVxyXG4gIH0pO1xyXG4gIG1hcC5hZGRDb250cm9sKGdlb2NvZGVyLCAndG9wLWxlZnQnKTtcclxuICB2YXIgc2lkZUJhckdlb2NvZGVyID0gbmV3IE1hcGJveEdlb2NvZGVyKHtcclxuICAgIGFjY2Vzc1Rva2VuOiBtYXBib3hnbC5hY2Nlc3NUb2tlbixcclxuICAgIGJib3g6IFtcclxuICAgICAgICAtODMuMzQzNyw0Mi4yMTAyLFxyXG4gICAgICAgIC04Mi44NzU0LCA0Mi41MTk3XHJcbiAgICAgIF1cclxuICB9KTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2VvY29kZXInKS5hcHBlbmRDaGlsZChzaWRlQmFyR2VvY29kZXIub25BZGQobWFwKSk7XHJcbiAgdmFyIGFsbEdlb2NvZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYXBib3hnbC1jdHJsLWdlb2NvZGVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxHZW9jb2RlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGFsbEdlb2NvZGVyc1tpXS5wbGFjZWhvbGRlciA9IFwiTG9va3VwIGFuIGFkZHJlc3NcIjtcclxuICB9XHJcbiAgZ2VvY29kZXIub24oJ3Jlc3VsdCcsIGZ1bmN0aW9uKGV2KSB7XHJcbiAgICBzdGFydEdlb2NvZGVyUmVzdWx0cyhldik7XHJcbiAgfSk7XHJcbiAgc2lkZUJhckdlb2NvZGVyLm9uKCdyZXN1bHQnLCBmdW5jdGlvbihldikge1xyXG4gICAgc3RhcnRHZW9jb2RlclJlc3VsdHMoZXYpO1xyXG4gIH0pO1xyXG59KTtcclxubWFwLm9uKCd6b29tJywgZnVuY3Rpb24oKSB7XHJcbiAgY29uc29sZS5sb2cobWFwLmdldFpvb20oKSk7XHJcbiAgdXBkYXRlVVJMUGFyYW1zKFttYXAuZ2V0Wm9vbSgpXSk7XHJcbn0pO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtZW1lcmdlbmN5LW1vZGFsLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxjbG9zZUluZm8pO1xyXG52YXIgdG9nZ2xlQmFzZU1hcEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYmFzZW1hcC10b2dnbGUgPiBhcnRpY2xlJyk7XHJcbmZvciAodmFyIGkgPSAwOyBpIDwgdG9nZ2xlQmFzZU1hcEJ0bnMubGVuZ3RoOyBpKyspIHtcclxuICB0b2dnbGVCYXNlTWFwQnRuc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICB0b2dnbGVCYXNlTWFwKGUpO1xyXG4gIH0pO1xyXG59XHJcbiJdfQ==
