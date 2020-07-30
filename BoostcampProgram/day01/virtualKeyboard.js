// keyboard = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
//             ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
//             ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
//             ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "?"]]
//
// 자바스크립트로 가상 키보드 구현
//

const solution = (keyboard, word) => {
    let current = [0,0];
    return word.split("").reduce((acc, alphabet) => { 
        let next = findKeyIndex(keyboard, alphabet);
        let diff = posDiff(current, next);
        acc = printMove(acc, diff);
        current = next;
        return acc;
    },""); 
}

function printMove(acc, diff){
  acc += (diff[0] > 0)? '_'.repeat(diff[0]) : '^'.repeat(Math.abs(diff[0]));
  acc += (diff[1] > 0)? '>'.repeat(diff[1]) : '<'.repeat(Math.abs(diff[1]));
  acc += '@';
  return acc;
}

function posDiff(cur, next){ // diff[0] = X, diff[1] = Y
    let diff = [0,0];
    diff[0] = next[0] - cur[0]; 
    diff[1] = next[1] - cur[1]; 
    return diff;
}

function findKeyIndex(keyboard, key){
    let keyboardCol = keyboard[0].length;
    let keyboardRow = keyboard.length;
    for(let i = 0; i< keyboardRow ; i++){
        for(let j = 0 ; j< keyboardCol ; j++){
            if(keyboard[i][j] === key)
                return [i, j]; 
        }
    }
    return [-1,-1]; // key not found on the keyboard
}

// I/O TEST
// console.log("Result for BOOST")
// console.log(solution(keyboard, "BOOST"));
// console.log("\nResult for HELLO,CAMPER5;")
// console.log(solution(keyboard, "HELLO,CAMPER5;"));
// console.log("\nResult for FROM.1984")
// console.log(solution(keyboard, "FROM.1984"));