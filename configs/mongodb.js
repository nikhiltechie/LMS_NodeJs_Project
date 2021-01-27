const { MongoClient } = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nickdb:nickdbpass@clusternick1.gb2bl.mongodb.net/LMS_DB?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true});
var usersCollection;
var coursesCollection;

module.exports = {
    connect : function(callback){
        MongoClient.connect(uri)
        .then(function(client){
            console.log("Connected to MongoDB: Users DB");
            usersCollection = client.db('LMS_DB').collection('Users');
            coursesCollection = client.db('LMS_DB').collection('Courses');
            //console.log(collection);
        //     collection.find().toArray()
        // .then((users) => {
        //     console.log(users);
            
        // });
            
            return callback("Ok");
        })
        .catch(function(err){
            console.log(err);
        })

    },
    getUsersCollection : function() {
        return usersCollection;
    },
    getCoursesCollection : function() {
        return coursesCollection;
    }
}