run:
	docker compose -f local.yaml up -d
build:
	docker compose -f local.yaml build --no-cache
logs-server:
	docker logs foc-internal_server
createsuperuser:
	docker exec -it foc-internal_server python manage.py createsuperuser
migrate:
	docker exec -it foc-internal_server python manage.py migrate
makeMigrations:
	docker exec -it foc-internal_server python manage.py makemigrations

down:
	docker compose -f local.yaml down
