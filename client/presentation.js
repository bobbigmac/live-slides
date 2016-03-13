

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
  transition: 'convex',
  // transition: 'concave',
  // transition: 'zoom',
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
		try {
			Reveal.sync();
			Reveal.slide();
		} catch(exc) {
			//TODO: Known issue
			//console.log(exc);
		}
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

var moveSlide = function(pr, slides, direction) {
	if(pr && slides && direction) {
		var indexh = (pr && pr.indexh);
		//console.log(indexh);
		if(typeof indexh != 'undefined') {
			var curr = slides[indexh];
			var swap = slides[indexh+direction];

			if(curr && curr._id && swap && swap._id) {
				if((curr.order || curr.order === 0) && (swap.order || swap.order === 0)) {
					Slides.update(curr._id, { $set: { order: swap.order }});
					Slides.update(swap._id, { $set: { order: curr.order }});
				} else {
					slides.forEach(function(slide, p) {
						if(slide && slide._id) {
							var newOrder = p;
							if(slide._id == curr._id) {
								newOrder = p + direction;
							} else if(slide._id == swap._id) {
								newOrder = p - direction;
							}

							Slides.update(slide._id, {
								$set: { order: newOrder }
							});
						}
					});
				}

				Meteor.setTimeout(function() {
					if(direction > 0) {
						Reveal.right();
					} else {
						Reveal.left();
					}
				}, 300);
			}
		}
	}
};

Template.slideMover.events({
	'click .move-left': function() {
		var pr = (this.presentation && this.presentation);
		moveSlide(pr, this.slides, -1);
	},
	'click .move-right': function() {
		var pr = (this.presentation && this.presentation);
		moveSlide(pr, this.slides, 1);
	},
});

Template.nav.events({
	'click .toggle-edit': function() {
		Session.set('editMode', !Session.get('editMode'));
		refreshReveal();
	},
	'click .toggle-follow': function() {
		Session.set('hold-follow', !Session.get('hold-follow'));
		//refreshReveal();
	}
});