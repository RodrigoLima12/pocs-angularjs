.PHONY: yarn clean down up run

yarn:
	yarn install

config_json:
	touch src/config/config.json
	cp src/config/config.json.dist src/config/config.json

clean:
	docker-compose down
	docker-compose rm
	rm -rf node_modules/

down: 
	docker-compose down

up:
	docker-compose up -d --force-recreate webpack

run: yarn config_json up