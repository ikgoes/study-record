class Remote{
    constructor(){
        this.lastCommit = "";
        this.Directory = new Map;
    }

    status = (dir) =>{
        console.log(this.lastCommit);
        this.Directory.get(dir).forEach(x => console.log(`${x.name} ${x.time}`));
    }
}

module.exports = { Remote };
