"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Student = /** @class */ (function () {
    function Student(name) {
        this.name = name;
        this.studentID = this.generateStudentID();
        this.enrolledCourses = [];
        this.balance = 0;
    }
    Student.prototype.generateStudentID = function () {
        // Generate a unique 5-digit student ID (for simplicity, using a counter)
        var uniqueID = Math.floor(10000 + Math.random() * 90000).toString();
        return uniqueID;
    };
    Student.prototype.enrollCourse = function (course, courseFee) {
        this.enrolledCourses.push(course);
        this.balance += courseFee;
    };
    Student.prototype.viewBalance = function () {
        console.log("".concat(this.name, "'s balance: $").concat(this.balance));
    };
    Student.prototype.payTuition = function (amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log("Payment of $".concat(amount, " received. Remaining balance: $").concat(this.balance));
        }
        else {
            console.log("Insufficient balance to make the payment.");
        }
    };
    Student.prototype.showStatus = function () {
        console.log("Student ID: ".concat(this.studentID));
        console.log("Name: ".concat(this.name));
        console.log("Enrolled Courses: ".concat(this.enrolledCourses.join(', ')));
        console.log("Balance: $".concat(this.balance));
    };
    return Student;
}());
var students = [];
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function createStudent() {
    rl.question('Enter the student name: ', function (name) {
        var student = new Student(name);
        students.push(student);
        console.log("".concat(name, " has been added to the system with Student ID: ").concat(student.studentID));
        mainMenu();
    });
}
function enrollStudent() {
    rl.question('Enter the student ID to enroll: ', function (studentID) {
        var student = students.find(function (s) { return s.studentID === studentID; });
        if (student) {
            rl.question('Enter the course name: ', function (course) {
                rl.question('Enter the course fee: $', function (fee) {
                    var courseFee = parseFloat(fee);
                    student.enrollCourse(course, courseFee);
                    console.log("".concat(student.name, " has been enrolled in ").concat(course, "."));
                    mainMenu();
                });
            });
        }
        else {
            console.log("Student with ID ".concat(studentID, " not found."));
            mainMenu();
        }
    });
}
function viewBalance() {
    rl.question('Enter student ID to view balance: ', function (studentID) {
        var student = students.find(function (s) { return s.studentID === studentID; });
        if (student) {
            student.viewBalance();
        }
        else {
            console.log("Student with ID ".concat(studentID, " not found."));
        }
        mainMenu();
    });
}
function payTuition() {
    rl.question('Enter student ID to pay tuition: ', function (studentID) {
        var student = students.find(function (s) { return s.studentID === studentID; });
        if (student) {
            rl.question('Enter the payment amount: $', function (amount) {
                var paymentAmount = parseFloat(amount);
                student.payTuition(paymentAmount);
                mainMenu();
            });
        }
        else {
            console.log("Student with ID ".concat(studentID, " not found."));
            mainMenu();
        }
    });
}
function showStudentStatus() {
    rl.question('Enter student ID to show status: ', function (studentID) {
        var student = students.find(function (s) { return s.studentID === studentID; });
        if (student) {
            student.showStatus();
        }
        else {
            console.log("Student with ID ".concat(studentID, " not found."));
        }
        mainMenu();
    });
}
function mainMenu() {
    rl.question('Choose an option:\n' +
        '1. Create a new student\n' +
        '2. Enroll a student in a course\n' +
        '3. View balance\n' +
        '4. Pay tuition\n' +
        '5. Show student status\n' +
        '0. Exit\n', function (choice) {
        switch (choice) {
            case '1':
                createStudent();
                break;
            case '2':
                enrollStudent();
                break;
            case '3':
                viewBalance();
                break;
            case '4':
                payTuition();
                break;
            case '5':
                showStudentStatus();
                break;
            case '0':
                rl.close();
                return;
            default:
                console.log('Invalid choice. Please try again.');
                mainMenu();
        }
    });
}
mainMenu();
