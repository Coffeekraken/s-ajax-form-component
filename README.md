# Coffeekraken s-ajax-form-component <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<!-- <a href="https://travis-ci.org/coffeekraken/s-ajax-form-component">
		<img src="https://img.shields.io/travis/coffeekraken/s-ajax-form-component.svg?style=flat-square" />
	</a> -->
	<a href="https://www.npmjs.com/package/coffeekraken-s-ajax-form-component">
		<img src="https://img.shields.io/npm/v/coffeekraken-s-ajax-form-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-ajax-form-component/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-s-ajax-form-component.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken/s-ajax-form-component">
		<img src="https://img.shields.io/npm/dt/coffeekraken-s-ajax-form-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-ajax-form-component">
		<img src="https://img.shields.io/github/forks/coffeekraken/s-ajax-form-component.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-ajax-form-component">
		<img src="https://img.shields.io/github/stars/coffeekraken/s-ajax-form-component.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/coffeekrakenio">
		<img src="https://img.shields.io/twitter/url/http/coffeekrakenio.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

Provide a simple and declarative way to send a form through ajax with a success/error display mecanism built in.

## Features

1. Simple declarative way to send a form through ajax
2. Keep track of the form status through simple `error` and `success` attributes
3. Display the success/error message easily
4. Many more...

## Table of content

1. **[Demo](http://components.coffeekraken.io/app/s-ajax-form-component)**
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [Success/error status](#readme-success-error-status)
5. [Success/error message display mecanism](#readme-success-error-message-mecanism)
6. [Javascript API](doc/js)
7. [Sugar Web Components Documentation](https://github.com/coffeekraken/sugar/blob/master/doc/webcomponent.md)
8. [Browsers support](#readme-browsers-support)
9. [Contribute](#readme-contribute)
10. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
11. [Licence](#readme-license)

<a name="readme-install"></a>
## Install

```
npm install coffeekraken-s-ajax-form-component --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import SAjaxFormComponent from 'coffeekraken-s-ajax-form-component'
```

Then simply use it inside your html like so:

```html
<form is="s-ajax-form" action="..." method="POST">
	<div s-ajax-form-success>
		Your message has been sent successfuly
	</div>
	<div s-ajax-form-error>
		Something went wrong...
	</div>
	<!-- your form here... -->
</form>
```

<a id="readme-success-error-status"></a>
## Success/error status

When your form has been sent with success, or maybe not, it will take one a another attribute depending on the state. Here's the two attributes:

1. `success`: **When the form has been sent with success**
2. `error`: **When the form has not been sent correctly**

#### Display state timeout

You can specify a timeout in order to automatically remove the state attributes by using the `state-timeout` property like so:

```html
<form is="s-ajax-form" state-timeout="4000" ...>
</form>
```

This will make the `error` or `success` attribute to be **removed 4 seconds after the form submission.**

<a id="readme-success-error-message-mecanism"></a>
## Success/error message display mecanism

The webcomponent integrate a simple but powerful way to handle the success/error display of your form.
This mecanism start with two attributes that you can add to any HTMLElement that will hold the success/error message. Here's the two attributes:

1. `s-ajax-form-success`: Put this attribute on the element that (will) hold **your success message**
2. `s-ajax-form-error`: Put this attribute on the element that (will) hold **your error message**

When the form has been sent, depending on the response status, the form will be in success or error state. **The according HTMLElement will then have the `active` attribute on itself.**

1. If the form has been **sent with success**, the `s-ajax-form-success` HTMLElement will have the `active` attribute.
2. If the form has **not been sent properly**, the `s-ajax-form-error` HTMLElement will have the `active` attribute.

Here's a simple example:

```html
<form is="s-ajax-form" action="..." method="POST">
	<div s-ajax-form-success>
		Your message has been sent successfuly
	</div>
	<div s-ajax-form-error>
		Something went wrong...
	</div>
	<!-- your form here... -->
</form>
```

#### Inject success/error message from the response

Let's consider our server response like so:

```json
{
	"status": "OK",
	"code": 200,
	"message": "Your message has been sent"
}
```

You can then tell your `s-ajax-form-success` HTMLElement to display the `message` response property by setting it like so:

```html
<form is="s-ajax-form" ...>
	<div s-ajax-form-success="message" timeout="4000"></div>
	<!-- your form here... -->
</form>
```

When our form has been sent with success, the component will take the `s-ajax-form-success` attribute value and use it as a [path](https://lodash.com/docs/4.17.10#get) inside our response to get the text to inject inside the HTMLElement itself before display it.

> The same principle goes for the `s-ajax-form-error` HTMLElement

#### Display timeout

Each `s-ajax-form-success` and `s-ajax-form-error` HTMLElement support a `timeout` attribute that tells the component how many times to display the reply.
Here's a simple example:

```html
<form is="s-ajax-form" ...>
	<div s-ajax-form-success timeout="4000">
		Your message has been sent.
	</div>
	<div s-ajax-form-error timeout="6000">
		Something went wrong...
	</div>
	<!-- your form here... -->
</form>
```

If you don't specify any timeout, the default value will be the `stateTimeout` property described above.

<a id="readme-browsers-support"></a>
## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| --------- | --------- | --------- | --------- |
| IE11+ | last 2 versions| last 2 versions| last 2 versions

> As browsers are automatically updated, we will keep as reference the last two versions of each but this component can work on older ones as well.

> The webcomponent API (custom elements, shadowDOM, etc...) is not supported in some older browsers like IE10, etc... In order to make them work, you will need to integrate the [corresponding polyfill](https://www.webcomponents.org/polyfills).

<a id="readme-contribute"></a>
## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>
## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.  

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>
## License

The code is available under the [MIT license](LICENSE.txt). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...
