"use strict";
var surveyModule = (function(){
  var survey = {
    imageList: null,
    questionsList: [
      'Is the blighted parcel a lot or structure?',
      'Structure with Blight',
      'Elements of the Blighted Structure (select all that apply)',
      'Elements of the Blighted Lot (select all that apply)'
    ],
    answerList: [
      [
        {
          value: 'Vacant Lot with Blight',
          nextQuestionKey: 3,
        },
        {
          value: 'Structure with Blight',
          nextQuestionKey: 1,
        }
      ],
      [
        {
          value: 'Occupied/in use',
          nextQuestionKey: 2,
        },
        {
          value: 'Partially occupied/maybe in use',
          nextQuestionKey: 2,
        },
        {
          value: 'Not occupied/not in use',
          nextQuestionKey: 2,
        }
      ],
      [
        {
          value: 'Needs Demolition',
          nextQuestionKey: null,
        },
        {
          value: 'Needs Board Up',
          nextQuestionKey: null,
        },
        {
          value: 'Structure is accessible',
          nextQuestionKey: null,
        },
        {
          value: 'Has an active billboard and is a vacant blighted structure',
          nextQuestionKey: null,
        },
        {
          value: 'Has an inactive billboard and is a vacant blighted structure',
          nextQuestionKey: null,
        },
        {
          value: 'Blighted signs/awnings',
          nextQuestionKey: null,
        },
        {
          value: 'Graffiti, posters on poles or walls, etc.',
          nextQuestionKey: null,
        },
        {
          value: 'Overgrown grass, brush, and trees',
          nextQuestionKey: null,
        },
        {
          value: 'Cement piles',
          nextQuestionKey: null,
        },
        {
          value: 'Large dirt piles',
          nextQuestionKey: null,
        },
        {
          value: 'Tires illegally dumped',
          nextQuestionKey: null,
        },
        {
          value: 'Broken/abandoned fences',
          nextQuestionKey: null,
        },
        {
          value: 'Abandoned cars (2 or less)',
          nextQuestionKey: null,
        },
        {
          value: 'Abandoned cars (3 or more)',
          nextQuestionKey: null,
        },
        {
          value: 'other',
          nextQuestionKey: null,
        }
      ],
      [
        {
          value: 'Has an active billboard and is a vacant blighted lot',
          nextQuestionKey: null,
        },
        {
          value: 'Has an inactive billboard and is a vacant blighted lot',
          nextQuestionKey: null,
        },
        {
          value: 'Blighted signs/awnings',
          nextQuestionKey: null,
        },
        {
          value: 'Graffiti, posters on poles or walls, etc.',
          nextQuestionKey: null,
        },
        {
          value: 'Overgrown grass, brush, and trees',
          nextQuestionKey: null,
        },
        {
          value: 'Cement piles',
          nextQuestionKey: null,
        },
        {
          value: 'Large dirt piles',
          nextQuestionKey: null,
        },
        {
          value: 'Tires illegally dumped',
          nextQuestionKey: null,
        },
        {
          value: 'Broken/abandoned fences',
          nextQuestionKey: null,
        },
        {
          value: 'Abandoned cars (2 or less)',
          nextQuestionKey: null,
        },
        {
          value: 'Abandoned cars (3 or more)',
          nextQuestionKey: null,
        },
        {
          value: 'other',
          nextQuestionKey: null,
        }
      ],
    ],
    startSurvey: function(){
      console.log('dummy data');
      console.log(currentURLParams.parcel);
      this.getSurveyImageIDs();
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
        (document.querySelector('#info').className === 'active') ? document.querySelector('#info').className = '' : 0;
        (document.querySelector('#survey').className === 'active') ? 0 : document.querySelector('#survey').className = 'active';
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
