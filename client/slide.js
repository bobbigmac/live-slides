

Template.slide.events({
	'dblclick .start-edit': function() {
		Session.set('editMode', true);
	}
});

Template.slide.helpers({
	'editMode': function() {
		return Session.get('editMode');
	},
});