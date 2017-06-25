"use strict";
var surveyModule = (function(){
  var survey = {
    surveyIndex : 0,
    imageList: null,
    surveyStatus : false,
    surveyPostData : {
      'sureve_id'   : 'default',
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
          nextQuestionKey: 3,
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
    setPostData: function(index, value){
      if(Array.isArray(value)){
        console.log(value);
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
    startSurvey: function(){
      console.log(currentURLParams.parcel);
      this.displaySurveyPanels();
    },
    displaySurveyPanels: function(){
      (document.querySelector('#info').className === 'active') ? document.querySelector('#info').className = '' : 0;
      (document.querySelector('#survey').className === 'active') ? 0 : document.querySelector('#survey').className = 'active';
      (document.querySelector('#map-survey').className === 'survey-on') ? 0 : document.querySelector('#map-survey').className = 'survey-on';
      (document.querySelector('#map-survey > .survey-display').className === 'survey-display') ? document.querySelector('#map-survey > .survey-display').className = 'survey-display survey-on': 0;
      (document.querySelector('#map').className === 'mapboxgl-map') ? 0 : document.querySelector('#map').className = 'mapboxgl-map survey-on';
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
        try {
          document.querySelector('.survey-display > .street-name > h1').innerHTML = data.address.Street;
          var tempArr = data.address.Street.split(' ');
          var addr = '';
          for (var i = 0; i < tempArr.length; i++) {
            addr += tempArr[i];
            ((i < tempArr.length) && (i + 1) !== tempArr.length) ? addr += '+': 0;
          }
          $.getJSON('http://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/findAddressCandidates?Street=&City=&ZIP=&SingleLine='+ addr +'&category=&outFields=User_fld&maxLocations=&outSR=&searchExtent=&location=&distance=&magicKey=&f=pjson' , function( parcel ) {
            console.log(parcel.candidates[0].attributes.User_fld);
            map.setFilter("parcel-fill-hover", ["==", "parcelno", parcel.candidates[0].attributes.User_fld]);
            survey.setPostData(0,parcel.candidates[0].attributes.User_fld);
            survey.loadHTML();
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
    loadHTML: function(){
      document.querySelector('.question-container').innerHTML = survey.loadQuestion();
      document.querySelector('.survey-buttons').innerHTML = '<button onclick="survey.submitAnswer()">NEXT</button>';
    },
    submitSurvey: function(){
      console.log('submitting survey');
      console.log(survey.getPostData());
      survey.sendDataTOServer('http://apis.detroitmi.gov/photo_survey/', survey.getPostData(), function(response){
          console.log(response);
          // document.querySelector('.phone-valid-alert').className = 'phone-valid-alert active';
      });
    },
    sendDataTOServer: function (url, data, success) {
      var params = typeof data == 'string' ? data : Object.keys(data).map(
              function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]); }
          ).join('&');
      console.log(params);
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.open('POST', url);
      xhr.onload  = function() {
        if (xhr.readyState>3 && xhr.status==200) {
          console.log('xhr success');
          success(xhr.responseText);
        }else{
          console.log('xhr error');
          // document.querySelector('.invalid-phone-error-message').innerHTML = 'There was an error with your request. Please try again.';
          // document.querySelector('.phone-invalid-alert').className = 'phone-invalid-alert active';
        }
      };
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.addEventListener("error", function(e){
        console.log(e);
      });
      xhr.send(params);
      return xhr;
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