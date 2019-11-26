import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AssistModal from './../modals/AssistModal';


import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _isEqual from 'lodash/isEqual';
import _cloneDeep from 'lodash/cloneDeep';
import TweenMax from 'gsap/TweenMax';
import { Link } from 'react-router-dom';

import { Route, Switch, Redirect } from 'react-router-dom';
import * as Routes from '../app/routes';

import { fetchStringStrands as fetchStringStrandsAction } from './../string-builder/assets/utilities/string-strands/string-strands-actions';
import { fetchBows as fetchBowsAction, fetchBowModels as fetchBowModelsAction } from './../string-builder/assets/utilities/bows/bows-actions';
import { fetchProducts as fetchProductsAction } from './../accessories/assets/utilities/products/products-actions';
import { addToCart as addToCartAction } from './../site-cart/assets/utilities/cart/cart-actions';

import { 
  setStringStrand1 as setStringStrand1Action,
  setStringStrand2 as setStringStrand2Action,
  setStringStrandServing as setStringStrandServingAction,
  selectBuildFromMixedMaterialPreview as selectBuildFromMixedMaterialPreviewAction,
  resetBuild as resetBuildAction,
  setCustomizationLevel as setCustomizationLevelAction,
  setPricing as setPricingAction,
  setBowType as setBowTypeAction,
  setSelectedMaterialName as setSelectedMaterialNameAction
} from './../string-builder/assets/utilities/string-configuration/string-configuration-actions';

class StringBuilderLayout extends Component {

  constructor(props) {
    super(props);

    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleStringLengthInput = this.handleStringLengthInput.bind(this);
    this.handleBowModelChange = this.handleBowModelChange.bind(this);
    this.handleBowTypeChange = this.handleBowTypeChange.bind(this);
    this.handleStringSetChange = this.handleStringSetChange.bind(this);
    this.handleAddNotesChange = this.handleAddNotesChange.bind(this);
    this.handleMarkStringPartAsActiveClick = this.handleMarkStringPartAsActiveClick.bind(this);
    this.handleMaterialClick = this.handleMaterialClick.bind(this);
    this.handleColorClick = this.handleColorClick.bind(this);
    this.handleBuildResetClick = this.handleBuildResetClick.bind(this);
    this.getStringPreviews = this.getStringPreviews.bind(this);
    this.resolveMaterialMixConflict = this.resolveMaterialMixConflict.bind(this);
    this.checkIfSameMaterialUsedForStringParts = this.checkIfSameMaterialUsedForStringParts.bind(this);
    this.handleAddStringToCart = this.handleAddStringToCart.bind(this);
    this.getStringPrice = this.getStringPrice.bind(this);

    this.handleReEditString = this.handleReEditString.bind(this);
    this.handleEnterBowInfo = this.handleEnterBowInfo.bind(this);
    this.handleSelectStrand1AndEnterBowInfo = this.handleSelectStrand1AndEnterBowInfo.bind(this);
    this.handleSelectStrand2AndEnterBowInfo = this.handleSelectStrand2AndEnterBowInfo.bind(this);
    this.handleSelectServingAndEnterBowInfo = this.handleSelectServingAndEnterBowInfo.bind(this);

    this.handleModalClose = this.handleModalClose.bind(this);

    this.topMaterialFinish = null;
    this.bottomSummaryForm = null;
    this.topMaterialFinishHeight = null;
    this.bottomSummaryFormHeight = null;

    this.materialCheckName = null;
    this.resolveMaterialColorConflict = this.resolveMaterialColorConflict.bind(this);


    this.state = {
      // used to get the respective brand & models
      bows: [ {attributes: {bow_brand: 'Please select a brand'}} ],
      bowModels: [{attributes: {bow_model: 'First select a bow brand'}}],
      // use to build the string info and then pass to store on one submit like a dispatch
      bowBrandSelected: 'no brand selected yet',
      bowModelSelected: 'no model selected yet',
      bowType: this.props.buildString.bowType,
      stringLength: 0,
      notes: 'N/A',
      selectedStringCableSet: 'None selected yet', // initial compound standard
      // used to update the color selection panels
      string1ColorPatterns: {
        attributes: {
          name: 'Buckskin (080)',
          num_colors: 1,
          materials: ['8190', '8125G', '452x'],
          hex_colors: ['#e4af76'],
          string1_location: 'https://s3.amazonaws.com/string-builder/strings/buckskin_string2.png',
          string2_location: 'https://s3.amazonaws.com/string-builder/strings/buckskin_string1.png',
          serving_location: 'https://s3.amazonaws.com/string-builder/serving/buckskin.png',
          materialNameWhenSelected: '452x',
          noColorForMaterial: false
        }
      },
      string2ColorPatterns: {
        attributes: {
          name: 'OD Green (380)',
          num_colors: 1,
          materials: ['8190', '8125G', '452x'],
          hex_colors: ['#334331'],
          string1_location: 'https://s3.amazonaws.com/string-builder/strings/odgreen_string2.png',
          string2_location: 'https://s3.amazonaws.com/string-builder/strings/odgreen_string1.png',
          serving_location: 'https://s3.amazonaws.com/string-builder/serving/odgreen.png',
          materialNameWhenSelected: '452x',
          noColorForMaterial: false
        }
      },
      servingColorPatterns: {
        attributes: {
          name: 'Natural White (020)',
          num_colors: 1,
          materials: ['8190', '8125G', '452x'],
          hex_colors: ['#FFFFFF'],
          string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
          string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
          serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
          materialNameWhenSelected: '452x',
          noColorForMaterial: false
        }
      },
      currentMaterial: this.props.buildString.currentMaterial,
      materialColors: [
        {
          attributes: {
            name: 'Teal (370)',
            num_colors: 1,
            materials: ['8190', '8125G', '452x'],
            hex_colors: ['#10b7a9']
          }
        }
      ],
      activeStringPart: 'string-1',
      stringCustomizationLevel: 'standard-string', // make this something that nextProps can update
      homogenousMaterials: true,
      priceCategory: this.props.buildString.priceCategory,
      stringPrice: '',
      variantId: '',
      previewStrings: {
        basedString1MaterialChoice: {},
        basedString2MaterialChoice: {},
        basedServingMaterialChoice: {}
      },
      doneBuilding: false
    }
  }

  filterPrice(stringCustomizationLevel) {
    let stringCustomizationLevelStore = _filter(this.props.stringProducts, (product) => {
      return product.handle === stringCustomizationLevel;
    });
    this.props.setCustomizationLevel(stringCustomizationLevelStore);
  }

  componentDidMount() {
    this.props.fetchBows();
    this.props.fetchStringStrands();
    this.props.fetchProducts('string');
    // this.filterPrice(this.state.stringCustomizationLevel);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bows !== nextProps.bows) {
      this.setState({
        bows: nextProps.bows,
      }, () => { return this.state; });
    }

    if (this.props.bowBrandSelected !== nextProps.bowBrandSelected) {
      this.setState({
        bowBrandSelected: nextProps.bowBrandSelected
      }, () => { return this.state; });
    }

    if (this.props.bowModels !== nextProps.bowModels) {
      this.setState({
        bowModels: nextProps.bowModels
      }, () => { return this.state; });
    }

    if (this.props.stringStrands !== nextProps.stringStrands) {
      this.filterColorsOfMaterial(this.state.currentMaterial, nextProps.stringStrands);
    }


  // DOES NOT PICK UP THE CHANGE FROM CLICKING A PRECONFIG STRING ONLY COLOR CLICKS

  if (this.props.buildString.activeStringPart !== nextProps.buildString.activeStringPart) {
    this.setState({
      activeStringPart: nextProps.buildString.activeStringPart,
    });
  }

  if (this.props.buildString.customizationLevel !== nextProps.buildString.customizationLevel) {
    this.setState({
      customizationLevel: nextProps.buildString.customizationLevel
    });
  }

  if (this.props.buildString.priceCategory !== nextProps.buildString.priceCategory) {
    this.setState({
      priceCategory: nextProps.buildString.priceCategory
    });
  }

  if (this.props.buildString.currentMaterial !== nextProps.buildString.currentMaterial) {
    this.setState({
      currentMaterial: nextProps.buildString.currentMaterial
    })
  }

   if (this.props.buildString !== nextProps.buildString) {
     this.setState({
       string1ColorPatterns: nextProps.buildString.string1ColorPatterns,
       string2ColorPatterns: nextProps.buildString.string2ColorPatterns,
       servingColorPatterns: nextProps.buildString.servingColorPatterns,
       currentMaterial: nextProps.buildString.currentMaterial,
       homogenousMaterials: nextProps.buildString.homogenousMaterials
     }, () => { this.filterColorsOfMaterial(this.state.currentMaterial, this.props.stringStrands); return this.state; });
   }

   // PRECONFIG STRINGS
   if (this.state.string1ColorPatterns !== nextProps.buildString.string1ColorPatterns ||
       this.state.string2ColorPatterns !== nextProps.buildString.string2ColorPatterns ||
       this.state.servingColorPatterns !== nextProps.buildString.servingColorPatterns) {
     this.setState({
       currentMaterial: nextProps.buildString.currentMaterial,
       string1ColorPatterns: nextProps.buildString.string1ColorPatterns,
       string2ColorPatterns: nextProps.buildString.string2ColorPatterns,
       servingColorPatterns: nextProps.buildString.servingColorPatterns
     }, () => { this.filterColorsOfMaterial(this.state.currentMaterial, this.props.stringStrands); return this.state; });
   }

  }

  // filters string colors based on material
  filterColorsOfMaterial(selectedMaterialName, stringStrands) {
    // may need a dispatch to a store
      const materialColors = _filter(stringStrands, (color) => {
        if (color.attributes.materials.indexOf(selectedMaterialName) > -1) {
          return color;
        }
      });
     this.setState({
        materialColors: materialColors
      });
  }


  handleBuildResetClick(event) {
    window.ga('send', 'event', 'Page Interaction');
    this.props.resetBuild()

    this.setState({
      selectedStringCableSet: 'None selected yet',
      // priceCategory: _filter(this.props.stringProducts, (product) => {
      //   return product.handle === 'standard-string'
      // }),
      priceCategory: this.filterPrice(this.state.stringCustomizationLevel)
    }, () => {
      this.filterColorsOfMaterial(this.state.currentMaterial, this.props.stringStrands);
      this.filterMaterialContentVisible(this.state.currentMaterial);
      this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange();
    });
  }


  /* START String Part Events */

  // which part of string is active?
  handleMarkStringPartAsActiveClick(event) {
    window.ga('send', 'event', 'Page Interaction');
    const activeStringPart = event.currentTarget.id;
    this.setState({
      activeStringPart: activeStringPart
    }, () => {
                this.showSolidOrStripedColors()
                this.activeStringPartMaterialCheck()
             });
  }

  showSolidOrStripedColors() {
    if (this.state.activeStringPart === 'serving') {
      const solidMaterialColors = _filter(this.state.materialColors, (color) => {
          if (color.attributes.num_colors >= 1) {
            return color;
          }
        });
      this.setState({
        materialColors: solidMaterialColors
      });
    } else {
      // get all string colors
      this.filterColorsOfMaterial(this.state.currentMaterial, this.props.stringStrands);
    }
  }

  // which color was clicked from swatch panel
  handleColorClick(event) {
    window.ga('send', 'event', 'Page Interaction');
    const clickedColorName = event.currentTarget.nextSibling.childNodes[1].innerHTML;
    this.getMatchingColor(clickedColorName);
  }

  getMatchingColor(clickedColorName) {
    const colorMatch = _find(this.state.materialColors, (color) => {
      return color.attributes.name === clickedColorName;
    });

    // assign the current material when selecting the color
    const materialNameWhenSelected = "materialNameWhenSelected";
    colorMatch.attributes[materialNameWhenSelected] = this.state.currentMaterial;

    this.updateStringPartsAndImage(colorMatch);

  }

  updateStringPartsAndImage(colorMatch) {
      switch (this.state.activeStringPart) {
        case 'string-1':
          this.setState({
            string1ColorPatterns: colorMatch
          }, () => {
            this.props.setStringStrand1(colorMatch);
            this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange();
          });
          break;

        case 'string-2':
          this.setState({
            string2ColorPatterns: colorMatch
          }, () => {
            this.props.setStringStrand2(colorMatch);
            this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange();
          });
          break;

        case 'serving':
          this.setState({
            servingColorPatterns: colorMatch
          }, () => {
            this.props.setStringStrandServing(colorMatch);
            this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange();
          });
          break;

        default:
          this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange();
          break;
      }
  }

  checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange() {
    switch (this.state.bowType) {
      case 'compound':
        this.handleCompoundBowCustomizationLevel()
        break;

      case 'crossbow':
        this.giveCrossbowPrices();
        break;

      case 'long':
        this.giveRecurveLongPrices();
        break;

      case 'recurve':
        this.giveRecurveLongPrices();
        break;

      default:
        break;
    }
  }


  checkIfSameMaterialUsedForStringParts() {
    /*
      Do a check on the state of materials in the string.
      Route to step 2 (container component)
        if they're homogenous, render bow info component in step 2
        else render mixed materials message component in step 2
    */
    const string1MaterialNameWhenSelected = this.state.string1ColorPatterns.attributes.materialNameWhenSelected;
    const string2MaterialNameWhenSelected = this.state.string2ColorPatterns.attributes.materialNameWhenSelected;
    const servingMaterialNameWhenSelected = this.state.servingColorPatterns.attributes.materialNameWhenSelected;

    if ( _isEqual(string1MaterialNameWhenSelected, string2MaterialNameWhenSelected) &&
         _isEqual(string1MaterialNameWhenSelected, servingMaterialNameWhenSelected) &&
         _isEqual(string2MaterialNameWhenSelected, servingMaterialNameWhenSelected) ) {
      // proceed with build
      this.setState({
        homogenousMaterials: true,
        currentMaterial: this.state.currentMaterial,
        string1ColorPatterns: this.state.string1ColorPatterns,
        string2ColorPatterns: this.state.string2ColorPatterns,
        servingColorPatterns: this.state.servingColorPatterns
      }, () => {
        this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange();
      });
    } else {
      this.setState({
        homogenousMaterials: false
      });
    }
    return;
  }

// START SHOW / HIDE THE MATERIAL PANEL AND FORM

  /* END String Part Events */


  /* START Material Events */
  handleMaterialCheck(currentStringColorMaterials, selectedMaterialName, activeStringPart, currentStringColorName) {
    const materialMatch = _find(currentStringColorMaterials, (material) => {
      return material === selectedMaterialName;
    });
    if (materialMatch !== undefined) {
      this.setState({
        currentMaterial: selectedMaterialName
      }, () => {
        this.props.setSelectedMaterialName(this.state.currentMaterial);
        this.filterColorsOfMaterial(this.state.currentMaterial, this.props.stringStrands);
        this.filterMaterialContentVisible(this.state.currentMaterial);
        this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange();
      });
    } else {
      const modal = document.getElementById('material-color-conflict-modal')
      modal.className = "visible"
      modal.childNodes[0].childNodes[0].innerText = selectedMaterialName + ' material does not have color: ' + currentStringColorName + '. This will require your color to be reset for '+ activeStringPart + '. Do you want to proceed?'
      this.materialCheckName = selectedMaterialName
    }
  }

  handleMaterialClick(event) {
    window.ga('send', 'event', 'Page Interaction');
    const selectedMaterialName = event.currentTarget.children[0].innerText;
    // console.log('material: ', selectedMaterialName)
    switch (this.state.activeStringPart) {
      case 'string-1':
        this.handleMaterialCheck(this.state.string1ColorPatterns.attributes.materials, selectedMaterialName, 'Strand 1', this.state.string1ColorPatterns.attributes.name)
        break;

      case 'string-2':
        this.handleMaterialCheck(this.state.string2ColorPatterns.attributes.materials, selectedMaterialName, 'Strand 2', this.state.string2ColorPatterns.attributes.name)
        break;

      case 'serving':
        this.handleMaterialCheck(this.state.servingColorPatterns.attributes.materials, selectedMaterialName, 'Serving', this.state.servingColorPatterns.attributes.name)
        break;

      default:
        this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange();
        break;
    }
  }

  activeStringPartMaterialCheck(event) {
    switch (this.state.activeStringPart) {
      case 'string-1':
        this.handleMaterialCheck(this.state.string1ColorPatterns.attributes.materials, this.state.currentMaterial, 'Strand 1', this.state.string1ColorPatterns.attributes.name)
        break;

      case 'string-2':
        this.handleMaterialCheck(this.state.string2ColorPatterns.attributes.materials, this.state.currentMaterial, 'Strand 2', this.state.string2ColorPatterns.attributes.name)
        break;

      case 'serving':
        this.handleMaterialCheck(this.state.servingColorPatterns.attributes.materials, this.state.currentMaterial, 'Serving', this.state.servingColorPatterns.attributes.name)
        break;

      default:
        this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange();
        break;
    }
  }


  resolveMaterialColorConflict() {
      const white = {
        attributes: {
          hex_colors: ["#FFFFFF"],
          materialNameWhenSelected: this.materialCheckName,
          materials: ["8190", "8125G", "452x"],
          name: "Natural White (020)",
          num_colors: 1,
          serving_location: "https://s3.amazonaws.com/string-builder/serving/naturalwhite.png",
          string1_location: "https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png",
          string2_location:"https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png"
        }
      }
      this.updateStringPartsAndImage(white)
      this.setState({
        currentMaterial: this.materialCheckName
      }, () => {
        this.props.setSelectedMaterialName(this.state.currentMaterial);
        this.filterColorsOfMaterial(this.state.currentMaterial, this.props.stringStrands);
        this.filterMaterialContentVisible(this.state.currentMaterial);
        this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange();
      });
      const modal = document.getElementById('material-color-conflict-modal')
      modal.className = "hidden"
      modal.childNodes[0].childNodes[0].innerText = ''
  }

  filterMaterialContentVisible (selectedMaterialName) {
    var viewportWidth = window.innerWidth
    switch (selectedMaterialName) {
      case '8190':
        if (viewportWidth > 767) {
          document.getElementById('x8190-content').style.display = "block";
          document.getElementById('g8125-content').style.display = "none";
          document.getElementById('x452-content').style.display = "none";
        } else {
          document.getElementById('mobile-X8190').style.display = "block";
          document.getElementById('mobile-G8125').style.display = "none";
          document.getElementById('mobile-X452').style.display = "none";
        }
        break;

      case '8125G':
        if (viewportWidth > 767) {
          document.getElementById('x8190-content').style.display = "none";
          document.getElementById('g8125-content').style.display = "block";
          document.getElementById('x452-content').style.display = "none";
        } else {
          document.getElementById('mobile-X8190').style.display = "none";
          document.getElementById('mobile-G8125').style.display = "block";
          document.getElementById('mobile-X452').style.display = "none";
        }
        break;

      case '452x':
        if (viewportWidth > 767) {
          document.getElementById('x8190-content').style.display = "none";
          document.getElementById('g8125-content').style.display = "none";
          document.getElementById('x452-content').style.display = "block";
        } else {
          document.getElementById('mobile-X8190').style.display = "none";
          document.getElementById('mobile-G8125').style.display = "none";
          document.getElementById('mobile-X452').style.display = "block";
        }
        break;

      default:
        break;
    }
  }


  /* END Material Events */


  /* Start FORM Event Handlers */

  handleBrandChange(event) {
    window.ga('send', 'event', 'Page Interaction');
    // No need to set state here, because sends a dispatch and then
    //  our componentWillReceiveProps will update state based on props from store. Cool huh?
    this.props.fetchBowModels(event.target.value)
    this.setState({
      bowBrandSelected: event.target.value
    }, () => { return this.state; })
  }

  handleBowModelChange(event) {
    window.ga('send', 'event', 'Page Interaction');
    this.setState({
      bowModelSelected: (event.target.value)
    }, () => { return this.state });
  }

  handleBowTypeChange(event) {
    window.ga('send', 'event', 'Page Interaction');
    // this logic only queries the current state...
      this.setState({
        bowType: event.target.value
      }, () => {
        this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange();
        switch(this.state.bowType) {
          case 'compound':
            // will need to handle the different standard, custom, and super-custom
            switch(this.state.stringCustomizationLevel) {
              case 'standard-string':
                this.setState({
                  selectedStringCableSet: 'None selected yet',
                  bowBrandSelected: 'no brand selected yet',
                  bowModelSelected: 'no model selected yet',
                  stringLength: 0,
                }, () => { this.props.setBowType(this.state.bowType); });
                break;

              case 'custom-string':
                this.setState({
                  selectedStringCableSet: 'None selected yet',
                  bowBrandSelected: 'no brand selected yet',
                  bowModelSelected: 'no model selected yet',
                  stringLength: 0,
                }, () => { this.props.setBowType(this.state.bowType); });
                break;

              case 'super-custom-string':
                this.setState({
                  selectedStringCableSet: 'None selected yet',
                  bowBrandSelected: 'no brand selected yet',
                  bowModelSelected: 'no model selected yet',
                  stringLength: 0,
                }, () => { this.props.setBowType(this.state.bowType); });
                break;

              default:
                break;
            }
            break;

          case 'crossbow':
            this.setState({
              selectedStringCableSet: 'None selected yet',
              bowBrandSelected: 'no brand selected yet',
              bowModelSelected: 'no model selected yet',
              stringLength: 0,
            }, () => { this.props.setBowType(this.state.bowType); });
            break;

          case 'recurve':
            this.setState({
              selectedStringCableSet: 'None selected yet',
              bowBrandSelected: 'Not Needed',
              bowModelSelected: 'Not Needed',
              stringLength: 0,
            }, () => { this.props.setBowType(this.state.bowType); });
            break;

          case 'long':
            this.setState({
              selectedStringCableSet: 'None selected yet',
              bowBrandSelected: 'Not Needed',
              bowModelSelected: 'Not Needed',
              stringLength: 0,
            }, () => { this.props.setBowType(this.state.bowType); });
            break;

          default:
            break;
        }
      });
    }
    // i need something to happen in a callback.

  handleStringLengthInput(event) {
    window.ga('send', 'event', 'Page Interaction');
    this.setState({
      stringLength: (event.target.value)
    }, () => { return this.state });
  }

  handleStringSetChange(event) {
    window.ga('send', 'event', 'Page Interaction');
    // this updates the string build summary with data in the ui
    this.setState({
      stringPrice: event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-variant-id'),
      selectedStringCableSet: event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-variant'),
      variantId: event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-variant-id')
    });
  }

  handleAddNotesChange(event) {
    window.ga('send', 'event', 'Page Interaction');
    this.setState({
      notes: (event.target.value) //.replace(/[&\/\\#$<>,{}]/g, ' ')
    }, () => { return this.state; });
  }

/* End FORM Event Handlers */

/*
  START STRING CUSTOMIZATION LEVEL FOR COMPOUND BOW TYPE
*/

  handleCompoundBowCustomizationLevel() {
    // If the string is on 8190, and serving is white, it is a custom-string
    if (this.state.currentMaterial === '8190' &&
        this.state.servingColorPatterns.attributes.name === 'Natural White (020)') {
      this.setState({
        stringCustomizationLevel: 'custom-string'
      }, () => { this.props.setCustomizationLevel(this.state.stringCustomizationLevel); this.giveCompoundBowPrices(); });
    }

    // If the string is on 8190, and serving is not white, it is a super-custom-string
    else if (this.state.currentMaterial === '8190' &&
        this.state.servingColorPatterns.attributes.name !== 'Natural White (020)') {
      this.setState({
        stringCustomizationLevel: 'super-custom-string'
      }, () => { this.props.setCustomizationLevel(this.state.stringCustomizationLevel); this.giveCompoundBowPrices(); });
    }

    // If the string is on 8125G or 452X, it is a super-custom-string
    else if (this.state.currentMaterial === '8125G' || this.state.currentMaterial === '452x') {
      this.setState({
        stringCustomizationLevel: 'super-custom-string'
      }, () => { this.props.setCustomizationLevel(this.state.stringCustomizationLevel); this.giveCompoundBowPrices(); });
    } else {
      console.log('error');
    }
  }

  /*
    END STRING CUSTOMIZATION LEVEL FOR COMPOUND BOW TYPE
  */


/* Start select and enter bow */
  handleSelectStrand1AndEnterBowInfo(event) {
    window.ga('send', 'event', 'Page Interaction');
    this.props.selectBuildFromMixedMaterialPreview(this.props.buildString.string1ColorPatterns.attributes.materialNameWhenSelected)
  }

  handleSelectStrand2AndEnterBowInfo(event) {
    window.ga('send', 'event', 'Page Interaction');
    this.props.selectBuildFromMixedMaterialPreview(this.props.buildString.string2ColorPatterns.attributes.materialNameWhenSelected)
  }

  handleSelectServingAndEnterBowInfo(event) {
    window.ga('send', 'event', 'Page Interaction');
    this.props.selectBuildFromMixedMaterialPreview(this.props.buildString.servingColorPatterns.attributes.materialNameWhenSelected)
  }
/* End select and enter bow */

/* START MATERIAL PRICING */

  giveCompoundBowPrices() {
    switch (this.state.stringCustomizationLevel) {
      case 'standard-string':
        const standardStringPricing = _filter(this.props.stringProducts, (product) => {
          return product.handle === 'standard-string'
        });
        this.setState({
          priceCategory: standardStringPricing
        }, () => { this.props.setPricing(standardStringPricing); });
        break;

      case 'custom-string':
        const customStringPricing = _filter(this.props.stringProducts, (product) => {
          return product.handle === 'custom-string'
        });
        this.setState({
          priceCategory: customStringPricing
        }, () => { this.props.setPricing(customStringPricing); });
        break;

      case 'super-custom-string':
        const superCustomStringPricing = _filter(this.props.stringProducts, (product) => {
          return product.handle === 'super-custom-string'
        });
        this.setState({
          priceCategory: superCustomStringPricing
        }, () => { this.props.setPricing(superCustomStringPricing); });
        break;

      default:
        break;
    }
  }

  giveCrossbowPrices() {
    const crossbowStringPricing = _filter(this.props.stringProducts, (product) => {
      return product.handle === 'crossbow-string'
    });
    this.setState({
      priceCategory: crossbowStringPricing
    }, () => { this.props.setPricing(crossbowStringPricing); });
  }

  giveRecurveLongPrices() {
    const recurveLongStringPricing = _filter(this.props.stringProducts, (product) => {
      return product.handle === 'recurve-long-string'
    });
    this.setState({
      priceCategory: recurveLongStringPricing
    }, () => { this.props.setPricing(recurveLongStringPricing); });
  }

/*
  END STRING CUSTOMIZATION LEVEL FOR COMPOUND BOW TYPE
*/

  getStringPreviews() {

    // the strings patterns from current state cloned, so we don't overwrite the
    // state at this.state.string1ColorPatterns level, want to use the data, but work with
    // this.state.previewStrings level and keep those separate.

    /* The goal is to get them all the string previews */

    const previewString1ColorPatterns = _cloneDeep(this.state.string1ColorPatterns);
    const previewString2ColorPatterns = _cloneDeep(this.state.string2ColorPatterns);
    const previewServingColorPatterns = _cloneDeep(this.state.servingColorPatterns);

    // here are the material names from the current state
    const previewString1ColorPatternMaterial = previewString1ColorPatterns.attributes.materialNameWhenSelected;
    const previewString2ColorPatternMaterial = previewString2ColorPatterns.attributes.materialNameWhenSelected;
    const previewServingColorPatternMaterial = previewServingColorPatterns.attributes.materialNameWhenSelected;

    // string serving 1
    let preview1String1ColorPatternsResult = {};
    let preview1String2ColorPatternsResult = {};
    let preview1ServingColorPatternsResult = {};

    // string serving 2
    let preview2String1ColorPatternsResult = {};
    let preview2String2ColorPatternsResult = {};
    let preview2ServingColorPatternsResult = {};

    // serving
    let preview3String1ColorPatternsResult = {};
    let preview3String2ColorPatternsResult = {};
    let preview3ServingColorPatternsResult = {};


    // go into the 1st ss and get its materialNameWhenSelected
    // previewString1ColorPatternMaterial;

    if (previewString1ColorPatterns.attributes.materials.indexOf(previewString1ColorPatternMaterial) > -1) {
          previewString1ColorPatterns.attributes.materialNameWhenSelected = previewString1ColorPatternMaterial;
          preview1String1ColorPatternsResult = previewString1ColorPatterns;
        } else {
            preview1String1ColorPatternsResult =
            {
              attributes: {
                ...this.state.string1ColorPatterns.attributes,
                name: 'Natural White (020)',
                num_colors: 1,
                materials: ['8190', '8125G', '452x'],
                hex_colors: ['#FFFFFF'],
                string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
                string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
                serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
                materialNameWhenSelected: previewString1ColorPatternMaterial,
                noColorForMaterial: true
              }
            }
          }

    // compare 1st ss material with 2nd ss material
    if (previewString2ColorPatterns.attributes.materials.indexOf(previewString1ColorPatternMaterial) > -1) {
          previewString2ColorPatterns.attributes.materialNameWhenSelected = previewString1ColorPatternMaterial;
          preview1String2ColorPatternsResult = previewString2ColorPatterns;
        } else {
            preview1String2ColorPatternsResult =
            {
              attributes: {
                ...this.state.string2ColorPatterns.attributes,
                name: 'Natural White (020)',
                num_colors: 1,
                materials: ['8190', '8125G', '452x'],
                hex_colors: ['#FFFFFF'],
                string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
                string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
                serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
                materialNameWhenSelected: previewString1ColorPatternMaterial,
                noColorForMaterial: true
              }
            }
          }

    // compare 1st ss material with serv material
    if (previewServingColorPatterns.attributes.materials.indexOf(previewString1ColorPatternMaterial) > -1) {
          previewServingColorPatterns.attributes.materialNameWhenSelected = previewString1ColorPatternMaterial;
          preview1ServingColorPatternsResult = previewServingColorPatterns;
        } else {
            preview1ServingColorPatternsResult =
            {
              attributes: {
                ...this.state.servingColorPatterns.attributes,
                name: 'Natural White (020)',
                num_colors: 1,
                materials: ['8190', '8125G', '452x'],
                hex_colors: ['#FFFFFF'],
                string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
                string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
                serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
                materialNameWhenSelected: previewString1ColorPatternMaterial,
                noColorForMaterial: true
              }
            }
          }

    if (previewString1ColorPatterns.attributes.materials.indexOf(previewString2ColorPatternMaterial) > -1) {
          previewString1ColorPatterns.attributes.materialNameWhenSelected = previewString2ColorPatternMaterial;
          preview2String1ColorPatternsResult = previewString1ColorPatterns;
        } else {
            preview2String1ColorPatternsResult =
            {
              attributes: {
                ...this.state.string1ColorPatterns.attributes,
                name: 'Natural White (020)',
                num_colors: 1,
                materials: ['8190', '8125G', '452x'],
                hex_colors: ['#FFFFFF'],
                string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
                string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
                serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
                materialNameWhenSelected: previewString2ColorPatternMaterial,
                noColorForMaterial: true
              }
            }
          }
    // compare 1st ss material with 2nd ss material
    if (previewString2ColorPatterns.attributes.materials.indexOf(previewString2ColorPatternMaterial) > -1) {
          previewString2ColorPatterns.attributes.materialNameWhenSelected = previewString2ColorPatternMaterial;
          preview2String2ColorPatternsResult = previewString2ColorPatterns;
        } else {
            preview1String2ColorPatternsResult =
            {
              attributes: {
                ...this.state.string2ColorPatterns.attributes,
                name: 'Natural White (020)',
                num_colors: 1,
                materials: ['8190', '8125G', '452x'],
                hex_colors: ['#FFFFFF'],
                string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
                string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
                serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
                materialNameWhenSelected: previewString2ColorPatternMaterial,
                noColorForMaterial: true
              }
            }
          }

    // compare 1st ss material with serv material
    if (previewServingColorPatterns.attributes.materials.indexOf(previewString2ColorPatternMaterial) > -1) {
          previewServingColorPatterns.attributes.materialNameWhenSelected = previewString2ColorPatternMaterial;
          preview2ServingColorPatternsResult = previewServingColorPatterns;
        } else {
            preview2ServingColorPatternsResult =
            {
              attributes: {
                ...this.state.servingColorPatterns.attributes,
                name: 'Natural White (020)',
                num_colors: 1,
                materials: ['8190', '8125G', '452x'],
                hex_colors: ['#FFFFFF'],
                string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
                string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
                serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
                materialNameWhenSelected: previewString2ColorPatternMaterial,
                noColorForMaterial: true
              }
            }
          }

      if (previewString1ColorPatterns.attributes.materials.indexOf(previewServingColorPatternMaterial) > -1) {
            previewString1ColorPatterns.attributes.materialNameWhenSelected = previewServingColorPatternMaterial;
            preview3String1ColorPatternsResult = previewString1ColorPatterns;
          } else {
              preview3String1ColorPatternsResult =
              {
                attributes: {
                  ...this.state.string1ColorPatterns.attributes,
                  name: 'Natural White (020)',
                  num_colors: 1,
                  materials: ['8190', '8125G', '452x'],
                  hex_colors: ['#FFFFFF'],
                  string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
                  string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
                  serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
                  materialNameWhenSelected: previewServingColorPatternMaterial,
                  noColorForMaterial: true
                }
              }
            }
      // compare 2nd ss material with serving material
      if (previewString2ColorPatterns.attributes.materials.indexOf(previewServingColorPatternMaterial) > -1) {
            previewString2ColorPatterns.attributes.materialNameWhenSelected = previewServingColorPatternMaterial;
            preview3String2ColorPatternsResult = previewString2ColorPatterns;
          } else {
              preview3String2ColorPatternsResult =
              {
                attributes: {
                  ...this.state.string2ColorPatterns.attributes,
                  name: 'Natural White (020)',
                  num_colors: 1,
                  materials: ['8190', '8125G', '452x'],
                  hex_colors: ['#FFFFFF'],
                  string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
                  string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
                  serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
                  materialNameWhenSelected: previewServingColorPatternMaterial,
                  noColorForMaterial: true
                }
              }
            }

      // compare serving material with serv material
      if (previewServingColorPatterns.attributes.materials.indexOf(previewServingColorPatternMaterial) > -1) {
            previewServingColorPatterns.attributes.materialNameWhenSelected = previewServingColorPatternMaterial;
            preview3ServingColorPatternsResult = previewServingColorPatterns;
          } else {
              preview3ServingColorPatternsResult =
              {
                attributes: {
                  ...this.state.servingColorPatterns.attributes,
                  name: 'Natural White (020)',
                  num_colors: 1,
                  materials: ['8190', '8125G', '452x'],
                  hex_colors: ['#FFFFFF'],
                  string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
                  string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
                  serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
                  materialNameWhenSelected: previewServingColorPatternMaterial,
                  noColorForMaterial: true
                }
              }
            }

    this.setState({
      previewStrings: {
        basedString1MaterialChoice: {
          string1ColorPatterns: preview1String1ColorPatternsResult,
          string2ColorPatterns: preview1String2ColorPatternsResult,
          servingColorPatterns: preview1ServingColorPatternsResult
        },
        basedString2MaterialChoice: {
          string1ColorPatterns: preview2String1ColorPatternsResult,
          string2ColorPatterns: preview2String2ColorPatternsResult,
          servingColorPatterns: preview2ServingColorPatternsResult
        },
        basedServingMaterialChoice: {
          string1ColorPatterns: preview3String1ColorPatternsResult,
          string2ColorPatterns: preview3String2ColorPatternsResult,
          servingColorPatterns: preview3ServingColorPatternsResult
        }
      }
    }, () => { return this.state; });
  }

  // this will be called for final choice after customer has previews given
  resolveMaterialMixConflict(event) {
    // now have the intent of where the customer wants to go - the new material
    const newMaterial = event.currentTarget.getAttribute('data-material');

    // now need to iterate the string parts and see if their materials array contains a match.
    // do the different string parts in state have a match for that newMaterial?

    const string1ColorPatterns = this.state.string1ColorPatterns;
    const string2ColorPatterns = this.state.string2ColorPatterns;
    const servingColorPatterns = this.state.servingColorPatterns;

    // lots of repeating, pull out into its own function:
    if ( string1ColorPatterns.attributes.materials.indexOf(newMaterial) > -1) {

      this.setState({
        string1ColorPatterns: {
            attributes: {...string1ColorPatterns.attributes, materialNameWhenSelected: newMaterial},
        }
      }, () => { this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange() });
    } else {
      // Got the true conditions to work, need to rock out the false conditions to call a function
      // that will replace the object with the white
      this.setState({
        string1ColorPatterns: {
          attributes: {
          // ...string1ColorPatterns.attributes,
          name: 'Natural White (020)',
          num_colors: 1,
          materials: ['8190', '8125G', '452x'],
          hex_colors: ['#FFFFFF'],
          string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
          string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
          serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
          materialNameWhenSelected: newMaterial,
          noColorForMaterial: true
        }
      }
    }, () => { this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange() });
    }

    if ( string2ColorPatterns.attributes.materials.indexOf(newMaterial) > -1 ) {

      this.setState({
        string2ColorPatterns: {
            attributes: {...string2ColorPatterns.attributes, materialNameWhenSelected: newMaterial},
        }
      }, () => { this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange() });
    } else {
      this.setState({
        string2ColorPatterns: {
          attributes: {
          name: 'Natural White (020)',
          num_colors: 1,
          materials: ['8190', '8125G', '452x'],
          hex_colors: ['#FFFFFF'],
          string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
          string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
          serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
          materialNameWhenSelected: newMaterial,
          noColorForMaterial: true
        }
      }
    }, () => { this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange() });
    }

    if ( servingColorPatterns.attributes.materials.indexOf(newMaterial) > -1) {
      this.setState({
        servingColorPatterns: {
            attributes: {...servingColorPatterns.attributes, materialNameWhenSelected: newMaterial},
        }
      }, () => { this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange() });
    } else {
        this.setState({
          servingColorPatterns: {
            attributes: {
            // ...servingColorPatterns.attributes,
            name: 'Natural White (020)',
            num_colors: 1,
            materials: ['8190', '8125G', '452x'],
            hex_colors: ['#FFFFFF'],
            string1_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string2.png',
            string2_location: 'https://s3.amazonaws.com/string-builder/strings/naturalwhite_string1.png',
            serving_location: 'https://s3.amazonaws.com/string-builder/serving/naturalwhite.png',
            materialNameWhenSelected: newMaterial,
            noColorForMaterial: true
          }
        }
      }, () => { this.checkCustomizationLevelsFromStringPartColorChangeAndMaterialColorChange() });
    }

    this.filterMaterialContentVisible(newMaterial);

    // do this last
    this.setState({
      currentMaterial: newMaterial,
      homogenousMaterials: true
    });
  }

  // END MATERIAL CONFLICT RESOLUTION

  handleEnterBowInfo(event) {
    window.ga('send', 'event', 'Page Interaction');
    this.resolveMaterialMixConflict(event);
    this.setState({
      homogenousMaterials: true
    }, () => {
      this.checkIfSameMaterialUsedForStringParts();

    });
  }

  handleReEditString(event) {
    window.ga('send', 'event', 'Page Interaction');
    // i have the string material and part, now do a check to see if there is func that does the setting of state
    this.resolveMaterialMixConflict(event);
  }

  // START HANDLE ADD STRING TO CART

    getStringPrice(stringVariantID) {
      const match = _find(this.state.priceCategory[0].variants, (variant) => {
        if (String(variant.id) === String(stringVariantID)) {
          return variant;
        }
      });
      return match.price;
    }

    setTextForCart(string) {
      // remove the first - and the rest of the chars
      const substring = string.substring(0, string.indexOf('-'));
      return substring;
    }

    handleAddStringToCart() {
      window.ga('send', 'event', 'Page Interaction');
      const stringConfig = {
        stringCustomizationLevel: this.state.stringCustomizationLevel,
        priceCategory: this.state.priceCategory,
        bowBrandSelected: this.state.bowBrandSelected,
        bowModelSelected: this.state.bowModelSelected,
        bowType: this.state.bowType,
        stringLength: this.state.stringLength,
        notes: this.state.notes,
        selectedStringCableSet: this.setTextForCart(this.state.selectedStringCableSet),
        currentMaterial: this.state.currentMaterial,
        string1ColorPatterns: {
          attributes: {
            name: this.state.string1ColorPatterns.attributes.name,
            string1_location: this.state.string1ColorPatterns.attributes.string1_location,
            string2_location: this.state.string1ColorPatterns.attributes.string2_location,
            serving_location: this.state.string1ColorPatterns.attributes.serving_location
          }
        },
        string2ColorPatterns: {
          attributes: {
            name: this.state.string2ColorPatterns.attributes.name,
            string1_location: this.state.string2ColorPatterns.attributes.string1_location,
            string2_location: this.state.string2ColorPatterns.attributes.string2_location,
            serving_location: this.state.string2ColorPatterns.attributes.serving_location
          }
        },
        servingColorPatterns: {
          attributes: {
            name: this.state.servingColorPatterns.attributes.name,
            string1_location: this.state.servingColorPatterns.attributes.string1_location,
            string2_location: this.state.servingColorPatterns.attributes.string2_location,
            serving_location: this.state.servingColorPatterns.attributes.serving_location
          }
        },
        price: this.getStringPrice(this.state.stringPrice),
        variantId: this.state.variantId
      };

      this.props.addToCart(stringConfig);

      TweenMax.to(".hidden-modal", 0, {display: "block"})

    }

  // END HANDLE ADD STRING TO CART

  handleModalClose() {
    TweenMax.to(".hidden-modal", 0, {display: "none"})
  }

  render() {
    const passPropsToChildren = {
        color1BackgroundImage: this.state.string1ColorPatterns.attributes.string2_location,
        color2BackgroundImage: this.state.string2ColorPatterns.attributes.string1_location,
        colorServingBackgroundImage: this.state.servingColorPatterns.attributes.serving_location,
        activeStringPart: this.state.activeStringPart,
        handleMarkStringPartAsActiveClick: this.handleMarkStringPartAsActiveClick,
        string1ColorPatterns: this.state.string1ColorPatterns,
        string2ColorPatterns: this.state.string2ColorPatterns,
        servingColorPatterns: this.state.servingColorPatterns,

        handleMaterialClick: this.handleMaterialClick,
        colorsForMaterial: this.state.materialColors,
        handleColorClick: this.handleColorClick,
        currentMaterial: this.state.currentMaterial,

        bows: this.state.bows,
        bowModels: this.state.bowModels,

        checkIfSameMaterialUsedForStringParts: this.checkIfSameMaterialUsedForStringParts,
        homogenousMaterials: this.state.homogenousMaterials,

        handleBrandChange: this.handleBrandChange,
        handleBowModelChange: this.handleBowModelChange,
        bowType: this.state.bowType,
        handleBowTypeChange: this.handleBowTypeChange,
        handleStringLengthInput: this.handleStringLengthInput,
        handleStringSetChange: this.handleStringSetChange,
        handleAddNotesChange: this.handleAddNotesChange,
        priceCategory: this.state.priceCategory,
        handleAddStringToCart: this.handleAddStringToCart,

        bowBrandSelected: this.state.bowBrandSelected,
        bowModelSelected: this.state.bowModelSelected,
        stringLength: this.state.stringLength,
        selectedStringCableSet: this.state.selectedStringCableSet,
        notes: this.state.notes,

        handleBuildResetClick: this.handleBuildResetClick,
        previewStrings: this.state.previewStrings,
        basedString1MaterialChoice: this.state.previewStrings.basedString1MaterialChoice,
        basedString2MaterialChoice: this.state.previewStrings.basedString2MaterialChoice,
        resolveMaterialMixConflict: this.state.resolveMaterialMixConflict,
        getStringPreviews: this.getStringPreviews,
        reEditString: this.handleReEditString,
        enterBowInfo: this.handleEnterBowInfo,
        handleSelectStrand1AndEnterBowInfo: this.handleSelectStrand1AndEnterBowInfo,
        handleSelectStrand2AndEnterBowInfo: this.handleSelectStrand2AndEnterBowInfo,
        handleSelectServingAndEnterBowInfo: this.handleSelectServingAndEnterBowInfo,
        resolveMaterialColorConflict: this.resolveMaterialColorConflict
      
    };

    return (
      <div>
        <Helmet>
          <title>Winner's Choice String and Cable Builder. Choose from materials: 8190, 8125G, and 452x. Many solid colors, many dual colors and many triple colors are available.</title>
        </Helmet>
        <h1>Winner's Choice String Builder</h1>
        <h4 className="text-center black-back-white-letters">WE HAVE FREE SHIPPING AVAILABLE FOR THE CONTINENTAL U.S. </h4>
        <Switch>
          <Route exact path='/string-builder' render={() => <Redirect to='/string-builder/step-1' />} />
          <Route exact path='/string-builder/step-1' render={() => <Routes.StringBuilderStep1DecisionComponent {...passPropsToChildren} />} />
          <Route exact path='/string-builder/step-2' render={() => <Routes.StringBuilderStep2DecisionComponent {...passPropsToChildren} />} />
          <Route path='*' component={Routes.BadURL} />
        </Switch>
        <div className='hidden-modal'>
          <div className='notify'>
            <div className="small-preview-strings-serving-image-wrapper">
              <img src={this.state.string1ColorPatterns.attributes.string2_location}
                   className="color-1-image"
                   role="presentation"
              />
              <img src={this.state.string2ColorPatterns.attributes.string1_location}
                   className="color-2-image"
                   role="presentation"
              />
              <img src={this.state.servingColorPatterns.attributes.serving_location}
                   className="serving-image"
                   role="presentation"
              />
            </div>
            <p>added to your shopping cart</p>
            <h5>{this.state.bowType + ' - ' + this.state.selectedStringCableSet}</h5>
            <button onClick={this.handleModalClose} className='btn'>Continue Shopping</button>
            <Link className='btn' to='/cart'>Go To Shopping Cart</Link>
            <AssistModal />
          </div>
        </div>
      </div>
    );
  }
}

StringBuilderLayout.propTypes = {
  bows: PropTypes.array,
  bowModels: PropTypes.array,
  stringStrands: PropTypes.array,
  stringProducts: PropTypes.array,
  buildString: PropTypes.object
}

const mapStateToProps = ({bowsState, stringStrandsState, productsState, buildStringState}) => {
  return {
    bows: bowsState.bows,
    bowModels: bowsState.bowModels,
    stringStrands: stringStrandsState.stringStrands,
    stringProducts: productsState.strings,
    buildString: buildStringState
  };
}

export default connect(mapStateToProps, {
  fetchStringStrands: fetchStringStrandsAction, 
  fetchBows: fetchBowsAction, 
  fetchBowModels: fetchBowModelsAction, 
  fetchProducts: fetchProductsAction, 
  addToCart: addToCartAction,
  setStringStrand1: setStringStrand1Action,
  setStringStrand2: setStringStrand2Action,
  setStringStrandServing: setStringStrandServingAction,
  selectBuildFromMixedMaterialPreview: selectBuildFromMixedMaterialPreviewAction,
  resetBuild: resetBuildAction,
  setCustomizationLevel: setCustomizationLevelAction,
  setPricing: setPricingAction,
  setBowType: setBowTypeAction,
  setSelectedMaterialName: setSelectedMaterialNameAction,
})(StringBuilderLayout);
