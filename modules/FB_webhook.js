"use strict";
var request = require('request');
var SF = require('./SF_API');
var ST = require('./SetTemplate');

exports.sf = SF;
function botResponse(message, recipient)
{
	console.log(message);
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:process.env.FB_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipient},
            message: message
        	}
		},function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
              } else if (response.body.error) {
                console.log('Error: ', response.body.error);
              }
	});
}



function sInterpret(text, sender){
	//var salutation = text.match(/Hello/i); 
	if(text.match(/search account (.*)/i) ){
		text=text.match(/search account (.*)/i)[1];
	SF.IntialIntract(text,'Account').then(function(results)
		{
		console.log("BEFORE ST CALL");	
		var cMessage = ST.formatAccount(results); 
		botResponse(cMessage,sender);
		});
	}
	else{
		var resText='I do not understand what are you asking for ';
	 botResponse({text:resText}, sender);	
	}
}

exports.webhookGet = function(req,res)
{
	if (
		    req.param
		    ('hub.mode') == 'subscribe' &&
		    req.param('hub.verify_token') == 'token'
		  ) {
		    res.send(req.param('hub.challenge'));
		  } else {
		    res.sendStatus(400);
		    
		  }
};

exports.webhookPost = function(req,res)
{
	var messaging_events = req.body.entry[0].messaging;
	for(var i = 0; i < messaging_events.length; i++){
		var event = messaging_events[i];
		var sender = event.sender.id;
		
	       if(event.message && event.message.text){
			console.log("FACEBOOK ID IS:" +sender);
		    if(event.message.text=='Help'){
		      var restext='You can ask me things like: \n';
	          restext+='Search account Acme\n';
		    restext+='Search Acme in accounts\n';
		    restext+='Search contact Smith\n';
		    restext+='What are my top 3 opportunities?\n';		
			botResponse({text:restext}, sender);
		    }else{	
			//botResponse({text:'Hello I am AWESOME BOT to help you'}, sender);
			sInterpret(event.message.text, sender);
		}
	}	
	  else if (event.postback) {
            var payload = event.postback.payload.split(",");
            if (payload[0] === "view_contacts") {
                botResponse({text: "OK, looking for your contacts at " + payload[2] + "..."}, sender);
                SF.findContactsByAccount(payload[1]).then(function(results){
			
			var cMessage = ST.formatContact(results); 
		        botResponse(cMessage,sender);
		});	
            }
	   }
	}		
	res.sendStatus(200);
};

