import React, { Component } from 'react';

export default class MaterialColorConflictModal extends Component {

  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    window.ga('send', 'event', 'Page Interaction');
    const modal = document.getElementById('material-color-conflict-modal')
    modal.className = "hidden"
    modal.childNodes[0].childNodes[0].innerText = ''
  }

  render() {
    return (
      <div id="material-color-conflict-modal" className="hidden">
        <div className="inner">
          <p></p>
          <button className="btn btn-lg material-modal-btn" onClick={this.handleCloseModal}>Cancel</button>
          <button className="btn btn-lg material-modal-btn" onClick={this.props.resolveMaterialColorConflict}>OK</button>
        </div>
      </div>
    );
  }
}
