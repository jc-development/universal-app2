import { 
  BUILD_PRECONFIG_STRING_REQUESTED, BUILD_PRECONFIG_STRING_SUCCEEDED, BUILD_PRECONFIG_STRING_FAILED,
  SET_STRING_STRAND_1_REQUESTED, SET_STRING_STRAND_1_SUCCEEDED, SET_STRING_STRAND_1_FAILED,
  SET_STRING_STRAND_2_REQUESTED, SET_STRING_STRAND_2_SUCCEEDED, SET_STRING_STRAND_2_FAILED,
  SET_STRING_STRAND_SERVING_REQUESTED, SET_STRING_STRAND_SERVING_SUCCEEDED, SET_STRING_STRAND_SERVING_FAILED, 
  SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_REQUESTED, SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_SUCCEEDED, SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_FAILED,
  RESET_BUILD_REQUESTED, RESET_BUILD_SUCCEEDED, RESET_BUILD_FAILED,
  REPLACE_WHITE_WITH_ANOTHER_COLOR_REQUESTED, REPLACE_WHITE_WITH_ANOTHER_COLOR_SUCCEEDED, REPLACE_WHITE_WITH_ANOTHER_COLOR_FAILED,
  SET_CUSTOMIZATION_LEVEL_REQUESTED, SET_CUSTOMIZATION_LEVEL_SUCCEEDED, SET_CUSTOMIZATION_LEVEL_FAILED,
  SET_PRICING_REQUESTED, SET_PRICING_SUCCEEDED, SET_PRICING_FAILED,
  SET_BOW_TYPE_REQUESTED, SET_BOW_TYPE_SUCCEEDED, SET_BOW_TYPE_FAILED,
  SET_SELECTED_MATERIAL_NAME_REQUESTED, SET_SELECTED_MATERIAL_NAME_SUCCEEDED, SET_SELECTED_MATERIAL_NAME_FAILED
} from './string-configuration-actions';

const initialState = {
  string1ColorPatterns: {
    attributes: {
      name: 'Buckskin (080)',
      num_colors: 1,
      materials: ['8190', '8125G', '452x'],
      hex_colors: ['#e4af76'],
      string1_location: 'https://s3.amazonaws.com/string-builder/strings/buckskin_string2.png',
      string2_location: 'https://s3.amazonaws.com/string-builder/strings/buckskin_string1.png',
      serving_location: 'https://s3.amazonaws.com/string-builder/serving/buckskin.png',
      materialNameWhenSelected: '452x'
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
      materialNameWhenSelected: '452x'
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
      materialNameWhenSelected: '452x'
    }
  },
  variantId: '',
  activeStringPart: 'string-1',
  currentMaterial: '452x', // need to update this with a click of material name
  homogenousMaterials: true,
  bowType: 'compound',
  customizationLevel: '',
  priceCategory: []
};

const buildStringReducer = (previousState = initialState, {type, payload}) => {
  switch (type) {
    case BUILD_PRECONFIG_STRING_SUCCEEDED:
    // console.log('preconfig payload: ', payload)
      return {
        ...previousState,
        ...payload
      };
    
    case SET_STRING_STRAND_1_SUCCEEDED:
    // console.log('string strand 1 payload: ', payload)
      return {
        ...previousState,
        ...payload
      };
    
    case SET_STRING_STRAND_2_SUCCEEDED:
    // console.log('string strand 2 payload: ', payload)
      return {
        ...previousState,
        ...payload
      };

    case SET_STRING_STRAND_SERVING_SUCCEEDED:
    // console.log('string strand serving payload: ', payload)
      return {
        ...previousState,
        ...payload
      };

    case SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_SUCCEEDED:
    // console.log('selectBuildFromMixedMaterialPreview payload: ', payload)
      return {
        ...previousState,
        string1ColorPatterns: {
          attributes: previousState.string1ColorPatterns.attributes,
          materialNameWhenSelected: payload
        },
        string2ColorPatterns: {
          attributes: previousState.string2ColorPatterns.attributes,
          materialNameWhenSelected: payload
        },
        servingColorPatterns: {
          attributes: previousState.servingColorPatterns.attributes,
          materialNameWhenSelected: payload
        },
        currentMaterial: payload,
        homogenousMaterials: true
      };

    case RESET_BUILD_SUCCEEDED:
      return {
        ...previousState,
        ...initialState
      };

    case REPLACE_WHITE_WITH_ANOTHER_COLOR_SUCCEEDED:
    // console.log('replacewhitecolorwithanother payload: ', payload)
      return {
        ...previousState,
        ...payload
      };

    case SET_CUSTOMIZATION_LEVEL_SUCCEEDED:
    // console.log('customization level payload: ', payload)
      return {
        ...previousState,
        customizationLevel: payload
      };

    case SET_PRICING_SUCCEEDED:
    // console.log('pricing payload: ', payload)
      return {
        ...previousState,
        priceCategory: payload
      };

    case SET_BOW_TYPE_SUCCEEDED:
    // console.log('bowType payload: ', payload)
      return {
        ...previousState,
        bowType: payload
      };

    case SET_SELECTED_MATERIAL_NAME_SUCCEEDED:
    // console.log('selectedMaterialName payload: ', payload)
      return {
        ...previousState,
        currentMaterial: payload
      };

    default:
      return previousState;
  }
};

export default buildStringReducer;
