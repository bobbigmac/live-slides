

Template.presentationTitle.helpers({
	'momentCreatedAgo': function() {
		return new moment(this.created).fromNow();
	}
});