

Template.contentSlide.events({
	'dblclick .start-edit': function() {
		Session.set('editMode', true);
	}
});

Template.contentSlide.helpers({
	'editMode': function() {
		return Session.get('editMode');
	},
});