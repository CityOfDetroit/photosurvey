"use strict";

var surveyModule = function () {
  var survey = {
    questionsList: ['Is the blighted parcel a lot or structure?', 'Structure with Blight', 'Elements of the Blighted Structure (select all that apply)', 'Elements of the Blighted Lot (select all that apply)'],
    answerList: [[{
      value: 'Vacant Lot with Blight',
      nextQuestionKey: 3
    }, {
      value: 'Structure with Blight',
      nextQuestionKey: 1
    }], [{
      value: 'Occupied/in use',
      nextQuestionKey: 2
    }, {
      value: 'Partially occupied/maybe in use',
      nextQuestionKey: 2
    }, {
      value: 'Not occupied/not in use',
      nextQuestionKey: 2
    }], [{
      value: 'Needs Demolition',
      nextQuestionKey: null
    }, {
      value: 'Needs Board Up',
      nextQuestionKey: null
    }, {
      value: 'Structure is accessible',
      nextQuestionKey: null
    }, {
      value: 'Has an active billboard and is a vacant blighted structure',
      nextQuestionKey: null
    }, {
      value: 'Has an inactive billboard and is a vacant blighted structure',
      nextQuestionKey: null
    }, {
      value: 'Blighted signs/awnings',
      nextQuestionKey: null
    }, {
      value: 'Graffiti, posters on poles or walls, etc.',
      nextQuestionKey: null
    }, {
      value: 'Overgrown grass, brush, and trees',
      nextQuestionKey: null
    }, {
      value: 'Cement piles',
      nextQuestionKey: null
    }, {
      value: 'Large dirt piles',
      nextQuestionKey: null
    }, {
      value: 'Tires illegally dumped',
      nextQuestionKey: null
    }, {
      value: 'Broken/abandoned fences',
      nextQuestionKey: null
    }, {
      value: 'Abandoned cars (2 or less)',
      nextQuestionKey: null
    }, {
      value: 'Abandoned cars (3 or more)',
      nextQuestionKey: null
    }, {
      value: 'other',
      nextQuestionKey: null
    }], [{
      value: 'Has an active billboard and is a vacant blighted lot',
      nextQuestionKey: null
    }, {
      value: 'Has an inactive billboard and is a vacant blighted lot',
      nextQuestionKey: null
    }, {
      value: 'Blighted signs/awnings',
      nextQuestionKey: null
    }, {
      value: 'Graffiti, posters on poles or walls, etc.',
      nextQuestionKey: null
    }, {
      value: 'Overgrown grass, brush, and trees',
      nextQuestionKey: null
    }, {
      value: 'Cement piles',
      nextQuestionKey: null
    }, {
      value: 'Large dirt piles',
      nextQuestionKey: null
    }, {
      value: 'Tires illegally dumped',
      nextQuestionKey: null
    }, {
      value: 'Broken/abandoned fences',
      nextQuestionKey: null
    }, {
      value: 'Abandoned cars (2 or less)',
      nextQuestionKey: null
    }, {
      value: 'Abandoned cars (3 or more)',
      nextQuestionKey: null
    }, {
      value: 'other',
      nextQuestionKey: null
    }]],
    sendDataToPanel: function () {
      console.log('dummy data');
    }
  };
  return survey;
}(window);