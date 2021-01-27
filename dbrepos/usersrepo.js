const db = require('../configs/mongodb')
const { ObjectID, ObjectId } = require('mongodb')


exports.getAll = (callback) => {
    const collection = db.getUsersCollection();
    collection.find().toArray()
        .then((users) => {
            console.log(users);
            return callback(users);
        });
}

exports.add = (user, callback) => {
    const collection = db.getUsersCollection();
    collection.insertOne({ name: user.name, email: user.email, password: user.password, type: user.type})
        .then(()=> {
            console.log("User inserted.");
        })
}

exports.login = (email, callback) => {
    const collection = db.getUsersCollection();
    collection.findOne({email: email})
        .then((user) => {
            console.log(user);
            return callback(user);
        });
}

exports.get = (id, callback) => {
    const collection = db.getUsersCollection();
    collection.findOne({_id: ObjectID(id)})
        .then((user) => {
            console.log(user);
            return callback(user);
        });
}

exports.update = (user, callback) => {
    const collection = db.getUsersCollection();
    console.log(user);
    collection.findOneAndUpdate(
        { _id: ObjectId(user._id)}, 
    { 
        $set: { name: user.name, email: user.email, password: user.password}
    },{ })
        .then(()=> {
            console.log("User updated.");
            return callback();
        });
}

exports.delete = (id, callback) => {
    const collection = db.getUsersCollection();
    collection.deleteOne({_id: ObjectId(id)})
    .then((result) => {
        return callback();
    })
}