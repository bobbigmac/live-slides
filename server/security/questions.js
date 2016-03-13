

Questions.permit('insert')
	.ifHasRole('basic')
	.ifPresentationExists()
	.setOwnerUser()
	.apply();

Questions.permit('remove')
	.ifHasRole('basic')
	.ownerIsLoggedInUser()
	.apply();

Questions.permit(['update', 'remove'])
	.ifUserOwnsPresentation()
	.apply();

Questions.permit(['update', 'remove'])
	.ifHasRole('admin')
	.apply();