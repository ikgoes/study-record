class Repository {
    constructor(name){
        this.name = name;
        this.self = new Repository;
        this.parent = new Repository;
        this.sub = new Repository;
    }
}


module.exports = { Repository };
