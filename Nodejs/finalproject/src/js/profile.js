

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
  
        return App.profile();
      });
    },
    profile: function()
    {
        var kidneyInstance;
        var account;
        console.log("Ho rha hai ke nahi")
        // Load account data
        web3.eth.getCoinbase(function(err, account) 
        {
            if (err === null) 
            {
            App.account = account;
            $("#accountss").html("Account Address: " + account);
            }
        });

        web3.eth.getAccounts(function(error, result)
        {
          if(error === null)
          {
            account=result[0];
            // $('#account').html("Your Account Address " +account);
          }
        });
    


        App.contracts.kidney.deployed().then(function(instance)
        {
          kidneyInstance = instance;
          return kidneyInstance.gettotalcount();
        }).then(function(gettotalcount)
        {
          $("#trans1").html("Block is :"+gettotalcount);
          for (var i = 1; i <= gettotalcount; i++)
          {
          
            kidneyInstance.donation(i).then(function(donations) 
            {
              console.log(account)
              if(account == donations[3])
              {
                $('#don').html("Current: "+donations);
              
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
                $("#names").html(" "+name);
                $("#blood").html(" "+blood);
                $("#city").html(""+city);
                $("#acc").html(" "+acc);
                $("#mobiles").html(" "+mobiles);
                $("#state").html(" "+state);
                $("#hlas").html(" "+hlas);

                  if(donor==0)
                  {
                    $("#donor").html("Donor");
                  }
                  else
                  {
                    $("#donor").html("Receiver");
                  }
              }
                
                
  
              
            });
          }
        });

    
    },
  };
  
  $(function() {//function open
    $(window).load(function() {
      App.init();
    });
  });//Function Closing