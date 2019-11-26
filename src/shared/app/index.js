import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as Routes from './routes';

import fontawesome from '@fortawesome/fontawesome'

const Fragment = React.Fragment;

import { Helmet } from 'react-helmet';
import MainNavigation from './../navigation/MainNavigation';
import MainFooter from './../footer/MainFooter';

import { UpgradeBrowser } from './../upgrade-browser/UpgradeBrowser'

if (process.env.IS_BROWSER) {
  require('bootstrap/dist/css/bootstrap.min.css')
}

if (process.env.IS_BROWSER) {
  require('video.js/dist/video-js.min.css')
}

import './../assets/css/general.css';
import './../assets/css/bootstrap-overwrites.css';
import './../assets/css/footer.css';
import './../assets/css/intro.css';
import './../assets/css/why-winners-choice.css';
import './../assets/css/how-its-made.css';
import './../assets/css/guarantee.css';
import './../assets/css/faq.css';
import './../assets/css/contact.css';
import './../assets/css/string-builder.css';
import './../assets/css/bow-form.css';
import './../assets/css/string-parts.css';
import './../assets/css/string-material.css';
import './../assets/css/help-messages.css';
import './../assets/css/accessories.css';
import './../assets/css/cart.css';
import './../assets/css/string-builder-summary.css';
import './../assets/css/dealer-sign-up.css';
import './../assets/css/news.css';

// SEO
// import './../assets/css/sitemap.xml';

const App = (props) => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Winner's Choice Strings - Online ordering of custom made pre-stretched bowstrings and cables. Winner’s Choice premium bowstrings are made of the very best materials available and built using state-of-the-art manufacturing techniques. The result is a bowstring that is second-to-none when it comes to durability and performance.</title>
      </Helmet>
      <MainNavigation />
        <Switch>
          <Route exact path='/' render={() => <Routes.Intro />} />
          <Route exact path='/why-winners-choice' component={Routes.WhyWinnersChoice} />
          <Route exact path='/how-strings-and-cables-are-made' component={Routes.HowStringCablesMade} />
          <Route exact path='/lifetime-string-performance-guarantee' component={Routes.Guarantee} />
          <Route exact path='/frequently-asked-questions' component={Routes.FAQ} />
          <Route exact path='/contact-winners-choice' component={Routes.Contact} />
  
          <Route path='/string-builder' component={Routes.StringBuilderLayout} />
  
          <Route path='/winners-choice-accessories' component={Routes.AccessoriesLayout} />
  
          <Route path='/cart' component={Routes.Cart} />
          <Route path='checkout' component={Routes.CheckoutComponent} />
  
          <Route path='become-a-dealer' component={Routes.DealerSignUpForm} />
  
          <Route path='*' component={Routes.BadURL} />
        </Switch>
      <MainFooter />
    </Fragment>
  );
}



export default App;