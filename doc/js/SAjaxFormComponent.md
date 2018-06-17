# SAjaxFormComponent

Extends **SWebComponent**

Provide a simple and declarative way to send a form through ajax with a success/error display mecanism built in.
Features:
1. Simple declarative way to send a form through ajax
2. Keep track of the form status through simple `error` and `success` attributes
3. Display the success/error message easily
4. Many more...


### Example
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
Author : Olivier Bossel <olivier.bossel@gmail.com>




## Attributes

Here's the list of available attribute to set on the element.

### action

Set the action to send the form to

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### method

Set the method used to send the form.

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Values : **GET,POST**

Default : **POST**


### enctype

Content type header that will be sent with the request

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Values : **application/x-www-form-urlencoded,multipart/form-data,text/plain**

Default : **application/x-www-form-urlencoded**


### resetOnSuccess

Specify if need to reset the form on success on not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### stateTimeout

Specify a timeout to remove the state attributes after the form submission

Type : **{ Integer }**

Default : **null**


### responseType

Specify the response type wanted from the server.

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Values : **json,text**

Default : **json**


### auth

Authorization header formated in an object of username and password properties.

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **{}**


### headers

Custom headers object

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**


### s-ajax-form-success

Attribute that has to be present on the HTMLElement you want to be the success message holder.
It will have the `active` attribute on it when the form has been successfuly sended.
If your server send back a json formated response, you can set here a [get path](https://lodash.com/docs/4.17.10#get) relative to the
root of the response and this value will be injected inside your html before activate it.
Optionaly, the HTMLElement flaged with this attribute accept a `timeout` attribute that will tell how many times
the success message has to be displayed.

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

#### Example
```html
	<form is="s-ajax-form" ...>
	<!-- with a "get path" -->
	<!-- assume response object like so:
	{
		code: 200,
		message: "Your message has been sent..."
	}
	-->
	<div s-ajax-form-success="message" timeout="4000"></div>
	<!-- without any "get path" -->
	<div s-ajax-form-success timeout="4000">
		Your message has been sent...
	</div>
	<!-- form here... -->
</form>
```

### s-ajax-form-error

Attribute that has to be present on the HTMLElement you want to be the error message holder.
It will have the `active` attribute on it when the form has been successfuly sended.
If your server send back a json formated response, you can set here a [get path](https://lodash.com/docs/4.17.10#get) relative to the
root of the response and this value will be injected inside your html before activate it.
Optionaly, the HTMLElement flaged with this attribute accept a `timeout` attribute that will tell how many times
the error message has to be displayed.

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

#### Example
```html
	<form is="s-ajax-form" ...>
	<!-- with a "get path" -->
	<!-- assume response object like so:
	{
		code: 200,
		message: "Something went wrong..."
	}
	-->
	<div s-ajax-form-error="message" timeout="4000"></div>
	<!-- without any "get path" -->
	<div s-ajax-form-error timeout="4000">
		Something went wrong...
	</div>
	<!-- form here... -->
</form>
```



## Methods


### submit

Submit the form