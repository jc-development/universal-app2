import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SmallPreviewStringsServingImage from './../strings-serving-image/SmallPreviewStringsServingImage';
import { connect } from 'react-redux';

import { replaceWhiteWithAnotherColor as replaceWhiteWithAnotherColorAction } from './../../string-builder/assets/utilities/string-configuration/string-configuration-actions';

const materialInfo = {
  G8125: { content: '8125 provides good arrow speed, a soft shot but does require a longer shoot in period. 8125 is 100% SK75 Grade Dyneema. Standard strand count 20 (Compound)' },
  X8190: { content: 'Due to 8190\'s 100% Dyneema construction, it holds up extremely well to abrasion. 8190 is 100% SK90 Grade Dyneema. Standard strand count 28 (Compound)' },
  X452: { content: '452x is a Dyneema/Vectran (67% SK75 Dyneema/33% Vectran) blended material chosen by many target archers. 452x shoots in quickly, is stable over time but is not as abrasion resistant as other materials. Standard strand count Compound = 24, Recurve = 20' }
}

class MixedMaterialMessage extends Component {

  constructor(props) {
    super(props);

    this.handleViewMoreInfoClick = this.handleViewMoreInfoClick.bind(this);
    this.showMaterialContent = this.showMaterialContent.bind(this);
    this.changeButton1Wording = this.changeButton1Wording.bind(this);
    this.changeButton2Wording = this.changeButton2Wording.bind(this);
    this.changeButtonServingWording = this.changeButtonServingWording.bind(this);
    this.replaceWhiteColorWithAnotherFromMaterialString1 = this.replaceWhiteColorWithAnotherFromMaterialString1.bind(this);
    this.replaceWhiteColorWithAnotherFromMaterialString2 = this.replaceWhiteColorWithAnotherFromMaterialString2.bind(this);
    this.replaceWhiteColorWithAnotherFromMaterialServing = this.replaceWhiteColorWithAnotherFromMaterialServing.bind(this);

    this.state = {
      viewWording1: "VIEW",
      viewWording2: "VIEW",
      viewWordingServing: "VIEW",
    }
  }

  showMaterialContent(props) {
    switch(props) {

      case '8125G':
        return materialInfo.G8125.content;

      case '8190':
        return materialInfo.X8190.content;

      case '452x':
        return materialInfo.X452.content;

      default:
        break;
    }
  }

  handleViewMoreInfoClick(event) {
    window.ga('send', 'event', 'Page Interaction');
    let stringPartName = event.currentTarget.getAttribute('data-part');
  }

  changeButton1Wording(event) {
    // check className and can also animate
    if (event.currentTarget.className === "help-button btn") {
      this.setState({
        viewWording1: "MINIMIZE"
      });
    } else {
      this.setState({
        viewWording1: "VIEW"
      });
    }
  }

  changeButton2Wording(event) {
    // check className and can also animate
    if (event.currentTarget.className === "help-button btn") {
      this.setState({
        viewWording2: "MINIMIZE"
      });
    } else {
      this.setState({
        viewWording2: "VIEW"
      });
    }
  }

  changeButtonServingWording(event) {
    // check className and can also animate
    if (event.currentTarget.className === "help-button btn") {
      this.setState({
        viewWordingServing: "MINIMIZE"
      });
    } else {
      this.setState({
        viewWordingServing: "VIEW"
      });
    }
  }

  makeActiveStringPart(str1, str2, serv) {
    const partsArray = [str1, str2, serv];
    let stringPart;
    partsArray.forEach((part, i) => {
       if (part.hasOwnProperty('noColorForMaterial') === true) {
         switch (i) {
            case 1:
              stringPart = 'string-1';
              break;
            case 2:
              stringPart = 'string-2';
              break;
            default:
              stringPart = 'serving';
              break;
          }
       }
    })
    return stringPart;
  }

  replaceWhiteColorWithAnotherFromMaterialString1() {
    this.props.replaceWhiteWithAnotherColor(this.makeActiveStringPart(this.props.string1ColorPatterns.attributes.materialNameWhenSelected, this.props.previewStrings.basedString1MaterialChoice.string1ColorPatterns.attributes, this.props.previewStrings.basedString1MaterialChoice.string2ColorPatterns.attributes, this.props.previewStrings.basedString1MaterialChoice.servingColorPatterns.attributes), this.props.string1ColorPatterns.attributes.materialNameWhenSelected, this.props.previewStrings.basedString1MaterialChoice.string1ColorPatterns.attributes, this.props.previewStrings.basedString1MaterialChoice.string2ColorPatterns.attributes, this.props.previewStrings.basedString1MaterialChoice.servingColorPatterns.attributes);
  }

  replaceWhiteColorWithAnotherFromMaterialString2() {
    this.props.replaceWhiteWithAnotherColor(this.makeActiveStringPart(this.props.string2ColorPatterns.attributes.materialNameWhenSelected, this.props.previewStrings.basedString2MaterialChoice.string1ColorPatterns.attributes, this.props.previewStrings.basedString2MaterialChoice.string2ColorPatterns.attributes, this.props.previewStrings.basedString2MaterialChoice.servingColorPatterns.attributes), this.props.string2ColorPatterns.attributes.materialNameWhenSelected, this.props.previewStrings.basedString2MaterialChoice.string1ColorPatterns.attributes, this.props.previewStrings.basedString2MaterialChoice.string2ColorPatterns.attributes, this.props.previewStrings.basedString2MaterialChoice.servingColorPatterns.attributes);
  }

  replaceWhiteColorWithAnotherFromMaterialServing() {
    this.props.replaceWhiteWithAnotherColor(this.makeActiveStringPart(this.props.servingColorPatterns.attributes.materialNameWhenSelected, this.props.previewStrings.basedServingMaterialChoice.string1ColorPatterns.attributes, this.props.previewStrings.basedServingMaterialChoice.string2ColorPatterns.attributes, this.props.previewStrings.basedServingMaterialChoice.servingColorPatterns.attributes), this.props.servingColorPatterns.attributes.materialNameWhenSelected, this.props.previewStrings.basedServingMaterialChoice.string1ColorPatterns.attributes, this.props.previewStrings.basedServingMaterialChoice.string2ColorPatterns.attributes, this.props.previewStrings.basedServingMaterialChoice.servingColorPatterns.attributes);
  }

  componentDidMount() {
    this.props.getStringPreviews();
  }

  render() {
    const greenBorder1 = () => {
      if ((typeof this.props.previewStrings.basedString1MaterialChoice.string1ColorPatterns !== 'undefined' && this.props.previewStrings.basedString1MaterialChoice.string1ColorPatterns.attributes.noColorForMaterial === true) ||
        (typeof this.props.previewStrings.basedString1MaterialChoice.string2ColorPatterns !== 'undefined' && this.props.previewStrings.basedString1MaterialChoice.string2ColorPatterns.attributes.noColorForMaterial === true) ||
        (typeof this.props.previewStrings.basedString1MaterialChoice.servingColorPatterns !== 'undefined' && this.props.previewStrings.basedString1MaterialChoice.servingColorPatterns.attributes.noColorForMaterial === true)) {
          return "gray-bg"
        } else {
          return "gray-bg green-border"
        }
    }

    const greenBorder2 = () => {
      if ((typeof this.props.previewStrings.basedString2MaterialChoice.string1ColorPatterns !== 'undefined' && this.props.previewStrings.basedString2MaterialChoice.string1ColorPatterns.attributes.noColorForMaterial === true) ||
        (typeof this.props.previewStrings.basedString2MaterialChoice.string2ColorPatterns !== 'undefined' && this.props.previewStrings.basedString2MaterialChoice.string2ColorPatterns.attributes.noColorForMaterial === true) ||
        (typeof this.props.previewStrings.basedString2MaterialChoice.servingColorPatterns !== 'undefined' && this.props.previewStrings.basedString2MaterialChoice.servingColorPatterns.attributes.noColorForMaterial === true)) {
          return "gray-bg"
      } else {
        return "gray-bg green-border"
      }
    }

    const greenBorderServing = () => {
      if ((typeof this.props.previewStrings.basedServingMaterialChoice.string1ColorPatterns !== 'undefined' && this.props.previewStrings.basedServingMaterialChoice.string1ColorPatterns.attributes.noColorForMaterial === true) ||
        (typeof this.props.previewStrings.basedServingMaterialChoice.string2ColorPatterns !== 'undefined' && this.props.previewStrings.basedServingMaterialChoice.string2ColorPatterns.attributes.noColorForMaterial === true) ||
        (typeof this.props.previewStrings.basedServingMaterialChoice.servingColorPatterns !== 'undefined' && this.props.previewStrings.basedServingMaterialChoice.servingColorPatterns.attributes.noColorForMaterial === true)) {
          return "gray-bg"
      } else {
        return "gray-bg green-border"
      }
    }

    return (
      <div className="help-message-wrapper">
        <div className="help-message">
          <article>
              <div className="good-to-go"><span>green border</span> <br /><br />Indicates all colors are available for that material</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Part Name</th>
                  <th>Material</th>
                  <th>Color</th>
                  <th>Preview Option</th>
                </tr>
              </thead>
              <tbody>
                <tr className={greenBorder1()}>
                  <th scope="row">String Strand 1</th>
                  <td>{this.props.string1ColorPatterns.attributes.materialNameWhenSelected}</td>
                  <td>{this.props.string1ColorPatterns.attributes.name}</td>
                  <td><button data-part="string-1" data-material={this.props.string1ColorPatterns.attributes.materialNameWhenSelected}
                         className={this.state.viewWording1 === "MINIMIZE" ? "help-button btn open" : "help-button btn"}
                         onClick={this.changeButton1Wording}
                         >
                          {this.state.viewWording1} {this.props.string1ColorPatterns.attributes.materialNameWhenSelected} PREVIEW
                      </button>
                  </td>
                </tr>
                <tr className={this.state.viewWording1 === "MINIMIZE" ? `${greenBorder1()}` : `collapse ${greenBorder1()}`} id="collapseString1Preview">
                  <td colSpan="4">
                    <article>
                        <h3>BUILD PREVIEW BASED ON THE {this.props.string1ColorPatterns.attributes.materialNameWhenSelected} MATERIAL</h3>
                        {typeof this.props.previewStrings.basedString1MaterialChoice.string1ColorPatterns === 'undefined' ? null : <SmallPreviewStringsServingImage
                          color1={this.props.previewStrings.basedString1MaterialChoice.string1ColorPatterns.attributes}
                          color2={this.props.previewStrings.basedString1MaterialChoice.string2ColorPatterns.attributes}
                          colorServing={this.props.previewStrings.basedString1MaterialChoice.servingColorPatterns.attributes}
                          string1ColorPatterns={this.props.string1ColorPatterns}
                          string2ColorPatterns={this.props.string2ColorPatterns}
                          servingColorPatterns={this.props.servingColorPatterns}
                          handleViewMoreInfoClick={this.handleViewMoreInfoClick}
                          viewMoreInfoString1={this.state.viewMoreInfoString1}
                          stringId={'based-on-string-strand-1'}
                          reEditString={this.props.reEditString}
                          enterBowInfo={this.props.enterBowInfo}
                        />}
                        <div className="action-wrapper">
                          <h4>How would you like to proceed?</h4>
                          {((typeof this.props.previewStrings.basedString1MaterialChoice.string1ColorPatterns !== 'undefined' && this.props.previewStrings.basedString1MaterialChoice.string1ColorPatterns.attributes.noColorForMaterial === true) ||
                            (typeof this.props.previewStrings.basedString1MaterialChoice.string2ColorPatterns !== 'undefined' && this.props.previewStrings.basedString1MaterialChoice.string2ColorPatterns.attributes.noColorForMaterial === true) ||
                            (typeof this.props.previewStrings.basedString1MaterialChoice.servingColorPatterns !== 'undefined' && this.props.previewStrings.basedString1MaterialChoice.servingColorPatterns.attributes.noColorForMaterial === true)) ? <span><Link to="/string-builder/step-1"><button onClick={this.replaceWhiteColorWithAnotherFromMaterialString1} className="btn help-btn">REPLACE WHITE WITH ANOTHER {this.props.string1ColorPatterns.attributes.materialNameWhenSelected} COLOR</button></Link><br /></span> : <span><button
                              onClick={this.props.handleSelectStrand1AndEnterBowInfo}
                              className="btn help-btn">SELECT AND ENTER BOW INFO</button><br /></span>}
                          <Link to="/string-builder/step-1"><button onClick={this.props.handleBuildResetClick} className="btn help-btn">RESET BUILD</button></Link>
                        </div>
                        <footer>
                          <h5>About the {this.props.string1ColorPatterns.attributes.materialNameWhenSelected} Material</h5>
                          {this.showMaterialContent(this.props.string1ColorPatterns.attributes.materialNameWhenSelected)}
                        </footer>
                      </article>
                  </td>
                </tr>
                <tr className={greenBorder2()}>
                  <th scope="row">String Strand 2</th>
                  <td>{this.props.string2ColorPatterns.attributes.materialNameWhenSelected}</td>
                  <td>{this.props.string2ColorPatterns.attributes.name}</td>
                  <td><button data-part="string-2" data-material={this.props.string2ColorPatterns.attributes.materialNameWhenSelected}
                              className={this.state.viewWording2 === "MINIMIZE" ? "help-button btn open" : "help-button btn"}
                              onClick={this.changeButton2Wording}
                              >
                              {this.state.viewWording2} {this.props.string2ColorPatterns.attributes.materialNameWhenSelected} PREVIEW
                    </button>
                  </td>
                </tr>
                <tr className={this.state.viewWording2 === "MINIMIZE" ? `${greenBorder2()}` : `collapse ${greenBorder2()}`} id="collapseString2Preview">
                  <td colSpan="4">
                    <article>
                        <h3>BUILD PREVIEW BASED ON THE {this.props.string2ColorPatterns.attributes.materialNameWhenSelected} MATERIAL</h3>
                        {typeof this.props.previewStrings.basedString2MaterialChoice.string1ColorPatterns === 'undefined' ? null : <SmallPreviewStringsServingImage
                          color1={this.props.previewStrings.basedString2MaterialChoice.string1ColorPatterns.attributes}
                          color2={this.props.previewStrings.basedString2MaterialChoice.string2ColorPatterns.attributes}
                          colorServing={this.props.previewStrings.basedString2MaterialChoice.servingColorPatterns.attributes}
                          string1ColorPatterns={this.props.string1ColorPatterns}
                          string2ColorPatterns={this.props.string2ColorPatterns}
                          servingColorPatterns={this.props.servingColorPatterns}
                          handleViewMoreInfoClick={this.handleViewMoreInfoClick}
                          viewMoreInfoString1={this.state.viewMoreInfoString1}
                          stringId={'based-on-string-strand-2'}
                          reEditString={this.props.reEditString}
                          enterBowInfo={this.props.enterBowInfo}
                        />}
                        <div className="action-wrapper">
                          <h4>How would you like to proceed?</h4>
                          {((typeof this.props.previewStrings.basedString2MaterialChoice.string1ColorPatterns !== 'undefined' && this.props.previewStrings.basedString2MaterialChoice.string1ColorPatterns.attributes.noColorForMaterial === true) ||
                            (typeof this.props.previewStrings.basedString2MaterialChoice.string2ColorPatterns !== 'undefined' && this.props.previewStrings.basedString2MaterialChoice.string2ColorPatterns.attributes.noColorForMaterial === true) ||
                            (typeof this.props.previewStrings.basedString2MaterialChoice.servingColorPatterns !== 'undefined' && this.props.previewStrings.basedString2MaterialChoice.servingColorPatterns.attributes.noColorForMaterial === true)) ? <span><Link to="/string-builder/step-1"><button onClick={this.replaceWhiteColorWithAnotherFromMaterialString2} className="btn help-btn">REPLACE WHITE WITH ANOTHER {this.props.string2ColorPatterns.attributes.materialNameWhenSelected} COLOR</button></Link><br /></span> : <span><button onClick={this.props.handleSelectStrand2AndEnterBowInfo} className="btn help-btn">SELECT AND ENTER BOW INFO</button><br /></span>}
                          <Link to="/string-builder/step-1"><button onClick={this.props.handleBuildResetClick} className="btn help-btn">RESET BUILD</button></Link>
                        </div>
                        <footer>
                          <h5>About the {this.props.string2ColorPatterns.attributes.materialNameWhenSelected} Material</h5>
                          {this.showMaterialContent(this.props.string2ColorPatterns.attributes.materialNameWhenSelected)}
                        </footer>
                      </article>
                  </td>
                </tr>
                <tr className={greenBorderServing()}>
                  <th scope="row">Serving</th>
                  <td>{this.props.servingColorPatterns.attributes.materialNameWhenSelected}</td>
                  <td>{this.props.servingColorPatterns.attributes.name}</td>
                  <td><button data-part="serving" data-material={this.props.servingColorPatterns.attributes.materialNameWhenSelected}
                              className={this.state.viewWordingServing === "MINIMIZE" ? "help-button btn open" : "help-button btn"}
                              onClick={this.changeButtonServingWording}
                              >
                              {this.state.viewWordingServing} {this.props.servingColorPatterns.attributes.materialNameWhenSelected} PREVIEW
                      </button>
                    </td>
                </tr>
                <tr className={this.state.viewWordingServing === "MINIMIZE" ? `${greenBorderServing()}` : `collapse ${greenBorderServing()}`} id="collapseServingPreview">
                  <td colSpan="4">
                    <article>
                        <h3>BUILD PREVIEW BASED ON THE {this.props.string2ColorPatterns.attributes.materialNameWhenSelected} MATERIAL</h3>
                        {typeof this.props.previewStrings.basedServingMaterialChoice.string1ColorPatterns === 'undefined' ? null : <SmallPreviewStringsServingImage
                          color1={this.props.previewStrings.basedServingMaterialChoice.string1ColorPatterns.attributes}
                          color2={this.props.previewStrings.basedServingMaterialChoice.string2ColorPatterns.attributes}
                          colorServing={this.props.previewStrings.basedServingMaterialChoice.servingColorPatterns.attributes}
                          string1ColorPatterns={this.props.string1ColorPatterns}
                          string2ColorPatterns={this.props.string2ColorPatterns}
                          servingColorPatterns={this.props.servingColorPatterns}
                          handleViewMoreInfoClick={this.handleViewMoreInfoClick}
                          viewMoreInfoString1={this.state.viewMoreInfoString1}
                          stringId={'based-on-serving'}
                          reEditString={this.props.reEditString}
                          enterBowInfo={this.props.enterBowInfo}
                        />}
                        <div className="action-wrapper">
                          <h4>How would you like to proceed?</h4>
                          {((typeof this.props.previewStrings.basedServingMaterialChoice.string1ColorPatterns !== 'undefined' && this.props.previewStrings.basedServingMaterialChoice.string1ColorPatterns.attributes.noColorForMaterial === true) ||
                            (typeof this.props.previewStrings.basedServingMaterialChoice.string2ColorPatterns !== 'undefined' && this.props.previewStrings.basedServingMaterialChoice.string2ColorPatterns.attributes.noColorForMaterial === true) ||
                            (typeof this.props.previewStrings.basedServingMaterialChoice.servingColorPatterns !== 'undefined' && this.props.previewStrings.basedServingMaterialChoice.servingColorPatterns.attributes.noColorForMaterial === true)) ? <span><Link to="/string-builder/step-1"><button onClick={this.replaceWhiteColorWithAnotherFromMaterialServing} className="btn help-btn">REPLACE WHITE WITH ANOTHER {this.props.servingColorPatterns.attributes.materialNameWhenSelected} COLOR</button></Link><br /></span> : <span><button onClick={this.props.handleSelectServingAndEnterBowInfo} className="btn help-btn">SELECT AND ENTER BOW INFO</button><br /></span>}
                          <Link to="/string-builder/step-1"><button onClick={this.props.handleBuildResetClick} className="btn help-btn">RESET BUILD</button></Link>
                        </div>
                        <footer>
                          <h5>About the {this.props.servingColorPatterns.attributes.materialNameWhenSelected} Material</h5>
                          {this.showMaterialContent(this.props.servingColorPatterns.attributes.materialNameWhenSelected)}
                        </footer>
                      </article>
                  </td>
                </tr>
              </tbody>
            </table>
          </article>
        </div>
      </div>
    );
  }
}

export default connect(null, {replaceWhiteWithAnotherColor: replaceWhiteWithAnotherColorAction})(MixedMaterialMessage)
