pragma solidity >=0.4.0 <=0.6.0;

contract kidney
{
    struct Donation
    {
        string p_name;
        string blood_group;
        string city;
        address customer;
        state donationstate;
    }
    
    enum state { Created, Notfound, Found}
    
    uint id;
    
    mapping(uint=>Donation)donation;
    
    // modifier onlyOwner()
    // {
    //     require(msg.sender==_owner,"Invallid user");
    //     _;
    // }
    
    function storedata(string memory p_name,string memory blood_group, string memory city) public
    {
        id=id+1;
        donation[id]=Donation(p_name,blood_group,city,msg.sender,state.Created);    
    }
    
    function getdatauser(uint userid) public view returns(address)
    {
        Donation memory orderdetails=donation[userid];
        return orderdetails.customer;
        
    }
    
    function displaydata(uint userid) public view returns(string memory)
    {
        Donation memory orderdetails=donation[userid];
        return orderdetails.p_name;
    }
    
    function donationstate(uint userid) public view returns(state)
    {
        Donation memory orderdetails=donation[userid];
        return orderdetails.donationstate;//Define the state of Donation
    }
    
    // function matching()public view returns(state)
    // {
    //     for (uint i=0;i<id;i++)
    //     {
    //         if(donation[i].blood_group==donation[i+1].blood_group)
    //         {
                
    //         }
    //     }
    // }
    
    // function matching() public view returns(state)
    // {
    //     for(uint i=0;i<id;i++)
    //     {
    //         for(uint j=i+1;j<id;j++)
    //         {
    //             if(donation[i].blood_group == donation[j].blood_group)
    //             {
    //                 revert("Found");
    //             }
    //         }
    //     }
    // }
    function gettotalcount() public view returns(uint)
    {
        return id;
    }
}