module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-ajax-form-component',

	// layout
	layout : 'right',

	// compile server
	compileServer : {

		// compile server port
		port : 4000

	},

	// editors
	editors : {
		html : {
			language : 'html',
			data : `
				<div class="container">
					<h1 class="h3 m-b-small">
						Coffeekraken s-ajax-form-component
					</h1>
					<p class="p m-b-bigger">
						Provide a simple and declarative way to send a form through ajax with a success/error display mecanism built in.
					</p>

					<form id="my-form" is="s-ajax-form" state-timeout="5000" action="demo/result.json" method="GET" headers='{"coco":"world"}'>
						<div s-ajax-form-success="message"></div>
						<div s-ajax-form-error timeout="4000">
							An unexpected error has occured. Please try again later...
						</div>

						<div class="form-group m-b">
							<input type="text" class="form-input" name="firstname" placeholder="Firstname" required />
						</div>

						<div class="form-group">
							<input type="text" class="form-input" name="lastname" placeholder="Lastname" required />
						</div>

						<div class="form-group m-t">
							<input type="submit" class="btn" value="Send form" />
						</div>
					</form>

				</div>
			`
		},
		css : {
			language : 'sass',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@import 'node_modules/coffeekraken-s-typography-component/index';
				@import 'node_modules/coffeekraken-s-button-component/index';
				@import 'node_modules/coffeekraken-s-form-component/index';
				@include s-init();
				@include s-classes();
				@include s-typography-classes();
				@include s-button-classes();
				@include s-form-classes();
				body {
					background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
				}
				.container {
					@include s-position(absolute, middle, center);
					min-width:80vw;
				}

				form[is="s-ajax-form"] {

					&[loading] {
						opacity: .5;
					}
				}

				[s-ajax-form-success],
				[s-ajax-form-error] {
					display:none;
					padding: s-space(default);
					margin-bottom: s-space(default);

					&[active] {
						display: block;
					}
				}

				[s-ajax-form-success] {
					background: s-color(success, -opacity .2);
					border:1px solid s-color(success);
					color: s-color(success);
				}
				[s-ajax-form-error] {
					background: s-color(error, -opacity .2);
					border:1px solid s-color(error);
					color: s-color(error);
				}

			`
		},
		js : {
			language : 'js',
			data : `
				import SAjaxFormComponent from './dist/index'
			`
		}
	}
}
