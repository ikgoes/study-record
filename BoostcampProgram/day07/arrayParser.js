// Array 파서 -  컴파일러와 인터프리터, 파서등의 프로그램은 우리가 작성하는 프로그램 코드를 해석하고 분석한다. 
//               파일 중에서 문자열을 분석하는 파싱과정을 이해하고 프로그래밍을 하면 더 효율적인 방법을 생각하게 된다.

function makeObj({type, value}){
    if(type === "array") return {type, child:[]}
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
                return "array";
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
    const LBracketCount = objList.filter(({type}) => type === "array").length
    const RBracketCount = objList.filter(({type}) => type === "RBracket").length
    if(LBracketCount !== RBracketCount) {
        throw new Error("The array is not closed");
    } 

    const res = {type:"head", child :[]};
    const st = [];
    for(idx in objList){
      const obj = objList[idx];
      if(obj.type === "array"){
        st.push(obj);
      }
      if(obj.type === "number" || obj.type === "string" || obj.type === "NULL"){
        st[st.length-1].child.push(obj);
      }
      if(obj.type === "RBracket"){
        const top = st.pop();
        const len = st.length;
        if(len === 0) res.child.push(top);
        else st[len - 1].child.push(top);
      }
    }
    return res;
}

try{
    const str = "[1, [2,[3,[4,[5]]]],'hello', 'world', null]";
    const ArrayParser = (str) =>{ return parser(lexer(tokenizer(str))); }
    const result = ArrayParser(str);
    console.dir(result,{depth:null});
    const str2 = "[[1,[2,[3],'hello']]";
    const result2 = ArrayParser(str2);
    console.dir(result2, {depth:null});
} catch(err){
    console.log("Error Message : ", err.message);
}
