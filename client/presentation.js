

Template.presentationTitle.helpers({
	'momentCreatedAgo': function() {
		return new moment(this.created).fromNow();
	}
});

var revealSettings = {
  loop: false,
  controls: true,
  progress: true,
  autoSlide: 0, //5000,
  dependencies: [
    // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
    { src: 'client-libs/classList.js', condition: function() { return !document.body.classList; } },
	]
};

var cancelEditMode = function(event) {
	//console.log(event.which);
	if(event.which == 27) {
		Session.set('editMode', false);
	}
};

var followPresentation = function(id, presentation) {
	if(presentation && Meteor.userId() != presentation.owner) {
		//console.log('user is not owner');
		if(!Session.get('hold-follow')) {
			var pos = Reveal.getIndices();
			var h = pos && pos.h;
			//console.log(pos, h, presentation.indexh);
			if(h != presentation.indexh) {
				Reveal.slide(presentation.indexh);
			}
		}
	}
};

EditableText.registerCallbacks({
	'refreshSlide': function() {
		Reveal.slide();
	}
});

var refreshReveal = function(id, fields) {
	window.setTimeout(function() {
		Reveal.sync();
	}, 10);
};

Template.presentation.onRendered(function() {
	var presentation = this.data && this.data.presentation;

	$(document).off('keyup', cancelEditMode).on('keyup', cancelEditMode);
	//See https://github.com/hakimel/reveal.js#instructions
	Reveal.initialize(revealSettings);

	Slides.find().observeChanges({
		added: refreshReveal,
		changed: refreshReveal,
		removed: refreshReveal
	});

	Presentations.find().observeChanges({
		added: followPresentation,
		changed: followPresentation,
		//removed: refreshReveal
	});

	Reveal.addEventListener('slidechanged', function(event) {
		Router.go('presentation', {
			presentation: presentation._id,
			slide: event.indexh
		}, { replaceState:true });

		Session.set('slide-number', event.indexh);
		if(Meteor.userId() == presentation.owner) {
			Presentations.update(presentation._id, {
				$set: {
					indexh: event.indexh
				}
			});
		}
	});
});

Template.nav.events({
	'click .toggle-edit': function() {
		Session.set('editMode', !Session.get('editMode'));
		refreshReveal();
	}
});