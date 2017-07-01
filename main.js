var Discordie = require("discordie");
var scrape = require("./scrape");
var source = require("./main");
var client = new Discordie();
var startgame = require("./startgame");
module.exports.players = [];
module.exports.playernames = [];
module.exports.playercount = 0;
client.connect({
  // replace this sample token
  token: "MzMwMTIzNjYyMTc2OTQ0MTM5.DDctMg.r53M7IvPEZVq5mnZlWzdM0QUXck"
});

client.Dispatcher.on("GATEWAY_READY", e => {
  console.log("Connected as: " + client.User.username);
});
var answer = "NA";
var score = 0;
var gameInProgress = false;
client.Dispatcher.on("MESSAGE_CREATE", e => {
  if (e.message.content == "ask"){
    var question = scrape.askQuestion(false, (question)=>{
      console.log(JSON.parse(question));
      var parsed = JSON.parse(question);
      e.message.channel.sendMessage(parsed[0].question + ".");
      e.message.channel.sendMessage("This question is worth " + parsed[0].value +
      " points. The category is: " + parsed[0].category.title.toUpperCase());
      answer = parsed[0].answer.toLowerCase();
      answer = answer.replace('"', "");
      answer = answer.replace('"', "");
      answer = answer.split(" ");
      score = parsed[0].value;
      console.log("SCORE: " + score);
      });
  }
  else if(e.message.content.includes("buzz")) {
          var sentanswer = e.message.content.replace("buzz","");
          sentanswer - sentanswer.toLowerCase();
          sentanswer = sentanswer.split("(");
          sentanswer = sentanswer[0];
          var count = 0;
          for(i=0; i<answer.length; i++){
            console.log(answer[i]);
            if (sentanswer.includes(answer[i])){
              count += 1;
            }
          }
          console.log(count/answer.length);
          if (count/answer.length >= .50){
            e.message.channel.sendMessage("CORRECT!");
            if (gameInProgress = true){
              var user = e.message.member.name;
              console.log(user);
              var playerIndex = getPlayerIndex(source.playernames, user);
              console.log(score);
              if (Number.isInteger(playerIndex)){
                console.log(source.players[playerIndex].score);
                source.players[playerIndex].score = score;
                console.log(source.players[playerIndex].score);
                
                e.message.channel.sendMessage(user + "'s score is: " + source.players[playerIndex].score);
              }
            }
            e.message.channel.sendMessage("ask");
          }
          else {
            e.message.channel.sendMessage("I'm sorry, that is incorrect.");
          }
        }
  else if (e.message.content == "im an idiot"){
    e.message.channel.sendMessage("you're an idiot", true);
  }
  else if (e.message.content.includes("say")){
    var the_message = e.message.content.replace("say", "");
    e.message.channel.sendMessage(the_message, true);
  }
  else if (e.message.content.includes("!startgame") && gameInProgress == false){
    //console.log(e.message.member.name);
    gameInProgress = true;
    e.message.channel.sendMessage("Welcome to Jeopardy! Type !joingame to join!");
    startgame.makeGame(client);
  }
  else if (e.message.content.includes("!endgame") && gameInProgress == true){
    e.message.channel.sendMessage("Thanks for playing Jeopardy!");
    gameInProgress = false;
  }
});

//TOKEN = MzMwMTIzNjYyMTc2OTQ0MTM5.DDctMg.r53M7IvPEZVq5mnZlWzdM0QUXck


function contains(arr, player){
     for (i=0; i<arr.length; i++){
         if(arr[i] == player){
             return true;
        }
    }
}
function getPlayerIndex(arr, player){
    for (i=0; i<arr.length; i++){
         if(arr[i] == player){
            return i;
         }
     }
}