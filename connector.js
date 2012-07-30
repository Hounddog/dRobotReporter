define(["doh/runner", "dojo/_base/xhr", "dojo/_base/connect","dojo/json", "dojo/io-query"], function(doh, xhr, connect, json, ioQuery) {
    var uri = window.location.search;
    
    var query = uri.substring(uri.indexOf("?") + 1, uri.length);
    var queryObject = ioQuery.queryToObject(query);
    
    var data = json.stringify({'doh': 'start', "browser": queryObject.browser});
    xhr.post({
	    url: "/receiver.php",
	    sync:true,
	    content:{
			'COMMAND': data
	    }
	});
	
    connect.connect(doh, "debug", function(){
		var data = json.stringify({'message':Array.prototype.join.call(arguments, " "), "browser": queryObject.browser })
		xhr.post({
		    url: "/receiver.php",
		    sync:true,
		    content:{
			'DATA': data
		    }, 
		    load:function(data) {
			window.close();
		    }
		})
    });
    
    connect.connect(doh, "_report", function(){
		var data = json.stringify({'doh':'result', 'failureCount': doh._failureCount, 'errorCount': doh._errorCount})
		xhr.post({
		    url: "/receiver.php",
		    sync:true,
		    content:{
				'COMMAND': data
		    }, 
		    load:function(data) {
		    }
		})
    });
});