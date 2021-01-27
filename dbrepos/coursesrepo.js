const db = require('../configs/mongodb')
const { ObjectID, ObjectId } = require('mongodb')


exports.getAll = (callback) => {
    const collection = db.getCoursesCollection();
    collection.find().toArray()
        .then((courses) => {
            console.log(courses);
            return callback(courses);
        });
}

exports.add = (course, callback) => {
    const collection = db.getCoursesCollection();
    collection.insertOne({ name: course.name, category: course.category, oneliner: course.oneliner, duration: course.duration,  language: course.language, description: course.description   })
        .then(()=> {
            console.log("Course inserted.");
            return callback();
        })
}

exports.get = (id, callback) => {
    const collection = db.getCoursesCollection();
    collection.findOne({_id: ObjectID(id)})
        .then((course) => {
            console.log(course);
            return callback(course);
        });
}

exports.update = (course, callback) => {
    const collection = db.getCoursesCollection();
    console.log(course);
    collection.findOneAndUpdate(
        { _id: ObjectId(course._id)}, 
    {
        $set: { name: course.name, category: course.category, oneliner: course.oneliner, duration: course.duration,  language: course.language, description: course.description }
    },{ })
        .then(()=> {
            console.log("Course updated.");
            return callback();
        });
}

exports.delete = (id, callback) => {
    const collection = db.getCoursesCollection();
    collection.deleteOne({_id: ObjectId(id)})
    .then((result) => {
        return callback();
    })
}