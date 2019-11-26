import serialize from 'serialize-javascript';

export const renderHeader = (preloadedState, url) => {
  return `
  <!doctype html>
  <html lang="en" xmlns:fb="http://ogp.me/ns/fb#">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta property="og:url" content="https://www.winnerschoicestrings.com" />
      <meta property="og:title" content="Winner's Choice Strings - Online ordering of custom made pre-stretched bowstrings and cables. Winner’s Choice premium bowstrings are made of the very best materials available and built using state-of-the-art manufacturing techniques. The result is a bowstring that is second-to-none when it comes to durability and performance." />
      <meta property="og:image" content="https://s3.amazonaws.com/string-builder/website-images/wc-fb-share.jpeg" />
      <meta property="og:description" content="Winner's Choice premium bowstrings are made of the very best materials available and are built using state-of-the-art manufacturing techniques. The result is a bowstring that is second-to-none when it comes to durability and performance.
  Build your strings with LIMITLESS custom string configurations and options that ship to your door within days, not weeks." />
      <link rel="shortcut icon" href="https://s3.amazonaws.com/string-builder/website-images/favicon.ico">
      <title>Winner's Choice Strings - Online ordering of custom made pre-stretched bowstrings and cables. Winner’s Choice premium bowstrings are made of the very best materials available and built using state-of-the-art manufacturing techniques. The result is a bowstring that is second-to-none when it comes to durability and performance.</title>
      <link rel="stylesheet" type="text/css" href="/assets/stylesheet.css">
    </head>
    <body>
      <div id="root">
  `;
};

export const renderFooter = (loadableState, preloadedState) => (`
  </div>
  <script src="https://www.klarnapayments.com/assets/upstream.js"></script>
  <script>
    window.__PRELOADED_STATE__ = ${serialize(preloadedState).replace(/</g, '\\u003c')}
  </script>
  <script src="/assets/vendor.js"></script>
  <script src="/assets/client.js"></script>
  ${loadableState.getScriptTag()}
  <!-- Begin Inspectlet Embed Code -->
  <script type="text/javascript" id="inspectletjs">
  window.__insp = window.__insp || [];
  __insp.push(['wid', 1566641149]);
  (function() {
  function ldinsp(){if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
  setTimeout(ldinsp, 500); document.readyState != "complete" ? (window.attachEvent ? window.attachEvent('onload', ldinsp) : window.addEventListener('load', ldinsp, false)) : ldinsp();
  })();
  </script>
  <!-- End Inspectlet Embed Code -->

    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-37316639-5', 'auto');
    ga('send', 'pageview');

  </script>

  <!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '373563063023361'); // Insert your pixel ID here.
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=373563063023361&ev=PageView&noscript=1"
/></noscript>
<!-- DO NOT MODIFY -->
<!-- End Facebook Pixel Code -->

<!-- Start of HubSpot Embed Code -->
<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/3928428.js"></script>
<!-- End of HubSpot Embed Code -->
`);
