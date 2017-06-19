"use strict";
var mapSectionClickModule = (function(){
  map.on('click', function (e) {
    console.log(e);
    var councilFeatures = null;
    var neighborhoodsFeatures = null;
    var parcelFeatures = null;
    try {
      councilFeatures = map.queryRenderedFeatures(e.point, { layers: ['council-fill'] });
      neighborhoodsFeatures = map.queryRenderedFeatures(e.point, { layers: ['neighborhoods-fill'] });
      parcelFeatures = map.queryRenderedFeatures(e.point, { layers: ['parcel-fill'] });
    } catch (e) {
      //console.log("ERROR: " +e);
    } finally {
      //console.log(councilFeatures.length);
      //console.log(neighborhoodsFeatures.length);
      //console.log(parcelFeatures.length);
    }
    switch (true) {
      case councilFeatures.length !== 0:
        mapPanel.featureData = councilFeatures[0];
        updateURLParams([13,e.lngLat.lng, e.lngLat.lat, '',councilFeatures[0].properties.name]);
        mapPanel.createPanel('district');
        break;
      case neighborhoodsFeatures.length !== 0:
        mapPanel.featureData = neighborhoodsFeatures[0];
        updateURLParams([16,e.lngLat.lng, e.lngLat.lat, '','',neighborhoodsFeatures[0].properties.name]);
        mapPanel.createPanel('neighborhood');
        break;
      case parcelFeatures.length !== 0:
        mapPanel.featureData = parcelFeatures[0];
        updateURLParams([16,e.lngLat.lng, e.lngLat.lat, parcelFeatures[0].properties.parcelno,'','']);
        mapPanel.createPanel('parcel');
        break;
      default:

      }
  });
})(window);
