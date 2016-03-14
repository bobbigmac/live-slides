
// Enforce domain root, not www.root
WebApp.connectHandlers.use(function(req, res, next) {
  // Check if request is for non-www address
  if(req.headers && req.headers.host.slice(0, 4) === 'www.') {
    // Remove www. from host
    var newHost = req.headers.host.slice(4);
    // Redirect to non-www URL
    res.writeHead(301, {
    	// Hard-coded protocol because req.protocol not available
      Location: 'http://' + newHost + req.originalUrl
    });
    res.end();
  } else {
    // Continue with the application stack
    next();
  }
});

Meteor.startup(function () {
	if(typeof AccountsGuest !== 'undefined') {
		AccountsGuest.name = true;
		AccountsGuest.forced = false;
	}

	Meteor.methods({
		'enable-guest-accounts': function() {
			if(typeof AccountsGuest !== 'undefined') {
				AccountsGuest.enabled = true;
			}
		},
		'disable-guest-accounts': function() {
			if(typeof AccountsGuest !== 'undefined') {
				AccountsGuest.enabled = false;
			}
		}
	});
});