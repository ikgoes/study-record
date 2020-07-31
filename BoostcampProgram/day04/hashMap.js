// Key를 hashing하는 함수 구현
const bucketSize =  1e9+9;
const Hash = (key) =>{
	const a = 31;
	const mod = 1e9+9;
    const keyLen = key.length;
    let K = 0                       // 유사 난수
    let hash = 0;
	for(let i = 0; i<keyLen;i++){
        K = (a * K + key[i].charCodeAt()) % mod; 
        hash += K;
    }
    return hash;
}

// hashMap
function Hashmap() {
    this._map = [];
    this._mapKey = [];
    this._size = 0;
    // 메소드들
    this.clear = clear;
    this.contains = contains;
    this.getValue = getValue;
    this.isEmpty = isEmpty;
    this.keys = keys;
    this.put = put;
    this.remove = remove;
    this.replace = replace;
    this.size = size;
}

// 전체 맵을 초기화
function clear(){
    this._map = [];
    this._mapKey = [];
    this._size = 0;
}

// 해당 키가 존재하는지 판단해서 Bool 결과를 리턴
function contains(key){
    const hashedKey = Hash(key);
    return (this._map[hashedKey] != undefined) ? true : false;
}

// 해당 키와 매치되는 값을 찾아서 리턴한다. 없으면 nil을 리턴
function getValue(key){
    const hashedKey = Hash(key);
    return (this.contains(key)) ? this._map[hashedKey] : null;
}

// 비어있는 맵인지 Bool 결과를 리턴
function isEmpty(key){
    return (!this._size) ? true : false;
}

// 전체 키 목록을 [String] 배열로 리턴
function keys(){
    return this._mapKey;
}

// 키-값을 추가
// 기존에 key가 이미 있으면 no action
function put(value,key){
    this._size++;
    const hashedKey = Hash(key);
    this._mapKey.push(key);
    if(!this.contains(key)){
        this._map[hashedKey] = value;
    }else{
        console.log("Key already exists");
    }
}

// 해당 키에 있는 값을 삭제
// 기존에 key가 없으면 no action
function remove(key){
    this._size--;
    const hashedKey = Hash(key);
    if(this.contains(key)){
        this._mapKey.splice(this._mapKey.indexOf(key),1);
        this._map[hashedKey] = null;
    }else{
        console.log("Key does not exist!");
    }
}

// 키-값으로 기존 값을 대체
// 만약 기존에 key가 없으면 새로 추가한다.
function replace(value, key){
    const hashedKey = Hash(key);
    if(this.contains(key)){
        this._map[hashedKey] = value;
    }else{
        this.put(value,key);
    }
}

// 전체 아이템 개수를 리턴
function size(){
    return this._size;    
}

module.exports = { Hashmap };