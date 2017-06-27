"use strict";
var surveyModule = (function(){
  var survey = {
    currentLatLng: {
      lat: null,
      lng: null
    },
    pastSurveys : false,
    surveyIndex : 0,
    imageList: null,
    surveyCurrentAddress: null,
    surveyPossibleAddress: null,
    surveyPostData : {
      'survey_id'   : 'default',
      'user_id'     : 'xyz',
      'answers'     : [
        {
          "question_id": "parcel_id",
          "answer": null
        },
        {
          "question_id": "needs_intervention",
          "answer": null
        },
        {
          "question_id": "lot_or_structure",
          "answer": null
        },
        {
          "question_id": "structure_with_blight",
          "answer": null
        },
        {
          "question_id": "elements_of_structure",
          "answer": null
        },
        {
          "question_id": "elements_of_lot",
          "answer": null
        }
      ]
    },
    questionsList: [
      'Does this parcel need intervention?',
      'Is the blighted parcel a lot or structure?',
      'Structure with Blight',
      'Elements of the Blighted Structure (select all that apply)',
      'Elements of the Blighted Lot (select all that apply)'
    ],
    answerList: [
      [
        {
          text: 'No',
          value : 'n',
          nextQuestionKey: null
        },
        {
          text: 'Yes',
          value : 'y',
          nextQuestionKey: 1
        }
      ],
      [
        {
          text: 'Vacant Lot with Blight',
          value : 'lot',
          nextQuestionKey: 4,
        },
        {
          text: 'Structure with Blight',
          value : 'structure',
          nextQuestionKey: 2,
        }
      ],
      [
        {
          text: 'Occupied/in use',
          value : 'a',
          nextQuestionKey: 3,
        },
        {
          text: 'Partially occupied/maybe in use',
          value : 'b',
          nextQuestionKey: 4,
        },
        {
          text: 'Not occupied/not in use',
          value : 'c',
          nextQuestionKey: 3,
        }
      ],
      [
        {
          text: 'Needs Demolition',
          value : 'a',
          nextQuestionKey: null,
        },
        {
          text: 'Needs Board Up',
          value : 'b',
          nextQuestionKey: null,
        },
        {
          text: 'Structure is accessible',
          value : 'c',
          nextQuestionKey: null,
        },
        {
          text: 'Has an active billboard and is a vacant blighted structure',
          value : 'd',
          nextQuestionKey: null,
        },
        {
          text: 'Has an inactive billboard and is a vacant blighted structure',
          value : 'e',
          nextQuestionKey: null,
        },
        {
          text: 'Blighted signs/awnings',
          value : 'f',
          nextQuestionKey: null,
        },
        {
          text: 'Graffiti, posters on poles or walls, etc.',
          value : 'g',
          nextQuestionKey: null,
        },
        {
          text: 'Overgrown grass, brush, and trees',
          value : 'h',
          nextQuestionKey: null,
        },
        {
          text: 'Cement piles',
          value : 'i',
          nextQuestionKey: null,
        },
        {
          text: 'Large dirt piles',
          value : 'j',
          nextQuestionKey: null,
        },
        {
          text: 'Tires illegally dumped',
          value : 'k',
          nextQuestionKey: null,
        },
        {
          text: 'Broken/abandoned fences',
          value : 'l',
          nextQuestionKey: null,
        },
        {
          text: 'Abandoned cars (2 or less)',
          value : 'm',
          nextQuestionKey: null,
        },
        {
          text: 'Abandoned cars (3 or more)',
          value : 'n',
          nextQuestionKey: null,
        },
        {
          text: 'other',
          value : 'o',
          nextQuestionKey: null,
        }
      ],
      [
        {
          text: 'Has an active billboard and is a vacant blighted structure',
          value : 'a',
          nextQuestionKey: null,
        },
        {
          text: 'Has an inactive billboard and is a vacant blighted structure',
          value : 'b',
          nextQuestionKey: null,
        },
        {
          text: 'Lot is accessible',
          value : 'c',
          nextQuestionKey: null,
        },
        {
          text: 'Blighted signs/awnings',
          value : 'd',
          nextQuestionKey: null,
        },
        {
          text: 'Graffiti, posters on poles or walls, etc.',
          value : 'e',
          nextQuestionKey: null,
        },
        {
          text: 'Overgrown grass, brush, and trees',
          value : 'f',
          nextQuestionKey: null,
        },
        {
          text: 'Cement piles',
          value : 'g',
          nextQuestionKey: null,
        },
        {
          text: 'Large dirt piles',
          value : 'h',
          nextQuestionKey: null,
        },
        {
          text: 'Tires illegally dumped',
          value : 'i',
          nextQuestionKey: null,
        },
        {
          text: 'Broken/abandoned fences',
          value : 'j',
          nextQuestionKey: null,
        },
        {
          text: 'Abandoned cars (2 or less)',
          value : 'k',
          nextQuestionKey: null,
        },
        {
          text: 'Abandoned cars (3 or more)',
          value : 'l',
          nextQuestionKey: null,
        },
        {
          text: 'other',
          value : 'm',
          nextQuestionKey: null,
        }
      ]
    ],
    setSurveyPossibleeAddress: function(value){
      this.surveyPossibleAddress = value;
    },
    getSurveyPossibleeAddress: function(){
      return this.surveyPossibleAddress;
    },
    setSurveyCurrentAddress: function(value){
      this.surveyCurrentAddress = value;
    },
    getSurveyCurrentAddress: function(){
      return this.surveyCurrentAddress;
    },
    setCurrentLatLng: function(value){
      this.currentLatLng.lat = value.lat;
      this.currentLatLng.lng = value.lng;
    },
    getCurrentLatLng: function(){
      return this.currentLatLng;
    },
    setPastSurveys: function(value){
      this.pastSurveys = value;
    },
    getPastSurveys: function(){
      return this.pastSurveys;
    },
    setSurveyIndex: function(value) {
      this.surveyIndex = value;
    },
    getSurveyIndex: function(){
      return this.surveyIndex;
    },
    getAnswerSet: function(index){
      return this.answerList[index];
    },
    getQuestion: function(index){
      return this.questionsList[index];
    },
    getPostData: function(){
      return this.surveyPostData;
    },
    clearSurvey: function(){
      this.surveyIndex = 0;
      this.surveyPostData.answers.forEach(function(item){
        item.answer = null;
      });
    },
    setPostData: function(index, value){
      console.log(value);
      console.log(index);
      console.log(this.surveyPostData.answers);
      console.log(this.surveyPostData.answers[index]);
      if(Array.isArray(value)){
        let tempAnswer = '';
        let valueSize = value.length;
        value.forEach(function(item, index){
          tempAnswer += item.value;
          console.log(index);

          ((index + 1) < valueSize) ? tempAnswer += ',' : 0;

        });
        console.log(tempAnswer);
        this.surveyPostData.answers[index].answer = tempAnswer;
      }else{
        this.surveyPostData.answers[index].answer = value;
      }
    },
    loadSurveyWithinCorridor: function(){
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
      $.getJSON("http://gis.detroitmi.gov/arcgis/rest/services/DoIT/Corridor_Boundaries/MapServer/0/query?where=Corridor%3D%27"+ corridorName +"%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson", function( corridor ) {
        console.log(corridor);
        var simplifiedCorridor = turf.simplify(corridor.features[0], 0.003, false);
        console.log(simplifiedCorridor);
        var arcCorridorPolygon = Terraformer.ArcGIS.convert(simplifiedCorridor.geometry);
        console.log(arcCorridorPolygon);
       $.getJSON("http://gis.detroitmi.gov/arcgis/rest/services/DoIT/Commercial/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry="+ encodeURI(JSON.stringify(arcCorridorPolygon))+"&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json", function( data ) {
         console.log(data);
         var randomParcel = data.features[Math.floor(Math.random()*data.features.length)];
         var llb = new mapboxgl.LngLatBounds(randomParcel.geometry.rings[0]);
         var center = llb.getCenter();
         console.log(center);
         mly.moveCloseTo(center.lat, center.lng)
           .then(
               function(node) { console.log(node.key); },
               function(error) { console.error(error); });
       });
     });
    },
    startSurvey: function(){
      console.log(currentURLParams.parcel);
      console.log(getQueryVariable('parcel'));
      console.log(getQueryVariable('lat'));
      console.log(getQueryVariable('lng'));
      console.log(getQueryVariable('survey'));
      if(getQueryVariable('survey') === 'on'){
        this.loadSurveyWithinCorridor();
      }else{
        if(getQueryVariable('parcel')){
          mly.moveCloseTo(getQueryVariable('lat'), getQueryVariable('lng'))
            .then(
                function(node) { console.log(node.key); },
                function(error) { console.error(error); });
        }else{
          this.loadSurveyWithinCorridor();
        }
        this.displaySurveyPanels();
      }
    },
    startNewSurvey: function(){
      survey.setPastSurveys(false);
      survey.loadHTML();
    },
    loadAnotherSurvey: function(){
      document.querySelector('.survey-display > .street-name > h1').innerHTML = 'LOADING<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span>';
      this.clearAnswersButtons();
      this.startSurvey();
    },
    displaySurveyPanels: function(){
      (document.querySelector('#info').className === 'active') ? document.querySelector('#info').className = '' : 0;
      (document.querySelector('#survey').className === 'active') ? 0 : document.querySelector('#survey').className = 'active';
      (document.querySelector('#map-survey').className === 'survey-on') ? 0 : document.querySelector('#map-survey').className = 'survey-on';
      (document.querySelector('#map-survey > .survey-display').className === 'survey-display') ? document.querySelector('#map-survey > .survey-display').className = 'survey-display survey-on': 0;
      (document.querySelector('#map').className === 'mapboxgl-map') ? document.querySelector('#map').className = 'mapboxgl-map survey-on' : 0;
      (document.querySelector('#legend').className === 'survey-on') ? 0 : document.querySelector('#legend').className = 'survey-on';
      (document.querySelector('.mapboxgl-control-container').className === 'mapboxgl-control-container') ? document.querySelector('.mapboxgl-control-container').className = 'mapboxgl-control-container survey-on' : 0;
      setTimeout(function() {
        mly.resize();
        map.resize();
      }, 500);
    },
    getParcelData: function(lngLat){
      $.getJSON('http://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/reverseGeocode?location=%7B%22x%22%3A+'+lngLat[0]+'%2C%22y%22%3A+'+lngLat[1]+'%2C%22spatialReference%22%3A+%7B%22wkid%22%3A+4326%7D%7D&distance=&langCode=&outSR=4326&returnIntersection=false&f=pjson' , function( data ) {
        console.log(data);
        survey.setSurveyPossibleeAddress(data.address.Street);
        console.log(survey.getSurveyPossibleeAddress());
        try {
          var tempArr = data.address.Street.split(' ');
          var addr = '';
          for (var i = 0; i < tempArr.length; i++) {
            addr += tempArr[i];
            ((i < tempArr.length) && (i + 1) !== tempArr.length) ? addr += '+': 0;
          }
          $.getJSON('http://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/findAddressCandidates?Street=&City=&ZIP=&SingleLine='+ addr +'&category=&outFields=User_fld&maxLocations=&outSR=&searchExtent=&location=&distance=&magicKey=&f=pjson' , function( parcel ) {
            console.log(parcel.candidates[0].attributes.User_fld);
            console.log(getQueryVariable('survey'));
            let tempParcel = survey.getPostData().answers[0].answer;
            console.log(tempParcel);
            survey.setSurveyCurrentAddress(survey.getSurveyPossibleeAddress());
            document.querySelector('.survey-display > .street-name > h1').innerHTML = survey.getSurveyCurrentAddress();
            map.setFilter("parcel-fill-hover", ["==", "parcelno", parcel.candidates[0].attributes.User_fld]);
            let cleanParcelID = parcel.candidates[0].attributes.User_fld;
            console.log(cleanParcelID);
            cleanParcelID = cleanParcelID.replace(/\./g,'_');
            console.log(cleanParcelID);
            switch (true) {
              case tempParcel === null:
                survey.setPostData(0,parcel.candidates[0].attributes.User_fld);
                $.getJSON('http://apis.detroitmi.gov/photo_survey/count/'+cleanParcelID+'/' , function( surveys ) {
                  console.log('new parcel');
                  (surveys.count > 0) ? survey.setPastSurveys(true) : survey.setPastSurveys(false);
                  survey.loadHTML();
                });
                break;
              case getQueryVariable('survey') === 'on' && tempParcel !== parcel.candidates[0].attributes.User_fld:
                console.log('clear survey');
                survey.clearSurvey();
                survey.setPostData(0,parcel.candidates[0].attributes.User_fld);
                $.getJSON('http://apis.detroitmi.gov/photo_survey/count/'+cleanParcelID+'/' , function( surveys ) {
                  console.log(surveys.count);
                  (surveys.count > 0) ? survey.setPastSurveys(true) : survey.setPastSurveys(false);
                  survey.loadHTML();
                });
                break;
              default:
                console.log('same parcel');
                $.getJSON('http://apis.detroitmi.gov/photo_survey/count/'+cleanParcelID+'/' , function( surveys ) {
                  console.log(surveys.count);
                  (surveys.count > 0) ? survey.setPastSurveys(true) : survey.setPastSurveys(false);
                });
            }
          });
        } catch (e) {
          console.log(e);
        }
      });
    },
    submitAnswer: function(){
      let allAnswers = document.querySelectorAll('.answer-options');
      let itemsChecked = 0;
      let selectedAnswers = [];
      allAnswers.forEach(function(item) {
        if(item.checked === true){
          console.log(item);
          selectedAnswers.push(item);
          itemsChecked++;
        }
      });
      if(itemsChecked > 0){
        console.log('answers was selected');
        console.log(survey.getSurveyIndex());
        switch (survey.getSurveyIndex()) {
          case 0:
            console.log(selectedAnswers);
            console.log(typeof(selectedAnswers[0].getAttribute('data-next-key')));
            survey.setPostData(1, selectedAnswers[0].value);
            if(selectedAnswers[0].getAttribute('data-next-key') === 'null'){
              survey.submitSurvey();
            }else{
              survey.setSurveyIndex(parseInt(selectedAnswers[0].getAttribute('data-next-key')));
              console.log(survey.getSurveyIndex());
              survey.loadHTML();
            }
            break;
          case 1:
            console.log(selectedAnswers);
            survey.setPostData(2, selectedAnswers[0].value);
            survey.setSurveyIndex(parseInt(selectedAnswers[0].getAttribute('data-next-key')));
            console.log(survey.getSurveyIndex());
            survey.loadHTML();
            break;
          case 2:
            console.log(selectedAnswers);
            survey.setPostData(3, selectedAnswers[0].value);
            survey.setSurveyIndex(parseInt(selectedAnswers[0].getAttribute('data-next-key')));
            console.log(survey.getSurveyIndex());
            survey.loadHTML();
            break;
          case 3:
            console.log(selectedAnswers);
            survey.setPostData(4, selectedAnswers);
            if(selectedAnswers[0].getAttribute('data-next-key') === 'null'){
              survey.submitSurvey();
            }else{
              survey.setSurveyIndex(parseInt(selectedAnswers[0].getAttribute('data-next-key')));
              console.log(survey.getSurveyIndex());
              survey.loadHTML();
            }
            break;
          default:
            console.log(selectedAnswers);
            survey.setPostData(5, selectedAnswers);
            if(selectedAnswers[0].getAttribute('data-next-key') === 'null'){
              survey.submitSurvey();
            }else{
              survey.setSurveyIndex(parseInt(selectedAnswers[0].getAttribute('data-next-key')));
              console.log(survey.getSurveyIndex());
              survey.loadHTML();
            }
        }
      }else{
        console.log('answer was not selected');
      }
    },
    clearAnswersButtons: function(){
      document.querySelector('.question-container').innerHTML = '';
      document.querySelector('.survey-buttons').innerHTML = '';
    },
    loadHTML: function(){
      if(survey.getPastSurveys()){
        document.querySelector('.question-container').innerHTML = '<h5>Parcel was already surveyed</h5>';
        document.querySelector('.survey-buttons').innerHTML = '<button onclick="survey.startNewSurvey()">Start New Survey</button>';
      }else{
        document.querySelector('.question-container').innerHTML = survey.loadQuestion();
        document.querySelector('.survey-buttons').innerHTML = '<button onclick="survey.submitAnswer()">NEXT</button>';
      }
    },
    submitSurvey: function(){
      console.log('submitting survey');
      let tempData = survey.getPostData();
      console.log(tempData);
      let tempParcel = tempData.answers[0].answer;
      let cleanAnswer = [];
      tempData.answers.forEach(function(item){
        (item.answer !== null) ? cleanAnswer.push(item) : 0;
      });
      let newData =  {
        'survey_id'   : 'default',
        'user_id'     : 'xyz',
        'answers'     : cleanAnswer
      };
      console.log(tempData);
      tempParcel = tempParcel.replace(/\./g,'-');
      survey.sendDataTOServer('http://apis.detroitmi.gov/photo_survey/survey/'+tempParcel+'/', newData);
    },
    sendDataTOServer: function (url, data, success) {
      data = JSON.stringify(data);
      console.log(data);
      $.ajax({
          url: url,
          type: "POST",
          data: data,
          dataType:'json',
          success: function(response){
            document.querySelector('.survey-buttons').innerHTML = '<button onclick="survey.loadAnotherSurvey()">START OTHER SURVEY</button>';
            document.querySelector('.question-container').innerHTML = '<h5>Your surveys has been saved.</h5>'
          },
          error: function(error){
              console.log("Something went wrong", error);
          }
      });
    },
    loadQuestion: function(){
      console.log(survey.getSurveyIndex());
      console.log(survey.surveyIndex);
      let tempHTML = '';
      let tempIndex = this.getSurveyIndex();
      let tempQuestion = this.getQuestion(tempIndex);
      let tempAnswers = this.getAnswerSet(tempIndex);
      console.log(tempIndex);
      console.log(tempQuestion);
      console.log(tempAnswers);
      tempHTML += "<h5>" + this.questionsList[tempIndex] + "</h5><article class='answers'>";
      console.log(tempHTML);
      console.log(this.answerList[tempIndex]);
      for (var i = 0; i < this.answerList[tempIndex].length; i++) {
        switch (tempIndex) {
          case 3:
            tempHTML += '<label class="checkbox"><input class="answer-options" type="checkbox" value="'+ this.answerList[tempIndex][i].value +'" data-next-key="'+ this.answerList[tempIndex][i].nextQuestionKey +'"/>'+this.answerList[tempIndex][i].text+'</label>';
            break;
          case 4:
            tempHTML += '<label class="checkbox"><input class="answer-options" type="checkbox" value="'+ this.answerList[tempIndex][i].value +'" data-next-key="'+ this.answerList[tempIndex][i].nextQuestionKey +'"/>'+this.answerList[tempIndex][i].text+'</label>';
            break;
          default:
            tempHTML += '<label class="radio"><input class="answer-options" type="radio" name="radio" value="'+ this.answerList[tempIndex][i].value +'" data-next-key="'+ this.answerList[tempIndex][i].nextQuestionKey +'"/>'+ this.answerList[tempIndex][i].text +'</label>';
        }
      }
      tempHTML += "</article>";
      console.log(tempHTML);
      return tempHTML;
    },
    updateImageList : function updateImageList(arr){
      this.imageList = arr;
      console.log(this.imageList);
    },
    getSurveyImageIDs: function(){
      $.getJSON("http://apis.detroitmi.gov/photo_survey/02006213-7/", function( data ) {
        console.log(data);
        survey.updateImageList(data.images);
        survey.getBase64Data();
      });
    },
    getBase64Data: function(){
      let tempImageList = this.imageList;
      $.getJSON("http://apis.detroitmi.gov/photo_survey/image/"+tempImageList[0]+"/", function( data ) {
        survey.loadImage(data);
      });
    },
    loadImage: function(data){
      document.getElementById('base-64').src = "data:image/jpeg;base64," + data;
    }
  };
  return survey;
})(window);
