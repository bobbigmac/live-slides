
Presentations = new Mongo.Collection('presentations');
Slides = new Mongo.Collection('slides');

EditableText.userCanEdit = function(doc,Collection) {
  return Meteor.userId() == (doc && doc.owner);
}