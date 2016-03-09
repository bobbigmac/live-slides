
Template.layout.helpers({
	pageTitle: function() {
		var pageTitle = Session.get('page-title');
	  document.title = (pageTitle ? pageTitle + ' - ' : '') + Session.get('brand-name');
	  return '';
	}
});

Template.notFound.rendered = function() {
	Router.go('/');
};