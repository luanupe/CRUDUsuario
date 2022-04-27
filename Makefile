.ONESHELL:
SHELL:=/bin/bash
PROJECT_NAME:=liven

start: ; @\
  clear; \
  docker-compose -f ./Docker/docker-compose.yml -p ${PROJECT_NAME} up -d; \
  echo "";

stop: ; @\
  clear; \
  docker-compose -f ./Docker/docker-compose.yml -p ${PROJECT_NAME} down | true; \
  echo "";

rebuild: ; @\
  clear; \
  docker-compose -f ./Docker/docker-compose.yml -p ${PROJECT_NAME} up --build --force-recreate -d; \
  echo "";
