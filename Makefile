build-production:
	cd client && ${MAKE} build
	cd server && ${MAKE} build

run-production:
    docker-compose up

