"use strict";
// ================ variables ======================
var login = Object.create(loginModule);
var mapPanel = Object.create(panelModule);
var survey = Object.create(surveyModule);
var bounds = [
    [		-83.3437, 	42.2102], // Southwest coordinates
    [		-82.8754, 	42.5197]  // Northeast coordinates
];
var baseMapStyles = [
  'ciymfavyb00072sqe0bu9rwht',
  'cj2m1f9k400132rmr1jhjq2gn'
];
var parcelData = {
  'rental-status'     : null,
  'parcel-data'       : null
};
var currentURLParams = {
  'zoom'        : 0,
  'lng'         : 0,
  'lat'         : 0,
  'parcel'      : '',
  'district'    : '',
  'neighborhood': '',
  'survey'      : ''
};
mapboxgl.accessToken = 'pk.eyJ1Ijoic2x1c2Fyc2tpZGRldHJvaXRtaSIsImEiOiJjaXZsNXlwcXQwYnY5MnlsYml4NTJ2Mno4In0.8wKUnlMPIlxq-eWH0d10-Q';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/slusarskiddetroitmi/' + baseMapStyles[0], //stylesheet location
  center: [-83.15, 42.36], // starting position
  zoom: 11.5, // starting zoom
  keyboard : true
});
var markerSource = {
  type: "geojson",
  data: {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [12.695600612967427, 56.04351888068181]
    },
    properties: {}
  }
};
var mly = new Mapillary.Viewer(
  "survey",
  "WGl5Z2dkVHEydGMwWlNMOHUzVHR4QToyMmQ4OTRjYzczZWFiYWVi",
  null
);
var marker;
var currentToggleID = 'c-w-vernor';
// ================== functions =====================
mly.on(Mapillary.Viewer.nodechanged, function(node) {
  updateURLParams(['','','','','','',node.key]);
  document.querySelector('#survey-note-card > .street-name > h1').innerHTML = 'LOADING<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span>';
  var lngLat = [node.latLon.lon, node.latLon.lat];
  var data = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: lngLat
    },
    properties: {
      "marker-symbol": "marker"
    }
  };
  map.getSource("markers").setData(data);
  setTimeout(function() {
    map.flyTo({
        center: lngLat,
        zoom: 17,
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
  }, 700);
  survey.getParcelData(lngLat);
});
window.addEventListener('resize', function() { mly.resize(); map.resize(); });
var loadURLRouting = function loadURLRouting() {
  console.log(getQueryVariable('zoom'));
  console.log(getQueryVariable('lat'));
  console.log(getQueryVariable('lng'));
  console.log(getQueryVariable('parcel'));
  console.log(getQueryVariable('neighborhood'));
  console.log(getQueryVariable('district'));
  console.log(getQueryVariable('survey'));
  if(getQueryVariable('zoom')){
    if (getQueryVariable('lat') && (getQueryVariable('lat') !== '0')) {
      switch (true) {
        case getQueryVariable('district') !== false:
          console.log('load district panel');
          updateURLParams([getQueryVariable('zoom'),getQueryVariable('lng'),getQueryVariable('lat'),'',getQueryVariable('district')]);
          console.log(currentURLParams);
          mapPanel.createFeatureData();
          break;
        case getQueryVariable('neighborhood') !== false:
          console.log('load neighborhood panel');
          updateURLParams([getQueryVariable('zoom'),getQueryVariable('lng'),getQueryVariable('lat'),'','',getQueryVariable('neighborhood')]);
          mapPanel.createFeatureData();
          break;
        case getQueryVariable('parcel') !== false:
          updateURLParams([getQueryVariable('zoom'),getQueryVariable('lng'),getQueryVariable('lat'),getQueryVariable('parcel'),'','']);
          mapPanel.createFeatureData();
          break;
        default:
          mapPanel.createPanel('city');
          map.flyTo({
              center: [getQueryVariable('lng'),getQueryVariable('lat')],
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
    }else{
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
      updateURLParams([getQueryVariable('zoom'),-83.15, 42.36]);
      if(getQueryVariable('parcel')){
        console.log('there is parcel');
      }else{
        console.log('no parcel');
      }
    }
  }else{
    if (getQueryVariable('lat')) {
      map.flyTo({
          center: [getQueryVariable('lng'),getQueryVariable('lat')],
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
      updateURLParams([11.5,getQueryVariable('lat'),getQueryVariable('lng')]);
      if(getQueryVariable('parcel')){
        console.log('there is parcel');
      }else{
        console.log('no parcel');
        if(getQueryVariable('district')){
          console.log('there is district');
        }else{
          console.log('no district');
          if(getQueryVariable('neighborhood')){
            console.log('there is neighborhood');
          }else{
            console.log('no neighborhood - loading city');
            mapPanel.createPanel('city');
          }
        }
      }
    }else{
      mapPanel.createPanel('city');
    }
  }
};
var liveUpdate = function liveUpdate(){
  window.setInterval(function(){
    if(!getQueryVariable('neighborhood') && !getQueryVariable('district') && !getQueryVariable('parcel')){
      mapPanel.updatePanelData('city');
    }else{
      console.log('subsection active');
    }
    console.log('updating corridors status');
    addToggleLayer();
  }, 300000);
};
window.onload = function(){
  loadURLRouting();
  liveUpdate();
};
var getQueryVariable = function getQueryVariable(variable){
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
     var pair = vars[i].split("=");
     if(pair[0] == variable){
       if(pair[1] !== ''){
        return pair[1];
       }
     }
   }
   return(false);
};
var updateURLParams = function updateURLParams(params){
  // console.log(params);
  // console.log(params.length);
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
    case params.length === 6:
      currentURLParams.zoom = params[0];
      currentURLParams.lng = params[1];
      currentURLParams.lat = params[2];
      currentURLParams.parcel = params[3];
      currentURLParams.district = params[4];
      currentURLParams.neighborhood = params[5];
      break;
    default:
      currentURLParams.survey = params[6];
  }
  // console.log(currentURLParams);
  var newTempURL = '';
  for (var property in currentURLParams) {
      if (currentURLParams.hasOwnProperty(property)) {
          // console.log(property);
          // console.log(currentURLParams[property]);
          switch (true) {
            case property !== 0:
              newTempURL += property + '=' + currentURLParams[property] + '&'
              break;
            default:

          }
      }
  }
  // console.log(newTempURL);
  if (history.pushState) {
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + newTempURL;
      window.history.pushState({path:newurl},'',newurl);
  }
};
var startGeocoderResults = function startGeocoderResults(ev){
  map.flyTo({
      center: [ev.result.geometry.coordinates[0], ev.result.geometry.coordinates[1]],
      zoom: 17,
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

  var tempInputList = document.querySelectorAll('.mapboxgl-ctrl-geocoder.mapboxgl-ctrl > input');
  var tempAddr = '';
  for (var i = 0; i < tempInputList.length; i++) {
    if (tempInputList[i].value.split(',')[0] !== '') {
      // console.log(tempInputList[i].value.split(',')[0]);
      tempAddr = tempInputList[i].value.split(',')[0];
      tempAddr = tempAddr.split(' ');
      break;
    }else {
      // console.log("Empty input");
    }
  }
  var newTempAddr = '';
  var size = tempAddr.length;
  tempAddr.forEach(function(item, index) {
    newTempAddr += item;
    ((index < size) && (index + 1) !== size) ? newTempAddr += '+': 0;
  });
  // console.log(newTempAddr);
  //================ get parcel data ==========================
  $.getJSON('https://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/findAddressCandidates?Street=&City=&ZIP=&SingleLine='+ newTempAddr +'&category=&outFields=User_fld&maxLocations=&outSR=&searchExtent=&location=&distance=&magicKey=&f=pjson' , function( data ) {
    //console.log(data.candidates[0].attributes.User_fld);
    updateURLParams([17,ev.result.geometry.coordinates[0], ev.result.geometry.coordinates[1], data.candidates[0].attributes.User_fld,'','']);
    mapPanel.setParcelNumber(data.candidates[0].attributes.User_fld);
    mapPanel.setTempFeatureData({'properties':{'parcelno':data.candidates[0].attributes.User_fld}});
    mapPanel.createPanel('parcel');
    map.setFilter("parcel-fill-hover", ["==", "parcelno", data.candidates[0].attributes.User_fld]);
    var allGeocoders = document.querySelectorAll('.mapboxgl-ctrl-geocoder input[type="text"]');
    for (var t = 0; t < allGeocoders.length; t++) {
      allGeocoders[t].value = "";
    }
  });
  (document.querySelector('#info').className === 'active') ? 0 : document.querySelector('#info').className = 'active';
};
var toggleBaseMap = function toggleBaseMap(e) {
  //console.log(e);
  if(e.target.className !== ''){
    //console.log(e.target.className);
    (e.target.className === 'map-view')? map.setStyle('mapbox://styles/slusarskiddetroitmi/' + baseMapStyles[0]) : map.setStyle('mapbox://styles/slusarskiddetroitmi/' + baseMapStyles[1]);
  }else{
    //console.log(e.target.parentElement);
    (e.target.parentElement.className === 'map-view')? map.setStyle('mapbox://styles/slusarskiddetroitmi/' + baseMapStyles[0]) : map.setStyle('mapbox://styles/slusarskiddetroitmi/' + baseMapStyles[1]);
  }
};
var closeInfo = function closeInfo() {
  //console.log('closing');
  // (document.querySelector('#info').className === 'active') ? document.querySelector('#info').className = '' : document.querySelector('#info').className = 'active';
  mapPanel.createPanel('city');
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
  updateURLParams(['',-83.15,42.36,'','','']);
};
var closeSurvey = function closeSurvey(){
  console.log('closing survery');
  if(document.querySelector('#info').className !== 'active'){
    document.querySelector('#info').className = 'active';
    mapPanel.createPanel('city');
  }
  console.log(document.querySelector('#info').className === 'active');
  (document.querySelector('#survey').className === 'active') ? document.querySelector('#survey').className = '' : 0;
  (document.querySelector('#survey-note-card').className === '') ? 0 : document.querySelector('#survey-note-card').className = '';
  (document.querySelector('#map').className === 'mapboxgl-map') ? 0 : document.querySelector('#map').className = 'mapboxgl-map';
  (document.querySelector('#legend').className === 'survey-on') ? document.querySelector('#legend').className = '' : 0;
  (document.querySelector('.mapboxgl-control-container').className === 'mapboxgl-control-container') ? 0 : document.querySelector('.mapboxgl-control-container').className = 'mapboxgl-control-container';
  document.querySelector('.mapboxgl-ctrl-geocoder > input[type="text"]').value = '';
  setTimeout(function() {
    mly.resize();
    map.resize();
    map.flyTo({
        center: [getQueryVariable('lng'), getQueryVariable('lat')], // starting position
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
  }, 500);
  //console.log('going back to city view');
  updateURLParams([getQueryVariable('zoom'),getQueryVariable('lng'),getQueryVariable('lat'),getQueryVariable('parcel'),'','']);
  updateURLParams(['','','','','','','']);
  mapPanel.setParcelNumber(getQueryVariable('parcel'));
  mapPanel.setTempFeatureData({'properties':{'parcelno':getQueryVariable('parcel')}});
  mapPanel.createPanel('parcel');
  map.setFilter("parcel-fill-hover", ["==", "parcelno", getQueryVariable('parcel')]);
  survey.clearSurvey();
};
var verifySurveyClose = function verifySurveyClose(action){
  console.log(action.target.id);
  (action.target.id === 'end-survey-btn') ? closeSurvey() : 0;
  (document.querySelector('#end-survey-popup').className === 'active') ? document.querySelector('#end-survey-popup').className = '' : 0;
};
var showSurveyClose = function showSurveyClose(){
  (document.querySelector('#end-survey-popup').className === 'active') ? 0 : document.querySelector('#end-survey-popup').className = 'active';
};
document.getElementById('close-survey-btn').addEventListener('click',showSurveyClose);
document.querySelectorAll('.end-survey-buttons > span').forEach(function(item){
  item.addEventListener('click', function(action){
    verifySurveyClose(action);
  });
});
var changeToggleLayer = function changeToggleLayer(id){
  currentToggleID = id;
  map.removeLayer('need-survey');
  addToggleLayer();
};
document.querySelectorAll('.layer-controller-toggle').forEach(function(item){
  item.addEventListener('click', function(toggle){
    currentToggleID = toggle.target.id;
    addToggleLayer();
  });
});
var contains = function(needle) {
  // Per spec, the way to identify NaN is that it is not equal to itself
  var findNaN = needle !== needle;
  var indexOf;
  if(!findNaN && typeof Array.prototype.indexOf === 'function') {
      indexOf = Array.prototype.indexOf;
  } else {
      indexOf = function(needle) {
        var i = -1, index = -1;
        for(i = 0; i < this.length; i++) {
            var item = this[i];

            if((findNaN && item !== item) || item === needle) {
                index = i;
                break;
            }
        }
        return index;
      };
  }
  return indexOf.call(this, needle) > -1;
};
var getSurveyedList = function getSurveyedList(list, cleaner){
  console.log(list);
  console.log(cleaner);
  let lists = {
    'surveyed': [],
    'needSurvey': []
  };
  list.forEach(function(item){
    (!contains.call(cleaner,item))? lists.needSurvey.push(item):lists.surveyed.push(item);
  });
  return lists;
};
var addToggleLayer = function addToggleLayer(){
  try {
    (map.getLayer("already-survey") !== undefined) ? map.removeLayer("already-survey"):0;
    (map.getLayer("need-survey") !== undefined) ? map.removeLayer("need-survey"):0;
  }catch(err) {
    console.log("Error: " + err);
  }
  var corridorName = '';
  switch (currentToggleID) {
    case "c-w-vernor":
      corridorName = 'W+Vernor';
      break;
    case "c-e-vernor":
      corridorName = 'E+Vernor';
      break;
    case "c-michigan":
      corridorName = 'Michigan';
      break;
    case "c-woodward":
      corridorName = 'Woodward';
      break;
    case "c-livernois":
      corridorName = 'Livernois';
      break;
    case "c-grand-river":
      corridorName = 'Grand+River';
      break;
    case "c-seven-mile":
      corridorName = 'Seven+Mile';
      break;
    case "c-mcnichols":
      corridorName = 'McNichols';
      break;
    case "c-gratiot":
      corridorName = 'Gratiot';
      break;
    case "c-jefferson":
      corridorName = 'Jefferson';
      break;
    case "c-warren":
      corridorName = 'Warren';
      break;
    default:

  }
  var parcelArray = [];
  $.getJSON("https://apis.detroitmi.gov/photo_survey/status/", function( parcels ) {
    console.log(parcels);
    for (var key in parcels) {
      parcelArray.push(key);
    }
    console.log(encodeURI(corridorName));
    $.getJSON("https://gis.detroitmi.gov/arcgis/rest/services/DoIT/Corridor_Boundaries/MapServer/0/query?where=Corridor%3D%27"+ corridorName +"%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson", function( corridor ) {
      console.log(corridor);
      var simplifiedCorridor = turf.simplify(corridor.features[0], 0.003, false);
      console.log(simplifiedCorridor);
      var arcCorridorPolygon = Terraformer.ArcGIS.convert(simplifiedCorridor.geometry);
      console.log(arcCorridorPolygon);
      $.getJSON("https://gis.detroitmi.gov/arcgis/rest/services/DoIT/Commercial/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry="+ encodeURI(JSON.stringify(arcCorridorPolygon))+"&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson", function( data ) {
        //  =========== parcel quering test ============
        var testParcel = turf.simplify(data.features[0], 0.003, false);
        console.log(simplifiedCorridor);
        var testParcelArc = Terraformer.ArcGIS.convert(testParcel.geometry);
        console.log(JSON.stringify(testParcelArc));
        //  ============================================
      });
       $.getJSON("https://gis.detroitmi.gov/arcgis/rest/services/DoIT/Commercial/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry="+ encodeURI(JSON.stringify(arcCorridorPolygon))+"&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json", function( data ) {
         console.log(data);
         var needSurveyFilter = ["in",'parcelno'];
         var alreadySurveyFilter = ["in",'parcelno'];
         var corridorParcels = [];
         for (var i = 0; i < data.features.length; i++) {
           corridorParcels.push(data.features[i].attributes.PARCELNO);
         }
         var cleanList = getSurveyedList(corridorParcels,parcelArray);
         console.log(cleanList);
         for (var i = 0; i < cleanList.needSurvey.length; i++) {
           needSurveyFilter.push(cleanList.needSurvey[i]);
         }
         for (var i = 0; i < cleanList.surveyed.length; i++) {
           alreadySurveyFilter.push(cleanList.surveyed[i]);
         }
         map.addLayer({
          "id": "need-survey",
          "type": "fill",
          "source": "parcels",
          'source-layer': 'parcelsgeojson',
          'filter': needSurveyFilter,
          "paint": {
            "fill-color":"#DF5800",
            "fill-opacity":0.3
          }
        });
        map.addLayer({
         "id": "already-survey",
         "type": "fill",
         "source": "parcels",
         'source-layer': 'parcelsgeojson',
         'filter': alreadySurveyFilter,
         "paint": {
           "fill-color":"#114BC7",
           "fill-opacity":0.3
         }
       });
       });
    });
  });
};
var addDataLayers = function addDataLayers(){
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
    data: 'https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Neighborhoods/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=2898&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
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
    "source": "councils",  maxzoom: 12,
    "layout": {},
    "paint": {
      "fill-color": '#0065c3',
      "fill-opacity": 0
    }
  });
  map.addLayer({
    "id": "council-fill-hover",
    "type": "fill",
    "source": "councils",  maxzoom: 12,
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
    "source": "neighborhoods",  minzoom: 12,maxzoom:15.5,
    "layout": {},
    "paint": {
      "line-color": "#004b90",
      "line-width": 3
    }
  });
  map.addLayer({
    "id": "neighborhoods-fill",
    "type": "fill",
    "source": "neighborhoods",  minzoom: 12,maxzoom:15.5,
    "paint":{
      "fill-color": '#fff',
      'fill-opacity': 0
    },
  });
  map.addLayer({
    'id': 'neighborhoods-labels',
    'type': 'symbol',
    'source': 'neighborhoods-labels',
            'minzoom': 12,maxzoom:15.5,
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
      "layout": {
      },
      "paint": {
           "fill-color":"#fff",
           "fill-opacity":0
      },
      'source-layer': 'parcelsgeojson'
   });
   map.addLayer({
      "id": "parcel-line",
      "type": "line",
      "source": "parcels", minzoom: 15.5,
      "layout": {
      },
      "paint": {
           "line-color":"#cbcbcb",
      },
      'source-layer': 'parcelsgeojson'
   });
   map.addLayer({
     "id": "parcel-fill-hover",
     "type": "line",
     "source": "parcels",  minzoom: 15.5,
     "layout": {},
     "paint": {
       "line-color": '#BD0019',
       "line-width": 3
     },
     'source-layer': 'parcelsgeojson',
     "filter": ["==", "parcelno", ""]
   });
   addToggleLayer();
};
map.on('style.load', function(){
  map.addSource("markers", markerSource);
  map.addLayer({
    id: "markers",
    type: "symbol",
    source: "markers",
    layout: {
      "icon-image": "car-15"
    }
  });
  addDataLayers();
  map.resize();
});
map.on('load', function(window) {
  map.on("mousemove", function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["council-fill"]
    });
    if (features.length) {
      map.setFilter("council-fill-hover", ["==", "districts", features[0].properties.districts]);
    }else{
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
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    bbox: [
        -83.3437,42.2102,
        -82.8754, 42.5197
      ]
  });
  map.addControl(geocoder, 'top-left');
  var sideBarGeocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    bbox: [
        -83.3437,42.2102,
        -82.8754, 42.5197
      ]
  });
  document.getElementById('geocoder').appendChild(sideBarGeocoder.onAdd(map));
  var allGeocoders = document.querySelectorAll('.mapboxgl-ctrl-geocoder input[type="text"]');
  for (var i = 0; i < allGeocoders.length; i++) {
    allGeocoders[i].placeholder = "Lookup an address";
  }
  geocoder.on('result', function(ev) {
    startGeocoderResults(ev);
  });
  sideBarGeocoder.on('result', function(ev) {
    startGeocoderResults(ev);
  });
});
map.on('zoom', function() {
  // console.log(map.getZoom());
  updateURLParams([map.getZoom()]);
});
document.getElementById('close-emergency-modal-btn').addEventListener('click',closeInfo);
var toggleBaseMapBtns = document.querySelectorAll('#basemap-toggle > article');
for (var i = 0; i < toggleBaseMapBtns.length; i++) {
  toggleBaseMapBtns[i].addEventListener('click',function(e){
    toggleBaseMap(e);
  });
}
var parcelsSlider = function parcelsSlider(action) {
  console.log(action.className);
  var imagesList = document.querySelectorAll('.slides > li');
  var currentActiveImg = null;
  imagesList.forEach(function(image,index){
    if(image.className === "flex-active-slide"){
      currentActiveImg = index;
      return 0;
    }
  });
  console.log(imagesList);
  console.log(currentActiveImg);
  imagesList[currentActiveImg].className = '';
  if(action.className === "flex-next"){
    switch (true) {
      case currentActiveImg === (imagesList.length - 1):
        document.querySelector('.slides').style.left = '0';
        imagesList[0].className = "flex-active-slide";
        break;
      default:
        document.querySelector('.slides').style.left = '-' + ((currentActiveImg+1) * 20) + 'em';
        imagesList[currentActiveImg+1].className = "flex-active-slide";
    }
  }else{
    switch (true) {
      case currentActiveImg === 0:
        document.querySelector('.slides').style.left = '-' + ((imagesList.length - 1) * 20) + 'em';
        imagesList[imagesList.length - 1].className = "flex-active-slide";
        break;
      default:
        document.querySelector('.slides').style.left = '-' + ((currentActiveImg-1) * 20) + 'em';
        imagesList[currentActiveImg-1].className = "flex-active-slide";
    }
  }
};
