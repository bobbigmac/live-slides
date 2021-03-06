
Meteor.publish('slides', function(presentation) {
	presentation = (typeof presentation == 'string' && presentation.length && presentation) || false;
	if(presentation) {
		return Slides.find({ presentation: presentation });
	}

	this.ready();
	return;
});

Meteor.publish('questions', function(presentation) {
	presentation = (typeof presentation == 'string' && presentation.length && presentation) || false;
	if(presentation) {
		return Questions.find({ presentation: presentation });
	}

	this.ready();
	return;
});

Meteor.publish('presentations', function(ids) {
	ids = (ids instanceof Array && ids.length && ids) || [];

	var filter = {
	};

	if(!ids) {
		// filter['$or'] = filter['$or'] || [];
		// filter['$or'].push({ open: true });
	}

	// if(this.userId && !ids.length) {
	// 	filter['$or'] = filter['$or'] || [];
	// 	filter['$or'].push({ owner: this.userId });
	// }

	if(ids.length) {
		filter._id = {
			$in: ids
		};
	}

	//console.log(ids, filter)
	return Presentations.find(filter, { sort: { created: -1 }});

	// this.ready();
	// return;
});