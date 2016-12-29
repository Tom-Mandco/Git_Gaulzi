var log = console.log.bind(console);
var dateFormat = require('dateformat');
var ws = require("nodejs-websocket")
var nodegit = require("nodegit");
var simpleGit = require('simple-git')("./Example_Repo/git_reader/");
var arrayOfObjs = [];

var repoPath = "./Example_Repo/git_reader/";

var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received "+str)
        
		if(str.startsWith("start"))
		{
			console.log("cmd executed.")
		}
		if(str === "getAllMasterCommits")
		{
			ReturnAllCommitsOnMaster();
		}
		if(str === "success")
		{
			runTest();
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

function runTest(){
	simpleGit.branch(function(err, data) {
            if (!err) {
                //console.log('Remote url for repository at ' + __dirname + ':');
                console.log(JSON.stringify(data));
            }
        });
}















var getMostRecentCommit = function(repository) {
  return repository.getBranchCommit("master");
};

var getCommitMessage = function(commit) {
  return commit.message();
};

function ReturnAllCommitsOnMaster() {
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
			broadcast(server, commitObject);
		});

		// Don't forget to call `start()`!
		history.start();
	})
	.done();
}

function generateNewCommitObject_ToJSON(commitAuthor, commitEmail, commitDate, commitMessage, commitSha){
	var commitDetail = {
		Author: commitAuthor,
		Email: commitEmail,
		Date: dateFormat(commitDate,"(dd-mm-yyyy) HH:MM:ss"),
		Message: commitMessage.replace("\n\n", ""),
		Sha: commitSha
	};

	console.log("Commit added: " + commitDetail.Message);

	return JSON.stringify(commitDetail); 
}