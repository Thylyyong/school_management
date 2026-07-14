import React, { useState, useEffect } from "react";
// Import our standard Javascript mock data
import { 
  initialStudents, initialFaculty, initialAssets, 
  initialCourses, initialLessonPlans, initialStudyGroups, initialInvoices,
  initialQuizzes, initialEvents
} from "./data/mockData.js";

// Import our new refactored Javascript components
import Login from "./pages/Login.jsx";
import AdminPortal from "./pages/Admin/AdminPortal.jsx";
import TeacherPortal from "./pages/Teacher/TeacherPortal.jsx";
import StudentPortal from "./pages/Student/StudentPortal.jsx";
import { ChevronRight, LogOut, Laptop, GraduationCap, Landmark, ShieldCheck } from "lucide-react";

export default function App() {
  // --- Global Application State ---
  // useState holds our data. When we call the 'set' function, React redraws the screen.
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [currentUsername, setCurrentUsername] = useState("");

  // Load data from localStorage if it exists, otherwise use our mock data.
  // Using an initialization function inside useState() means this only runs once.
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("edu_students");
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem("edu_faculty");
    return saved ? JSON.parse(saved) : initialFaculty;
  });

  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem("edu_assets");
    return saved ? JSON.parse(saved) : initialAssets;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("edu_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [lessonPlans, setLessonPlans] = useState(() => {
    const saved = localStorage.getItem("edu_lessons");
    return saved ? JSON.parse(saved) : initialLessonPlans;
  });

  const [studyGroups, setStudyGroups] = useState(() => {
    const saved = localStorage.getItem("edu_groups");
    return saved ? JSON.parse(saved) : initialStudyGroups;
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("edu_invoices");
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [quizzes, setQuizzes] = useState(() => {
    const saved = localStorage.getItem("edu_quizzes");
    return saved ? JSON.parse(saved) : initialQuizzes;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("edu_events");
    return saved ? JSON.parse(saved) : initialEvents;
  });

  // --- Effects ---
  // useEffect runs a function whenever the variables in its dependency array change.
  // We use this to automatically save to localStorage whenever our state updates.
  useEffect(() => {
    localStorage.setItem("edu_students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("edu_faculty", JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem("edu_assets", JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem("edu_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("edu_lessons", JSON.stringify(lessonPlans));
  }, [lessonPlans]);

  useEffect(() => {
    localStorage.setItem("edu_groups", JSON.stringify(studyGroups));
  }, [studyGroups]);

  useEffect(() => {
    localStorage.setItem("edu_invoices", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem("edu_quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem("edu_events", JSON.stringify(events));
  }, [events]);

  // --- Actions ---
  // These functions modify our state. We pass these functions down to child components
  // so they can trigger changes to the global data.
  
  const handleLoginSuccess = (role, username) => {
    setCurrentUserRole(role);
    setCurrentUsername(username);
  };

  const handleLogout = () => {
    setCurrentUserRole(null);
    setCurrentUsername("");
    try {
      sessionStorage.removeItem('edu_session_v1');
    } catch {
      // ignore
    }
  };


  // State mutation actions passed to Admin Portal
  const handleAddStudent = (newStudent) => {
    // We update arrays by creating a new array with the new item added to the front
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleDeleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleAddFaculty = (newFaculty) => {
    setFaculty(prev => [newFaculty, ...prev]);
  };

  const handleDeleteFaculty = (id) => {
    setFaculty(prev => prev.filter(f => f.id !== id));
  };

  const handleUpdateAsset = (id, updatedAsset) => {
    setAssets(prev => prev.map(ast => ast.id === id ? { ...ast, ...updatedAsset } : ast));
  };

  const handleAddAsset = (newAsset) => {
    setAssets(prev => [newAsset, ...prev]);
  };

  const handleAddInvoice = (newInvoice) => {
    setInvoices(prev => [newInvoice, ...prev]);
  };

  // State mutation actions passed to Teacher Portal
  const handleUpdateCourseGrades = (courseId, updatedGrades) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        // compute dynamic course average percent based on scores & weights
        const totalWeight = updatedGrades.reduce((acc, g) => acc + g.weight, 0);
        const weightedSum = updatedGrades.reduce((acc, g) => acc + (g.score / g.maxScore) * g.weight, 0);
        const avg = totalWeight > 0 ? (weightedSum / totalWeight) * 100 : 0;

        return {
          ...course,
          grades: updatedGrades,
          avgGrade: Number(avg.toFixed(1))
        };
      }
      return course;
    }));
  };

  const handleAddLessonPlan = (newPlan) => {
    setLessonPlans(prev => [newPlan, ...prev]);
  };

  const handleUpdateLessonPlan = (id, updatedPlan) => {
    setLessonPlans(prev => prev.map(p => p.id === id ? { ...p, ...updatedPlan } : p));
  };

  const handleDeleteLessonPlan = (id) => {
    setLessonPlans(prev => prev.filter(p => p.id !== id));
  };

  const handleAddQuiz = (newQuiz) => {
    setQuizzes(prev => [newQuiz, ...prev]);
  };

  const handleAddEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  // State mutation actions passed to Student Portal
  const handleAddStudyGroup = (newGroup) => {
    setStudyGroups(prev => [newGroup, ...prev]);
  };

  const handlePayInvoice = (id) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: "Paid" } : inv));
  };

  const handleEnrollEvent = (eventId, studentId) => {
    setEvents(prev => prev.map(ev => 
      ev.id === eventId && !ev.enrolledStudentIds.includes(studentId)
        ? { ...ev, enrolledStudentIds: [...ev.enrolledStudentIds, studentId] }
        : ev
    ));
  };

  // DEV ONLY: removed role swapping simulation (security requirement)
  // const shiftUserRoleInstantly = (role) => {};


  return (
    <div className="app-wrapper">
      
      {/* Dynamic Render Switch */}
      <div style={{flex: 1}}>
        {currentUserRole === null ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div>
            {/* 
              We pass our data and our modifier functions as "props" down to the portals.
              This allows the portals to read the global data and trigger updates.
            */}
            {currentUserRole === "admin" && (
              <AdminPortal
                students={students}
                faculty={faculty}
                assets={assets}
                invoices={invoices}
                onAddStudent={handleAddStudent}
                onDeleteStudent={handleDeleteStudent}
                onAddFaculty={handleAddFaculty}
                onDeleteFaculty={handleDeleteFaculty}
                onUpdateAsset={handleUpdateAsset}
                onAddAsset={handleAddAsset}
                onAddInvoice={handleAddInvoice}
                username={currentUsername}
                onLogout={handleLogout}
              />
            )}

            {currentUserRole === "teacher" && (
              <TeacherPortal
                courses={courses}
                lessonPlans={lessonPlans}
                students={students}
                quizzes={quizzes}
                events={events}
                onUpdateCourseGrades={handleUpdateCourseGrades}
                onAddLessonPlan={handleAddLessonPlan}
                onUpdateLessonPlan={handleUpdateLessonPlan}
                onDeleteLessonPlan={handleDeleteLessonPlan}
                onAddQuiz={handleAddQuiz}
                onAddEvent={handleAddEvent}
                username={currentUsername}
                onLogout={handleLogout}
              />
            )}

            {currentUserRole === "student" && (
              <StudentPortal
                courses={courses}
                invoices={invoices}
                studyGroups={studyGroups}
                quizzes={quizzes}
                events={events}
                onAddStudyGroup={handleAddStudyGroup}
                onPayInvoice={handlePayInvoice}
                onEnrollEvent={handleEnrollEvent}
                onUpdateCourseGrades={handleUpdateCourseGrades}
                username={currentUsername}
                onLogout={handleLogout}
              />
            )}
          </div>
        )}
      </div>



    </div>
  );
}
