# repoweb


Docker:
```
docker run -d \
  --name repoweb2-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=1234 \
  -e POSTGRES_DB=web2_db \
  -p 5433:5432 \
  -v repoweb2-db-data:/var/lib/postgresql/data \
  postgres:13

```

Endpoint:
```
http://localhost:3000/api/docs/
```
