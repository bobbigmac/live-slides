
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