var settings = ((Meteor.settings && Meteor.settings.public) || {});

Session.setDefault('brand-name', settings.brand||'Loading...');

Handlebars.registerHelper('brand', function() {
	return Session.get('brand-name');
});

Handlebars.registerHelper('either', function(a, b) {
	return a || b;
});

Handlebars.registerHelper('editIcon', function(a) {
	return (Session.get('editMode') ? 'edit' : 'pencil')
});

Handlebars.registerHelper('editMode', function(a) {
	return Session.get('editMode');
});

Handlebars.registerHelper('log', function(a) {
	console.log(a);
});

Handlebars.registerHelper('bootstrapify', function() {
	return {
		//'class': 'input-group',
		'inputClass': 'form-control input-lg'
	}
});

Handlebars.registerHelper('bootstrapifyLarge', function() {
	return {
		//'class': 'input-group',
		'inputClass': 'form-control input-lg'
	}
});