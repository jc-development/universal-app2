exports.ids=[13],exports.modules={109:function(t,e,r){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,r,a){return r&&t(e.prototype,r),a&&t(e,a),e}}(),c=r(1),u=a(c),l=r(6),f=r(110),d=r(14),b=a(d),h=r(85),p=a(h),m=function(t){function e(t){o(this,e);var r=n(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return r.state={shopifyURL:"https://winners-choice-strings.myshopify.com/cart/",newTab:!1},r.cartAjaxLoader=null,r.iframeObject=null,r.iframeLoaded=r.iframeLoaded.bind(r),r.closeCheckout=r.closeCheckout.bind(r),r}return i(e,t),s(e,[{key:"componentDidMount",value:function(){var t=this;this.iframeObject=document.getElementById("checkout-frame"),this.cartAjaxLoader=document.querySelector(".cart-ajax-loader"),b.default.set(this.cartAjaxLoader,{autoAlpha:1});/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),navigator.userAgent.indexOf("Safari"),navigator.userAgent.indexOf("Chrome");this.setState({newTab:!0},function(){return this.state});var e=this.props.cartItems.map(function(t,e){return t.variantId+":1"}),r=this.props.cartItems.map(function(t,e){return void 0!==t.string1ColorPatterns?"?attributes[bowBrandSelected"+e+"]="+t.bowBrandSelected+"&attributes[bowModelSelected"+e+"]="+t.bowModelSelected+"&attributes[bowType"+e+"]="+t.bowType+"&attributes[stringLength"+e+"]="+t.stringLength+"&attributes[material"+e+"]="+t.currentMaterial+"&attributes[color1Name"+e+"]="+t.string1ColorPatterns.attributes.name+"&attributes[color2Name"+e+"]="+t.string2ColorPatterns.attributes.name+"&attributes[colorServingName"+e+"]="+t.servingColorPatterns.attributes.name+"&attributes[stringSet"+e+"]="+t.selectedStringCableSet+"&attributes[stringCustomizationLevel"+e+"]="+t.stringCustomizationLevel+"&attributes[price"+e+"]="+t.price+"&attributes[notesToBuilder"+e+"]="+t.notes:null}),a=(0,p.default)(r,null),o="https://winners-choice-strings.myshopify.com/cart/"+e.join()+a.join();this.setState({shopifyURL:o},function(){return t.state})}},{key:"openNewTab",value:function(){window.open(this.state.shopifyURL,"_blank").focus()}},{key:"iframeLoaded",value:function(){b.default.to(this.cartAjaxLoader,.25,{autoAlpha:0})}},{key:"closeCheckout",value:function(){this.iframeObject.data="",f.browserHistory.goBack()}},{key:"render",value:function(){return!0===this.state.newTab&&(this.openNewTab(),f.browserHistory.goBack()),u.default.createElement("div",null,u.default.createElement("button",{onClick:this.closeCheckout,className:"btn btn-checkout-close"},"Close Checkout"),this.state.newTab?"":u.default.createElement("img",{className:"cart-ajax-loader",src:"https://s3.amazonaws.com/string-builder/website-images/cart-ajax-loader.gif",role:"presentation"}),this.state.newTab?"":u.default.createElement("object",{id:"checkout-frame",ref:"iframe",data:this.state.shopifyURL,onLoad:this.iframeLoaded}))}}]),e}(c.Component),y=function(t){return{cartItems:t.cartState.items}};e.default=(0,l.connect)(y)(m)}};