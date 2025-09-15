const express = require('express');
const courseData = require('./courses.json');

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).send("Hello world");
});

app.get("/courses", (req,res) => {
    return res.status(200).json(courseData);
});

app.get("/courses/:courseId", (req, res) => {
    const airtribeCourses = courseData.airtribe;
    let filteredCourse = airtribeCourses.filter(course => course.courseId == req.params.courseId);
    if (filteredCourse.length === 0) {
        return res.status(404).send("Course not found");
    }
    return res.status(200).json(filteredCourse);
});




app.listen(PORT, (err) => {
    if (err) {
        console.log("Error occured and cannot start the server")
    } else {
        console.log("Server started at port " + PORT);
    }
});
