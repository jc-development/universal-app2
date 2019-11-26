import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Map from './../map/Map';
import axios from 'axios';


export default class Contact extends Component {
  constructor (props) {
  super(props)
  this.state = {
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    phoneError: '',
    subjectError: '',
    messageError: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  }
}

handleFirstName (event) {
  window.ga('send', 'event', 'Page Interaction');
  this.setState({
    firstName: event.target.value
  });
}

handleLastName (event) {
  window.ga('send', 'event', 'Page Interaction');
  this.setState({
    lastName: event.target.value
  });
}

handleEmail (event) {
  window.ga('send', 'event', 'Page Interaction');
  this.setState({
    email: event.target.value
  });
}

handlePhone (event) {
  window.ga('send', 'event', 'Page Interaction');
  this.setState({
    phone: event.target.value
  });
}

handleSubject (event) {
  window.ga('send', 'event', 'Page Interaction');
  this.setState({
    subject: event.target.value
  });
}

handleMessage (event) {
  window.ga('send', 'event', 'Page Interaction');
  this.setState({
    message: event.target.value
  });
}

resetEmailForm () {
  this.setState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    phoneError: '',
    subjectError: '',
    messageError: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  }, function () { return this.state })

  const emailForm = document.querySelector('.contact-us-form')
  const emailFormInputElements = emailForm.querySelectorAll('.form-control')
  for (var i = 0; i < emailFormInputElements.length; i++) {
    emailFormInputElements[i].value = ''
  }

}

handleSubmit (event) {
  window.ga('send', 'event', 'Page Interaction');
  event.preventDefault()

  const email = {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    email: this.state.email,
    phone: this.state.phone,
    subject: this.state.subject,
    message: this.state.message
  }

  if (this.state.firstName === '') {
    this.setState({
      firstNameError: 'Please enter your first name'
    });
  } else {
    this.setState({
      firstNameError: ''
    });
  }

  if (this.state.lastName === '') {
    this.setState({
      lastNameError: 'Please enter your last name'
    });
  } else {
    this.setState({
      lastNameError: ''
    });
  }

  if (this.state.email === '') {
    this.setState({
      emailError: 'Please enter your email address'
    });
  } else {
    this.setState({
      emailError: ''
    });
  }


  if (this.state.phone === '') {
    this.setState({
      phoneError: 'Please enter your phone number'
    });
  } else {
    this.setState({
      phoneError: ''
    });
  }

  if (this.state.subject === '') {
    this.setState({
      subjectError: 'Please enter your the subject of your question/comment'
    });
  } else {
    this.setState({
      subjectError: ''
    });
  }

  if (this.state.message === '') {
    this.setState({
      messageError: 'Please enter your question/comment'
    });
  } else {
    this.setState({
      messageError: ''
    });
  }


  if (this.state.firstName !== '' &&
      this.state.lastName !== '' &&
      this.state.email !== '' &&
      this.state.phone !== '' &&
      this.state.subject !== '' &&
      this.state.message !== ''
    ) {
      axios.post('/api/post-email', {...email}).catch((error) => { console.log(error)});
      this.resetEmailForm();
      document.querySelector('#email-confirmation').setAttribute('style', 'display:block');
      setTimeout(() => {
        document.querySelector('#email-confirmation').setAttribute('style', 'display:none');
      }, 5000)
    }
 }

render () {
  return (
      <section id="contact">
        <Helmet>
          <title>Contact Winner's Choice Strings at phone 1-855-839-9200, fax 606-644-0866, or email techsupport.south@togllc.com</title>
        </Helmet>
        <h1>CONTACT WINNERS CHOICE</h1>
        <section className="row">
          <div id="map-wrapper">
            <Map />
          </div>
        </section>

        <section className="row">
          <article className="col-md-6">
            <h3 className="contact-header">Address</h3>
            <p>Winner's Choice Bowstrings, LLC<br/>
              125 East Elkins Street, Building A, Suite C<br/>
              Stanton, KY 40380</p>
            <h3>Email</h3>
            <a href="mailto:orders@winnerschoicestrings.com">orders@winnerschoicestrings.com</a>
            <h3 className="contact-header">Toll Free Phone Number</h3>
            <p>1-585-444-0204</p>
            <h3 className="contact-header">Fax Number</h3>
            <p>606-644-0866</p>
          </article>
          <form className="contact-us-form col-md-6" onSubmit={this.handleSubmit.bind(this)}>
            <h3 id="form">Have a question? Don't see your bow model in our <Link to="/string-builder/step-1">String Builder</Link>?</h3>
            <p>Use the form below to contact us.</p>
            <p>* indicates required field</p>
            <div>
              <fieldset>
              <div className={this.state.firstNameError !== '' ? 'error' : ''}>
                <label htmlFor="first_name">FIRST NAME *</label>
                <input onChange={this.handleFirstName.bind(this)} type="text" name="first_name" placeholder="First Name" className="form-control" tabIndex="4" required="" />
                {this.state.firstNameError !== '' ? <div className="form-error-msg">{this.state.firstNameError}</div> : null}
              </div>
              </fieldset>
              <fieldset>
              <div className={this.state.lastNameError !== '' ? 'error' : ''}>
                <label htmlFor="last_name">LAST NAME *</label>
                <input onChange={this.handleLastName.bind(this)} type="text" name="last_name" placeholder="Last Name" className="form-control" tabIndex="4" required="" />
                {this.state.lastNameError !== '' ? <div className="form-error-msg">{this.state.lastNameError}</div> : null}
              </div>
              </fieldset>
            </div>
            <div>
              <fieldset>
              <div className={this.state.emailError !== '' ? 'error' : ''}>
                <label htmlFor="email">EMAIL *</label>
                <input onChange={this.handleEmail.bind(this)} type="email" name="email" placeholder="Email Address" className="form-control" tabIndex="4" required="" />
                {this.state.emailError !== '' ? <div className="form-error-msg">{this.state.emailError}</div>: null}
              </div>
              </fieldset>
              <fieldset className="form-group">
              <div className={this.state.phoneError !== '' ? 'error' : ''}>
                <label htmlFor="phone">PHONE *</label>
                <input onChange={this.handlePhone.bind(this)} type="phone" name="phone" placeholder="Phone Number" className="form-control" tabIndex="4"  />
                {this.state.phoneError !== '' ? <div className="form-error-msg">{this.state.phoneError}</div> : null}
              </div>
              </fieldset>
            </div>
            <div>
              <fieldset className="form-group">
              <div className={this.state.subjectError !== '' ? 'error' : ''}>
                <label htmlFor="subject">SUBJECT *</label>
                <input onChange={this.handleSubject.bind(this)} type="text" name="subject" placeholder="Subject" className="form-control" tabIndex="4"  />
                {this.state.subjectError !== '' ? <div className="form-error-msg">{this.state.subjectError}</div> : null}
              </div>
              </fieldset>
              <fieldset className="form-group">
              <div className={this.state.messageError !== '' ? 'error' : ''}>
                <label htmlFor="message">YOUR MESSAGE *</label>
                <textarea onChange={this.handleMessage.bind(this)} name="contents" placeholder="Your Message ..." rows="4" className="form-control" type="text" tabIndex="4" ></textarea>
                {this.state.messageError !== '' ? <div className="form-error-msg">{this.state.messageError}</div> : null}
              </div>
              </fieldset>
              <fieldset className="form-group">
              <input type="submit" className="btn form-btn" value="SEND" />
              <p id="email-confirmation">Thank you for contacting Winners Choice. Someone will respond to your email shortly.</p>
              </fieldset>
            </div>
            </form>
        </section>
      </section>
    );
  }
}
