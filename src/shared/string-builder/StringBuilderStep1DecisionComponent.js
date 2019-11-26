import React, { Component } from 'react';
import StringsServingImage from './../string-builder/strings-serving-image/StringsServingImage';
import StringServingColorSelectionPanel from './../string-builder/string-serving-color-selection-panel/StringServingColorSelectionPanel';
import MaterialSelectionPanel from './../string-builder/material-selection-panel/MaterialSelectionPanel';
import { Link } from 'react-router-dom';
import {TweenMax, Sine } from 'gsap/TweenMax';
import axios from 'axios';
/*
  this is the builder
*/
import MaterialColorConflictModal from './../string-builder/help-messages/MaterialColorConflictModal';

export default class StringBuilderStep1DecisionComponent extends Component {

  constructor(props) {
    super(props);

    this.emailColorFormWrapper = null;
    this.emailForm = null;
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.checkEmailForErrors = this.checkEmailForErrors.bind(this);
    this.handleResize = this.handleResize.bind(this);


    this.state = {
      formOpen: false,
      emailAddress: '',
      emailErrorMsg: '',
      windowWidth : null
    }
  }

  handleFormClose(event) {
    window.ga('send', 'event', 'Page Interaction');
    this.setState({
      formOpen: false,
      emailAddress: '',
      emailErrorMsg: ''
    }, () => {
      this.emailForm.reset();
      if (this.state.windowWidth > 1300) {
        TweenMax.to(this.emailColorFormWrapper, 0.75, { right: '-20.5rem', ease: Sine.easeInOut, clearProps: "all" });
      } else {
        TweenMax.to(this.emailColorFormWrapper, 0.75, { bottom: '-20rem', ease: Sine.easeInOut, clearProps: "all" });
      }
    });
  }

  handleFormOpen(event) {
    window.ga('send', 'event', 'Page Interaction');
    this.setState({
      formOpen: true
    }, () => {
      if (this.state.windowWidth > 1300) {
        TweenMax.to(this.emailColorFormWrapper, 0.75, { right: '1rem', ease: Sine.easeInOut });
      } else {
        TweenMax.to(this.emailColorFormWrapper, 0.75, { bottom: '0rem', ease: Sine.easeInOut });
      }
    });
  }

  handleEmailChange(event) {
    window.ga('send', 'event', 'Page Interaction');
    this.setState({
      emailAddress: event.target.value
    }, () => { console.log('this.state: ', this.state); })
  }

  clearAndCloseForm() {
    console.log('clear and close form init: ', this.state);
    TweenMax.to(this.emailColorFormWrapper, 0.75, { right: '-23rem', ease: Sine.easeInOut });
    this.emailForm.reset();
  }

  createEmailObj() {
    axios.post('/api/color-email-notice-signup', {
      email: this.state.emailAddress
    });
  }

  checkEmailForErrors(event) {
    window.ga('send', 'event', 'Page Interaction');
    event.preventDefault();
    if (this.state.emailAddress === '' || this.state.emailAddress === ' ') {
      this.setState({
        emailErrorMsg: 'Email can not be blank'
      });
    } else if ((this.state.emailAddress !== '' || this.state.emailAddress !== ' ')) {
      const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regEx.test(this.state.emailAddress)) {
        this.setState({ emailErrorMsg: '', formOpen: false }, () => { this.clearAndCloseForm(); this.createEmailObj()});
      } else {
        this.setState({ emailErrorMsg: 'Email should be in format: email@domain.com' });
      }
    } else {
      this.setState({
        emailErrorMsg: '',
        formOpen: false
      }, () => { this.clearAndCloseForm() });
    }
  }

  componentDidMount() {
    // this.props.handleBuildResetClick()
    this.emailColorFormWrapper = document.getElementById('new-color-email-form-wrapper');
    this.emailForm = document.querySelector('#new-color-email-form-wrapper form');
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize () {
    // window.ga('send', 'event', 'Page Interaction');
    this.setState({windowWidth: window.innerWidth});
  }

  render() {
    // console.log('this.props from step 1: ', this.props)
    return (
      <div>
        <MaterialColorConflictModal
          resolveMaterialColorConflict={this.props.resolveMaterialColorConflict}
        />
        <div className="container selection-wrapper">
          <div id="new-color-email-form-wrapper" className="row">
            <div className={ this.state.windowWidth > 1300 ? "col-xs-4" : "col-xs-12"}>
              {this.state.formOpen === false ? <p id="form-symbol-open" onClick={this.handleFormOpen}> + </p> : null}
              {this.state.formOpen === true ? <p id="form-symbol-close" onClick={this.handleFormClose}> - </p> : null}
               <div className="text-indicator">
                {this.state.formOpen === true ? <p id="close-text-form" onClick={this.handleFormClose}>close window</p> : null}
                {this.state.formOpen === false ? <p id="open-text-form" onClick={this.handleFormOpen}>open new color email signup</p> : null}
              </div>
            </div>
            <form className={ this.state.windowWidth > 1300 ? "col-xs-8" : "col-xs-12"}>
              <p>Want to be notified when a new color is released?</p>
              <fieldset className="form-group">
                <div className={this.state.emailErrorMsg !== '' ? 'error' : ''}>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="your email address"
                    onChange={this.handleEmailChange}
                  />
                {this.state.emailErrorMsg !== '' ? <div className="form-error-msg">{this.state.emailErrorMsg}</div> : null}
                </div>
              </fieldset>
              <button className="btn" onClick={this.checkEmailForErrors}>Submit</button>
            </form>
          </div>

          <StringsServingImage
            color1BackgroundImage={this.props.color1BackgroundImage}
            color2BackgroundImage={this.props.color2BackgroundImage}
            colorServingBackgroundImage={this.props.colorServingBackgroundImage}
          />
          <StringServingColorSelectionPanel
            activeStringPart={this.props.activeStringPart}
            handleMarkStringPartAsActiveClick={this.props.handleMarkStringPartAsActiveClick}
            string1ColorPatterns={this.props.string1ColorPatterns}
            string2ColorPatterns={this.props.string2ColorPatterns}
            servingColorPatterns={this.props.servingColorPatterns}
          />
        </div>
        <div id="build-lower-wrapper">
          <div id="top-material-finish">
            <div id="material-selection-panel-wrapper">
              <MaterialSelectionPanel
                activeStringPart={this.props.activeStringPart}
                handleMaterialClick={this.props.handleMaterialClick}
                colorsForMaterial={this.props.colorsForMaterial}
                handleColorClick={this.props.handleColorClick}
                currentMaterial={this.props.currentMaterial}
                slideLeft={this.props.slideLeft}
                slideRight={this.props.slideRight}
              />
            </div>
          </div>
        </div>

        <div className="center-button-wrapper" id="finished-building-string">
          <p>Finished building?</p>
          <div className="row center">
            <Link to="/string-builder/step-2"><button className="btn" onClick={this.props.checkIfSameMaterialUsedForStringParts}>ENTER BOW INFO</button></Link>
          </div>
        </div>
      </div>
    );
  }
}
