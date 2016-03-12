

Template.slide.helpers({
	'editMode': function() {
		return Session.get('editMode');
	},
});

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
    //{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },

    // Interpret Markdown in <section> elements
    // { src: 'client-libs/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    // { src: 'client-libs/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },

    // Syntax highlight for <code> elements
    //{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },

    // Speaker notes
    //{ src: 'plugin/notes/notes.js', async: true },
	]
};

Template.presentation.onRendered(function() {
	//See https://github.com/hakimel/reveal.js#instructions
	Reveal.initialize(revealSettings);

	var refreshMarkdown = function() {
		if(typeof RevealMarkdown != 'undefined') {
			window.setTimeout(function() {
				RevealMarkdown.initialize(revealSettings);
				Reveal.sync();
			}, 10);
		}
	};

	Slides.find().observeChanges({
		added: refreshMarkdown,
		changed: refreshMarkdown,
		removed: refreshMarkdown
	});

	Reveal.addEventListener('slidechanged', function(event) {
		//TODO: Update any remotes
		//console.log('slide changed', event);
	});
});