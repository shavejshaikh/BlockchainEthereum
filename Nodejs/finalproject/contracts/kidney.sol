pragma solidity >=0.4.0 <=0.6.0;

contract kidney
{
    struct Donation
    {
        string p_name;
        string blood_group;
        string city;
        address customer;
        uint256 mobile;
        bool door;
        string hla;
        state donationstate;
    }
    enum state{Created, Notfound, Found}
    uint id;
    uint v;
    mapping(uint=>Donation) public donation;
    
    function storedata(string memory p_name,string memory blood_group, string memory city,uint256 mobile,bool door, string memory hla) public
    {
        id=id+1;
        donation[id]=Donation(p_name,blood_group,city,msg.sender,mobile,door,hla,state.Created);    
    }
    
    function getdatauser(uint userid) public view returns(address,string memory,state,string memory)
    {
        Donation memory x=donation[userid];
        return (x.customer,x.p_name,x.donationstate,x.city);
    }
    
    // function displaydata(uint userid) public view returns(string memory)
    // {
    //     Donation memory orderdetails=donation[userid];
    //     return orderdetails.p_name;
    // }

    // function donationstate(uint userid) public view returns(state)
    // {
    //     Donation memory orderdetails=donation[userid];
    //     return orderdetails.donationstate;//Define the state of Donation
    // }

    function gettotalcount() public view returns(uint)
    {
        return id;
    }

}