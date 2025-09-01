init:
	yarn install
	cp .env.sample .env
build:
	docker compose pull
	docker compose build
	docker compose up -d db
	yarn build
	yarn dev
	yarn analytics
prod:
	docker compose -f docker-compose.prod.yml build > build.log
	yarn build:quests
	docker compose -f docker-compose.prod.yml up -d