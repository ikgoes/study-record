const Network = require("./network.js");

const readline = require('readline');
r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const main = () => {
    const network = new Network();
    let count = 0;
    console.log("네트워크 클래스를 선택하세요. (A, B, C 클래스)");
    r.setPrompt('> ');
    r.prompt();
    r.on('line', function (line) {
        if (line == 'exit') {
            r.close();
        }
        count = command(network, line, count);
        print(count, network);
        r.prompt()
    });
    r.on('close', function () {
        process.exit();
    });

}

const print = (count, network) => {
    switch (count) {
        case 0:
            console.log("> 네트워크 클래스를 선택하세요. (A, B, C 클래스)");
            break;
        case 1:
            console.log(`> ${network._class} 클래스를 선택했습니다. 추천하는 IP 주소는 ${network.suggestIP()} 입니다.`);
            console.log("> 사용할 IP 주소를 입력하세요.")
            break;
        case 2:
            console.log(`> ${network._IP} 주소에서 사용할 서브넷 비트를 입력하세요.`);
            break;
        case 3:
            network.printResult();
            process.exit();
            break;
    }
}

// 입력에 대응되는 작업 수행
const command = (network, cmd, count) => {
    let success = true;
    switch (count) {
        case 0:
            if (cmd === 'A' || cmd === 'B' || cmd === 'C')
                network.setClass(cmd);
            else
                success = false;
            break;
        case 1:
            const IPtest = /\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/g
            if (IPtest.test(cmd) && possibleIP(cmd, network._class))
                network.setIP(cmd);
            else
                success = false;
            break;
        case 2:
            if (!checkSubnetBit(parseInt(cmd)))
                success = false;
            else
                network.setMask(parseInt(cmd));
            break;
    }
    if (!success) {
        console.log("잘못된 입력입니다. 다시 입력하여 주세요.");
        return count;
    } else {
        return count + 1;
    }
}

// IP주소와 클래스가 일치하는지 확인 / IP주소 형식 확인
const possibleIP = (ip, Class) => {
    const IP = ip.split('.');
    switch (Class) {
        case 'A':
            if (IP[0] < 0 || IP[0] > 127) return false;
            break;
        case 'B':
            if (IP[0] < 128 || IP[0] > 191) return false;
            break;
        case 'C':
            if (IP[0] < 192 || IP[0] > 223) return false;
            break;
    }
    return IP.every((octet) => parseInt(octet) >= 0 && parseInt(octet) <= 255)
}

// 사용할 서브넷 비트가 가능한지 확인
const checkSubnetBit = (bit) => {
    switch (bit) {
        case 'A':
            if (bit < 0 || bit > 22) return false;
            break;
        case 'B':
            if (bit < 0 || bit > 14) return false;
            break;
        case 'C':
            if (bit < 0 || bit > 6) return false;
            break;
    }
    return true;
}

main();