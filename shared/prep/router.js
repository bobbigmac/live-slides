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

Router.route('/:presentation/:slide?', {
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
		var slides = Slides.find({ presentation: this.params.presentation }, { sort: { order: 1, created: 1 }});

		Session.set('page-title', slides.count()+' slides: ' + (presentation && presentation.title));
		slides = slides.fetch();

		var owner = (presentation && presentation.owner);
		if(Meteor.userId() == owner) {
			//Default/new slide
			var newSlide = { presentation: presentation && presentation._id, owner: Meteor.userId() };
			slides.push(newSlide);
		}
		
		return { presentation: presentation, slides: slides };
	},
	onAfterAction: function() {
		var slide = (this.params && this.params.slide) || undefined;
		//Rerender the reveal deck
		window.setTimeout(function() {
			try {
				Reveal.slide(slide);
			} catch(exc) {
				//Known issue
				//console.log(exc);
			}
		}, 20);
	}
});