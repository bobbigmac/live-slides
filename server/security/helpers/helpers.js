//SEE https://github.com/ongoworks/meteor-security

Security.defineMethod("removePresentationSlides", {
  fetch: [],
  deny: function (type, arg, userId, doc) {
    Slides.remove({ presentation: doc.presentation });
    
    return false;
  }
});

Security.defineMethod("ifPresentationExists", {
  fetch: [],
  deny: function (type, arg, userId, doc) {
    return !(doc.presentation && Presentations.findOne({
      _id: doc.presentation,
    }));
  }
});

Security.defineMethod("ifUserOwnsPresentation", {
  fetch: [],
  deny: function (type, arg, userId, doc) {
    return !(doc.presentation && Presentations.findOne({
      _id: doc.presentation,
      owner: userId
    }));
  }
});

Security.defineMethod("ifPresentationIsOpen", {
  fetch: [],
  deny: function (type, arg, userId, doc) {
    return !(doc.presentation && Presentations.findOne({
      _id: doc.presentation,
      open: true
    }));
  }
});

Security.defineMethod("ownerIsLoggedInUser", {
  fetch: [],
  deny: function (type, arg, userId, doc) {
    return userId !== doc.owner;
  }
});

Security.defineMethod("idIsLoggedInUser", {
  fetch: [],
  deny: function (type, arg, userId, doc) {
    return userId !== doc._id;
  }
});

// Sets the owner property of document, and sets created date.
Security.defineMethod("setOwnerUser", {
  fetch: [],
  deny: function (type, arg, userId, doc) {
    doc.owner = userId;
    if(!doc.created) {
	    doc.created = new Date();
  	}
  	doc.modified = new Date();
    return false;
  }
});

// May be used as simple trigger responder to client-side updates
Security.defineMethod("watchChangesByBasic", {
  fetch: [],
  deny: function (type, arg, userId, doc) {
    if(type === 'update') {
      console.log('Had changes by basic user', userId, 'doc', doc._id);
    }
    return false;
  }
});
