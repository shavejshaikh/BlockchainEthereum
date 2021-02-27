
pragma solidity 0.5.16;

contract SimpleStorage{
    
    string ipfhash;
    
    function set(string memory num) public
    {
        ipfhash =num;
    }
    
    function get() public view returns (string memory)
    {
        return ipfhash;
    }
}