var settings = ((Meteor.settings && Meteor.settings.public) || {});

Session.setDefault('brand-name', settings.brand||'Loading...');

Handlebars.registerHelper('brand', function() {
	return Session.get('brand-name');
});

Handlebars.registerHelper('either', function(a, b) {
	return a || b;
});

Handlebars.registerHelper('log', function(a) {
	console.log(a);
});