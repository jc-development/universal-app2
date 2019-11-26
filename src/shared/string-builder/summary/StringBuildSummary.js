import React, { Component } from 'react';

export default class StringBuildSummary extends Component {

  constructor(props) {
    super(props);

    this.displayMoreInfo = this.displayMoreInfo.bind(this);

    this.state = {
      showDetail: false
    }
  }

  displayMoreInfo() {
    this.setState({
      showDetail: !this.state.showDetail
    });
  }

  componentDidMount () {
    /**** FOR STRING MATERIAL SUMMARY ****/
    switch (this.props.currentMaterial) {

      case '8190':
        document.getElementById('SummaryX8190').style.display = "block";
        document.getElementById('SummaryG8125').style.display = "none";
        document.getElementById('SummaryX452').style.display = "none";
        break;

      case '8125G':
        document.getElementById('SummaryX8190').style.display = "none";
        document.getElementById('SummaryG8125').style.display = "block";
        document.getElementById('SummaryX452').style.display = "none";
        break;

      case '452x':
        document.getElementById('SummaryX8190').style.display = "none";
        document.getElementById('SummaryG8125').style.display = "none";
        document.getElementById('SummaryX452').style.display = "block";
        break;

      default:
        document.getElementById('SummaryX8190').style.display = "none";
        document.getElementById('SummaryG8125').style.display = "none";
        document.getElementById('SummaryX452').style.display = "block";
        break;
    }
  }
  render() {
    // this.props.string1ColorPatterns.attributes
    return (
      <div className="" id="string-builder-summary">
        <article className="col-sm-4 col-md-4">
          <h3>String Build Summary</h3>
          <h4>String and Cables will be matching material and color pattern</h4>
          <dl>
            <dt>Material: {this.props.currentMaterial} <button className="btn summary-more-info more-info" onClick={this.displayMoreInfo}>More Info</button></dt>
            <div className={this.state.showDetail ? "" : "collapse" } id="collapseSummaryMaterial">
              <div className="well summary-well">

                <dd id="SummaryX8190">8190 is 100% SK90 grade Dyneema. Due to it’s 100% Dyneema construction, it holds up extremely well to abrasion. Standard strand count 28 (Compound)</dd>
                <dd id="SummaryG8125">8125 is 100% SK75 grade Dyneema. 8125 is the material Winner’s Choice built it’s reputation on. 8125 provides good arrow speed, a soft shot but does require a longer shoot in period. Standard strand count 20 (Compound)</dd>
                <dd id="SummaryX452">452x is a Dyneema/Vectran (67% SK75 Dyneema/33% Vectran) blended material chosen by many target archers. 452x shoots in quickly, is stable over time but is not as abrasion resistant as other materials. Standard strand count Compound = 24, Recurve = 20</dd>
              </div>
            </div>
            <dd><span>String Strand 1 Color:</span> {this.props.string1ColorPatterns.attributes.name}</dd>
            <dd><span>String Strand 2 Color:</span> {this.props.string2ColorPatterns.attributes.name}</dd>
            <dd><span>Serving Color:</span> {this.props.servingColorPatterns.attributes.name}</dd>
          </dl>
        </article>
        <article className="col-sm-4 col-md-4">
          <h3>Bow Info Summary</h3>
          <dl>
            <dt><span>Type:</span> {this.props.bowType}</dt>
            <dd><span>Brand:</span> {this.props.bowBrandSelected}</dd>
            <dd><span>Model:</span> {this.props.bowModelSelected}</dd>
            <dd><span>String Length:</span> {this.props.stringLength} inches</dd>
            <dd><span>Notes:</span> {this.props.notes}</dd>
          </dl>
        </article>

        <article className="col-sm-4 col-md-4">
          <h3>String/Cable Set</h3>
          <dl>
            <dt>{this.props.selectedStringCableSet}</dt>
          </dl>
        </article>
      </div>
    )
  }
}
