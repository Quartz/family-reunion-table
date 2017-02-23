// NPM modules
var d3 = require('d3');
var request = require('d3-request');
var _ = require('lodash');

// Local modules
var features = require('./detectFeatures')();
var fm = require('./fm');
var utils = require('./utils');

// Globals
var DEFAULT_WIDTH = 940;
var MOBILE_BREAKPOINT = 600;

var indicatorData = null;

var rowTemplate = _.template('\
<td class="name"><%= country %></td>\
<% if (economic_resources == \'100\') { %>\
	<td class="value low">Low</td>\
<% } else if (economic_resources == \'50\') { %>\
	<td class="value moderate">Moderate</td>\
<% } else { %>\
	<td class="value high">High</td>\
<% } %>\
')


/**
 * Initialize the graphic.
 *
 * Fetch data, format data, cache HTML references, etc.
 */
function init() {
	d3.csv('data/indicators.csv', function(error, data) {
		indicatorData = data;

		render();
		$(window).resize(utils.throttle(onResize, 250));
	});
}

/**
 * Invoke on resize. Update child size.
 */
function onResize() {
	fm.resize();
}

/**
 * Figure out the current frame size and render the graphic.
 */
function render() {
	console.log(indicatorData);

	d3.select('table#mipex tbody')
		.selectAll('tr')
		.data(indicatorData)
		.enter()
		.append('tr')
			.html(rowTemplate);

	// Inform parent frame of new height
	fm.resize()
}


// Bind on-load handler
$(document).ready(function() {
	init();
});
