
var defaultTexts = {
	content: "## Edit Me\n\n- unordered list\n\n**Markup allowed**\n\n__or__\n\n1. ordered list",
	image: "Image url",
	url: "Website url"
};

Template.newSlide.events({
	'click .prep-slide': function(event) {
		var type = $(event.target).attr('data-type');
		if(type) {
			//console.log(type, this);
			this[type] = defaultTexts[type];
			
			if(typeof this.order == 'undefined') {
				var newOrder = Slides.find({}, { sort: { order: 1, created: 1 }}).fetch().reduce(function(max, s) {
					return (s.order && s.order > max ? s.order : max);
				}, -1);
				this.order = (newOrder + 1);
			}

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

var startEdit = function() {
	if(this.owner == Meteor.userId()) {
		Session.set('editMode', true);
	}
};
var isEditMode = function() {
	return Session.get('editMode');
};

Template.contentSlide.events({
	'dblclick .start-edit': startEdit
});

Template.contentSlide.helpers({
	'editMode': isEditMode
});

Template.questionSlide.events({
	'dblclick .start-edit': startEdit
});

Template.questionSlide.helpers({
	'editMode': isEditMode
});