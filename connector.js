define([
	"doh/runner", 
	"dojo/_base/connect",
	"dojo/io-query"
	], function(doh,  connect,  ioQuery) {
    
    var uri = window.location.search;
    console.log('uri', uri)
    var query = uri.substring(uri.indexOf("?") + 1, uri.length);
    var queryObject = ioQuery.queryToObject(query);

	var socket = io.connect(queryObject.server + ':' + queryObject.port + '/');

    connect.connect(doh, "debug", function() {
    	var data = {
    		"message": Array.prototype.join.call(arguments, " "),
    		"browser": queryObject.browser 
    	}
    	socket.emit('debug', data);
    	console.log('send node message');
    }); 

    connect.connect(doh, "_report", function(){
    	var data = {
    		"failureCount": doh._failureCount,
    		"errorCount": doh._errorCount,
    		"browser": queryObject.browser 
    	}
    	socket.emit('result', data);
    	console.log('send result');
    });
});