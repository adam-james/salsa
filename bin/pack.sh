#!/usr/bin/env bash

echo Packing containers and sending to container repo...
echo

rg=salsa_rg
echo Using resource group \"$rg\"
registry=salsacr
echo Using registry \"$registry\"
echo

echo Logging into container registry...
az acr login --name $registry
echo

echo Building images...
docker build -t salsa-release .
echo

echo Fetching login server info...
loginServer=$(az acr list --resource-group $rg --query "[].{acrLoginServer:loginServer}" --output tsv)
echo

echo Tagging images...
docker tag salsa-release $loginServer/salsa-release:latest
echo

echo Pushing images...
docker push $loginServer/salsa-release:latest
echo

echo DONE
