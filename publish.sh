#!/bin/bash 

printf "%s\n" \
	"-> PACKAGE NAME: $PACKAGE_NAME" \
	"-> RELEASE: $RELEASE_NAME" \
	""

# 1. VALIDATE RELEASE NAME

if [[  $RELEASE_NAME =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[a-z0-9.-]+)?$ ]]; then

	IFS='-'
	read -r RELEASE_VERSION RELEASE_TAG <<< $RELEASE_NAME

	# RELEASE_VERSION=${arr[0]}
	# RELEASE_TAG=${arr[1]}

	[[ -z $RELEASE_TAG ]] && RELEASE_TAG='latest'

else
	printf "%s\n" \
		"-> ERROR: \"$RELEASE_NAME\" is not a valid release name" \
		"-> Format must be in valid semver format" \
		"-> e.g. 1.1.0, 1.1.12, 1.1.12-alpha"
	exit 1
fi

# 2 CHECK IF PACKAGE IS PUBLISHED

PUBLISH_STATUS=$(npm view "$PACKAGE_NAME@$RELEASE_VERSION")


if [[ -z $PUBLISH_STATUS ]]; then

	# 2.a IF RELEASE VERSION UNPUBLISHED, THEN PUBLISH AND TAG

	printf "%s\n" \
		"-> NO PUBLISHED VERSIONS FOUND, PUBLISHING TO NPM" \
		"---> $PACKAGE_NAME@$RELEASE_VERSION" \
		"---> $PACKAGE_NAME@$RELEASE_TAG" \
		""

	echo "enpm publish --tag $RELEASE_TAG"
	
else
	# 2.c OTHERWISE, ONLY TAG
	#     - NPM throws on attempt overwrite `latest` package tag


	printf "%s\n" \
		"-> $PACKAGE_NAME@$RELEASE_VERSION ALREADY PUBLISHED" \
		"-> PUBLISHING NEW TAG FOR THIS VERSION" \
		"---> $PACKAGE_NAME@$RELEASE_TAG" \
		""

	echo "enpm dist-tag add $RELEASE_TAG"
fi


