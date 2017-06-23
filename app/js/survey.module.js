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
    startSurvey: function(){
      console.log('dummy data');
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
      console.log('done changing classes');
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
            survey.surveyPostData.answers[0].answer = parcel.candidates[0].attributes.User_fld;
            console.log(survey.loadQuestion());
            document.querySelector('.question-container').innerHTML = survey.loadQuestion();
          });
        } catch (e) {
          console.log(e);
        }
      });
    },
    loadQuestion: function(){
      let tempHTML = '';
      tempHTML += "<h5>" + this.questionsList[this.surveyIndex] + "</h5><article class='answers'>";
      console.log(tempHTML);
      console.log(this.answerList[this.surveyIndex]);
      for (var i = 0; i < this.answerList[this.surveyIndex].length; i++) {
        switch (this.surveyIndex) {
          case 3:
            tempHTML += '<label class="checkbox">'+this.answerList[this.surveyIndex][i].text+'<input type="checkbox" value="'+ this.answerList[this.surveyIndex][i].value +'" data-next-key="'+ this.answerList[this.surveyIndex][i].nextQuestionKey +'"/></label>';
            break;
          case 4:
            tempHTML += '<label class="checkbox">'+this.answerList[this.surveyIndex][i].text+'<input type="checkbox" value="'+ this.answerList[this.surveyIndex][i].value +'" data-next-key="'+ this.answerList[this.surveyIndex][i].nextQuestionKey +'"/></label>';
            break;
          default:
            tempHTML += '<label class="radio">'+ this.answerList[this.surveyIndex][i].text +'<input type="radio" name="radio" value="'+ this.answerList[this.surveyIndex][i].value +'" data-next-key="'+ this.answerList[this.surveyIndex][i].nextQuestionKey +'"/></label>';
        }
      }
      tempHTML += "</article>";
      return tempHTML;
      this.surveyIndex ++;
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
