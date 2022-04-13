const { query } = require('express');
const fs = require('fs');
const path = require('path');

function filterByQuery(query, zookeepers) {
  let filteredResults = zookeepers;
  if (query.age) {
    filteredResults = filteredResults.filter(
      // form data will be in strings, and JSON stores age as number,
      // need to convert string to number to compare
      (zookeeper) => zookeeper.age === Number(query.age)
    );
  }
  if (query.favoriteAnimal){
    filteredResults = filteredResults.filter(
      (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
    );
  }
  return filteredResults;
}

function findById(id, zookeeper) {
  const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
  return result;
}

function createNewZookeeper(body, zookeepers) {
  const zookeeper = body;
  zookeepers.push(zookeeper);
  fs.writeFileSync(
    path.join(__dirname,"../data/zookeepers.json"),
    JSON.stringify({ zookeepers }, null, 2)
  );
  return zookeeper;
}

function validateZookeeper(zookeeper) {
  if (!zookeeper.name || typeof zookeeper.name !== "string"){
    return false;
  }
  if (!zookeeper.age || typeof zookeeper.age !== "number") {
    return false;
  }
  if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== "string") {
    return false;
  }
  return true;
}

module.exports ={
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
};