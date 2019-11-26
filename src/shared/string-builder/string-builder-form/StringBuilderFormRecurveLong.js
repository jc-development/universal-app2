import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import store from './../../../../store';

export default class StringBuilderForm extends Component {

  constructor(props) {
    super(props);

    this.checkFormForErrors = this.checkFormForErrors.bind(this);
    this.checkIfAllClear = this.checkIfAllClear.bind(this);

    this.done = false

    this.state = {
      errors: true,
      stringLengthErrorMsg: '',
      stringCableSetNameErrorMsg: '',
      stringLength: null,
      selectedStringCableSet: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        ...nextProps
      })
    }
  }

  checkIfAllClear() {
    if (this.state.stringLengthErrorMsg === '' &&
        this.state.stringCableSetNameErrorMsg === ''
        ) {
          // need to limit to running once
          if (this.done === false) {
            this.setState({
                errors: false
            }, () => { this.props.handleAddStringToCart(); });
            this.done = true;
          }
     } else {
       this.setState({
         errors: true
       }, () => { return this.state; });
     }
  }

  // function that occurs on click and handles a check
  // - the check validates the data in the form
  // - - if good, submits to the cart, else errors happen to guide person through
  checkFormForErrors(event, checkIfAllClear) {
    window.ga('send', 'event', 'Page Interaction');
    event.preventDefault();
     if (this.state.stringLength === null || this.state.stringLength === 0 || this.state.stringLength === '') {
       this.setState({
         stringLengthErrorMsg: 'If you do not know your string length, enter N/A'
       });
     } else {
       this.setState({
         stringLengthErrorMsg: ''
       }, () => { this.checkIfAllClear(); });

     }

     if (this.state.selectedStringCableSet === 'None selected yet') {
       this.setState({
         stringCableSetNameErrorMsg: 'Please select a string/cable set'
       });
     } else {
       this.setState({
         stringCableSetNameErrorMsg: ''
       }, () => { this.checkIfAllClear(); });
     }
  }

  render() {

    const getVariantNodes = () => {
      if (typeof this.props.priceCategory[0] !== 'undefined') {
        const variants = this.props.priceCategory[0].variants;
        const variantNodes = variants.map( (variant, i) => {
          return (<option key={i} value={variant.title + ' - $' + variant.price} data-variant-id={variant.id} data-variant={variant.title + ' - $' + variant.price}>{variant.title} - ${variant.price}</option>);
        });
        return variantNodes;
      }
    }

    return (
      <form className="container">
      <div className="col-sm-12">
        <h5 className="col-sm-12">* indicates a required field</h5>
      </div>
      <div className="col-sm-3">
        <fieldset className="form-group col-sm-12">
          <label>TYPE OF BOW *</label>

          <div className="radio">
                <label className="radio-inline">
                  <input
                    type="radio" name="bow_type"
                    id="bow_type1" value="compound"
                    checked={this.props.bowType === 'compound' ? true : false}
                    onChange={this.props.handleBowTypeChange}
                  />
                  Compound Bow
                </label>
              </div>

              <div className="radio">
                <label className="radio-inline">
                  <input
                    type="radio" name="bow_type"
                    id="bow_type2" value="crossbow"
                    checked={this.props.bowType === 'crossbow' ? true : false}
                    onChange={this.props.handleBowTypeChange}
                  />
                  Crossbow
                </label>
              </div>

              <div className="radio">
                <label className="radio-inline">
                  <input
                    type="radio" name="bow_type"
                    id="bow_type3" value="recurve"
                    checked={this.props.bowType === 'recurve' ? true : false}
                    onChange={this.props.handleBowTypeChange}
                  />
                  Recurve bow
                </label>
              </div>

              <div className="radio">
                <label className="radio-inline">
                  <input
                    type="radio" name="bow_type"
                    id="bow_type4" value="long"
                    checked={this.props.bowType === 'long' ? true : false}
                    onChange={this.props.handleBowTypeChange}
                  />
                  Long bow
                </label>
              </div>
        </fieldset>
      </div>

        <div className="col-sm-9">
        <fieldset className="form-group col-sm-6">
          <div className={this.state.stringLengthErrorMsg !== '' ? 'error' : ''}>
            <label htmlFor="stringlength">STRING LENGTH (inches) *</label>
            <input
              type="text"
              className="form-control"
              name="stringlength"
              placeholder="String Length"
              onChange={this.props.handleStringLengthInput}
              value={this.props.stringLength}
            />
            <div className="form-error-msg">{this.state.stringLengthErrorMsg}</div>
          </div>
        </fieldset>

        <fieldset className="form-group col-sm-6">
          <div className={this.state.stringCableSetNameErrorMsg !== '' ? 'error' : ''}>
          <label htmlFor="stringSet">STRING / CABLE SET *</label>
            <select id="string-set" className="form-control" name="stringSet" onChange={this.props.handleStringSetChange} value={this.props.selectedStringCableSet}>
              <option value="">Please select a string / cable set</option>
              {getVariantNodes()}
            </select>
            <div className="form-error-msg">{this.state.stringCableSetNameErrorMsg}</div>
          </div>
        </fieldset>

            <fieldset className="form-group col-sm-12">
              <label htmlFor="notesToBuilder">NOTES TO BUILDER</label>
              <textarea
                className="form-control"
                id="add_notes"
                rows="4"
                type="text"
                tabIndex="4"
                placeholder="Please include any details that you want us to be aware of when we build your string."
                name="add_notes"
                // value={this.state.notes}
                onChange={this.props.handleAddNotesChange}
              ></textarea>
            </fieldset>
          </div>
            <button className="btn string-builder-add-cart" onClick={this.checkFormForErrors}>Add To Cart</button> 
            <p className="purchase-disclaimer">* Due to the custom nature of the product, Winners Choice is not responsible for changes to build after the sale has been processed. All sales are final.</p>
      </form>
    );
  }
}
