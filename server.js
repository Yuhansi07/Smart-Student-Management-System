const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [
  {
    id: 1,
    name: "Kamal Perera",
    course: "Information Technology",
    email: "kamal@gmail.com",
    attendance: 85
  },
  {
    id: 2,
    name: "Nimal Silva",
    course: "Software Engineering",
    email: "nimal@gmail.com",
    attendance: 90
  }
];

app.get("/", (req, res) => {
  res.send("Smart Student Management System Backend Running");
});

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.get("/api/students/:id", (req, res) => {
  const student = students.find(s => s.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

app.post("/api/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    course: req.body.course,
    email: req.body.email,
    attendance: req.body.attendance
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

app.put("/api/students/:id", (req, res) => {
  const student = students.find(s => s.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = req.body.name;
  student.course = req.body.course;
  student.email = req.body.email;
  student.attendance = req.body.attendance;

  res.json({
    message: "Student updated successfully",
    student
  });
});

app.delete("/api/students/:id", (req, res) => {
  students = students.filter(s => s.id !== Number(req.params.id));

  res.json({
    message: "Student deleted successfully"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
