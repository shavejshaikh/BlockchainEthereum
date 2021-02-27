

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() 
  {
    return App.initWeb3();
  },

  initWeb3: function() 
  {
    if (typeof web3 !== 'undefined') 
    {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } 
    else 
    {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() 
  {
    $.getJSON("kidney.json", function(election) 
    {
      // Instantiate a new truffle contract from the artifact
      App.contracts.kidney = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.kidney.setProvider(App.web3Provider);

      return App.render();
    });
  },
  

render: function()
{
    var kidneyInstance;
    var account;

    // Load account data
    web3.eth.getCoinbase(function(err, account) 
    {
      if (err === null) 
      {
        App.account = account;
        $("#accountAddress").html("Account Address: " + account);
      }
    });

    web3.eth.getAccounts(function(error, result)
    {
      if(error === null)
      {
        account=result[0];
        $('#account').html("Your Account Address " +account);
      }
    });

    web3.eth.getBlockNumber(function(err,value)
    {
      if(err === null)
      {
        App.value = value;
        $('#displayblock').html("Total Block:"+value);
      }
    });
      var j,tran;
      web3.eth.getTransactionCount(web3.eth.accounts[0], 'latest', (err, current)=>{
        for (var i=1; i <= current; i++) 
        {
          web3.eth.getBlock(i, (err, res) =>
          {
            tran=res.transactions
            $("#history").html("Block Number :" +tran+" Block hash  :"+res.hash+ " Block Timestamp  :"+res.timestamp+" Parent Hash  :"+res.parentHash+" Gas :"+res.gasUsed +" Miner "+res.sha3Uncles);
              web3.eth.getTransaction(tran,(err,re)=>
              {
                if(err===null && (re.from == account))
                {
                  $("#trans").html("Account is :"+re.from);
                }
              });

          })
        }
      });

      //Form Block data
      // App.contracts.kidney.deployed().then(function(instance)
      // {
      //   kidneyInstance = instance;
      //   return kidneyInstance.gettotalcount();

      // }).then(function(gettotalcount)
      // {
      //   for(var i= 1;i<=gettotalcount;i++)
        
      // })


      App.contracts.kidney.deployed().then(function(instance)
      {
        kidneyInstance = instance;
        return kidneyInstance.gettotalcount();
      }).then(function(gettotalcount)
      {
        $("#trans1").html("Block is :"+gettotalcount);
        for (var i = 1; i <= gettotalcount; i++) {
          kidneyInstance.donation(i).then(function(donations) {
            // $('#don').html("Current: "+donations);
          
            var name = donations[0];
              var blood= donations[1]
              var city=  donations[2];
              var acc = donations[3];
              var mobiles= donations[4];
              var state = donations[5];
              var hlas = donations[6];
              var donor= donations[7];
              console.log(name)
              console.log(city)
              // $("#names").html(" "+name);
              //   $("#blood").html(" "+blood);
              //   $("#city").html(""+city);
              //   $("#acc").html(" "+acc);
              //   $("#mobiles").html(" "+mobiles);
              //   $("#state").html(" "+state);
              //   $("#hlas").html(" "+hlas);
              //   $("#donor").html(" "+donor); 
              
              var candidatetemp="<tr><th>"+ name +"</th><td>"+ blood +"</td><td>"+ city +"</td><td>"+ acc +"</td><td>"
              + mobiles +"</td><td>"+ state +"</td><td>"+ hlas +"</td><td>"+ donor +"</td></tr>"
              candidate.append(candidatetemp)


            
          });
        }
      })


      // $(document).on('click', '.btn-listlist', App.listfun);

},

// listfun: function(){
//   window.location.href = "/profile.html";
// },


  storedata: function() 
  {//store opening
    var p_name =$('#name').val();
    var blood_group=$('#blood_group').val();
    var city=$('#city').val();
    var mobile=$('#mobile').val();
    var door=$('#door').val();
    var hla=$('#hla').val();
    console.log(name);
    console.log(blood_group);
    console.log(city);
    console.log(mobile);
    console.log(door);
    console.log(hla);
  
    App.contracts.kidney.deployed().then(function(instance) 
    {
      return instance.storedata(p_name,blood_group,city,mobile,door,hla,{ from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      // $("#content").hide();
      // $("#loader").show();
      console.log("Data is Stored ")
    }).catch(function(err) {
      console.error(err);
    });
  }//store closing

};

$(function() {//function open
  $(window).load(function() {
    App.init();
  });
});//Function Closing


  //  web3.eth.getBlock('latest', function (e, res) 
  // {
  //   if(e === null)
  //   {
  //    $('#latests').html("Current Block Value: "+res.number+""+res.timestamp);
  //   }
  //   });

    // web3.eth.isSyncing(function(error,res)
    // {
    //   if(error=== null)
    //   {
    //     $('#latests').html("Current Block Value: "+res.startingBlock);
    //   }
    // })

    // web3.eth.getTransaction(tran,(err,re)=>
// {
//   if(err===null)
//   {
//     $("#history1").html("Account :"+re);
//   }
//   else
//   {
//     $("#history1").html("Account :Not found data");
//   }
// });

   // web3.eth.getTransactionCount(function(err,account)
    // {
    //   if(err === null)
    //   {
    //     App.account = account;
    //     $("#history").html("Your Account history: " +account);
    //   }
    // });

    



  //  App.contracts.kidney.deployed().then(function(instance)
  //  {
  //   kidneyInstance = instance;
  //   return kidneyInstance.donationstate(1);
  // }).then(function(donationstate) 
  // {
  //   if(donationstate==0)
  //   {
  //     $('#state').html("Donation State: Created");
  //   }
  //   if(donationstate==1)
  //   {
  //     $('#state').html("Donation State: Found");
  //   }
  //   if(donationstate==2)
  //   {
  //     $('#state').html("Donation State: Not Found");
  //   }

  // });