// 입력 - 검증 - 처리 - 형식 - 출력

const Local = require("./Local.js"); 
const File = require("./File.js");
const Commit = require("./Commit.js");

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
const { getPriority } = require("os");
var r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
r.setPrompt('\\> ');
r.prompt();
r.on('line', function (line) {
    if (line == 'exit') {
        r.close();
    }
    action(line);
    r.prompt()
});
r.on('close', function () {
    process.exit();
});

const action = (line) => {
    const cmd = line.split(' ');
    switch (cmd[0]) {
        case "init":
            if (cmd[1] === undefined) {
                console.log("there is no repository");
                break;
            } else
                init(cmd[1]);
            break;
        case "status":
            if (cmd[1] === undefined) {
                console.log("there is no repository");
                break;
            } else
                status(cmd[1]);
            break;
        case "checkout":

                checkout(cmd[1]);
            break;
        case "new":
            break;
        case "update":
            break;
        case "add":
            break;
        case "commit":
            break;
        case "quit":
            exit();
            break;
        case "help":
            console.log("possibe commands are following : ");
            console.log("init / status / checkout / new / update / add / commit / quit");
            break;
        default:
            console.log("wrong command, type \"help\" to check commands");
            break;
    }
}
