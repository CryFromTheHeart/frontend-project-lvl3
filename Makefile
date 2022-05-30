install:
	npm ci
test-coverage:
	npm run test -- --coverage
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
lint:
	npx eslint .
