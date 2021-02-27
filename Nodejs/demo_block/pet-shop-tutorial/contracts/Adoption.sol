pragma solidity >=0.4.0 <=0.6.0;

contract Adoption {
address[16] public adopters;

// Adopting a pet
function adopt(uint petId) public returns (uint) {
  require(petId >= 0 && petId <= 15,"Only 15 pet are available");

  adopters[petId] = msg.sender;

  return petId;
}

// Retrieving the adopters
function getAdopters() public view returns (address[16] memory) {
  return adopters;
}
}