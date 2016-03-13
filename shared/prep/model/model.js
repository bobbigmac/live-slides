
Presentations = new Mongo.Collection('presentations');
Slides = new Mongo.Collection('slides');
Questions = new Mongo.Collection('questions');

EditableText.userCanEdit = function(doc,Collection) {
	var userId = Meteor.userId();
	if(userId) {
	  if(userId == (doc && doc.owner)) {
	  	return true;
	  } else if(doc.presentation) {
	  	var presentation = Presentations.findOne(doc.presentation);
	  	if(userId == (presentation && presentation.owner)) {
	  		return true;
	  	}
	  }
	}
}