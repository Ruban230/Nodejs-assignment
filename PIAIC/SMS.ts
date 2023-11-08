import * as readline from 'readline';

class Student {
  studentID: string;
  name: string;
  enrolledCourses: string[];
  balance: number;

  constructor(name: string) {
    this.name = name;
    this.studentID = this.generateStudentID();
    this.enrolledCourses = [];
    this.balance = 0;
  }

  generateStudentID() {
    // Generate a unique 5-digit student ID (for simplicity, using a counter)
    const uniqueID = Math.floor(10000 + Math.random() * 90000).toString();
    return uniqueID;
  }

  enrollCourse(course: string, courseFee: number) {
    this.enrolledCourses.push(course);
    this.balance += courseFee;
  }

  viewBalance() {
    console.log(`${this.name}'s balance: $${this.balance}`);
  }

  payTuition(amount: number) {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`Payment of $${amount} received. Remaining balance: $${this.balance}`);
    } else {
      console.log(`Insufficient balance to make the payment.`);
    }
  }

  showStatus() {
    console.log(`Student ID: ${this.studentID}`);
    console.log(`Name: ${this.name}`);
    console.log(`Enrolled Courses: ${this.enrolledCourses.join(', ')}`);
    console.log(`Balance: $${this.balance}`);
  }
}

const students: Student[] = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createStudent() {
  rl.question('Enter the student name: ', (name) => {
    const student = new Student(name);
    students.push(student);
    console.log(`${name} has been added to the system with Student ID: ${student.studentID}`);
    mainMenu();
  });
}

function enrollStudent() {
  rl.question('Enter the student ID to enroll: ', (studentID) => {
    const student = students.find((s) => s.studentID === studentID);
    if (student) {
      rl.question('Enter the course name: ', (course) => {
        rl.question('Enter the course fee: $', (fee) => {
          const courseFee = parseFloat(fee);
          student.enrollCourse(course, courseFee);
          console.log(`${student.name} has been enrolled in ${course}.`);
          mainMenu();
        });
      });
    } else {
      console.log(`Student with ID ${studentID} not found.`);
      mainMenu();
    }
  });
}

function viewBalance() {
  rl.question('Enter student ID to view balance: ', (studentID) => {
    const student = students.find((s) => s.studentID === studentID);
    if (student) {
      student.viewBalance();
    } else {
      console.log(`Student with ID ${studentID} not found.`);
    }
    mainMenu();
  });
}

function payTuition() {
  rl.question('Enter student ID to pay tuition: ', (studentID) => {
    const student = students.find((s) => s.studentID === studentID);
    if (student) {
      rl.question('Enter the payment amount: $', (amount) => {
        const paymentAmount = parseFloat(amount);
        student.payTuition(paymentAmount);
        mainMenu();
      });
    } else {
      console.log(`Student with ID ${studentID} not found.`);
      mainMenu();
    }
  });
}

function showStudentStatus() {
  rl.question('Enter student ID to show status: ', (studentID) => {
    const student = students.find((s) => s.studentID === studentID);
    if (student) {
      student.showStatus();
    } else {
      console.log(`Student with ID ${studentID} not found.`);
    }
    mainMenu();
  });
}

function mainMenu() {
  rl.question(
    'Choose an option:\n' +
    '1. Create a new student\n' +
    '2. Enroll a student in a course\n' +
    '3. View balance\n' +
    '4. Pay tuition\n' +
    '5. Show student status\n' +
    '0. Exit\n',
    (choice) => {
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
    }
  );
}

mainMenu();
