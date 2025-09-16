const express = require('express');
const courseData = require('./courses.json');
const Validator = require('./helpers/validator');
const fs = require('fs');


const app = express();
app.use(express.json());

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


app.post('/courses', (req, res) => {
    console.log(req.body);
    const userProvidedDetails = req.body;
    if (Validator.validateCourseInfo(userProvidedDetails).status === true ) {
        let courseDataModified = courseData;
        courseDataModified.airtribe.push(userProvidedDetails);
        fs.writeFile('./courses.json', JSON.stringify(courseDataModified), {encoding: "utf-8",flag: "w"} , (err, data) => {
            if (err) {
                return res.status(500).send("Some error occured while writing to file");
            } else {
                return res.status(201).send("Course info added successfully");
            }
        })
    } else {
        return res.status(400).send(Validator.validateCourseInfo(userProvidedDetails).message);
    }
})




app.listen(PORT, (err) => {
    if (err) {
        console.log("Error occured and cannot start the server")
    } else {
        console.log("Server started at port " + PORT);
    }
});
