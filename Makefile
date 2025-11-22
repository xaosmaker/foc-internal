run:
	docker compose -f local.yaml up -d
build:
	docker compose -f local.yaml build --no-cache
