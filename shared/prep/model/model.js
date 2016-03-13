
Presentations = new Mongo.Collection('presentations');
Slides = new Mongo.Collection('slides');
Questions = new Mongo.Collection('questions');

EditableText.userCanEdit = function(doc,Collection) {
  return Meteor.userId() == (doc && doc.owner);
}