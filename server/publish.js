
Meteor.publish('slides', function(presentation) {
	presentation = (typeof presentation == 'string' && presentation.length && presentation) || false;
	if(presentation) {
		return Slides.find({ presentation: presentation });
	}

	this.ready();
	return;
});

Meteor.publish('presentations', function(ids) {
	ids = (ids instanceof Array && ids.length && ids) || [];

	var filter = {
		$or: [
			{ open: true },
		]
	};

	if(this.userId) {
		filter['$or'].push({ owner: this.userId });
	}

	if(ids.length) {
		filter._id = {
			$in: ids
		}
	}

	return Presentations.find(filter, { sort: { created: -1 }});

	// this.ready();
	// return;
});