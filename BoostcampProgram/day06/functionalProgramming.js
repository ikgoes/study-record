// example.js에서 두 개의 클래스를 중복된 코드를 줄이고, 함수형 표현으로 최대한 개선한다
// 앞서 작성한 자연수 분류 ClassifierAlpha, PrimeAlpha 를 이용해서 2-100까지 자연수 중에서
// 완전수(perfect), 과잉수(Abundant), 부족수(Deficient), 소수(Prime) 목록을 출력한다.

const pipe = (...fns) => (args) => fns.reduce((arg, fn) => fn(arg), args);
const sumfactors = (num) => pipe(factors, sum)(num);

const sum = (factor) => {
    return [...factor].reduce((acc,cur,i)=>{
        return acc + cur;
    })
}; 

const factors = (numbers) =>{
    const output = new Set;
    Array(numbers).fill().map((x,i) => i+1).forEach(
    index => {
        const div = numbers % index === 0;
        if(div) output.add(index);
            return output
    })
    return output;
}; 

const isFactor = (number, potentialFactor) =>{ number % potentialFactor == 0};

const isPerfect = num => sumfactors(num) - num == num ;
const isAbundant = num => sumfactors(num) - num > num ;
const isDeficient = num => sumfactors(num) - num < num;

const equalSet = (aset, bset) => {
    if (aset.size !== bset.size) return false;
    for (const a of aset) if (!bset.has(a)) return false;
    return true;
  };

const isPrime = (num) => {
    const prime = new Set([1, num]);
    return num > 1 && pipe(factors, equalSet.bind(undefined, prime))(num);
};

const checkType = (arg) => {
    if(isAbundant(arg)) return "abundant, ";
    if(isDeficient(arg)) return "deficient, ";
    if(isPerfect(arg)) return "perfect, ";
};

const checkPrime = (arg) => { return (isPrime(arg)) ? "prime" : " "; };

const printResult = (value) => { 
    return [...Array(value + 1).keys()].slice(2).reduce((acc, cur, i) =>{
        let str = "";
        str += `${cur} : ${checkType(cur)}${checkPrime(cur)}`;
        console.log(str);
    },"");
}

printResult(100);