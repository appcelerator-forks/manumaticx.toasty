var args = arguments[0] || {};

// define toasty colors
var colors = [
    '#44b700', // green
    '#d10d00', // red
    '#005bd1'  // blue
];

// define toasty types
var types = ['confirm', 'alert', 'info'];

// check if a custom view was passed
if (_.has(args, "view")){
    // replace our view with the custom view
    $.toasty.remove($.centerWrapper);
    $.toasty.add(args.view);
}else{
    // assign passed values
    $.title.text = args.title || '';
    $.message.text = args.message || '';    
}

// adjust dimensions...
$.toasty.width  = args.width;
$.toasty.height = args.height;

// ..and other options
$.toasty.borderRadius = args.borderRadius;

// optional positioning options
_.has(args, "top")    && $.toasty.setTop(args.top);
_.has(args, "bottom") && $.toasty.setBottom(args.bottom);
_.has(args, "left")   && $.toasty.setLeft(args.left);
_.has(args, "right")  && $.toasty.setRight(args.right);

// set backgroundColor according to type
if ('undefined' !== typeof args.type) {

	if ('string' === typeof args.type) {
		$.toasty.setBackgroundColor(colors[_.indexOf(types, args.type)]);
	}

	if ('number' === typeof args.type) {
		$.toasty.setBackgroundColor(colors[args.type]);
	}
}

// show animation
var show = Ti.UI.createAnimation({
	duration : 200,
	opacity : args.opacity
});

// hide animation
var hide = Ti.UI.createAnimation({
	duration : 200,
	opacity : 0
});

// close toasty window when hide animation has finished
hide.addEventListener('complete', function() {
	$.toasty.close();
});

// show
exports.show = function() {
	// open window
	$.toasty.open();
	$.toasty.animate(show);
	
	// wait and hide
	setTimeout(function() {
		$.toasty.animate(hide);
	}, args.duration);
}; 