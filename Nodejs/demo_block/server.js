import Web3 from 'web3';

const rpcURL="http://127.0.0.1:7545";
const web3=new Web3(rpcURL);

// web3.eth.getAccounts((err,result)=>
// {
//     console.log(result);
// })

// web3.eth.getBlock('latest',(err,result)=>
// {
//     console.log(result);
// })

let contractABI='[{"inputs":[{"internalType":"uint256","name":"userid","type":"uint256"}],"name":"displaydata","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"userid","type":"uint256"}],"name":"donationstate","outputs":[{"internalType":"enum kidney.state","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"userid","type":"uint256"}],"name":"getdatauser","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gettotalcount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"p_name","type":"string"},{"internalType":"string","name":"blood_group","type":"string"},{"internalType":"string","name":"city","type":"string"}],"name":"storedata","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

let contractAddres='0xA966C8A2b3f119A493dd839543a7Be34682A0a6A';

let contractInstance=new web3.eth.Contract(JSON.parse(contractABI),contractAddres)

contractInstance.methods.gettotalcount().call((err,result)=>
{
    console.log(result)
});
    
    
