import SWebComponent from 'coffeekraken-sugar/js/core/SWebComponent'
import native from 'coffeekraken-sugar/js/core/sNativeWebComponent'
import __axios from 'axios'
import __formSerialize from 'form-serialize'
import _get from 'lodash/get'
import __dispatchEvent from 'coffeekraken-sugar/js/dom/dispatchEvent'

export default class SAjaxFormComponent extends native(HTMLFormElement) {

	/**
	 * Default props
	 * @definition 		SWebComponent.defaultProps
	 * @protected
	 */
	static get defaultProps() {
		return {

			/**
			 * Set the action to send the form to
			 * @prop
			 * @type 		{String}
			 */
			action : null,

			/**
			 * Set the method used to send the form.
			 * @prop
			 * @type 		{String}
			 * @values 		GET,POST
			 */
			method : 'POST',

			/**
			 * Content type header that will be sent with the request
			 * @prop
			 * @type 		{String}
			 * @values 		application/x-www-form-urlencoded,multipart/form-data,text/plain
			 */
			enctype : 'application/x-www-form-urlencoded',

			/**
			 * Specify if need to reset the form on success on not
			 * @prop
			 * @type 		{Boolean}
			 */
			resetOnSuccess : true,

			/**
			 * Specify a timeout to remove the state attributes after the form submission
			 * @prop
			 * @type 		{Integer}
			 */
			stateTimeout : null,

			/**
			 * Specify the response type wanted from the server.
			 * @prop
			 * @type 		{String}
			 * @values 		json,text
			 */
			responseType : 'json',

			/**
			 * Authorization header formated in an object of username and password properties.
			 * @prop
			 * @type 		{String}
			 */
			auth : {},

			/**
			 * Custom headers object
			 * @prop
			 * @type 		{Object}
			 */
			headers : {}

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
	static get physicalProps() {
		return ['method','action','enctype'];
	}

	/**
	 * Required props
	 * @definition 		SWebComponent.requiredProps
	 * @protected
	 */
	static get requiredProps() {
		return ['action','enctype','method'];
	}

	/**
	 * Component will mount
 	 * @definition 		SWebComponent.componentWillMount
	 * @protected
	 */
	componentWillMount() {
		super.componentWillMount();

		/**
		 * Save the references of html elements needed by the component
		 */
		this._refElms = {
			success : null,
			error : null
		};

		// create an axios instance
		this._axios = __axios.create();
		this._axios.interceptors.response.use((response) => {
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
	componentMount() {
		super.componentMount();

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
	componentUnmount() {
		super.componentUnmount();
		// remove submit event listener
		this.removeEventListener('submit', this._onSubmitFn);
	}

	/**
	 * Component will receive prop
	 * @definition 		SWebComponent.componentWillReceiveProp
	 * @protected
	 */
	componentWillReceiveProp(name, newVal, oldVal) {
		switch(name) {
		}
	}

	/**
	 * Update references
	 */
	_updateReferences() {
		this._refElms.success = this.querySelector(`[${this.componentNameDash}-success]`);
		this._refElms.error = this.querySelector(`[${this.componentNameDash}-error]`);
	}

	/**
	 * On form submit
	 * @param 	{Event} 	e 		The submit event
	 */
	_onSubmit(e) {
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
	submit() {
		// dispatch a submit event
		__dispatchEvent(this, 'submit', {
			source: this // attach the form to the event to check then to avoid recursive submit calls
		});

		// make sure the form is valid before send
		if ( ! this.checkValidity()) return;

		// process data to be sent through axios
		let dataProp = 'data';
		let data;
		if (this.props.method.toLowerCase() === 'get') {
			dataProp = 'params';
			data = __formSerialize(this, { hash: true });
		} else {
			// check if need to send the form as formData
			if (this.props.enctype === 'multipart/form-data') {
				data = new FormData(this);
			} else {
				data = __formSerialize(this);
			}
		}

		// add the loading attribute
		this.setAttribute('loading', true);

		// process to ajax request
		const ajax = this._axios.request({
			url: this.props.action,
			method: this.props.method,
			[dataProp]: data,
			responseType: this.props.responseType,
			auth: this.props.auth,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				...this.props.headers
			}
		}).then((response) => {

			// add the state attribute
			this.setAttribute('success', true);
			this.removeAttribute('error');

			// get the data inside the response
			if (response && response.data) response = response.data;

			// handle response
			this._handleSuccessResponse(response);

			// after response
			this._afterResponse();

		}).catch(error => {

			// add the state attribute
			this.setAttribute('error', true);
			this.removeAttribute('success');

			// get the data inside the error
			if (error && error.data) error = error.data;

			// handle error response
			this._handleErrorResponse(error);

			// after response
			this._afterResponse();
		});
	}

	/**
	 * Handle success response
	 * @param 		{Object|String} 	response 		The server response
	 */
	_handleSuccessResponse(response) {
		// if we have a refEls.success
		if (this._refElms.success) {
			// check if need to inject the reply from the response or not
			const successPath = this._refElms.success.getAttribute(`${this.componentNameDash}-success`);
			if (successPath && typeof response === 'object') {
				const successMsg = _get(response, successPath);
				if (successMsg) this._refElms.success.innerHTML = successMsg;
			}
			// check if the success element has a timeout defined on it
			const successTimeout = this._refElms.success.getAttribute(`timeout`) || this.props.stateTimeout;
			if (successTimeout) {
				clearTimeout(this._successTimeout);
				this._successTimeout = setTimeout(() => {
					this._refElms.success.removeAttribute('active');
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
	_handleErrorResponse(error) {
		if (this._refElms.success) {
			this._refElms.success.removeAttribute('active');
		}

		if (this._refElms.error) {
			// check if need to inject the reply from the response or not
			const errorPath = this._refElms.error.getAttribute(`${this.componentNameDash}-error`);
			if (errorPath && typeof error === 'object') {
				const errorMsg = _get(error, errorPath);
				if (errorMsg) this._refElms.error.innerHTML = errorMsg;
			}
			// check if the error element has a timeout defined on it
			const errorTimeout = this._refElms.error.getAttribute(`timeout`) || this.props.stateTimeout;
			if (errorTimeout) {
				clearTimeout(this._errorTimeout);
				this._errorTimeout = setTimeout(() => {
					this._refElms.error.removeAttribute('active');
				}, parseInt(errorTimeout));
			}
			// add the active attribute
			this._refElms.error.setAttribute('active', true);
		}
	}

	/**
	 * After response
	 */
	_afterResponse() {

		// remove the loading attribute
		this.removeAttribute('loading');

		// handle the state-timeout prop
		if (this.props.stateTimeout) {
			setTimeout(() => {
				// remove the states attributes
				this.removeAttribute('error');
				this.removeAttribute('success');
			}, this.props.stateTimeout);
		}

	}
}
