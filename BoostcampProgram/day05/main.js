// main.js 수행하면 된다.
// map 출력 수정이 필요해보인다..

const { Line, Triangle, Rectengle } = require("./poly.js");             // 도형 클래스
const { Coordinate } = require("./coordinate.js");                      // 좌표 클래스

// 입력
var readline = require('readline');
const { exit } = require('process');
const { stringify } = require("querystring");
var r = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
r.setPrompt('> ');
r.prompt();
console.log("좌표를 입력하세요.");

r.on('line',function(line){
    if(line == 'exit'){
        r.close();
    }
    console.log("좌표를 입력하세요.");
    action(line);
    r.prompt()
});
r.on('close', function(){
    process.exit();
});

// 검증
const action = (cmd) => {
    let coorArr = cmd.split('-');   
    let coorLen = coorArr.length;   
    let Error = 0;                  // 입력 오류가 존재하는지 확인
    let coorSet = [];               // 좌표 클래스로 배열에 저장

    for(let cur in coorArr){
        if(coorArr[cur].indexOf('(') == -1 || coorArr[cur].indexOf(',') == -1 || coorArr[cur].indexOf(')') == -1){
            Error = 1;
            console.log("올바르지 않은 입력 형식입니다.");
            break;
        }

        let X = Number(coorArr[cur].split(',')[0].split('(')[1]);
        let Y = Number(coorArr[cur].split(',')[1].split(')')[0]);
        if(inRange(X) && inRange(Y)){
            tmpCoor = new Coordinate(X, Y);
            coorSet.push(tmpCoor);
        }
        else{
            Error = 1;
            console.log("입력 범위를 초과하였습니다. (X, Y 좌표 모두 최대 24입니다.)");
            break;
        }
    }      
    if(!Error){
        drawMap(coorSet);
        handle(coorLen, coorSet);
    }
}

// 처리
const handle = (coorLen, coorSet)=>{
    coorSet.sort(function (a,b){
        return a.x > b.x ? -1 : a.x < b.x ? 0: 1 ;    
    });
    switch(coorLen){
        case 2:
            let segment = new Line(coorSet[0], coorSet[1]);
            console.log("두 점 사이 거리는 " + segment.getDistance(segment.A, segment.B));
            break;
        case 3:
            let triangle = new Triangle(coorSet[0], coorSet[1], coorSet[2]);
            console.log("삼각형의 넓이는 " + triangle.getArea());
            break;
        case 4:
            let rectangle = new Rectengle(coorSet[0], coorSet[1], coorSet[2], coorSet[3]);
            if(rectangle.isRectengle())
                console.log("사각형의 넓이는 " + rectangle.getarea());
            else
                console.log("직사각형이 아닙니다.")
            break;
        default:
            break;
    }
}

// 출력
const drawMap = (coor) => {
    for(let i = 24; i > 0 ; i--){
        let line = new String;
        if(i % 2 == 0){
            if(i > 9){
                line += (i+"|");
            }
            else{
                line += (" " + i+"|");
            }
        }else{
            line += "  |";
        }
        for(let j in coor){
            if(coor[j].y === i){
                if(coor[j].x > 0){
                    line += "  ".repeat(coor[j].x );
                    line += "*";
                }
                else{
                    line = line.substr(0,2)+"*";
                }
            }
        }
        console.log(line);
    }
    console.log("  +_________________________________________________________________________"); 
    console.log(" 0     2     4     6     8    10    12    14    16    18    20    22    24");
}

const inRange = (num) => {
    return (num <= 24 && num >=0);
}