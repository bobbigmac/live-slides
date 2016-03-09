Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  layoutTemplate: 'layout'
});

var currentUser = {
  ready: function() {
    var user = Meteor.user();
    return (user === null || typeof user !== "undefined");
  }
};

Router.route('/', {
	name: 'home',
	waitOn: function () {
		return [
			currentUser,
			Meteor.subscribe('presentations')
		];
	},
	data: function() {
		var presentations = Presentations.find();//all for user, or open
		Session.set('page-title', presentations.count()+' presentations');
		return { presentations: presentations };
	}
});

Router.route('/:presentation', {
	name: 'presentation',
	waitOn: function () {
		return [
			currentUser,
			Meteor.subscribe('presentations', [this.params.presentation]),
			Meteor.subscribe('slides', this.params.presentation)
		];
	},
	data: function() {
		var presentation = Presentations.findOne({ _id: this.params.presentation });
		var slides = Slides.find({ presentation: this.params.presentation }, { sort: { created: -1 }});

		Session.set('page-title', slides.count()+' slides');
		return { presentation: presentation, slides: slides };
	}
});