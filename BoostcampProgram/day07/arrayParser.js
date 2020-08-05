// Array 파서 -  컴파일러와 인터프리터, 파서등의 프로그램은 우리가 작성하는 프로그램 코드를 해석하고 분석한다. 
//               파일 중에서 문자열을 분석하는 파싱과정을 이해하고 프로그래밍을 하면 더 효율적인 방법을 생각하게 된다.

function makeObj({type, value}){
    if(type === "Array") return {type, child:[]}
    return {
        type: type,
        value: value,
        child: []
    }
}

const tokenizer = (str) =>{
    const regexr = /\[|\]|\"\w+\"|\'\w+\'|\w+|-\w+/g;
    return str.match(regexr);
};

const lexer = (str) =>{
    const getType = (char) =>{
        const checkNum = (n) => {return (/\d+|-\d+/g).test(n);};
        const checkStr = (s) => {return (/[A-Za-z]+/g).test(s);}; 
        switch(true){
            case '[' === char:
                return "LBracket";
                break;
            case ']' === char:
                return "RBracket";
                break;
            case "null" === char:
                return "NULL";
                break;
            case checkNum(char):
                return "number";
                break;
            case checkStr(char): 
                return "string";
                break;
        }
    };
    return str.map((val, i)=>{
        //let obj = {type : getType(val), value : val};
        return makeObj({type : getType(val), value : val});
    });
};

const parser = (objList) => {
    const LBracketCount = objList.filter(({type}) => type === "LBracket").length
    const RBracketCount = objList.filter(({type}) => type === "RBracket").length
    if(LBracketCount !== RBracketCount) {
        throw new Error("The array is not closed");
    } 

    let obj = {type : undefined, child : []};
    if(objList[0].value === '['){
        obj.child.push(parser(objList.shift()));
    }else if(objList[0].value === ']'){
    }
    else{
        obj = {type :  objList[0].type, value : objList[0].value};
    }
        
    return obj;
    // let obj = {type : undefined, child : []};
    // console.log(objList[index]);
    // if(objList[index].type === 'LBracket'){
    //     let right = objList.reduce((acc, obj, idx) => obj.type === "RBracket" ? idx: acc, -1);
    //     let subList = objList.slice(1, right); 
    //     return obj = {type : 'Array', child : obj.child.push(parser(subList, 0))};
    // }else if(objList[index].type === 'RBracket'){
    //     return;
    // }
    // else{
    //     obj = {type : objList[index].type, value : objList[index].value};
    //     return obj; 
    // }
}

try{
    const str = "[1, [2,[3]],'hello', 'world', null]";
    const ArrayParser = (str) =>{ return parser(lexer(tokenizer(str))); }
    const result = ArrayParser(str);
    console.log(JSON.stringify(result,null,2));
} catch(err){
    console.log("Error Message : ", err.message);
}
