(function (expo) //initialises module.exports
{
    
    
      
    
    expo.init = function (logic) {
        
             
       
        logic.player = {};
        logic.player.getCounterValue =  function(player,counter)  {
            return player.counters[counter];
        };

        

    

    }//init
})(module.exports);