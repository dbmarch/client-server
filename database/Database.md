# Starting and stopping the database

Setting up the database
```bash
docker-compose up -d
```

To run the database with a interactive shell:
```
docker exec -it mongodb mongosh --username admin --password password
```

To check if it is running
```
docker ps

docker logs mongodb
```

fixing permissions
```
docker exec -it mongodb ls -la /data/db
```
