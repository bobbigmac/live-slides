
var defaultTexts = {
	content: "## Edit Me\n\n- unordered list\n\n**Markup allowed**\n\n__or__\n\n1. ordered list",
	image: "Image url",
	url: "Website url"
};

Template.newSlide.events({
	'click .prep-slide': function(event) {
		var type = $(event.target).attr('data-type');
		if(type) {
			console.log(type, this);
			this[type] = defaultTexts[type];
			console.log(type, this);
			if(!this._id) {
				Slides.insert(this);
			} else {
				var id = this._id;
				delete this._id;
				Slides.update(this._id, { $set: this });
			}
		}
	}
});

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