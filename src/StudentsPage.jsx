import React, { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Table, TableHead, TableRow, TableCell, TableBody, Modal, Button, Box, TextField } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import './App.css';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '', middleName: '', lastName: '', id: '', class: '', section: '', rollNumber: '', 
    mathsMarks: '', physicsMarks: '', chemistryMarks: '', biologyMarks: '', englishMarks: ''
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const studentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setStudents(studentsList);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    const studentRef = editingStudentId
      ? doc(db, "students", editingStudentId)
      : doc(db, "students", `student-${Date.now()}`);
    await setDoc(studentRef, newStudent, { merge: true });
    setOpen(false);
    setEditingStudentId(null);
    setNewStudent({
      name: '', middleName: '', lastName: '', id: '', class: '', section: '', rollNumber: '', 
      mathsMarks: '', physicsMarks: '', chemistryMarks: '', biologyMarks: '', englishMarks: ''
    });
    fetchStudents();
  };

  const handleDeleteStudent = async (id) => {
    await deleteDoc(doc(db, "students", id));
    fetchStudents();
  };

  const handleViewStudent = async (id) => {
    const studentDoc = await getDoc(doc(db, "students", id));
    if (studentDoc.exists()) {
      setSelectedStudent(studentDoc.data());
      setViewModalOpen(true);
    }
  };

  const handleEditStudent = async (id) => {
    const studentDoc = await getDoc(doc(db, "students", id));
    if (studentDoc.exists()) {
      setNewStudent(studentDoc.data());
      setEditingStudentId(id);
      setOpen(true);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Students</h2>
      <Button variant="contained" onClick={() => setOpen(true)} style={{ marginBottom: '20px' }}>Add Student</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Roll Number</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>{student.section}</TableCell>
              <TableCell>{student.rollNumber}</TableCell>
              <TableCell>
                <Visibility onClick={() => handleViewStudent(student.id)} style={{ cursor: 'pointer', margin: '0 5px' }} />
                <Edit onClick={() => handleEditStudent(student.id)} style={{ cursor: 'pointer', margin: '0 5px' }} />
                <Delete onClick={() => handleDeleteStudent(student.id)} style={{ cursor: 'pointer', margin: '0 5px' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', width: '400px' }}>
          <h3>{editingStudentId ? 'Edit Student' : 'Add Student'}</h3>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <TextField
            label="Middle Name"
            fullWidth
            margin="normal"
            value={newStudent.middleName}
            onChange={(e) => setNewStudent({ ...newStudent, middleName: e.target.value })}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={newStudent.lastName}
            onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
          />
          <TextField
            label="ID"
            fullWidth
            margin="normal"
            value={newStudent.id}
            onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
          />
          <TextField
            label="Class"
            fullWidth
            margin="normal"
            value={newStudent.class}
            onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
          />
          <TextField
            label="Section"
            fullWidth
            margin="normal"
            value={newStudent.section}
            onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
          />
          <TextField
            label="Roll Number"
            fullWidth
            margin="normal"
            value={newStudent.rollNumber}
            onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
          />
          <TextField
            label="Maths Marks"
            fullWidth
            margin="normal"
            value={newStudent.mathsMarks}
            onChange={(e) => setNewStudent({ ...newStudent, mathsMarks: e.target.value })}
          />
          <TextField
            label="Physics Marks"
            fullWidth
            margin="normal"
            value={newStudent.physicsMarks}
            onChange={(e) => setNewStudent({ ...newStudent, physicsMarks: e.target.value })}
          />
          <TextField
            label="Chemistry Marks"
            fullWidth
            margin="normal"
            value={newStudent.chemistryMarks}
            onChange={(e) => setNewStudent({ ...newStudent, chemistryMarks: e.target.value })}
          />
          <TextField
            label="Biology Marks"
            fullWidth
            margin="normal"
            value={newStudent.biologyMarks}
            onChange={(e) => setNewStudent({ ...newStudent, biologyMarks: e.target.value })}
          />
          <TextField
            label="English Marks"
            fullWidth
            margin="normal"
            value={newStudent.englishMarks}
            onChange={(e) => setNewStudent({ ...newStudent, englishMarks: e.target.value })}
          />
          <Button variant="contained" onClick={handleAddStudent} style={{ marginTop: '20px' }}>
             Submit
           </Button>
        </Box>
      </Modal>

      <Modal open={viewModalOpen} onClose={() => setViewModalOpen(false)}>
        <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', width: '400px' }}>
          {selectedStudent && (
             <div>
               <h3>Student Details</h3>
               <p>Name: {selectedStudent.name} {selectedStudent.middleName} {selectedStudent.lastName}</p>
               <p>ID: {selectedStudent.id}</p>
               <p>Class: {selectedStudent.class}</p>
               <p>Section: {selectedStudent.section}</p>
               <p>Roll Number: {selectedStudent.rollNumber}</p>
               <p>Maths Marks: {selectedStudent.mathsMarks}</p>
               <p>Physics Marks: {selectedStudent.physicsMarks}</p>
               <p>Chemistry Marks: {selectedStudent.chemistryMarks}</p>
               <p>Biology Marks: {selectedStudent.biologyMarks}</p>
               <p>English Marks: {selectedStudent.englishMarks}</p>
             </div>
           )}
        </Box>
      </Modal>

    </div>
  );
}

export default StudentsPage;
