const Dogs = artifacts.require("Dogs");
const Proxy = artifacts.require("Proxy");
const DogsUpdated = artifacts.require("DogsUpdated");
const StorageV2 = artifacts.require("StorageV2");
const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer, network, accounts) {
  //Deploy contract V1 (That facilitate test run)
  await deployer.deploy(Dogs);
  let dogs = await Dogs.deployed();
  await deployer.deploy(Proxy, dogs.address);
  await deployer.deploy(DogsUpdated);

  // //These two are redundant in migrate script
  // deployer.deploy(StorageV2);
  // deployer.deploy(Migrations);

  // //Deploy contracts V2 (default example)
  // const dogs = await Dogs.new();
  // const proxy = await Proxy.new(dogs.address);

  // // It won't work because Truffle will look for the function that doesn't exist in proxy contract object. 
  // // await proxy.setNumberOfDogs(10);

  // // Instruct Truffle to instantiate proxyDog on proxy.address as Dogs contract
  // // Create proxyDog to fool Truffle
  // var proxyDog = await Dogs.at(proxy.address);


  // await proxyDog.setNumberOfDogs(10); // It works
  // var result = await proxyDog.getNumberOfDogs();
  // console.log("Before update: " + result);

  // await dogs.setNumberOfDogs(55);
  // result = await dogs.getNumberOfDogs();
  // console.log("Call Dogs contract directly: " + result);




  // // Deploy new version of Dogs
  // const dogsUpdated = await DogsUpdated.new();
  // await proxy.upgrade(dogsUpdated.address);

  // // Fool Truffle to think proxyDog has all functions.
  // proxyDog = await DogsUpdated.at(proxy.address);
  // await proxyDog.initialize(accounts[0]);

  // // Check storage remained
  // result = await proxyDog.getNumberOfDogs();
  // console.log("After upgrade: " + result);

  // //Set the dogs through proxy with new Func contract
  // await proxyDog.setNumberOfDogs(30);
  // result = await proxyDog.getNumberOfDogs();
  // console.log("After set to 30: " + result);

  // result = await dogs.getNumberOfDogs();
  // console.log("Call Dogs contract directly: " + result);
};