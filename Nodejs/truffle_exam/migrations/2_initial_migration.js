const kidney = artifacts.require("./kidney.sol");//Contract name is kidney

module.exports = function(deployer) {
  deployer.deploy(kidney);
};
