
Template.questions.events({
	'click .to-questions': function() {
		var firstQuestionSlide = Session.get('first-questions-slide');
		Reveal.slide(firstQuestionSlide);
	}
});

Meteor.startup(function() {
  sAlert.config({
		effect: 'genie',
		position: 'bottom-left',
		offset: 50,
		timeout: 12000,
		beep: '/beeps/hailbeep3_clean.mp3'
	});

	Questions.find().observeChanges({
		added: function (id, fields) {
			//console.log(id, fields);
			var question = Questions.findOne(id);
			if(question && question.owner) {
				var presentation = Presentations.findOne(question.presentation);
				//console.log(question, presentation);
				if(presentation.owner == Meteor.userId()) {
					sAlert.warning('New question: ' + question.text);
				}
			}
		}
	});
});