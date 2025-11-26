run:
	docker compose -f local.yaml up -d
build:
	docker compose -f local.yaml build --no-cache
logs-server:
	docker logs foc-internal-server
createsuperuser:
	docker exec -it foc-internal-server python manage.py createsuperuser
migrate:
	docker exec -it foc-internal-server python manage.py migrate
makeMigrations:
	docker exec -it foc-internal-server python manage.py makemigrations

down:
	docker compose -f local.yaml down

logs-client:
	docker logs foc-internal-client
