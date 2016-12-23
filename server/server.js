var log = console.log.bind(console);
var dateFormat = require('dateformat');
var ws = require("nodejs-websocket")
var nodegit = require("nodegit");

var repoPath = "./Example_Repo/nodegit";

var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received "+str)
        
		if(str.startsWith("start"))
		{
			console.log("cmd executed.")
		}
		if(str === "success")
		{
			console.log("received.")
			runCase();
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

function broadcast(server, msg) {
    server.connections.forEach(function (conn) {
        conn.sendText(msg)
    })
}

var getMostRecentCommit = function(repository) {
  return repository.getBranchCommit("master");
};

var getCommitMessage = function(commit) {
  return commit.message();
};

function runCase() {
	nodegit.Repository.open(repoPath)
	.then(function(repo) {
		return repo.getMasterCommit();
	})
	.then(function(firstCommitOnMaster){
		// History returns an event.
		var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);

		// History emits "commit" event for each commit in the branch's history
		history.on("commit", function(commit) {
			var commitObject = generateNewCommitObject_ToJSON(commit.author().name(), commit.author().email(), commit.date(), commit.message(), commit.sha());
			
			broadcast.log(commitObject);
		// console.log("commit " + commit.sha());
		// console.log("Author:", commit.author().name() +
		// 	" <" + commit.author().email() + ">");
		// console.log("Date:", commit.date());
		// console.log("\n    " + commit.message());
		});

		// Don't forget to call `start()`!
		history.start();
	})
	.done();
}

function generateNewCommitObject_ToJSON(commitAuthor, commitEmail, commitDate, commitMessage, commitSha){
	var commitDetail = {
		author: commitAuthor,
		email: commitEmail,
		date: dateFormat(commitDate,"(dd-mm-yyyy) HH:MM:ss"),
		message: commitMessage.replace("\n\n", ""),
		sha: commitSha
	};

	console.log("Commit added: " + commitDetail.message);

	return JSON.stringify(commitDetail); 
}