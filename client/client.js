/**
 * Set the brand name for this project
 */
Session.set('brand-name', 'Live Slides');

Template.nav.events({
	'click .add-presentation': function() {
		var newPresentation = { title: 'Default new presentation'};
		Presentations.insert(newPresentation, function(error, presentationId) {
			if(!error) {
				console.log(presentationId);
				Router.go('presentation', { presentation: presentationId })
			} else {
				console.log('Could not insert new presentation', error);
			}
		});
	}
});