CREAR BD POSTGRES
docker run -d --name cesta-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres

CREAR BD MYSQL
docker run -d --name cesta-mysql -e MYSQL_ROOT_PASSWORD=mysql -p 3306:3306 mysql

CREAR BD SQLSERVER
docker run -d --name cesta-sqlserver -e ACCEPT_EULA=Y -e SA_PASSWORD=Sqls3rv3r -p 1433:1433 mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04

CREAR BD ORACLE
docker run -d --name cesta-oracle -e ORACLE_PWD=oracle -p 1521:1521 container-registry.oracle.com/database/express:21.3.0-xe

CREAR CUENTA
docker run --rm -it -v ${PWD}/password.txt:/password -v ${PWD}/data:/data ethereum/client-go:latest account new --datadir /data --password /password

INICIALIZAR BASE DE DATOS DE LA BLOCKCHAIN CON EL FICHERO GENESIS
docker run --rm -it -v ${PWD}/genesis.json:/genesis.json -v ${PWD}/data:/data ethereum/client-go:latest init --datadir /data /genesis.json

CREAR CONTENEDOR DE LA BLOCKCHAIN
docker run -it --name eth-node-cesta -v ${PWD}/password.txt:/password -p 8545:8545 -v ${PWD}/data:/data ethereum/client-go:latest \
--datadir /data --allow-insecure-unlock \
--miner.etherbase 71a4dceaaa03f6ccf45ab0a0636b3cbc22c15cb5 \
--mine \
--unlock "71a4dceaaa03f6ccf45ab0a0636b3cbc22c15cb5" \
--password /password \
--http \
--http.addr "0.0.0.0" \
--http.port 8545 \
--http.corsdomain "*" \
--http.api "admin,eth,debug,miner,net,txpool,personal,web3"