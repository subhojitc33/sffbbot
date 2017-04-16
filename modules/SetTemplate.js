"use strict";
var bodyParser = require('body-parser');
var formatAccount = function(accounts)
{
	var elements = [];
	//console.log(accounts.get("Title"));
	accounts.forEach(function(account){
		elements.push({
			title: account.get("Name"),
            subtitle: account.get("BillingStreet") + ", " + account.get("BillingCity") + " " + account.get("BillingState") + " · " + account.get("Phone"),
            "image_url": account.get("Picture_URL__c"),
            "buttons": [{
                "type":"postback",
                "title":"View Contacts",
                "payload": "view_contacts," + account.getId() + "," + account.get("Name")
            },{
                "type": "web_url",
                "url": "https://login.salesforce.com/" + account.getId(),
                "title": "Open in Salesforce"
            }]
		});
	});
	return{
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": elements
			}
		}
	};
	
	///OLD GOLD START HERE
	/*console.log("REACHED ST");
	var responsetext = "Hello";
	console.log(contacts[0]);
	var sName = contacts[0].get("ContactId__r").Name;
	//console.log("NAME");
	//console.log(sName);
	var sMobilePhone = contacts[0].get("ContactId__r").MobilePhone;
	var OpptyName = contacts[0].get("Name");
	var OpptyAmount = contacts[0].get("Amount");
	
	//responsetext = "Hello '"+ sName +"', Your Phone Number in our database is'"+ sMobilePhone +"' , Thanks for reaching us !,\r\n  Opprotunity Assinged You and details are: \r\n Oppotunity Name:'"+ OpptyName +"'\r\n Oppotunity Amount:'"+ OpptyAmount +"'";
	responsetext = "Hello Tom, \r\n  Price Concession waiting for you: \r\n 1. PC: 80131077 : Best Buy | PC Margin:68.50";
	console.log(responsetext);

	return responsetext;*/
};
var formatContact = function(contacts)
{
	var elements = [];
	//console.log(accounts.get("Title"));
	contacts.forEach(function(contact){
		 elements.push({
            title: contact.get("Name"),
            subtitle: contact.get("Title") + " at " + contact.get("Account").Name + " · " + contact.get("MobilePhone"),
            "image_url": contact.get("Picture_URL__c"),
            "buttons": [
                {
                    "type": "postback",
                    "title": "View Notes",
                    "payload": "view_notes," + contact.getId() + "," + contact.get("Name")
                },
                {
                    "type": "web_url",
                    "url": "https://login.salesforce.com/" + contact.getId(),
                    "title": "Open in Salesforce"
                }]
        })
    });
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
         }
	};
	
	
};
exports.formatAccount = formatAccount; 
exports.formatContact = formatContact; 
