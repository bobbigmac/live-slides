
Presentations.permit('insert')
	.ifHasRole('basic')
	.setOwnerUser()
	.apply();

Presentations.permit('update')
	.ifHasRole('basic')
	.ownerIsLoggedInUser()
	.apply();

Presentations.permit('remove')
	.ifHasRole('basic')
	.ownerIsLoggedInUser()
	.removePresentationSlides()//Place last
	.apply();

Presentations.permit(['update', 'remove'])
	.ifHasRole('admin')
	.removePresentationSlides()//Place last
	.apply();