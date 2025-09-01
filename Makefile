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
dev-down:
	docker compose down
prod-build:
	docker compose -f docker-compose.prod.yml build > build.log
	yarn build:quests
	docker compose -f docker-compose.prod.yml up -d
prod:
	docker compose -f docker-compose.prod.yml pull
	yarn build:quests
	docker compose -f docker-compose.prod.yml up -d
prod-down:
	docker compose -f docker-compose.prod.yml down
upload:
	docker compose -f docker-compose.prod.yml build
	docker compose -f docker-compose.prod.yml push