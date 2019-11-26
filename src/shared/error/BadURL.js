import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BadURL extends Component {
  render() {
    return (
      <div className="container">
        <div className="col-md-6">
          <h3>We are not able to find the page you are looking for.</h3>
          <div className="row">
            <dl>
              <dt>Here are some helpful links:</dt>
              <dd><Link to="/">Home</Link></dd>
              <dd><Link to="/string-builder/step-1">String Builder</Link></dd>
              <dd><Link to="/how-strings-and-cables-are-made">How Strings Are Made</Link></dd>
              <dd><Link to="/winners-choice-accessories/nitro-button-balls">Nitro Balls</Link></dd>
              <dd><Link to="/winners-choice-accessories/ultimate-string-loop">String Loops</Link></dd>
              <dd><Link to="/winners-choice-accessories/cobalt-ice-string-wax">Cobalt String Wax</Link></dd>
              <dd><Link to="/frequently-asked-questions">Frequently Asked Questions</Link></dd>
              <dd><Link to="/contact-winners-choice">Contact Us</Link></dd>
              <dd><Link to="/lifetime-string-performance-guarantee">Guarantee</Link></dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
