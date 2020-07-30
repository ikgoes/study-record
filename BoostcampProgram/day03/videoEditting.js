// video editting program을 링크드리스트를 이용하여 구현한 예저

// LinkedList 클래스
function LinkedList() {
    this.head = new Node(0,0,0);
    this.count = 0;
    this.isLast = isLast;
    this.add = add;
    this.insert = insert;
    this.findPrevious = findPrevious;
    this.deleteNode = deleteNode;
    this.printList = printList;
    this.render = render;
}

// Node 클래스
function Node(id, title, length){
    this.id = id;
    this.title = title;
    this.length = length;
    this.next = undefined;
}

// 마지막 노드인지 확인
function isLast(node){
    return node.next === undefined;
}

// 링크드리스트 맨 뒤에 추가
function add(node){
    this.count++;
    let current = this.head;
    while(!(isLast(current))){
        current = current.next;
    }
    current.next = node;
}

// position위치에 노드를 추가
function insert(node, position){
    this.count++;
    let current = this.head;
    while(position--){
        current = current.next;
    }
    node.next = current.next;
    current.next = node;
}

// 원하는 노드의 이전 노드를 반환
function findPrevious(node){
    let cur = this.head;
    while(!(cur.next.id === node.id)){
        cur = cur.next;
    }
    return cur;
}

// 원하는 노드를 삭제
function deleteNode(node){
    this.count--;
    let current = this.findPrevious(node);
    let deleted = current.next;
    current.next = deleted.next;
    deleted = null;
}

// 링크드리스트를 출력
function printList(){
    let current = this.head;
    let printResult = "|";
    while(!(isLast(current))){
        current = current.next;
        printResult += "---["+current.id+"," +current.length+"sec]";
    }
    printResult += "---[end]";
    console.log(printResult);
}

// 영상을 render -> 총 클립 수 와 전체 길이 출력 
function render(){
    let current = this.head;
    let clipSize = 0;
    let totalLength = 0;
    while(!(isLast(current))){
        current = current.next;
        clipSize++;
        totalLength += current.length;
    }
    console.log("영상클립: "+clipSize+"개");
    console.log("전체길이: "+totalLength+"sec");
}

// Random한 ID를 생성하는 함수
const randomId = () =>{
    return Math.random().toString(36).substr(2,8);
}

// 영상클립이 있는 배열생성
let clip =[];
const nOfClips = 13;
const makeClip =() => {
    for (let i = 1 ; i<=nOfClips; i++){
        tmpNode = new Node(randomId(),'제목'+i ,parseInt(Math.random()*15 + 1));
        clip.push(tmpNode);
        console.log(tmpNode.title+"("+ tmpNode.id +"):" + tmpNode.length);
    }
}

// 영상클립이 존재하는지 확인
const findClip =(inputId) =>{
    for(let i = 0; i<nOfClips;i++){
        if(clip[i].id === inputId){
            return clip[i];
        }
    }
    console.log("Wrong ID was entered");
    return -1;
}

// 터미널에서 입력을 받는다.
var readline = require('readline');
const { exit } = require('process');
var r = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
r.setPrompt('>');
r.prompt();
r.on('line',function(line){
    if(line == 'exit'){
        r.close();
    }
    action(line);
    r.prompt()
});
r.on('close', function(){
    process.exit();
});

// 초기 설정
makeClip();
let linkedList = new LinkedList()

// 입력에 맞는 행동을 취함
const action = (line) => {
    const lines = line.split(' ');
    switch(lines[0]){
        case "add":
            if(findClip(lines[1]) != -1){
                linkedList.add(findClip(lines[1]));
            }
            linkedList.printList();
            break;
        case "insert":
            if(lines[2] == null){
                console.log("Position was not entered");
            }
            else if(linkedList.count <= lines[2]){
                linkedList.add(findClip(lines[1]));
            }
            else if(findClip(lines[1]) != -1){
                linkedList.insert(findClip(lines[1]),lines[2]);
            }
            linkedList.printList();
            break;
        case "delete":
            if(linkedList.count === 0){
                console.log("No clips are on the list");
            }else{
                if(findClip(lines[1]) != -1)
                    linkedList.deleteNode(findClip(lines[1]));
            }
            linkedList.printList();
            break;
        case "render":
            linkedList.render();
            break;
        default:
            console.log("Wrond command was entered");
    }
}