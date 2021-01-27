
module.exports  = class Course {
    constructor(name, category, oneliner, duration, language, description, id){
        this.name = name;
        this.category = category;
        this.oneliner = oneliner;
        this.duration = duration;
        this.language = language;
        this.description = description;
        this._id = id;
    }
}