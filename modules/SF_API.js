"use strict";
var bodyParser = require('body-parser');
var nForceAuth = require('nforce'),
Promise = require('promise'),
SFclientId ='3MVG9ZL0ppGP5UrAjkXOacFI9lpAVXQgGCeRrfV51tqe0ju_Nwfve9jIMkXwfcbXE7fdyILVI0PpmCIieJhGR',
SFSecret ='5761097291874345860',
SFusername ='subhojit_dev3@gmail.com',
SFpassword ='November@2013XD1K3tYl2sQ318v5FhDu6huso'
;

var AccessToken = '';
var connection = nForceAuth.createConnection({
	clientId: SFclientId,
	clientSecret: SFSecret,
	redirectUri: 'http://localhost:3000/oauth/_callback',
	mode: 'single',
	autoRefresh:true});

connection.authenticate({ username: SFusername, password: SFpassword }, function(err,resp){
	 if (err) {
         console.log("Authentication error - " + err);
     } else {
         console.log('Authentication successful. Cached Token: ' + connection.oauth.access_token);
         AccessToken = resp.access_token;
         console.log('Authentication Access: ' + AccessToken);
     }
});

 var IntialIntract = function(Id)
{
	return new Promise(function(resolve, reject){
	connection.query({query: "SELECT Name, Amount, ContactId__r.Name, ContactId__r.MobilePhone FROM Opportunity where ContactId__r.Id ='0031a000007h6H9AAI'" }, function(err, res) 
			{
	    if(err)
	    { console.error(err);
	    	reject("AnError Occured");}
	    	    else { 
	    	    	var contact = res;
	    	    	console.log("QUERY RESULT");
	    	    	console.log(contact);
	   resolve(res.records);
	   }
	   });
	});
};



exports.IntialIntract = IntialIntract;
exports.connection = connection;
exports.AccessToken = AccessToken;

