import React, { Component } from 'react';
import SolidColorPattern from './../string-serving-color-selection-panel/rendered-color-pattern/SolidColorPattern';
import DualColorPattern from './../string-serving-color-selection-panel/rendered-color-pattern/DualColorPattern';
import TripleColorPattern from './../string-serving-color-selection-panel/rendered-color-pattern/TripleColorPattern';
import TweenMax from 'gsap/TweenMax';
import scrollTo from 'gsap/ScrollToPlugin';

export default class MaterialSelectionPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showMobileMaterialDetail: false
    }

    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.showMobileMaterialDetail = this.showMobileMaterialDetail.bind(this);
  }

  handleLeftClick(event) {
    window.ga('send', 'event', 'Page Interaction');

    const scrollableWidth = this.colorsWrapper.scrollWidth;
    const viewableWidth = this.colorsWrapper.getBoundingClientRect().width;
    const maxScroll = scrollableWidth - Math.round(viewableWidth);
    const currentScrollPosition = this.colorsWrapper.scrollLeft;
    TweenMax.to(this.colorsWrapper, 0.5, {scrollTo:{x: currentScrollPosition - (maxScroll/4)}})
  }

  handleRightClick(event) {
    window.ga('send', 'event', 'Page Interaction');

    const scrollableWidth = this.colorsWrapper.scrollWidth;
    const viewableWidth = this.colorsWrapper.getBoundingClientRect().width;
    const maxScroll = scrollableWidth - Math.round(viewableWidth);
    const currentScrollPosition = this.colorsWrapper.scrollLeft;
    TweenMax.to(this.colorsWrapper, 0.5, {scrollTo:{x: currentScrollPosition + (maxScroll/4)}})
  }

  showMobileMaterialDetail() {
    this.setState({
      showMobileMaterialDetail:  !this.state.showMobileMaterialDetail
    })
  }

  render() {
      if(this.props.activeStringPart === "serving") {
        this.props.colorsForMaterial = this.props.colorsForMaterial.filter(color => color.attributes.name !== "Dyed White (FFF)")
      }
      const colorNodes1 = this.props.colorsForMaterial.map( (color, i) => {
        switch (color.attributes.num_colors) {
          case 1:
            return (
              <div className="color-pattern-wrapper" key={i}>
                <span className='color-pattern-click' onClick={this.props.handleColorClick} title={color.attributes.name}></span>
                <SolidColorPattern
                colorBackground={color.attributes.hex_colors[0]}
                colorName={color.attributes.name}
                />
              </div>
          );
          case 2:
            return (
              <div className="color-pattern-wrapper" key={i}>
                {this.props.activeStringPart === "serving" ? <p className="color-disabled">N/A</p> : null}
                <span className='color-pattern-click' onClick={this.props.handleColorClick} title={color.attributes.name}></span>
                <DualColorPattern
                colorBackground1={color.attributes.hex_colors[0]}
                colorBackground2={color.attributes.hex_colors[1]}
                colorName={color.attributes.name}
                />
              </div>
          );
          case 3:
            return (
              <div className="color-pattern-wrapper" key={i}>
                {this.props.activeStringPart === "serving" ? <p className="color-disabled">N/A</p> : null}
                <span className='color-pattern-click' onClick={this.props.handleColorClick} title={color.attributes.name}></span>
                <TripleColorPattern
                colorBackground1={color.attributes.hex_colors[0]}
                colorBackground2={color.attributes.hex_colors[1]}
                colorBackground3={color.attributes.hex_colors[2]}
                colorName={color.attributes.name}
                />
              </div>
          );
          default:
            break;
      }
      return null;
    });
    // Cut the first half of the array and store to this variable for making two rows of equal length
    const colorNodes2 = colorNodes1.splice(0, Math.ceil(colorNodes1.length / 2))
    return (
      <div className="container" id="material-wrapper">
        <div className="row material-tabs">
          <div className={this.props.currentMaterial === "8190" ? "col-xs-4 active" : "col-xs-4"} onClick={this.props.handleMaterialClick}><h3>8190</h3></div>
          <div className={this.props.currentMaterial === "8125G" ? "col-xs-4 active" : "col-xs-4"} onClick={this.props.handleMaterialClick}><h3>8125G</h3></div>
          <div className={this.props.currentMaterial === "452x" ? "col-xs-4 active" : "col-xs-4"} onClick={this.props.handleMaterialClick}><h3>452x</h3></div>
          {this.props.activeStringPart === "serving" ? <div className="serving-multi-color-msg"><p>Servings can only be made from solid colors *</p></div> : null}
        </div>
        <div className="row">
          <button className="btn btn-mobile-material" type="button" onClick={this.showMobileMaterialDetail}>
            Material Overview - {this.props.currentMaterial}<i className="fa fa-chevron-circle-up mobile-material-indicator" aria-hidden="true"></i>
          </button>
          <div className={this.state.showMobileMaterialDetail ? "" : "collapse"} id="collapseMaterial">
            <div className="well well-mobile-material">
              <p id="mobile-X8190">8190 is 100% SK90 grade Dyneema. Due to it’s 100% Dyneema construction, it holds up extremely well to abrasion. Standard strand count 28 (Compound)</p>
              <p id="mobile-G8125">8125 is 100% SK75 grade Dyneema. 8125 is the material Winner’s Choice built it’s reputation on. 8125 provides good arrow speed, a soft shot but does require a longer shoot in period. Standard strand count 20 (Compound)</p>
              <p id="mobile-X452">452x is a Dyneema/Vectran (67% SK75 Dyneema/33% Vectran) blended material chosen by many target archers. 452x shoots in quickly, is stable over time but is not as abrasion resistant as other materials. Standard strand count Compound = 24, Recurve = 20</p>
            </div>
          </div>


          <div id="x8190-content" className="col-sm-offset-1 col-sm-10">
            <p>8190 is 100% SK90 grade Dyneema. Due to it’s 100% Dyneema construction, it holds up extremely well to abrasion. Standard strand count 28 (Compound)</p>
          </div>
          <div id="g8125-content" className="col-sm-offset-1 col-sm-10">
            <p>8125 is 100% SK75 grade Dyneema. 8125 is the material Winner’s Choice built it’s reputation on. 8125 provides good arrow speed, a soft shot but does require a longer shoot in period. Standard strand count 20 (Compound)</p>
          </div>
          <div id="x452-content" className="col-sm-offset-1 col-sm-10">
            <p>452x is a Dyneema/Vectran (67% SK75 Dyneema/33% Vectran) blended material chosen by many target archers. 452x shoots in quickly, is stable over time but is not as abrasion resistant as other materials. Standard strand count Compound = 24, Recurve = 20</p>
          </div>

        </div>
        <div className="colors-section-wrapper">
          <div className="color-indicators" onClick={this.handleLeftClick}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </div>
          <div className="colors-wrapper" ref={colorsWrapper => this.colorsWrapper = colorsWrapper}>
            <div className="swatch-colors-wrapper-element">
            {colorNodes2.length === 1 ? <img className="cart-ajax-loader" src="https://s3.amazonaws.com/string-builder/website-images/cart-ajax-loader.gif" role="presentation" /> : colorNodes2}
            </div>
            <div className="swatch-colors-wrapper-element">
            {colorNodes1}
            </div>
          </div>
          <div className="color-indicators" onClick={this.handleRightClick}>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </div>
        </div>
    </div>
    );
  }
}
