var log = console.log.bind(console);
var chokidar = require('chokidar');
var dateFormat = require('dateformat');
var ws = require("nodejs-websocket")
var watchPath = ('.\\TestWatch\\');


var watchObject = {};
watchObject.path = watchPath;
watchObject.name = "Test1";


var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received "+str)
        
		if(str.startsWith("start"))
		{
			//conn.sendText("cmd executed: " + str)
			console.log("cmd executed.")
			
		}
		else
		{
			console.log("Unrecognised sequence.")
		}
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(8081)

var watcher = chokidar.watch(watchPath, {
  persistent: true,

  ignored: '*.txt',
  ignoreInitial: false,
  followSymlinks: true,
  cwd: '.',

  usePolling: true,
  interval: 100,
  binaryInterval: 300,
  alwaysStat: false,
  depth: 99,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  },

  ignorePermissionErrors: false,
  atomic: true // or a custom 'atomicity delay', in milliseconds (default 100)
});







watcher
  .on('add', (filename, details) => handleCase(filename, timeNow(), 'add'))
  .on('change', (filename, details) => handleCase(filename, timeNow(), 'mod'))
  .on('unlink',  (filename) => handleCase(filename, timeNow(), 'del'));

watcher
  .on('addDir', path => broadcast(server, `Directory ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`));

//  .on('raw', (event, path, details) => {
//    log('Raw event info:', event, path, details
  
// 'add', 'addDir' and 'change' events also receive stat() results as second
// argument when available: http://nodejs.org/api/fs.html#fs_class_fs_stats
watcher.on('change', (path, stats) => {
  if (stats) console.log(`File ${path} changed size to ${stats.mtime}`);
});

//  .on('add', (filename, details) => broadcast(server, `{ \"FileName\":\"${filename}\", \"TimeStamp\":\"${details.mtime}\" }`))

function happyPath(path)     
{     
    return path.replace(/\\/g, "\\\\");
} 

function timeNow() {
	var now = new Date();
	return dateFormat(now,"HH:MM:ss.l   (dd-mm-yyyy)");
}

function handleCase(fileName, timeStamp, eventType)
{
	var message = [];
	message.push('{ ');
	
	message.push(`\"FileName\":`);
	message.push(`\"` + happyPath(fileName) + `\"`);
	message.push(`,`);
	
	message.push(`\"TimeStamp\":`);
	message.push(`\"` + timeStamp + `\"`);
	message.push(`,`);
	
	message.push(`\"EventType\":`);
	message.push(`\"` + eventType + `\"`);
	message.push(`,`);
	
	message.push(`\"WatchName\":`);
	message.push(`\"` + "Test1" + `\"`);
		
	message.push(' }');
	
	console.log(message.join(""));
		
	broadcast(server, message.join(""));
}


function broadcast(server, msg) {
    server.connections.forEach(function (conn) {
        conn.sendText(msg)
    })
}

var watchedPaths = watcher.getWatched();

