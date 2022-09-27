const Dogs = artifacts.require("Dogs");
const Proxy = artifacts.require("Proxy");
const DogsUpdated = artifacts.require("DogsUpdated");
const truffleAssert = require('truffle-assertions');


contract("Proxy", accounts => {
  let dogs;
  let dogsUpdated;
  let proxy;
  let proxyDog;

  let result;

  before(async function () {
    dogs = await Dogs.deployed();
    proxy = await Proxy.deployed();
    dogsUpdated = await DogsUpdated.deployed();

    // Storage will be auto-deployed as dependencies
    // storage = await StorageV2.new();
    // storage = await StorageV2.deployed();

    // Instruct Truffle to instantiate proxyDog on proxy.address as Dogs contract
    // Create proxyDog to fool Truffle
    proxyDog = await Dogs.at(proxy.address);
  });

  // It won't work because Truffle will look for the function that doesn't exist in proxy contract object. 
  // it("Should fail as Truffle will look for the function that doesn't exist in proxy contract object.", async () => {
  //   assert(await proxy.setNumberOfDogs(10));
  // })


  it("Should assign number of dogs through proxy", async () => {
    await truffleAssert.passes(await proxyDog.setNumberOfDogs(10));
  })

  it("Should get number of dogs through proxy", async () => {
    var result = await proxyDog.getNumberOfDogs();
    assert.equal(result, 10, "dog number not match");
  })

  it("Number of dogs in Dogs contract is independent from proxy ", async () => {
    await dogs.setNumberOfDogs(333);
    result = await dogs.getNumberOfDogs();
    assert.equal(result, 333, "Dog's number in Dogs is NOT altered");
    result = await proxyDog.getNumberOfDogs();
    assert.equal(result, 10, "Dog's number in Proxy is altered");
  })

  //upgarde proxy to use new version of Dogs
  it("Should able to upgrade to dogsUpdated", async () => {
    await truffleAssert.passes(
      proxy.upgrade(dogsUpdated.address)
    )
  })
  it("Should get number of dogs through proxy", async () => {
    // Fool Truffle to think proxyDog has all functions.
    var upgradedProxyDog = await DogsUpdated.at(proxy.address);
    await upgradedProxyDog.initialize(accounts[0]);

    var result = await upgradedProxyDog.getNumberOfDogs();
    assert.equal(result, 10, "dog number not match");

    var result = await upgradedProxyDog.setNumberOfDogs(100);
    var result = await upgradedProxyDog.getNumberOfDogs();
    assert.equal(result, 100, "dog number not match");
  })
})