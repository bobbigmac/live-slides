

Slides.permit('insert')
	.ifHasRole('basic')
	.ifPresentationExists()
	.ifPresentationIsOpen()
	.setOwnerUser()
	.apply();

Slides.permit('insert')
	.ifHasRole('basic')
	.ifPresentationExists()
	.ifUserOwnsPresentation()
	.setOwnerUser()
	.apply();

Slides.permit('update')
	.ifHasRole('basic')
	.ownerIsLoggedInUser()
	//.onlyProps(['keySets'])
	//.watchChangesByBasic()
	.apply();

Slides.permit('remove')
	.ifHasRole('basic')
	.ownerIsLoggedInUser()
	.apply();

Slides.permit(['update', 'remove'])
	.ifHasRole('admin')
	.apply();