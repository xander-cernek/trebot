var http = require('http');

var askQuestion = function(textToSpeech, callback) {
  var ret = [];
  var options = {
    host: 'jservice.io',
    path: '/api/random'
  }
  http.get(options, function(resp){
    resp.on('data', function(chunk){
      //console.log(chunk)
      ret.push(chunk);
    });
    resp.on('end', ()=>{
      const response = Buffer.concat(ret)
      callback(response);
    });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  })
}
exports.askQuestion = askQuestion;
