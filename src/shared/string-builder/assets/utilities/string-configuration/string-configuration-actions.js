export const BUILD_PRECONFIG_STRING_REQUESTED = 'BUILD_PRECONFIG_STRING_REQUESTED';
export const BUILD_PRECONFIG_STRING_SUCCEEDED = 'BUILD_PRECONFIG_STRING_SUCCEEDED';
export const BUILD_PRECONFIG_STRING_FAILED = 'BUILD_PRECONFIG_STRING_FAILED';

export const SET_STRING_STRAND_1_REQUESTED = 'SET_STRING_STRAND_1_REQUESTED';
export const SET_STRING_STRAND_1_SUCCEEDED = 'SET_STRING_STRAND_1_SUCCEEDED';
export const SET_STRING_STRAND_1_FAILED = 'SET_STRING_STRAND_1_FAILED';

export const SET_STRING_STRAND_2_REQUESTED = 'SET_STRING_STRAND_2_REQUESTED';
export const SET_STRING_STRAND_2_SUCCEEDED = 'SET_STRING_STRAND_2_SUCCEEDED';
export const SET_STRING_STRAND_2_FAILED = 'SET_STRING_STRAND_2_FAILED';

export const SET_STRING_STRAND_SERVING_REQUESTED = 'SET_STRING_STRAND_SERVING_REQUESTED';
export const SET_STRING_STRAND_SERVING_SUCCEEDED = 'SET_STRING_STRAND_SERVING_SUCCEEDED';
export const SET_STRING_STRAND_SERVING_FAILED = 'SET_STRING_STRAND_SERVING_FAILED';

export const SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_REQUESTED = 'SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_REQUESTED';
export const SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_SUCCEEDED = 'SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_SUCCEEDED';
export const SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_FAILED = 'SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_FAILED';

export const RESET_BUILD_REQUESTED = 'RESET_BUILD_REQUESTED';
export const RESET_BUILD_SUCCEEDED = 'RESET_BUILD_SUCCEEDED';
export const RESET_BUILD_FAILED = 'RESET_BUILD_FAILED';

export const REPLACE_WHITE_WITH_ANOTHER_COLOR_REQUESTED = 'REPLACE_WHITE_WITH_ANOTHER_COLOR_REQUESTED';
export const REPLACE_WHITE_WITH_ANOTHER_COLOR_SUCCEEDED = 'REPLACE_WHITE_WITH_ANOTHER_COLOR_SUCCEEDED';
export const REPLACE_WHITE_WITH_ANOTHER_COLOR_FAILED = 'REPLACE_WHITE_WITH_ANOTHER_COLOR_FAILED';

export const SET_CUSTOMIZATION_LEVEL_REQUESTED = 'SET_CUSTOMIZATION_LEVEL_REQUESTED';
export const SET_CUSTOMIZATION_LEVEL_SUCCEEDED = 'SET_CUSTOMIZATION_LEVEL_SUCCEEDED';
export const SET_CUSTOMIZATION_LEVEL_FAILED = 'SET_CUSTOMIZATION_LEVEL_FAILED';

export const SET_PRICING_REQUESTED = 'SET_PRICING_REQUESTED';
export const SET_PRICING_SUCCEEDED = 'SET_PRICING_SUCCEEDED';
export const SET_PRICING_FAILED = 'SET_PRICING_FAILED';

export const SET_BOW_TYPE_REQUESTED = 'SET_BOW_TYPE_REQUESTED';
export const SET_BOW_TYPE_SUCCEEDED = 'SET_BOW_TYPE_SUCCEEDED';
export const SET_BOW_TYPE_FAILED = 'SET_BOW_TYPE_FAILED';

export const SET_SELECTED_MATERIAL_NAME_REQUESTED = 'SET_SELECTED_MATERIAL_NAME_REQUESTED';
export const SET_SELECTED_MATERIAL_NAME_SUCCEEDED = 'SET_SELECTED_MATERIAL_NAME_SUCCEEDED';
export const SET_SELECTED_MATERIAL_NAME_FAILED = 'SET_SELECTED_MATERIAL_NAME_FAILED';

export const buildPreconfigString = (preconfigString) => {
  return {
    type: BUILD_PRECONFIG_STRING_REQUESTED,
    preconfigString
  };
}

export const setStringStrand1 = (stringStrand1) => {
  return {
    type: SET_STRING_STRAND_1_REQUESTED,
    stringStrand1: {
      string1ColorPatterns: stringStrand1,
      currentMaterial: stringStrand1.attributes.materialNameWhenSelected
    }
  };
}

export const setStringStrand2 = (stringStrand2) => {
  return {
    type: SET_STRING_STRAND_2_REQUESTED,
    stringStrand2: {
      string2ColorPatterns: stringStrand2,
      currentMaterial: stringStrand2.attributes.materialNameWhenSelected
    }
  };
}

export const setStringStrandServing = (stringStrandServing) => {
  return {
    type: SET_STRING_STRAND_SERVING_REQUESTED,
    stringStrandServing: {
      servingColorPatterns: stringStrandServing,
      currentMaterial: stringStrandServing.attributes.materialNameWhenSelected
    }
  };
}

export const selectBuildFromMixedMaterialPreview = (buildSelected) => {
  return {
    type: SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_REQUESTED,
    buildSelected
  };
}

export const resetBuild = () => {
  return {
    type: RESET_BUILD_REQUESTED,
    payload: {}
  };
}

export const replaceWhiteWithAnotherColor = (activeStringPart, materialToSetParts, string1Attr, string2Attr, servingAttr) => {
  return {
    type: REPLACE_WHITE_WITH_ANOTHER_COLOR_REQUESTED,
    updateStringConfig : {
      string1ColorPatterns: {
        attributes: string1Attr,
        materialNameWhenSelected: materialToSetParts
      },
      string2ColorPatterns: {
        attributes: string2Attr,
        materialNameWhenSelected: materialToSetParts
      },
      servingColorPatterns: {
        attributes: servingAttr,
        materialNameWhenSelected: materialToSetParts
      },
      activeStringPart: activeStringPart,
      currentMaterial: materialToSetParts,
      homogenousMaterials: true
    }
  };
}

export const setCustomizationLevel = (customizationLevel) => {
  return {
    type: SET_CUSTOMIZATION_LEVEL_REQUESTED,
    customizationLevel
  };
}

export const setPricing = (pricing) => {
  return {
    type: SET_PRICING_REQUESTED,
    pricing
  };
}

export const setBowType = (bowType) => {
  return {
    type: SET_BOW_TYPE_REQUESTED,
    bowType
  };
}

export const setSelectedMaterialName = (selectedMaterialName) => {
  return {
    type: SET_SELECTED_MATERIAL_NAME_REQUESTED,
    selectedMaterialName
  };
}