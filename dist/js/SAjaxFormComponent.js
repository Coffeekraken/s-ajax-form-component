'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SWebComponent = require('coffeekraken-sugar/js/core/SWebComponent');

var _SWebComponent2 = _interopRequireDefault(_SWebComponent);

var _sNativeWebComponent = require('coffeekraken-sugar/js/core/sNativeWebComponent');

var _sNativeWebComponent2 = _interopRequireDefault(_sNativeWebComponent);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _formSerialize = require('form-serialize');

var _formSerialize2 = _interopRequireDefault(_formSerialize);

var _get3 = require('lodash/get');

var _get4 = _interopRequireDefault(_get3);

var _dispatchEvent = require('coffeekraken-sugar/js/dom/dispatchEvent');

var _dispatchEvent2 = _interopRequireDefault(_dispatchEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @name 		SAjaxFormComponent
 * @extends 	SWebComponent
 * Provide a simple and declarative way to send a form through ajax with a success/error display mecanism built in.
 * Features:
 * 1. Simple declarative way to send a form through ajax
 * 2. Keep track of the form status through simple `loading`, `error` and `success` attributes
 * 3. Display the success/error message easily
 * 4. Many more...
 *
 * @example 	html
 * <form is="s-ajax-form" action="..." method="POST">
 * 	<div s-ajax-form-success>
 * 		Your message has been sent successfuly
 * 	</div>
 * 	<div s-ajax-form-error>
 * 		Something went wrong...
 * 	</div>
 * 	<!-- your form here... -->
 * </form>
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
var SAjaxFormComponent = function (_native) {
	_inherits(SAjaxFormComponent, _native);

	function SAjaxFormComponent() {
		_classCallCheck(this, SAjaxFormComponent);

		return _possibleConstructorReturn(this, (SAjaxFormComponent.__proto__ || Object.getPrototypeOf(SAjaxFormComponent)).apply(this, arguments));
	}

	_createClass(SAjaxFormComponent, [{
		key: 'componentWillMount',


		/**
   * Component will mount
  	 * @definition 		SWebComponent.componentWillMount
   * @protected
   */
		value: function componentWillMount() {
			_get2(SAjaxFormComponent.prototype.__proto__ || Object.getPrototypeOf(SAjaxFormComponent.prototype), 'componentWillMount', this).call(this);

			// Save the references of html elements needed by the component
			this._refElms = {
				success: null,
				error: null
			};

			// create an axios instance
			this._axios = _axios2.default.create();
			this._axios.interceptors.response.use(function (response) {
				return response;
			}, function (error) {
				return Promise.reject(error.response);
			});
		}

		/**
   * Mount component
   * @definition 		SWebComponent.componentMount
   * @protected
   */

	}, {
		key: 'componentMount',
		value: function componentMount() {
			_get2(SAjaxFormComponent.prototype.__proto__ || Object.getPrototypeOf(SAjaxFormComponent.prototype), 'componentMount', this).call(this);

			// some functions
			this._onSubmitFn = this._onSubmit.bind(this);

			// update references
			this._updateReferences();

			// hook the submit event
			this.addEventListener('submit', this._onSubmitFn);
		}

		/**
   * Component unmount
   * @definition 		SWebComponent.componentUnmount
   * @protected
   */

	}, {
		key: 'componentUnmount',
		value: function componentUnmount() {
			_get2(SAjaxFormComponent.prototype.__proto__ || Object.getPrototypeOf(SAjaxFormComponent.prototype), 'componentUnmount', this).call(this);
			// remove submit event listener
			this.removeEventListener('submit', this._onSubmitFn);
		}

		/**
   * Component will receive prop
   * @definition 		SWebComponent.componentWillReceiveProp
   * @protected
   */

	}, {
		key: 'componentWillReceiveProp',
		value: function componentWillReceiveProp(name, newVal, oldVal) {
			switch (name) {}
		}

		/**
   * Update references
   */

	}, {
		key: '_updateReferences',
		value: function _updateReferences() {
			this._refElms.success = this.querySelector('[' + this.componentNameDash + '-success]');
			this._refElms.error = this.querySelector('[' + this.componentNameDash + '-error]');
		}

		/**
   * On form submit
   * @param 	{Event} 	e 		The submit event
   */

	}, {
		key: '_onSubmit',
		value: function _onSubmit(e) {
			// prevent default behavior
			e.preventDefault();

			// avoid recursive submit
			if (e.detail && e.detail.source && e.detail.source === this) return;

			// submit the form
			this.submit();
		}

		/**
   * Submit the form
   */

	}, {
		key: 'submit',
		value: function submit() {
			var _axios$request,
			    _this2 = this;

			// dispatch a submit event
			(0, _dispatchEvent2.default)(this, 'submit', {
				source: this // attach the form to the event to check then to avoid recursive submit calls
			});

			// make sure the form is valid before send
			if (!this.checkValidity()) return;

			// process data to be sent through axios
			var dataProp = 'data';
			var data = void 0;
			if (this.props.method.toLowerCase() === 'get') {
				dataProp = 'params';
				data = (0, _formSerialize2.default)(this, { hash: true });
			} else {
				// check if need to send the form as formData
				if (this.props.enctype === 'multipart/form-data') {
					data = new FormData(this);
				} else {
					data = (0, _formSerialize2.default)(this);
				}
			}

			// add the loading attribute
			this.setAttribute('loading', true);

			// process to ajax request
			var ajax = this._axios.request((_axios$request = {
				url: this.props.action,
				method: this.props.method
			}, _defineProperty(_axios$request, dataProp, data), _defineProperty(_axios$request, 'responseType', this.props.responseType), _defineProperty(_axios$request, 'auth', this.props.auth), _defineProperty(_axios$request, 'headers', _extends({
				'X-Requested-With': 'XMLHttpRequest'
			}, this.props.headers)), _axios$request)).then(function (response) {

				// add the state attribute
				_this2.setAttribute('success', true);
				_this2.removeAttribute('error');

				// get the data inside the response
				if (response && response.data) response = response.data;

				// handle response
				_this2._handleSuccessResponse(response);

				// after response
				_this2._afterResponse();
			}).catch(function (error) {

				// add the state attribute
				_this2.setAttribute('error', true);
				_this2.removeAttribute('success');

				// get the data inside the error
				if (error && error.data) error = error.data;

				// handle error response
				_this2._handleErrorResponse(error);

				// after response
				_this2._afterResponse();
			});
		}

		/**
   * Handle success response
   * @param 		{Object|String} 	response 		The server response
   */

	}, {
		key: '_handleSuccessResponse',
		value: function _handleSuccessResponse(response) {
			var _this3 = this;

			// if we have a refEls.success
			if (this._refElms.success) {
				// check if need to inject the reply from the response or not
				var successPath = this._refElms.success.getAttribute(this.componentNameDash + '-success');
				if (successPath && (typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object') {
					var successMsg = (0, _get4.default)(response, successPath);
					if (successMsg) this._refElms.success.innerHTML = successMsg;
				}
				// check if the success element has a timeout defined on it
				var successTimeout = this._refElms.success.getAttribute('timeout') || this.props.stateTimeout;
				if (successTimeout) {
					clearTimeout(this._successTimeout);
					this._successTimeout = setTimeout(function () {
						_this3._refElms.success.removeAttribute('active');
					}, parseInt(successTimeout));
				}
				// add the active attribute
				this._refElms.success.setAttribute('active', true);
			}
			if (this._refElms.error) {
				this._refElms.error.removeAttribute('active');
			}

			// reset the form if needed
			if (this.props.resetOnSuccess) {
				this.reset();
			}
		}

		/**
   * Handle error response
   * @param 	{Object|String} 	error 	The error response sent by the server
   */

	}, {
		key: '_handleErrorResponse',
		value: function _handleErrorResponse(error) {
			var _this4 = this;

			if (this._refElms.success) {
				this._refElms.success.removeAttribute('active');
			}

			if (this._refElms.error) {
				// check if need to inject the reply from the response or not
				var errorPath = this._refElms.error.getAttribute(this.componentNameDash + '-error');
				if (errorPath && (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object') {
					var errorMsg = (0, _get4.default)(error, errorPath);
					if (errorMsg) this._refElms.error.innerHTML = errorMsg;
				}
				// check if the error element has a timeout defined on it
				var errorTimeout = this._refElms.error.getAttribute('timeout') || this.props.stateTimeout;
				if (errorTimeout) {
					clearTimeout(this._errorTimeout);
					this._errorTimeout = setTimeout(function () {
						_this4._refElms.error.removeAttribute('active');
					}, parseInt(errorTimeout));
				}
				// add the active attribute
				this._refElms.error.setAttribute('active', true);
			}
		}

		/**
   * After response
   */

	}, {
		key: '_afterResponse',
		value: function _afterResponse() {
			var _this5 = this;

			// remove the loading attribute
			this.removeAttribute('loading');

			// handle the state-timeout prop
			if (this.props.stateTimeout) {
				setTimeout(function () {
					// remove the states attributes
					_this5.removeAttribute('error');
					_this5.removeAttribute('success');
				}, this.props.stateTimeout);
			}
		}
	}], [{
		key: 'defaultProps',


		/**
   * Default props
   * @definition 		SWebComponent.defaultProps
   * @protected
   */
		get: function get() {
			return {

				/**
     * Set the action to send the form to
     * @prop
     * @type 		{String}
     */
				action: null,

				/**
     * Set the method used to send the form.
     * @prop
     * @type 		{String}
     * @values 		GET,POST
     */
				method: 'POST',

				/**
     * Content type header that will be sent with the request
     * @prop
     * @type 		{String}
     * @values 		application/x-www-form-urlencoded,multipart/form-data,text/plain
     */
				enctype: 'application/x-www-form-urlencoded',

				/**
     * Specify if need to reset the form on success on not
     * @prop
     * @type 		{Boolean}
     */
				resetOnSuccess: true,

				/**
     * Specify a timeout to remove the state attributes after the form submission
     * @prop
     * @type 		{Integer}
     */
				stateTimeout: null,

				/**
     * Specify the response type wanted from the server.
     * @prop
     * @type 		{String}
     * @values 		json,text
     */
				responseType: 'json',

				/**
     * Authorization header formated in an object of username and password properties.
     * @prop
     * @type 		{String}
     */
				auth: {},

				/**
     * Custom headers object
     * @prop
     * @type 		{Object}
     */
				headers: {}

				/**
     * @name 	s-ajax-form-success
     * Attribute that has to be present on the HTMLElement you want to be the success message holder.
     * It will have the `active` attribute on it when the form has been successfuly sended.
     * If your server send back a json formated response, you can set here a [get path](https://lodash.com/docs/4.17.10#get) relative to the
     * root of the response and this value will be injected inside your html before activate it.
     * Optionaly, the HTMLElement flaged with this attribute accept a `timeout` attribute that will tell how many times
     * the success message has to be displayed.
     * @prop
     * @type 		{String}
     * @example 	html
     * <form is="s-ajax-form" ...>
     * 	<!-- with a "get path" -->
     * 	<!-- assume response object like so:
     * 	{
     * 		code: 200,
     * 		message: "Your message has been sent..."
     * 	}
     * 	-->
     * 	<div s-ajax-form-success="message" timeout="4000"></div>
     * 	<!-- without any "get path" -->
     * 	<div s-ajax-form-success timeout="4000">
     * 		Your message has been sent...
     * 	</div>
     * 	<!-- form here... -->
     * </form>
     */

				/**
    * @name 	s-ajax-form-error
    * Attribute that has to be present on the HTMLElement you want to be the error message holder.
    * It will have the `active` attribute on it when the form has been successfuly sended.
    * If your server send back a json formated response, you can set here a [get path](https://lodash.com/docs/4.17.10#get) relative to the
    * root of the response and this value will be injected inside your html before activate it.
    * Optionaly, the HTMLElement flaged with this attribute accept a `timeout` attribute that will tell how many times
    * the error message has to be displayed.
    * @prop
    * @type 		{String}
    * @example 	html
    * <form is="s-ajax-form" ...>
    * 	<!-- with a "get path" -->
    * 	<!-- assume response object like so:
    * 	{
    * 		code: 200,
    * 		message: "Something went wrong..."
    * 	}
    * 	-->
    * 	<div s-ajax-form-error="message" timeout="4000"></div>
    * 	<!-- without any "get path" -->
    * 	<div s-ajax-form-error timeout="4000">
    * 		Something went wrong...
    * 	</div>
    * 	<!-- form here... -->
    * </form>
    */

			};
		}

		/**
   * Physical props
   * @definition 		SWebComponent.physicalProps
   * @protected
   */

	}, {
		key: 'physicalProps',
		get: function get() {
			return ['method', 'action', 'enctype'];
		}

		/**
   * Required props
   * @definition 		SWebComponent.requiredProps
   * @protected
   */

	}, {
		key: 'requiredProps',
		get: function get() {
			return ['action', 'enctype', 'method'];
		}
	}]);

	return SAjaxFormComponent;
}((0, _sNativeWebComponent2.default)(HTMLFormElement));

exports.default = SAjaxFormComponent;