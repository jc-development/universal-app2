exports.ids=[11],exports.modules={113:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(1),c=n(l),u=a(6),h=a(4),d=a(81),f=n(d),p=function(e){function t(e){r(this,t);var a=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={items:[],hasWax:!1,hasNitroBalls:!1,hasNitroXLButtons:!1,hasStringLoops:!1,hasSuperCustomString:!1,freeShirtAdded:!1,freeStringWax:!1,freeHat:!1,freeStringLoop:!1},a}return o(t,e),s(t,[{key:"checkWhatsInCart",value:function(){(0,f.default)(this.state.items,function(e){return"140.00"===e.price&&"super-custom-string"===e.stringCustomizationLevel})?this.setState({hasSuperCustomString:!0}):this.setState({hasSuperCustomString:!1}),(0,f.default)(this.state.items,function(e){return"0.00"===e.price&&"Winner's Choice 60X T-Shirt"===e.packageName})?this.setState({freeShirtAdded:!0}):this.setState({freeShirtAdded:!1}),(0,f.default)(this.state.items,function(e){return"0.00"===e.price&&"Cobalt Ice String Wax"===e.title})?this.setState({freeStringWax:!0}):this.setState({freeStringWax:!1}),(0,f.default)(this.state.items,function(e){return"0.00"===e.price&&"Winner's Choice Logo Hat"===e.title})?this.setState({freeHat:!0}):this.setState({freeHat:!1}),(0,f.default)(this.state.items,function(e){return"0.00"===e.price&&"Ultimate String Loop - 4.5 in. Package"===e.packageName})?this.setState({freeStringLoop:!0}):this.setState({freeStringLoop:!1}),(0,f.default)(this.state.items,function(e){return"Cobalt Ice String Wax"===e.title})?this.setState({hasWax:!0}):this.setState({hasWax:!1}),(0,f.default)(this.state.items,function(e){return"Nitro Balls"===e.packageName})?this.setState({hasNitroBalls:!0}):this.setState({hasNitroBalls:!1}),(0,f.default)(this.state.items,function(e){return"Nitro XL Buttons"===e.packageName})?this.setState({hasNitroXLButtons:!0}):this.setState({hasNitroXLButtons:!1}),(0,f.default)(this.state.items,function(e){return"Ultimate String Loop - 2ft. Package"===e.packageName||"Ultimate String Loop - 4.5 in. Package"===e.packageName})?this.setState({hasStringLoops:!0}):this.setState({hasStringLoops:!1})}},{key:"componentWillReceiveProps",value:function(e){var t=this;this.props!==e&&this.setState({items:e.cartItems},function(){t.checkWhatsInCart()})}},{key:"render",value:function(){return c.default.createElement("article",{id:"accessories-pitch"},c.default.createElement("h4",null,"Helpful Accessories"),!1===this.state.hasWax?c.default.createElement("p",null,"Prolong your string & cables with some ",c.default.createElement(h.Link,{to:"/winners-choice-accessories/cobalt-ice-string-wax"},"Cobalt String Wax")):null,!1===this.state.hasNitroBalls?c.default.createElement("p",null,"Eliminate nock pinch and increase the overall speed of your bow with some ",c.default.createElement(h.Link,{onClick:this.props.handleModalClose,to:"/winners-choice-accessories/nitro-button-balls"},"Nitro Balls")):null,!1===this.state.hasNitroXLButtons?c.default.createElement("p",null,"Rid yourself of unwanted noise and bad vibes with some ",c.default.createElement(h.Link,{onClick:this.props.handleModalClose,to:"/winners-choice-accessories/nitro-button-balls"},"Nitro XL Buttons")):null,!1===this.state.hasStringLoops?c.default.createElement("p",null,"Don't pinch your string, use ",c.default.createElement(h.Link,{to:"/winners-choice-accessories/ultimate-string-loop"},"Ultimate String Loops")," instead"):null)}}]),t}(l.Component),m=function(e){return{cartItems:e.cartState.items}};t.default=(0,u.connect)(m)(p)},99:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(1),c=n(l),u=a(15),h=a(82),d=n(h),f=a(4),p=a(14),m=n(p),g=a(113),b=n(g),S=function(e){function t(e){r(this,t);var a=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.hatAccProp={},a.handleAddToCart=a.handleAddToCart.bind(a),a.handleModalClose=a.handleModalClose.bind(a),a}return o(t,e),s(t,[{key:"handleAddToCart",value:function(e){window.ga("send","event","Page Interaction"),e.preventDefault();var t=this,a={title:t.hatAccProp.title,price:t.hatAccProp.variants[0].price,variantId:t.hatAccProp.variants[0].id};this.props.addToCart(a),m.default.to(".hidden-modal",0,{display:"block"})}},{key:"handleModalClose",value:function(){window.ga("send","event","Page Interaction"),m.default.to(".hidden-modal",0,{display:"none"})}},{key:"render",value:function(){return this.hatAccProp=(0,d.default)(this.props.apparel,function(e){return"winners-choice-logo-hat"===e.handle}),c.default.createElement("div",null,c.default.createElement(u.Helmet,null,c.default.createElement("title",null,"Winner's Choice Logo Hat - Comfortable, unstructured, 6-panel hat with Winner’s Choice logo on the front and an adjustable back. One size fits most.")),c.default.createElement("section",{className:"",id:"hat"},c.default.createElement("header",null,c.default.createElement("h1",null,this.hatAccProp.title)),c.default.createElement("article",{className:"accessory"},c.default.createElement("img",{className:"img-responsive",role:"presentation",src:"https://s3.amazonaws.com/string-builder/website-images/winners-hat.jpg",alt:"Winners Choice Strings - "+this.hatAccProp.title}),c.default.createElement("header",null,c.default.createElement("h2",null,this.hatAccProp.title)),c.default.createElement("p",null,void 0===this.hatAccProp.description?c.default.createElement("img",{className:"cart-ajax-loader",src:"https://s3.amazonaws.com/string-builder/website-images/cart-ajax-loader.gif",role:"presentation"}):this.hatAccProp.description),c.default.createElement("p",null,c.default.createElement("strong",null,"$",this.hatAccProp.variants[0].price)),c.default.createElement("div",{className:"form-inline accessory-add-section"},c.default.createElement("button",{className:"btn add-cart",onClick:this.handleAddToCart},"Add To Cart")))),c.default.createElement("div",{className:"hidden-modal"},c.default.createElement("div",{className:"notify"},c.default.createElement("img",{className:"img-responsive",src:"https://s3.amazonaws.com/string-builder/website-images/winners-hat.jpg",alt:"Winners Choice Strings - "+this.hatAccProp.title}),c.default.createElement("p",null,"added to your shopping cart"),c.default.createElement("h5",null,void 0===this.hatAccProp.title?"loading":this.hatAccProp.title),c.default.createElement("button",{onClick:this.handleModalClose,className:"btn"},"Continue Shopping"),c.default.createElement(f.Link,{className:"btn",to:"/cart"},"Go To Shopping Cart"),c.default.createElement(b.default,null))))}}]),t}(l.Component);t.default=S}};