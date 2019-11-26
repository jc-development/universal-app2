import React, { Component } from 'react';

export default class SmallPreviewStringsServingImage extends Component {

  render() {
    const colorMissingFromMaterial = () => {
      if ((typeof this.props.color1.noColorForMaterial !== 'undefined' && this.props.color1.noColorForMaterial === true) ||
          (typeof this.props.color2.noColorForMaterial !== 'undefined' && this.props.color2.noColorForMaterial === true) ||
          (typeof this.props.colorServing.noColorForMaterial !== 'undefined' && this.props.colorServing.noColorForMaterial === true)
         ) {
        return (
          <table className="table striped" id="missing-color-material-table">
            <tr>
              {this.props.color1.noColorForMaterial === true ? <td><p className="color-not-available">The color {this.props.string1ColorPatterns.attributes.name + ' is not available for ' + this.props.color1.materialNameWhenSelected + '. Resetting to white.'}</p></td> : null}
            </tr>
            <tr>
              {this.props.color2.noColorForMaterial === true ? <td><p className="color-not-available">The color {this.props.string2ColorPatterns.attributes.name + ' is not available for ' + this.props.color2.materialNameWhenSelected + '. Resetting to white.'}</p></td> : null}
            </tr>
            <tr>
              {this.props.colorServing.noColorForMaterial === true ? <td><p className="color-not-available">The color {this.props.servingColorPatterns.attributes.name + ' is not available for ' + this.props.colorServing.materialNameWhenSelected + '. Resetting to white.'}</p></td> : null}
            </tr>
          </table>
        );
      } else {
        return null;
      }
    }

    const gotColorNodes = () => {
      if (typeof this.props.color1 === 'undefined') {
        return (
          <div className="small-preview-strings-serving-image-wrapper"></div>
        );
      } else {
        return (
            <div>
              <div className="small-preview-strings-serving-image-wrapper" id={this.props.stringId}>
                <img src={this.props.color1.string2_location}
                     className="color-1-image"
                     role="presentation"
                />
                <img src={this.props.color2.string1_location}
                     className="color-2-image"
                     role="presentation"
                />
                <img src={this.props.colorServing.serving_location}
                     className="serving-image"
                     role="presentation"
                />
            </div>
            {colorMissingFromMaterial()}
          </div>
        );
      }
    };

    return (
      <div>
        {gotColorNodes()}
      </div>
    );
  }
}
