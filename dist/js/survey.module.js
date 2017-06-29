"use strict";

var surveyModule = function () {
  var survey = {
    currentLatLng: {
      lat: null,
      lng: null
    },
    pastSurveys: false,
    surveyIndex: 0,
    surveyCurrentAddress: null,
    surveyPossibleAddress: null,
    surveyPostData: {
      'survey_id': 'default_combined',
      'user_id': 'xyz',
      'answers': [{
        "question_id": "is_structure_on_site",
        "answer": null
      }, {
        "question_id": "is_structure_occupied",
        "answer": null
      }, {
        "question_id": "site_use_type",
        "answer": null
      }, {
        "question_id": "num_residential_units",
        "answer": null
      }, {
        "question_id": "residence_type",
        "answer": null
      }, {
        "question_id": "commercial_occupants_type",
        "answer": null
      }, {
        "question_id": "industrial_occupants_type",
        "answer": null
      }, {
        "question_id": "institutional_occupants_type",
        "answer": null
      }, {
        "question_id": "structure_condition",
        "answer": null
      }, {
        "question_id": "is_structure_fire_damaged",
        "answer": null
      }, {
        "question_id": "fire_damage_level",
        "answer": null
      }, {
        "question_id": "is_structure_secure",
        "answer": null
      }, {
        "question_id": "site_use",
        "answer": null
      }, {
        "question_id": "is_lot_maintained",
        "answer": null
      }, {
        "question_id": "is_dumping_on_site",
        "answer": null
      }, {
        "question_id": "blighted_lot_elements",
        "answer": null
      }, {
        "question_id": "blighted_structure_elements",
        "answer": null
      }]
    },
    questionsList: ['Is there a structure on the site?', 'Is the structure occupied?', 'What is this site used for?', 'How many residential units?', 'What type of residences?', 'What type of commercial occupant(s)?', 'What type of industrial occupant(s)?', 'What type of institutional occupant(s)?', 'What is the condition of the structure?', 'Is the structure fire damaged?', 'What is the level of fire damage?', 'Is the building secure or open to trespass?', 'What is the site used for?', 'Is the lot maintained?', 'Is there dumping on the site?', 'Elements of the Blighted Lot  (select all that apply)', 'Elements of the Blighted Structure (select all that apply)'],
    answerList: [[{
      text: '<strong>Yes:</strong> A structure is a permanent building located on the site. This includes houses, garages, buildings - anything built on a foundation.',
      value: 'y',
      nextQuestionKey: 1
    }, {
      text: '<strong>No:</strong> If the site is empty or has temporary structures, like trailers, temporary sheds, or mobile homes, then it does not have a structure on site. ',
      value: 'n',
      nextQuestionKey: 12
    }], [{
      text: '<strong>Occupied:</strong> The structure shows visible activity and consistent use or maintenance. Common characteristics are: porch furniture, a well-kept lawn, good landscaping, fences, cars in the driveway, a maintained garden, or a play area.',
      value: 'a',
      nextQuestionKey: 2
    }, {
      text: '<strong>Unoccupied:</strong> Common characteristics are: neglected facades, eviction notices, empty interiors, substantial physical or structural damages, extensive security measures, uncut or tall grass, weeds, scrub trees, trash or debris accumulated over time, or accumulated flyers on the porch or door.',
      value: 'b',
      nextQuestionKey: 2
    }, {
      text: '<strong>Partially occupied:</strong> One or more units in a multi-unit dwelling are occupied, while others are clearly vacant.',
      value: 'c',
      nextQuestionKey: 2
    }, {
      text: '<strong>Possibly Unoccupied:</strong> The property displays characteristics from both categories above, making it difficult to assess whether there is consistent use or maintenance.',
      value: 'd',
      nextQuestionKey: 2
    }], [{
      text: '<strong>Residential:</strong> Includes single-family homes, duplexes, apartment buildings, senior living facilities, condominiums, and row houses.',
      value: 'a',
      nextQuestionKey: 3
    }, {
      text: '<strong>Commercial:</strong> Includes properties used for retail, office, entertainment, hotels, parking, and other services.',
      value: 'b',
      nextQuestionKey: 5
    }, {
      text: '<strong>Mixed-use Residential / Commercial:</strong> Includes multi-level structures where the ground level supports commercial uses like retail, while the top levels support residential uses like apartments, condominiums, lofts, etc.',
      value: 'c',
      nextQuestionKey: 5
    }, {
      text: '<strong>Industrial:</strong> Includes properties used for manufacturing, storage areas, warehousing, junk yards, landfill operations, and waste disposal sites.',
      value: 'd',
      nextQuestionKey: 6
    }, {
      text: '<strong>Institutional:</strong> Includes all public and religious buildings, including churches, schools, government offices, libraries, permanent park structures, and hospitals.',
      value: 'e',
      nextQuestionKey: 7
    }, {
      text: '<strong>Unknown:</strong> The use of the property cannot be determined from looking at the outside alone.',
      value: 'e',
      nextQuestionKey: 3
    }], [{
      text: '<strong>Garage or Shed:</strong> A detached garage or shed which is the only structure on the parcel.',
      value: 'a',
      nextQuestionKey: 4
    }, {
      text: '<strong>Single Family:</strong> A house designed for occupancy for one family and has only one address number.',
      value: 'b',
      nextQuestionKey: 4
    }, {
      text: '<strong>Multi-Family:</strong> A single building designed for occupancy for one to three families with multiple addresses.',
      value: 'c',
      nextQuestionKey: 4
    }, {
      text: '<strong>Apartments:</strong> Individual or multiple buildings designed for occupancy by 4 or more families.',
      value: 'd',
      nextQuestionKey: 4
    }], [{
      text: '<strong>Single Family:</strong> A house designed for occupancy for one family and has only one address number.',
      value: 'a',
      nextQuestionKey: 5
    }, {
      text: '<strong>Multi-Family:</strong> A single building designed for occupancy for one to three families with multiple addresses.',
      value: 'b',
      nextQuestionKey: 5
    }, {
      text: '<strong>Apartments:</strong> Individual or multiple buildings designed for occupancy by 4 or more families.',
      value: 'c',
      nextQuestionKey: 5
    }], [{
      text: '<strong>Restaurant / Bar:</strong> Stand-alone eateries and drinking establishments',
      value: 'a',
      nextQuestionKey: 8
    }, {
      text: '<strong>Grocery:</strong> Stand-alone stores where people can buy food. Sale of food may not be the primary purpose of the business. Includes liquor stores.',
      value: 'b',
      nextQuestionKey: 8
    }, {
      text: '<strong>Retail:</strong> Stores that sell items to the general public.',
      value: 'c',
      nextQuestionKey: 8
    }, {
      text: '<strong>Service:</strong> Businesses that provide a service to the general public, including banks, hair salons, tattoo parlors, auto repair shops',
      value: 'd',
      nextQuestionKey: 8
    }, {
      text: '<strong>Offices:</strong> Businesses that provide services or office spaces for individual or multiple tenants.',
      value: 'e',
      nextQuestionKey: 8
    }, {
      text: '<strong>Entertainment:</strong> Structures whose sole purpose is to provide entertainment.',
      value: 'f',
      nextQuestionKey: 8
    }, {
      text: '<strong>Multi-occupant:</strong> A building housing multiple commercial business, but no residential units. Strip malls.',
      value: 'g',
      nextQuestionKey: 8
    }, {
      text: '<strong>Other:</strong> For when you’re unsure about what the commercial building is being used for.',
      value: 'g',
      nextQuestionKey: 8
    }], [{
      text: '<strong>Industrial:</strong> Manufacturing and production plants that generally don’t do business with the public.',
      value: 'a',
      nextQuestionKey: 8
    }, {
      text: '<strong>Warehouses:</strong> Buildings that store goods, but don’t produce them. Indicators include large loading docks and signage indicating warehouse use. May be multi-story.',
      value: 'b',
      nextQuestionKey: 8
    }, {
      text: '<strong>Multi-Occupant:</strong> Multi-occupant industrial buildings have multiple tenants or companies, and are sometimes located in industrial parks.',
      value: 'c',
      nextQuestionKey: 8
    }, {
      text: '<strong>Other:</strong> For when you’re unsure about what the industrial building is being used for.',
      value: 'd',
      nextQuestionKey: 8
    }], [{
      text: '<strong>Schools:</strong> Any building whose primary purpose is that of education.',
      value: 'a',
      nextQuestionKey: 8
    }, {
      text: '<strong>Religious:</strong> Any building whose primary purpose is religious in nature. This includes a wide gamut of buildings from cathedrals down to storefronts. Primarily places of worship, but also buildings where religious services are offered.',
      value: 'b',
      nextQuestionKey: 8
    }, {
      text: '<strong>Public Safety:</strong> Primarily police and fire stations. Does not include private security firms.',
      value: 'c',
      nextQuestionKey: 8
    }, {
      text: '<strong>Health:</strong> Hospitals, health centers, medical clinics. Any place where medical services are offered, including doctors’ offices.',
      value: 'd',
      nextQuestionKey: 8
    }, {
      text: '<strong>Recreation:</strong> Different from a park in that it has a permanent structure on it for the purpose of recreation.',
      value: 'e',
      nextQuestionKey: 8
    }, {
      text: '<strong>Government:</strong> Government buildings are offices through which the local, state, and federal government operate out of. Includes libraries.',
      value: 'f',
      nextQuestionKey: 8
    }, {
      text: '<strong>Non Profit / Charity:</strong> Organizations providing services to the needy, including soup kitchens, homeless shelters',
      value: 'g',
      nextQuestionKey: 8
    }, {
      text: '<strong>Other:</strong> For when you’re unsure about what the institutional building is being used for.',
      value: 'h',
      nextQuestionKey: 8
    }], [{
      text: '<strong>Good:</strong> No obvious repairs needed.',
      value: 'a',
      nextQuestionKey: 9
    }, {
      text: '<strong>Fair:</strong> Needs minor repairs. Windows and doors intact, but roof may be missing shingles, exterior elements may be sagging, paint / siding missing, graffiti.',
      value: 'b',
      nextQuestionKey: 9
    }, {
      text: '<strong>Poor:</strong> Needs major repairs. Windows and doors are broken or boarded up. Light fire damage that can be repaired. Non-load-bearing elements like awnings, porches collapsed. Holes in roof.',
      value: 'c',
      nextQuestionKey: 9
    }, {
      text: '<strong>Suggest Demolition:</strong> No longer shaped like a building. Damaged beyond practical repair or renovation. Structural damage including collapse of roof, walls, foundation. Uninhabitable.',
      value: 'd',
      nextQuestionKey: 9
    }], [{
      text: '<strong>Yes:</strong> Indications of fire in or around the structure that caused visible damage, from as small as melted siding to buildings that have burned down to the ground.',
      value: 'y',
      nextQuestionKey: 10
    }, {
      text: '<strong>No</strong> ',
      value: 'n',
      nextQuestionKey: 11
    }], [{
      text: '<strong>Minor:</strong> Visible damage to the building that is superficial or repairable, and does not render the building uninhabitable. Includes soot marks around doorways and windows.',
      value: 'a',
      nextQuestionKey: 11
    }, {
      text: '<strong>Major:</strong> Significant damage to the building that would be costly to repair and makes it uninhabitable. Major may include holes in the roof, but once there is any sort of structural collapse, the damage level is considered collapsed.',
      value: 'b',
      nextQuestionKey: 11
    }, {
      text: '<strong>Collapsed:</strong> Fire that has caused partial or total structural collapse, making it no longer building-shaped. This includes buildings that have burned down to the foundation. Walls may still be standing, but parts or all of the roof have caved in.',
      value: 'c',
      nextQuestionKey: 11
    }], [{
      text: '<strong>Secured:</strong> A building is secured when all windows or doors are intact or secured. This includes occupied buildings with original windows / doors, and buildings that may be vacant but are not open to trespass.',
      value: 'y',
      nextQuestionKey: 14
    }, {
      text: '<strong>Open to Trespass:</strong> If a building has missing windows, doors or is otherwise open and accessible to scrappers, squatters, or vandals, it is open to trespass.',
      value: 'n',
      nextQuestionKey: 14
    }], [{
      text: '<strong>Vacant Lot:</strong> A lot that is not being used.',
      value: 'a',
      nextQuestionKey: 13
    }, {
      text: '<strong>Parking Lot:</strong> Lot used for parking, can be paved or unpaved. Does not include cars on lawns.',
      value: 'b',
      nextQuestionKey: 13
    }, {
      text: '<strogn>Park:</strong> A lot that is clearly designated or has some permanent indicator of park use such as playground equipment and trails.',
      value: 'c',
      nextQuestionKey: 13
    }, {
      text: '<strong>Garden:</strong> Land being used for agricultural purposes, includes personal gardens and larger farms.',
      value: 'd',
      nextQuestionKey: 13
    }, {
      text: '<strong>Other:</strong> For when you’re unsure about what the lot is being used for.',
      value: 'e',
      nextQuestionKey: 13
    }, {
      text: '<strong>Attached Lot:</strong> A lot adjacent to or in between occupied houses that is clearly maintained or used as an extension of an existing property. Attached Lots are not considered vacant lots because they are in use.',
      value: 'f',
      nextQuestionKey: 13
    }], [{
      text: '<strong>Yes:</strong> A lot is maintained when the lot shows sign of care and maintenance, regardless of what is physically on the lot. Grassy lots are mowed with some regularity and paved lots show signs of consistent care.',
      value: 'y',
      nextQuestionKey: 14
    }, {
      text: '<strong>No:</strong> Characteristics of an unmaintained lot include tall grass, overgrown trees or bushes, weeds in the cracks of pavement, and so on.',
      value: 'n',
      nextQuestionKey: 14
    }], [{
      text: '<strong>Yes:</strong> A building or vacant lot is considered to have dumping when debris has been purposely left or placed on the property. This does not include litter or debris from a recent fire or ongoing demolition',
      value: 'y',
      nextQuestionKey: null
    }, {
      text: '<strong>No:</strong>',
      value: 'n',
      nextQuestionKey: null
    }]],
    setSurveyPossibleeAddress: function (value) {
      this.surveyPossibleAddress = value;
    },
    getSurveyPossibleeAddress: function () {
      return this.surveyPossibleAddress;
    },
    setSurveyCurrentAddress: function (value) {
      this.surveyCurrentAddress = value;
    },
    getSurveyCurrentAddress: function () {
      return this.surveyCurrentAddress;
    },
    setCurrentLatLng: function (value) {
      this.currentLatLng.lat = value.lat;
      this.currentLatLng.lng = value.lng;
    },
    getCurrentLatLng: function () {
      return this.currentLatLng;
    },
    setPastSurveys: function (value) {
      this.pastSurveys = value;
    },
    getPastSurveys: function () {
      return this.pastSurveys;
    },
    setSurveyIndex: function (value) {
      this.surveyIndex = value;
    },
    getSurveyIndex: function () {
      return this.surveyIndex;
    },
    getAnswerSet: function (index) {
      return this.answerList[index];
    },
    getQuestion: function (index) {
      return this.questionsList[index];
    },
    getPostData: function () {
      return this.surveyPostData;
    },
    clearSurvey: function () {
      this.surveyIndex = 0;
      this.surveyPostData.answers.forEach(function (item) {
        item.answer = null;
      });
    },
    setPostData: function (index, value) {
      console.log(value);
      console.log(index);
      console.log(this.surveyPostData.answers);
      console.log(this.surveyPostData.answers[index]);
      if (Array.isArray(value)) {
        let tempAnswer = '';
        let valueSize = value.length;
        value.forEach(function (item, index) {
          tempAnswer += item.value;
          console.log(index);

          index + 1 < valueSize ? tempAnswer += ',' : 0;
        });
        console.log(tempAnswer);
        this.surveyPostData.answers[index].answer = tempAnswer;
      } else {
        this.surveyPostData.answers[index].answer = value;
      }
    },
    loadSurveyWithinCorridor: function () {
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
      $.getJSON("https://gis.detroitmi.gov/arcgis/rest/services/DoIT/Corridor_Boundaries/MapServer/0/query?where=Corridor%3D%27" + corridorName + "%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson", function (corridor) {
        console.log(corridor);
        var simplifiedCorridor = turf.simplify(corridor.features[0], 0.003, false);
        console.log(simplifiedCorridor);
        var arcCorridorPolygon = Terraformer.ArcGIS.convert(simplifiedCorridor.geometry);
        console.log(arcCorridorPolygon);
        $.getJSON("https://gis.detroitmi.gov/arcgis/rest/services/DoIT/Commercial/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=" + encodeURI(JSON.stringify(arcCorridorPolygon)) + "&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json", function (data) {
          console.log(data);
          var randomParcel = data.features[Math.floor(Math.random() * data.features.length)];
          var llb = new mapboxgl.LngLatBounds(randomParcel.geometry.rings[0]);
          var center = llb.getCenter();
          console.log(center);
          mly.moveCloseTo(center.lat, center.lng).then(function (node) {
            console.log(node.key);
          }, function (error) {
            console.error(error);
          });
        });
      });
    },
    startSurvey: function () {
      console.log(currentURLParams.parcel);
      console.log(getQueryVariable('parcel'));
      console.log(getQueryVariable('lat'));
      console.log(getQueryVariable('lng'));
      console.log(getQueryVariable('survey'));
      survey.setSurveyIndex(0);
      this.clearAnswersButtons();
      if (getQueryVariable('survey') === 'on') {
        this.loadSurveyWithinCorridor();
      } else {
        if (getQueryVariable('parcel')) {
          mly.moveCloseTo(getQueryVariable('lat'), getQueryVariable('lng')).then(function (node) {
            console.log(node.key);
          }, function (error) {
            console.error(error);
          });
        } else {
          this.loadSurveyWithinCorridor();
        }
        this.displaySurveyPanels();
      }
    },
    startNewSurvey: function () {
      survey.setSurveyIndex(0);
      this.clearAnswersButtons();
      survey.setPastSurveys(false);
      survey.loadHTML();
    },
    loadAnotherSurvey: function () {
      document.querySelector('.survey-display > .street-name > h1').innerHTML = 'LOADING<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span>';
      this.clearAnswersButtons();
      this.startSurvey();
    },
    displaySurveyPanels: function () {
      document.querySelector('#info').className === 'active' ? document.querySelector('#info').className = '' : 0;
      document.querySelector('#survey').className === 'active' ? 0 : document.querySelector('#survey').className = 'active';
      document.querySelector('#map-survey').className === 'survey-on' ? 0 : document.querySelector('#map-survey').className = 'survey-on';
      document.querySelector('#map-survey > .survey-display').className === 'survey-display' ? document.querySelector('#map-survey > .survey-display').className = 'survey-display survey-on' : 0;
      document.querySelector('#map').className === 'mapboxgl-map' ? document.querySelector('#map').className = 'mapboxgl-map survey-on' : 0;
      document.querySelector('#legend').className === 'survey-on' ? 0 : document.querySelector('#legend').className = 'survey-on';
      document.querySelector('.mapboxgl-control-container').className === 'mapboxgl-control-container' ? document.querySelector('.mapboxgl-control-container').className = 'mapboxgl-control-container survey-on' : 0;
      setTimeout(function () {
        mly.resize();
        map.resize();
      }, 500);
    },
    getParcelData: function (lngLat) {
      $.getJSON('https://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/reverseGeocode?location=%7B%22x%22%3A+' + lngLat[0] + '%2C%22y%22%3A+' + lngLat[1] + '%2C%22spatialReference%22%3A+%7B%22wkid%22%3A+4326%7D%7D&distance=&langCode=&outSR=4326&returnIntersection=false&f=pjson', function (data) {
        console.log(data);
        survey.setSurveyPossibleeAddress(data.address.Street);
        console.log(survey.getSurveyPossibleeAddress());
        try {
          var tempArr = data.address.Street.split(' ');
          var addr = '';
          for (var i = 0; i < tempArr.length; i++) {
            addr += tempArr[i];
            i < tempArr.length && i + 1 !== tempArr.length ? addr += '+' : 0;
          }
          $.getJSON('https://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/findAddressCandidates?Street=&City=&ZIP=&SingleLine=' + addr + '&category=&outFields=User_fld&maxLocations=&outSR=&searchExtent=&location=&distance=&magicKey=&f=pjson', function (parcel) {
            console.log(parcel.candidates[0].attributes.User_fld);
            console.log(getQueryVariable('survey'));
            let tempParcel = survey.getPostData().answers[0].answer;
            console.log(tempParcel);
            survey.setSurveyCurrentAddress(survey.getSurveyPossibleeAddress());
            document.querySelector('.survey-display > .street-name > h1').innerHTML = survey.getSurveyCurrentAddress();
            map.setFilter("parcel-fill-hover", ["==", "parcelno", parcel.candidates[0].attributes.User_fld]);
            let cleanParcelID = parcel.candidates[0].attributes.User_fld;
            console.log(cleanParcelID);
            cleanParcelID = cleanParcelID.replace(/\./g, '_');
            console.log(cleanParcelID);
            switch (true) {
              case tempParcel === null:
                $.getJSON('https://apis.detroitmi.gov/photo_survey/count/' + cleanParcelID + '/', function (surveys) {
                  console.log('new parcel');
                  surveys.count > 0 ? survey.setPastSurveys(true) : survey.setPastSurveys(false);
                  survey.loadHTML();
                });
                break;
              case getQueryVariable('survey') === 'on' && tempParcel !== parcel.candidates[0].attributes.User_fld:
                console.log('clear survey');
                survey.clearSurvey();
                $.getJSON('https://apis.detroitmi.gov/photo_survey/count/' + cleanParcelID + '/', function (surveys) {
                  console.log(surveys.count);
                  surveys.count > 0 ? survey.setPastSurveys(true) : survey.setPastSurveys(false);
                  survey.loadHTML();
                });
                break;
              default:
                console.log('same parcel');
                $.getJSON('https://apis.detroitmi.gov/photo_survey/count/' + cleanParcelID + '/', function (surveys) {
                  console.log(surveys.count);
                  surveys.count > 0 ? survey.setPastSurveys(true) : survey.setPastSurveys(false);
                });
            }
          });
        } catch (e) {
          console.log(e);
        }
      });
    },
    submitAnswer: function () {
      let allAnswers = document.querySelectorAll('.answer-options');
      let itemsChecked = 0;
      let selectedAnswers = [];
      allAnswers.forEach(function (item) {
        if (item.checked === true) {
          console.log(item);
          selectedAnswers.push(item);
          itemsChecked++;
        }
      });
      if (itemsChecked > 0) {
        console.log('answers was selected');
        console.log(survey.getSurveyIndex());
        console.log(selectedAnswers);
        console.log(typeof selectedAnswers[0].getAttribute('data-next-key'));
        survey.setPostData(survey.getSurveyIndex(), selectedAnswers[0].value);
        if (selectedAnswers[0].getAttribute('data-next-key') === 'null') {
          survey.submitSurvey();
        } else {
          survey.setSurveyIndex(parseInt(selectedAnswers[0].getAttribute('data-next-key')));
          console.log(survey.getSurveyIndex());
          survey.loadHTML();
        }
      } else {
        console.log('answer was not selected');
      }
    },
    clearAnswersButtons: function () {
      document.querySelector('.question-container').innerHTML = '';
      document.querySelector('.survey-buttons').innerHTML = '';
    },
    loadHTML: function () {
      if (survey.getPastSurveys()) {
        document.querySelector('.question-container').innerHTML = '<h5>Parcel was already surveyed</h5>';
        document.querySelector('.survey-buttons').innerHTML = '<button onclick="survey.startNewSurvey()">Start New Survey</button>';
      } else {
        document.querySelector('.question-container').innerHTML = survey.loadQuestion();
        document.querySelector('.survey-buttons').innerHTML = '<button onclick="survey.submitAnswer()">NEXT</button>';
      }
    },
    submitSurvey: function () {
      console.log('submitting survey');
      let tempData = survey.getPostData();
      console.log(tempData);
      let tempParcel = tempData.answers[0].answer;
      let cleanAnswer = [];
      tempData.answers.forEach(function (item) {
        item.answer !== null ? cleanAnswer.push(item) : 0;
      });
      let newData = {
        'survey_id': 'default_combined',
        'user_id': 'xyz',
        'answers': cleanAnswer
      };
      console.log(tempData);
      tempParcel = tempParcel.replace(/\./g, '-');
      survey.sendDataTOServer('https://apis.detroitmi.gov/photo_survey/survey/' + tempParcel + '/', newData);
    },
    sendDataTOServer: function (url, data, success) {
      data = JSON.stringify(data);
      console.log(data);
      $.ajax({
        url: url,
        type: "POST",
        data: data,
        dataType: 'json',
        success: function (response) {
          document.querySelector('.survey-buttons').innerHTML = '<button onclick="survey.loadAnotherSurvey()">START OTHER SURVEY</button>';
          document.querySelector('.question-container').innerHTML = '<h5>Your survey has been saved.</h5>';
        },
        error: function (error) {
          console.log("Something went wrong", error);
        }
      });
    },
    loadQuestion: function () {
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
          case 15:
            tempHTML += '<label class="checkbox"><input class="answer-options" type="checkbox" value="' + this.answerList[tempIndex][i].value + '" data-next-key="' + this.answerList[tempIndex][i].nextQuestionKey + '"/>' + this.answerList[tempIndex][i].text + '</label>';
            break;
          case 16:
            tempHTML += '<label class="checkbox"><input class="answer-options" type="checkbox" value="' + this.answerList[tempIndex][i].value + '" data-next-key="' + this.answerList[tempIndex][i].nextQuestionKey + '"/>' + this.answerList[tempIndex][i].text + '</label>';
            break;
          default:
            tempHTML += '<label class="radio"><input class="answer-options" type="radio" name="radio" value="' + this.answerList[tempIndex][i].value + '" data-next-key="' + this.answerList[tempIndex][i].nextQuestionKey + '"/>' + this.answerList[tempIndex][i].text + '</label>';
        }
      }
      tempHTML += "</article>";
      console.log(tempHTML);
      return tempHTML;
    }
  };
  return survey;
}(window);
