pragma solidity >0.4.0 <0.7.0;


contract PropertyTransfer{
    
    struct Propertys{
        string ownerName;
        string address1;
        string address2;
        string city;
        string state;
        bool isSold;
    }
    
    mapping(address =>mapping(uint=>Propertys))public property;
    mapping(address => uint) individualOwnProperty;
    
    address public Admin;
    
    constructor() public{
        Admin = msg.sender;
    }
    
    modifier onlyOwner(){
        require(msg.sender == Admin);
        _;
    }
    
    event PropertyStored(address indexed _owner_add,string ownerName,string msg);
    
    event PropertyTransfer(address indexed _from, address indexed _to,string newOwnername,string msg);
    
    function allotProperty(address _ownerAdd,string memory ownerName,string memory address1,string memory address2,
    string memory city,string memory state) public onlyOwner
    {
        property[_ownerAdd][individualOwnProperty[_ownerAdd]++] = Propertys(ownerName,address1,address2,city,state,false);  
        emit PropertyStored(_ownerAdd,ownerName,"Data Stored Successfully!!!!");
    }
    
    function isOwner(address _Owner,string memory ownerName) public view returns(uint)
    {
        uint i;
        bool flag;
        for(i=0;i<individualOwnProperty[_Owner];i++)
        {
            if(property[_Owner][i].isSold == true)
            {
                break;
            }
            flag = checkString(property[_Owner][i].ownerName,ownerName);
            if(flag ==true)
            {
                break;
            }
        }
        if(flag == true)
        {
            return i;
        }
        else{
            return 999;
        }
    }
    
    function checkString(string memory s1,string memory s2) public pure returns(bool)
    {
        return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2))? true:false;
    }
    
    function TransferProperty(address _to,string memory ownerName,string memory address1,string memory address2,
    string memory city,string memory state) public returns (bool,uint)
    {
        uint256 checkOwner = isOwner(msg.sender,ownerName);
        bool flag;
        
        if(checkOwner !=999 && property[msg.sender][checkOwner].isSold == false)
        {
            property[msg.sender][checkOwner].isSold =true;
            property[msg.sender][checkOwner].ownerName ="Sold";
            property[_to][individualOwnProperty[_to]++]=Propertys(ownerName,address1,address2,city,state,false);
            flag = true;
            emit PropertyTransfer(msg.sender,_to,ownerName,"Transfered Successfully");
        }
        
        else
        {
            flag=false;
            emit PropertyTransfer(msg.sender,_to,ownerName,"Transfered Failed");
        }
        
        return(flag,checkOwner);
    }
    
}