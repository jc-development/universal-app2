import express from 'express';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';
import { Provider } from 'react-redux';

import App from './../shared/app';
import configureStore from './store';
import { renderHeader, renderFooter } from './render';
import rootSagas from './../shared/app/rootSagas';
const bodyParser = require('body-parser');
import axios from 'axios';
const expressStaticGzip = require("express-static-gzip");

// required for hubspot form submission
const querystring = require('querystring');
const cookieParser = require('cookie-parser')

const app = express();

const forceSsl =  (req, res, next) => {
   if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
       return res.redirect(301,['https://', req.hostname, req.url].join(''));
   }
   return next();
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(forceSsl);

app.use( '/assets', expressStaticGzip('./dist') );

app.post('/api/post-email', (req, res) => {
  axios.post('https://winners-choice-string-api.herokuapp.com/api/contact', {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    contents: req.body.message
  }).then(
    (response) => {
      console.log('response: ', response);
  }).catch(
    (error) => {
      console.log('error: ', error);
  });
  res.end();
});

app.post('/api/color-email-notice-signup', (req, res) => {
  console.log('req.body.email: ', req.body.email);
  axios.post('https://military-discount.herokuapp.com/api/create_winners_choice_color_notice_email', req.body)
  .then(
    (response) => {
      console.log(response);
  }).catch(
    (error) => {
      console.log(error);
  });
  res.end();
});

app.post('/api/post-interested-dealer', (req, res) => {
  // console.log('req.body.dealer', req.body);
  const postData = querystring.stringify({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.companyName,
      address: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country,
      hs_context: JSON.stringify({
         hutk: req.cookies.hubspotutk,
         ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
         pageUrl: "https://www.winnerschoicestrings.com/become-a-dealer",
         pageName: "Winners Choice Strings - Become A Dealer"
      })
    })
  const headerData = 	{
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  }

  axios.post('https://forms.hubspot.com/uploads/form/v2/3928428/7f141913-2de3-45e4-b0ab-40682e32aaed', postData, headerData).then((response) => {
    console.log('response: ', response)
  }).catch((err) => {
    console.log('error: ', err);
  })

  axios.post('https://interested-becoming-tog-dealer.herokuapp.com/api/create_interested_dealer', req.body).then(
    (response) => {
      console.log(response);
  })
  .catch(
    (error) => {
      console.log(error);
  });
  res.end();
});

app.get('/news',  (req, res) =>  {
  res.redirect(301,'https://news.winnerschoicestrings.com/');
});
app.get('/news/*',  (req, res) =>  {
  res.redirect(301,'https://news.winnerschoicestrings.com/');
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /cart\nDisallow: /checkout");
});

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get( '*', async (req, res) => {

  // check if ie11
  let isIE11

  try {
    const useragent = req.headers['user-agent']
    isIE11=useragent ? !!useragent.match(/(MSIE|Trident)/)  : false
  } catch(error) {
    console.log('error: ', error)
  }
  
  const url = req.url;

  const store = configureStore();
  const context = {};

  const appWithRouter = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App isIE11={isIE11} />
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  let loadableState = {};

  store.runSaga(rootSagas).done.then( () => {
    const preloadedState = store.getState();

    // console.log('url index.js: ', url);

    res.status(200).write(renderHeader(preloadedState, url));

    const htmlStream = renderToNodeStream(appWithRouter);
    htmlStream.pipe(res, { end: false });
    htmlStream.on('end', () => {
      res.write(renderFooter(loadableState, preloadedState));
      return res.send();
    })
  });

  // Trigger sagas for component to runSaga
  loadableState = await getLoadableState(appWithRouter);

  // dispatch a close event so sagas stop listening after they're resolved
  store.close();

} );

app.listen(process.env.PORT || 8080, () => console.log('Server listening.'));
