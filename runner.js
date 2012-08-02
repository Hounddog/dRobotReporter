/**
 * Module dependencies.
 */
var program = require('commander');

/**
 * Cli options
 */
program
  .version('0.0.1')
  .option('-u, --url [type]', 'Add the url to connect to [required]')
  .option('-B, --base-path [type]', 'Specify Dojo BasePath')
  .option('-m, --module [type]', 'Specify Module for testing')
  .option('-M, --module-path [type]', 'Specify Module Paths')
  .option('-P, --plugins <n>', 'Specify plugins seperated by semikolon e.g. [plugin1;plugin2]')
  .option('-s, --server [type]', 'Specify server url for nodeJs runner. If not set will deault to url [-url]')
  .option('-p, --port <n>', 'Specify the port [8000]', parseInt, 8000)
  .option('-a, --no-auto', 'Auto Start browser')
  .option('-b, --browser [type]', 'Specify Browser for testing [firefox]. Required if autostart is enabled')
  .parse(process.argv)

if (process.argv.length == 2) {
  process.stdout.write(program.helpInformation());
  program.emit('--help');
  process.exit(0);
}

/**
 * Process CLI
 */
if(!program.url) {
  var message = [
    '',
    '  Please Specify Url',
    ''
  ].join('\n');
  process.stdout.write(message);
  process.stdout.write(program.helpInformation());
  program.emit('--help');
  process.exit(0);
}

if(!program.server) {
  program.server = program.url;
}

if(!program.module) {
  var message = [
    '',
    '  Please Specify module for testing',
    ''
  ].join('\n');
  process.stdout.write(message);
  process.stdout.write(program.helpInformation());
  program.emit('--help');
  process.exit(0);
}

if(program.auto) {
  if(!program.browser) {
    var message = [
      '',
      '  Auto is enabled. Please Specify Browser',
      ''
    ].join('\n');
    process.stdout.write(message);
    process.stdout.write(program.helpInformation());
    program.emit('--help');
    process.exit(0);
  }
}

/**
 * spawn listener
 */
var io = require('socket.io').listen(program.port);
io.set('log level', 1);

url = createUrl();

/**
 * Spawn browser
 */
if(program.auto) {
  var spawn = require('child_process').spawn;
  browser    = spawn(program.browser, [url]);
}

browser.stderr.setEncoding('utf8');
browser.stderr.on('data', function (data) {
  if (/^execvp\(\)/.test(data)) {
    console.log('Failed to start browser.');
  }
});

startOutput = [
  '',
  '  Server started',
  '',
  '  Listening on Port: \t' + program.port,
  '  Testing Module: \t' + program.module,
  '  Running Browser: \t' + program.browser,
  '  Dojo basePath: \t' + program.basePath,
  '  Test url: \t\t' + url,
  '  Server url: \t\t' + program.server,
  '',
  '  Waiting for Connection',
  ''
].join('\n');


process.stdout.write(startOutput);


io.sockets.on('connection', function (socket) {

  var message = [
    '',
    '  Connection established',
    '',
    ''
  ].join('\n');

  process.stdout.write(message);

  socket.on('debug', function (message) {
      console.log(message.message)
  });
  socket.on('result', function (message) {
      var success = true;
      if (message.errorCount >0 || message.failureCount  > 0) {
        success = false;
      }
      console.log("------------------------------------------------------------");
      console.log("TESTS FOR " + program.browser + " " +  (success? "PASSED": "FAILED"));
      console.log("------------------------------------------------------------");
      browser.kill('SIGHUP');
      if(success) {
        process.exit(0);
      } else {
        process.exit(1);
      }
      
  });
});

function createUrl () {
  var runner = program.basePath + '/util/doh/runner.html';

  var url=  program.url + runner + '?testModule=' + program.module;
  if(program.modulePath) {
    url +=  '&registerModulePath=dRobotReporter,' + program.basePath + '/dRobotReporter;' + program.modulePath;
  }

  var dohPlugins = '&dohPlugins=dRobotReporter/connector';
  if(program.plugins) {
    dohPlugins += ';' + program.plugins;
  }
  url += dohPlugins + '&port=' + program.port + '&server=' + program.server + '&browser=' + program.browser;
  
  return url;
}