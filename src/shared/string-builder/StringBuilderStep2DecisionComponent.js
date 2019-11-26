import React, { Component } from 'react';
import StringsServingImage from './../string-builder/strings-serving-image/StringsServingImage';
import StringBuilderForm from './../string-builder/string-builder-form/StringBuilderForm';
import MixedMaterialMessage from './../string-builder/help-messages/MixedMaterialMessage';
import StringBuildSummary from './../string-builder/summary/StringBuildSummary';

/*
  This component is going to have to look at each string parts' material and compare them.

  If the materials are homogenouse, then render the bow info form.

  Else the materials are different, render the MixedMaterialMessage.
  -- offer links to add to cart, edit
*/
import StringBuilderFormRecurveLong from './../string-builder/string-builder-form/StringBuilderFormRecurveLong';

export default class StringBuilderStep2DecisionComponent extends Component {

  render() {
    const areMaterialsHomogenous = () => {
      if (this.props.homogenousMaterials === true) {
        if (this.props.bowType === 'recurve' || this.props.bowType === 'long') {
          return (
            <StringBuilderFormRecurveLong
              bowType={this.props.bowType}
              stringLength={this.props.stringLength}
              selectedStringCableSet={this.props.selectedStringCableSet}
              handleBowTypeChange={this.props.handleBowTypeChange}
              handleStringLengthInput={this.props.handleStringLengthInput}
              handleStringSetChange={this.props.handleStringSetChange}
              handleAddNotesChange={this.props.handleAddNotesChange}
              priceCategory={this.props.priceCategory}
              handleAddStringToCart={this.props.handleAddStringToCart}
            />
          );
        } else {
          return (
            <StringBuilderForm
              handleBrandChange={this.props.handleBrandChange}
              handleBowModelChange={this.props.handleBowModelChange}
              bows={this.props.bows}
              bowModels={this.props.bowModels}
              bowType={this.props.bowType}
              bowBrandSelected={this.props.bowBrandSelected}
              bowModelSelected={this.props.bowModelSelected}
              stringLength={this.props.stringLength}
              selectedStringCableSet={this.props.selectedStringCableSet}
              handleBowTypeChange={this.props.handleBowTypeChange}
              handleStringLengthInput={this.props.handleStringLengthInput}
              handleStringSetChange={this.props.handleStringSetChange}
              handleAddNotesChange={this.props.handleAddNotesChange}
              priceCategory={this.props.priceCategory}
              handleAddStringToCart={this.props.handleAddStringToCart}
            />
          );
        }

      } else {
        return (
          <MixedMaterialMessage
            string1ColorPatterns={this.props.string1ColorPatterns}
            string2ColorPatterns={this.props.string2ColorPatterns}
            servingColorPatterns={this.props.servingColorPatterns}
            handleBuildResetClick={this.props.handleBuildResetClick}
            previewStrings={this.props.previewStrings}
            basedString1MaterialChoice={this.props.previewStrings.basedString1MaterialChoice}
            basedString2MaterialChoice={this.props.previewStrings.basedString2MaterialChoice}
            resolveMaterialMixConflict={this.props.resolveMaterialMixConflict}
            getStringPreviews={this.props.getStringPreviews}
            color1BackgroundImage={this.props.string1ColorPatterns.attributes.string2_location}
            color2BackgroundImage={this.props.string2ColorPatterns.attributes.string1_location}
            colorServingBackgroundImage={this.props.servingColorPatterns.attributes.serving_location}
            reEditString={this.props.handleReEditString}
            enterBowInfo={this.props.handleEnterBowInfo}
            handleSelectStrand1AndEnterBowInfo={this.props.handleSelectStrand1AndEnterBowInfo}
            handleSelectStrand2AndEnterBowInfo={this.props.handleSelectStrand2AndEnterBowInfo}
            handleSelectServingAndEnterBowInfo={this.props.handleSelectServingAndEnterBowInfo}
          />
        );
      }
    }

    return (
      <div id="step-2-wrapper">
        {this.props.homogenousMaterials === true ? <div className="row string-img-summary-wrapper"><div id="string-serving-wrapper"><StringsServingImage
                    color1BackgroundImage={this.props.color1BackgroundImage}
                    color2BackgroundImage={this.props.color2BackgroundImage}
                    colorServingBackgroundImage={this.props.colorServingBackgroundImage}
                  /></div><StringBuildSummary
                    currentMaterial={this.props.currentMaterial}
                    string1ColorPatterns={this.props.string1ColorPatterns}
                    string2ColorPatterns={this.props.string2ColorPatterns}
                    servingColorPatterns={this.props.servingColorPatterns}
                    bowType={this.props.bowType}
                    bowBrandSelected={this.props.bowBrandSelected}
                    bowModelSelected={this.props.bowModelSelected}
                    stringLength={this.props.stringLength}
                    selectedStringCableSet={this.props.selectedStringCableSet}
                    notes={this.props.notes}
                  /></div> : null}
        {areMaterialsHomogenous()}
      </div>
    )
  }
}
