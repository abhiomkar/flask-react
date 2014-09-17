require.config({
	paths: {
		react: '../libs/react/react',
		jquery: '../libs/jquery/dist/jquery.min',
		lodash: '../libs/lodash/dist/lodash.min',
		bootstrap: '../libs/bootstrap/dist/js/bootstrap.min'
	},

	shim: {
		react: {
			exports: 'React'
		},

		jquery: {
			exports: '$'
		},

		lodash: {
			exports: '_'
		},

		bootstrap: {
			deps: ['jquery']
		}
	}
});

require([
	'react',
	'components/App',
	'jquery',
	'lodash',
	'bootstrap'
	],
function(React, App) {
	React.renderComponent(App(), document.getElementById('app'));
});