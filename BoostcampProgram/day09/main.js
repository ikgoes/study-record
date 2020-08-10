// DVCS 분산 저장소인 Git을 구현한다.

const {
    Git
} = require("./vmgit.js");

git = new Git();

// 입력
var readline = require('readline');
const {
    exit
} = require('process');
const {
    stringify
} = require("querystring");
const {
    inherits
} = require("util");
const {
    getPriority
} = require("os");
var r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
r.setPrompt('/>');
r.prompt();
r.on('line', function (line) {
    if (line == 'exit') {
        r.close();
    }
    action(line);
    r.setPrompt(((git.local.curDir === "") ? "" : ("/" + git.local.curDir)) + '/>');
    console.log();
    r.prompt();
});
r.on('close', function () {
    process.exit();
});

const action = (line) => {
    const cmd = line.split(' ');
    switch (cmd[0]) {
        case "init":
            git.init(cmd[1]);
            break;
        case "status":
            git.status(cmd[1]);
            break;
        case "checkout":
            git.checkout(cmd[1]);
            break;
        case "new":
            if (git.local.curDir === "")
                console.log("no working repository");
            else
                git.newFile(String(line.match(/ [\w ]*/g)).trim());
            break;
        case "update":
            if (git.local.curDir === "")
                console.log("no working repository");
            else
                git.update(cmd[1]);
            break;
        case "add":
            if (git.local.curDir === "")
                console.log("no working repository");
            else
                git.add(cmd[1]);
            break;
        case "commit":
            const message = String(line.match(/ [\w ]*/g)).trim();
            if (git.local.curDir === "")
                console.log("no working repository");
            else
                git.commits(message);
            break;
        case "log":
            git.log();
            break;
        case "push":
            if(git.commit.message.size === 0)
                console.log("Everything is up to date");
            else
            {
                git.push();
                git.clear();
            }
            break;
        case "quit":
            exit();
            break;
        case "help":
            console.log("possibe commands are following : ");
            console.log("init / status / checkout / new / update / add / commit / log / push / quit");
            break;
        default:
            console.log("wrong command, type \"help\" to check commands");
            break;
    }
}