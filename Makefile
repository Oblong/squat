.PHONY: test docs

test:
	./node_modules/.bin/mocha --harmony --reporter spec
