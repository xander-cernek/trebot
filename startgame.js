var Discordie = require("discordie");
var source = require("./main");

class jeopardyPlayer {
    constructor(name, score){
        this._name = name;
        this._score = score;
    }    

    // get name() {
    //     return this.name;
    // }

    get score() {
        return this._score;
    }

    // set name(newname) { 
    //     this.name = newname;
    // }

    set score(newscore) {
        this._score += newscore;
    }
}

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
            return false;
        }
        
var makeGame = function(client) {

    
    client.Dispatcher.on("MESSAGE_CREATE", e => {
        
        if (e.message.content.includes("!join") && e.message.member.name != "TreBot") {
            var user = e.message.member.name;

            if (!contains(source.playernames, user)){
                source.players[source.playercount] = new jeopardyPlayer(user, 0);
                source.playernames[source.playercount] = user;
                source.playercount ++;
            }
            console.log(source.players, source.playercount);
        }
        else if (e.message.content.includes("!leave")){
            var user = e.message.member.name;

            if (contains(source.playernames, user)){
                var index = getPlayerIndex(source.playernames, user);
                source.players[index] = null;
                source.playernames[index] = null;
                for(i=index; i<source.players.length-1; i++){
                    source.players[i] = source.players[i+1]
                    source.playernames[i] = source.playernames[i+1];
                }
                source.playercount --;
            }

            console.log(source.players, source.playercount);
        }
    })
}
exports.makeGame = makeGame;
