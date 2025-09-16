class Validator {
    static validateCourseInfo(courseInfo) {
        if (courseInfo.hasOwnProperty("course") &&
            courseInfo.hasOwnProperty("courseId") &&
            courseInfo.hasOwnProperty("cohort") &&
            courseInfo.hasOwnProperty("college") &&
            courseInfo.hasOwnProperty("semester") &&
            courseInfo.hasOwnProperty("instructor") &&
            courseInfo.hasOwnProperty("averageRating")) {
            return {
                status: true,
                message: "Course info is valid"
            }
        } else {
            return {
                status: false,
                message: "Course info is not valid"
            }
        }
    }
}

module.exports = Validator