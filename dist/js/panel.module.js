"use strict";

var panelModule = function (survey) {
  var setTempData = function (obj) {
    panel.tempData.registrationNumbers = obj.registrationNumbers;
    panel.tempData.totalNumbers = obj.totalNumbers;
  };
  var getTempData = function () {
    return panel.tempData;
  };
  var setTempHTML = function (obj) {
    if (obj.constructor === Array) {
      panel.tempHTML = obj;
    } else {
      panel.tempHTML.length = 0;
    }
  };
  var getTempHTML = function () {
    return panel.tempHTML;
  };
  var getTempFeatureData = function getTempFeatureData() {
    return panel.featureData;
  };
  var setTempFeatureData = function setTempFeatureData(feature) {
    panel.featureData = feature;
  };
  var callCreatePanel = function callCreatePanel(type) {
    panel.createPanel(type);
  };
  var setPanelTitle = function setPanelTitle(title) {
    panel.title = title;
  };
  var setParcelData = function setParcelData(parcel) {
    panel.parcelData = parcel;
  };
  var getParcelData = function getParcelData() {
    return panel.parcelData;
  };
  var getTempDisplayType = function getTempDisplayType() {
    return panel.getDisplayType();
  };
  var setTempDisplayType = function setTempDisplayType(type) {
    return panel.setDisplayType(type);
  };
  var flyToPosition = function flyToPosition(params) {
    console.log(params);
    map.flyTo({
      center: [params.lng, params.lat],
      zoom: params.zoom,
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
    console.log(params);
  };
  var loadPanel = function () {
    console.log(getTempDisplayType());
    console.log(panel.displayType);
    switch (true) {
      case panel.displayType === 'parcel':
        console.log('loading parcel data');
        var localParcelData = getParcelData();
        console.log(localParcelData);
        console.log(getTempHTML());
        document.querySelector('.parcel-info.rental-info').innerHTML = '';
        document.querySelector('.info-container > .rental').innerHTML = '';
        document.querySelector('.info-container > .not-rental').innerHTML = '';
        localParcelData.propstreetcombined !== null ? document.querySelector('.info-container > .street-name').innerHTML = localParcelData.propstreetcombined : document.querySelector('.info-container > .street-name').innerHTML = 'Loading...';
        document.querySelector('.parcel-data.owner').innerHTML = panel.tempHTML[3];
        document.querySelector('.parcel-data.building').innerHTML = panel.tempHTML[4];
        map.setFilter("parcel-fill-hover", ["==", "parcelno", currentURLParams.parcel]);
        break;
      case panel.displayType === 'neighborhood':
        document.querySelector('.info-container > .street-name').innerHTML = panel.title;
        document.querySelector('.info-container > .rental').innerHTML = '';
        document.querySelector('.info-container > .total-rentals').innerHTML = "<h4>TOTAL PROPERTIES</h4><p>0</p>";
        document.querySelector('.overall-number').innerHTML = panel.tempHTML;
        document.querySelector('.info-container > .total-rentals > p').innerHTML = panel.tempData.totalNumbers;
        break;
      case panel.displayType === 'district':
        document.querySelector('.info-container > .street-name').innerHTML = panel.title;
        document.querySelector('.info-container > .rental').innerHTML = '';
        document.querySelector('.info-container > .total-rentals').innerHTML = "<h4>TOTAL PROPERTIES</h4><p>0</p>";
        document.querySelector('.overall-number').innerHTML = panel.tempHTML;
        document.querySelector('.info-container > .total-rentals > p').innerHTML = panel.tempData.totalNumbers;
        break;
      default:
        document.querySelector('.info-container > .street-name').innerHTML = panel.title;
        document.querySelector('.info-container > .rental').innerHTML = '<article class="form-btn" onclick="survey.startSurvey()">START SURVEY</article>';
        document.querySelector('.info-container > .total-rentals').innerHTML = "<h4>TOTAL PROPERTIES</h4><p>0</p>";
        document.querySelector('.overall-number').innerHTML = panel.tempHTML;
        document.querySelector('.info-container > .total-rentals > p').innerHTML = panel.tempData.totalNumbers;
    }
    document.querySelector('#info').className === 'active' ? 0 : document.querySelector('#info').className = 'active';
  };
  var panel = {
    'title': '',
    'featureData': null,
    'displayType': '',
    'parcelData': null,
    'tempHTML': [],
    'tempData': { 'registrationNumbers': 0, 'totalNumbers': 0 },
    createPanel: function (type) {
      this.setDisplayType(type);
      this.clearPanel();
      this.createPanelData();
    },
    setDisplayType: function (type) {
      this.displayType = type;
    },
    getDisplayType: function () {
      return this.displayType;
    },
    clearPanel: function () {
      console.log('clearing panel');
      this.tempData.registrationNumbers = 0;
      this.tempData.totalNumbers = 0;
      setTempHTML('clear');
      console.log(this.tempHTML);
      document.querySelector('.overall-number').innerHTML = '';
      document.querySelector('.parcel-info').innerHTML = '';
      document.querySelector('.info-container > .not-rental').innerHTML = '';
      document.querySelector('.info-container > .rental').innerHTML = '';
      document.querySelector('.info-container > .total-rentals').innerHTML = '';
      document.querySelector('.parcel-data.owner').innerHTML = '';
      document.querySelector('.parcel-data.building').innerHTML = '';
      document.querySelector('.parcel-info.display-section').innerHTML = '';
    },
    switchParcelDataViews: function switchParcelDataViews(e) {
      //cons.log(e.getAttribute('data-view'));
      switch (e.getAttribute('data-view')) {
        case 'owner':
          var tempOwnerData = '';
          tempOwnerData += '<article class="info-items"><span>OWNER CITY</span> ' + panel.parcelData.ownercity + '</article>';
          tempOwnerData += '<article class="info-items"><span>OWNER NAME</span> ' + panel.parcelData.ownername1 + '</article>';
          tempOwnerData += '<article class="info-items"><span>OWNER STATE</span> ' + panel.parcelData.ownerstate + '</article>';
          tempOwnerData += '<article class="info-items"><span>OWNER ADDRESS</span> ' + panel.parcelData.ownerstreetaddr + '</article>';
          tempOwnerData += '<article class="info-items"><span>OWNER ZIP</span> ' + panel.parcelData.ownerzip + '</article>';
          document.querySelector('.parcel-info.display-section').innerHTML = tempOwnerData;
          //cons.log(panel.parcelData);
          break;
        case 'building':
          var tempBuldingData = '';
          tempBuldingData += '<article class="info-items"><span>PARCEL NUMBER</span> ' + panel.parcelData.pnum + '</article>';
          tempBuldingData += '<article class="info-items"><span>BASEMENT AREA</span> ' + panel.parcelData.resb_basementarea + '</article>';
          tempBuldingData += '<article class="info-items"><span>BUILDING CLASS</span> ' + panel.parcelData.resb_bldgclass + '</article>';
          tempBuldingData += '<article class="info-items"><span>CALCULATED VALUE</span> $' + parseInt(panel.parcelData.resb_calcvalue).toLocaleString() + '</article>';
          tempBuldingData += '<article class="info-items"><span>EXTERIOR</span> ' + panel.parcelData.resb_exterior + '</article>';
          tempBuldingData += '<article class="info-items"><span>NUMBER OF FIREPLACES</span> ' + panel.parcelData.resb_fireplaces + '</article>';
          tempBuldingData += '<article class="info-items"><span>FLOOR AREA</span> ' + panel.parcelData.resb_floorarea.toLocaleString() + '</article>';
          tempBuldingData += '<article class="info-items"><span>GARAGE AREA</span> ' + panel.parcelData.resb_garagearea.toLocaleString() + '</article>';
          tempBuldingData += '<article class="info-items"><span>GARAGE TYPE</span> ' + panel.parcelData.resb_gartype + '</article>';
          tempBuldingData += '<article class="info-items"><span>GROUND AREA</span> ' + panel.parcelData.resb_groundarea.toLocaleString() + '</article>';
          tempBuldingData += '<article class="info-items"><span>HALF BATHS</span> ' + panel.parcelData.resb_halfbaths + '</article>';
          tempBuldingData += '<article class="info-items"><span>NUMBER OF BEDROOMS</span> ' + panel.parcelData.resb_nbed + '</article>';
          document.querySelector('.parcel-info.display-section').innerHTML = tempBuldingData;
          //cons.log(panel.parcelData);
          break;
        default:

      }
    },
    createFeatureData: function () {
      switch (true) {
        case currentURLParams.district !== '':
          console.log(currentURLParams.district.split('%20')[1]);
          $.getJSON("http://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=&text=District+" + currentURLParams.district.split('%20')[1] + "&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson", function (data) {
            console.log(data);
            setTempFeatureData(data.features[0]);
            console.log(getTempFeatureData());
            callCreatePanel('district');
          });
          break;
        case currentURLParams.neighborhood !== '':
          console.log(decodeURI(currentURLParams.neighborhood));
          $.getJSON("http://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Neighborhoods/MapServer/1/query?where=&text=" + decodeURI(currentURLParams.neighborhood) + "&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson", function (data) {
            console.log(data);
            setTempFeatureData(data.features[0]);
            console.log(getTempFeatureData());
            callCreatePanel('neighborhood');
          });
          break;
        default:
          console.log(decodeURI(currentURLParams.parcel));
          setTempFeatureData({ 'properties': { 'parcelno': currentURLParams.parcel } });
          callCreatePanel('parcel');
      }
    },
    createPanelData: function () {
      console.log(this.displayType);
      switch (true) {
        case this.displayType === 'parcel':
          setParcelData(null);
          setTempHTML('clear');
          var tempParcelDataHTML = new Array(5);
          console.log('loading parcel data');
          console.log(this.displayType);
          console.log(this.featureData.properties.parcelno);
          $.getJSON("http://apis.detroitmi.gov/assessments/parcel/" + this.featureData.properties.parcelno.replace(/\./g, '_') + "/", function (parcel) {
            setTempDisplayType('parcel');
            console.log(parcel);
            console.log(getTempDisplayType());
            tempParcelDataHTML[3] = '<div class="data-view-btn" data-view="owner" onclick="mapPanel.switchParcelDataViews(this)">OWNER INFORMATION <span>&#10095;</span></div>';
            tempParcelDataHTML[4] = '<div class="data-view-btn" data-view="building" onclick="mapPanel.switchParcelDataViews(this)">PROPERTY INFORMATION <span>&#10095;</span></div>';
            setTempHTML(tempParcelDataHTML);
            setParcelData(parcel);
            loadPanel();
          });
          flyToPosition(currentURLParams);
          break;
        case this.displayType === 'neighborhood':
          setTempHTML('clear');
          console.log('creating neighborhood panel');
          var simplifiedNeighborhood = turf.simplify(this.featureData, 0.003, false);
          console.log(simplifiedNeighborhood);
          setPanelTitle(simplifiedNeighborhood.properties.name);
          var arcNeighborhoodPolygon = Terraformer.ArcGIS.convert(simplifiedNeighborhood.geometry);
          // console.log(arcPolygon);
          $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+Initial+Registration%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry=" + encodeURI(JSON.stringify(arcNeighborhoodPolygon)) + "&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function (data) {
            console.log(getTempData());
            setTempDisplayType('neighborhood');
            var localNeighborhoodData = getTempData();
            console.log(localNeighborhoodData);
            localNeighborhoodData.totalNumbers += data.count;
            localNeighborhoodData.registrationNumbers += data.count;
            console.log(localNeighborhoodData);
            setTempData(localNeighborhoodData);
            console.log(getTempData());
            $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+Renewal+Registration%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry=" + encodeURI(JSON.stringify(arcNeighborhoodPolygon)) + "&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function (data) {
              console.log(getTempData());
              var localNeighborhoodData = getTempData();
              var localNeighborhoodHTML = getTempHTML();
              console.log(localNeighborhoodHTML);
              console.log(localNeighborhoodData);
              localNeighborhoodData.totalNumbers += data.count;
              localNeighborhoodData.registrationNumbers += data.count;
              console.log(localNeighborhoodData);
              localNeighborhoodHTML += '<article class="renewal"><span>NEED SURVEY</span> ' + localNeighborhoodData.registrationNumbers + '</article>';
              console.log(localNeighborhoodHTML);
              setTempHTML([localNeighborhoodHTML]);
              setTempData(localNeighborhoodData);
              loadPanel();
            });
          });
          flyToPosition(currentURLParams);
          break;
        case this.displayType === 'district':
          setTempHTML('clear');
          console.log('creating district panel');
          var simplifiedDistrict = turf.simplify(this.featureData, 0.003, false);
          console.log(simplifiedDistrict);
          setPanelTitle(simplifiedDistrict.properties.name);
          var arcDistrictPolygon = Terraformer.ArcGIS.convert(simplifiedDistrict.geometry);
          // console.log(arcPolygon);
          $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+Initial+Registration%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry=" + encodeURI(JSON.stringify(arcDistrictPolygon)) + "&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function (data) {
            console.log(getTempData());
            setTempDisplayType('district');
            var localDistrictData = getTempData();
            console.log(localDistrictData);
            localDistrictData.totalNumbers += data.count;
            localDistrictData.registrationNumbers += data.count;
            console.log(localDistrictData);
            setTempData(localDistrictData);
            console.log(getTempData());
            $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+Renewal+Registration%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry=" + encodeURI(JSON.stringify(arcDistrictPolygon)) + "&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function (data) {
              console.log(getTempData());
              var localDistrictData = getTempData();
              var localDistrictHTML = getTempHTML();
              console.log(localDistrictHTML);
              console.log(localDistrictData);
              localDistrictData.totalNumbers += data.count;
              localDistrictData.registrationNumbers += data.count;
              console.log(localDistrictData);
              localDistrictHTML += '<article class="renewal"><span>NEED SURVEY</span> ' + localDistrictData.registrationNumbers + '</article>';
              console.log(localDistrictHTML);
              setTempHTML([localDistrictHTML]);
              setTempData(localDistrictData);
              loadPanel();
            });
          });
          flyToPosition(currentURLParams);
          break;
        default:
          setTempHTML('clear');
          setPanelTitle('CITY OF DETROIT');
          console.log(this.tempData);
          $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+Initial+Registration%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function (data) {
            setTempDisplayType('city');
            console.log(getTempData());
            var localData = getTempData();
            console.log(localData);
            localData.totalNumbers += data.count;
            localData.registrationNumbers += data.count;
            console.log(localData);
            setTempData(localData);
            console.log(getTempData());
            $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+Renewal+Registration%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function (data) {
              console.log(getTempData());
              var localData = getTempData();
              var localHTML = getTempHTML();
              console.log(localHTML);
              console.log(localData);
              localData.totalNumbers += data.count;
              localData.registrationNumbers += data.count;
              console.log(localData);
              localHTML += '<article class="renewal"><span>NEED SURVEY</span> ' + localData.registrationNumbers + '</article>';
              console.log(localHTML);
              setTempHTML([localHTML]);
              setTempData(localData);
              loadPanel();
            });
          });
      }
    }
  };
  return panel;
}(window, surveyModule);