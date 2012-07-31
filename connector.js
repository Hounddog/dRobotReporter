define([
	"doh/runner", 
	"dojo/_base/connect",
	"dojo/io-query"
	], function(doh,  connect,  ioQuery) {
    dRobotReporterUrl = dojo.moduleUrl('dRobotReporter');

    //Need to load socket.io and it does not like require....
    newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = dRobotReporterUrl + 'socket.io.js';

    document.getElementsByTagName('head')[0].appendChild(newScript);

    function loadSocketIo() {
        if(typeof io != 'undefined') {
            console.log('io is defined now');
            window.clearInterval(checkLoaded);
            connectServer();
        }
    }
    var checkLoaded = setInterval(function() {
        loadSocketIo();
    },1000);

    
    function connectServer() {
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
    }
});