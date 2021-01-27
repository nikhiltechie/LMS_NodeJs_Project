const Course = require("../models/courseModel");
const repo = require("../dbrepos/coursesrepo");


exports.getAddCourseForm = (req, res, next) => {
    res.render('add-course');
}

exports.getListCourseView = (req, res, next) => {
    repo.getAll((courses) => {
        console.log("Courses received Get");
        res.render('list-courses',{title:'Courses...', courses : courses});
    });
}


exports.addCourses = (req, res, next) => {
    const course = new Course(req.body.Name,req.body.Category,req.body.OneLiner,req.body.Duration, req.body.Language, req.body.Description )
    repo.add(course, () => {
        repo.getAll((courses) => {
            console.log("Courses received after add");
            res.render('list-courses',{title:'Courses...', courses : courses});
        })
    });
    
}

exports.getUpdateForm = (req, res, next) => {
    const id = req.query.id;
    console.log(id);
    repo.get(id, (result) => {
        res.render('update-course', {course : result} );
    })
}

exports.updateCourse = (req, res, next) => {
    const course = new Course(req.body.Name,req.body.Category,req.body.OneLiner,req.body.Duration, req.body.Language, req.body.Description, req.body._id);
    repo.update(course, () => {
        console.log("call back after update.")
        repo.getAll((courses) => {
            console.log("Courses received after update");
            res.render('list-courses',{title:'Courses...', courses : courses});
        });
    });
}

exports.deleteCourse = (req, res, next) => {
    const id = req.query.id;
    console.log(id);
    repo.delete(id, () => {
        repo.getAll((courses)=>{
            res.render('list-courses',{title:'Courses...', courses : courses});
        });       
    })
}