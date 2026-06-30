export const initialStudents = [
  { id: "S101", name: "Amira Patel", email: "amira.patel@edumanager.org", gradeLevel: "Grade 12", parentContact: "+1 (555) 234-5678", status: "Active", attendancePercent: 97.4 },
  { id: "S102", name: "Benjamin Chen", email: "b.chen@edumanager.org", gradeLevel: "Grade 11", parentContact: "+1 (555) 345-6789", status: "Active", attendancePercent: 94.2 },
  { id: "S103", name: "Chloe Dupont", email: "chloe.d@edumanager.org", gradeLevel: "Grade 12", parentContact: "+1 (555) 456-7890", status: "Active", attendancePercent: 91.8 },
  { id: "S104", name: "Devon Miller", email: "devon.miller@edumanager.org", gradeLevel: "Grade 10", parentContact: "+1 (555) 567-8901", status: "On Leave", attendancePercent: 82.5 },
  { id: "S105", name: "Elena Rostova", email: "e.rostova@edumanager.org", gradeLevel: "Grade 12", parentContact: "+1 (555) 678-9012", status: "Active", attendancePercent: 99.1 },
  { id: "S106", name: "Farhan Qureshi", email: "f_qureshi@edumanager.org", gradeLevel: "Grade 11", parentContact: "+1 (555) 789-0123", status: "Suspended", attendancePercent: 78.0 }
];

export const initialFaculty = [
  { id: "F301", name: "Dr. Marcus Vance", email: "marcus.vance@edumanager.org", department: "Science & Physics", phone: "+1 (555) 123-9988", status: "Active", assignedClassesCount: 3 },
  { id: "F302", name: "Prof. Sarah Jenkins", email: "s.jenkins@edumanager.org", department: "Mathematics", phone: "+1 (555) 123-9944", status: "Active", assignedClassesCount: 4 },
  { id: "F303", name: "Dr. Alistair Sterling", email: "alistair.s@edumanager.org", department: "History & Hum.", phone: "+1 (555) 123-9922", status: "Active", assignedClassesCount: 2 },
  { id: "F304", name: "Elena Vasquez", email: "e.vasquez@edumanager.org", department: "Languages", phone: "+1 (555) 123-9911", status: "On Leave", assignedClassesCount: 1 }
];

export const initialAssets = [
  { id: "AST-901", name: "Epson 4K Laser Projector", type: "Hardware", status: "Assigned", allocatedTo: "Room 302 (Physics Lab)" },
  { id: "AST-902", name: "iPad Pro 12.9\" Multi-pack (x15)", type: "Hardware", status: "Available", allocatedTo: "Unassigned" },
  { id: "AST-903", name: "Unity Design Suite Virtual Licenses", type: "Digital License", status: "Assigned", allocatedTo: "Room 105 (Computer Science Lab)" },
  { id: "AST-904", name: "Premium Chemistry Spectrophotometer", type: "Lab Material", status: "Maintenance", allocatedTo: "Unassigned" },
  { id: "AST-905", name: "Oculus Quest II Headsets (x10)", type: "Hardware", status: "Assigned", allocatedTo: "Room 201 (History Studio)" }
];

export const initialCourses = [
  {
    id: "C-101",
    code: "PHYS-102",
    name: "AP Physics: Mechanics & Optics",
    teacherName: "Dr. Marcus Vance",
    avgGrade: 88.5,
    schedule: "Mon/Wed 10:00 AM - 11:30 AM",
    room: "Room 302",
    term: "Fall 2026",
    grades: [
      { id: "g1", title: "Midterm Exam", score: 85, maxScore: 100, weight: 30 },
      { id: "g2", title: "Lab Experiment: Refraction", score: 94, maxScore: 100, weight: 20 },
      { id: "g3", title: "Kinematics Analysis Report", score: 90, maxScore: 100, weight: 20 },
      { id: "g4", title: "Homework Set 1-4", score: 80, maxScore: 100, weight: 15 },
      { id: "g5", title: "Optics Presentation", score: 95, maxScore: 100, weight: 15 }
    ]
  },
  {
    id: "C-102",
    code: "MATH-401",
    name: "Advanced Calculus & Linear Algebra",
    teacherName: "Prof. Sarah Jenkins",
    avgGrade: 82.1,
    schedule: "Tue/Thu 09:00 AM - 10:30 AM",
    room: "Room 305",
    term: "Fall 2026",
    grades: [
      { id: "g6", title: "Partial Derivatives Homework", score: 78, maxScore: 100, weight: 20 },
      { id: "g7", title: "Linear Transformations quiz", score: 84, maxScore: 100, weight: 20 },
      { id: "g8", title: "Integral Optimization midterm", score: 81, maxScore: 100, weight: 40 },
      { id: "g9", title: "Matrix Applications project", score: 89, maxScore: 100, weight: 20 }
    ]
  },
  {
    id: "C-103",
    code: "HIST-220",
    name: "Ancient Civilizations & Anthropological Records",
    teacherName: "Dr. Alistair Sterling",
    avgGrade: 91.2,
    schedule: "Mon/Wed 01:00 PM - 02:30 PM",
    room: "Room 201",
    term: "Fall 2026",
    grades: [
      { id: "g10", title: "Mesopotamian Irrigation Essay", score: 95, maxScore: 100, weight: 30 },
      { id: "g11", title: "Roman Aqueducts Case Study", score: 88, maxScore: 100, weight: 30 },
      { id: "g12", title: "Oral Presentation - Dynasties", score: 92, maxScore: 100, weight: 40 }
    ]
  }
];

export const initialLessonPlans = [
  { id: "LP-01", title: "Angular Kinematics Overview", description: "Introduce angular velocity, rotational inertia, and torque vector parameters.", dueDate: "2026-06-18", status: "Completed", classCode: "PHYS-102" },
  { id: "LP-02", title: "Coulomb's Law Demonstration", description: "Design a interactive tabletop setup involving charged micro-spheres to map repulsion.", dueDate: "2026-06-25", status: "Review", classCode: "PHYS-102" },
  { id: "LP-03", title: "Optics Refraction Lab Setup", description: "Prepare the double-slit laser kit, safety goggles, and measurement pads for students.", dueDate: "2026-07-02", status: "Draft", classCode: "PHYS-102" },
  { id: "LP-04", title: "Eigenvalues & Eigenvectors", description: "Detailed theoretical proving of diagonalizable square systems and steady states.", dueDate: "2026-06-20", status: "Review", classCode: "MATH-401" }
];

export const initialStudyGroups = [
  { id: "SG-01", name: "Optics & Light Study Team", courseCode: "PHYS-102", memberCount: 4, meetingLink: "https://meet.google.com/xyz-optics" },
  { id: "SG-02", name: "Calculus Matrix Masters", courseCode: "MATH-401", memberCount: 5, meetingLink: "https://meet.google.com/abc-calculus" },
  { id: "SG-03", name: "Ancient Nile Archaeologists", courseCode: "HIST-220", memberCount: 3, meetingLink: "https://meet.google.com/mno-history" }
];

export const initialInvoices = [
  { id: "INV-6671", issueDate: "2026-06-01", dueDate: "2026-06-30", amount: 2450.00, status: "Pending", description: "Fall 2026 Standard Tuition & Lab Maintenance Fee" },
  { id: "INV-5890", issueDate: "2026-05-01", dueDate: "2026-05-30", amount: 150.00, status: "Paid", description: "Annual Technology Infrastructure & Software Licenses Fee" },
  { id: "INV-4122", issueDate: "2026-03-15", dueDate: "2026-04-15", amount: 80.00, status: "Paid", description: "AP Physics Laboratory Textbook & Material Kits" }
];

export const initialQuizzes = [
  {
    id: "Q-101",
    title: "Midterm Exam Prep: Kinematics",
    courseId: "C-101",
    dueDate: "2026-06-25",
    maxScore: 100,
    questions: [
      { id: "qq1", question: "What is the SI unit of velocity?", options: ["m/s^2", "m/s", "N", "J"], correctAnswerIndex: 1 },
      { id: "qq2", question: "Newton's Second Law is represented by:", options: ["F = ma", "E = mc^2", "v = d/t", "P = IV"], correctAnswerIndex: 0 },
    ]
  },
  {
    id: "Q-102",
    title: "Derivatives Practice Quiz",
    courseId: "C-102",
    dueDate: "2026-06-28",
    maxScore: 50,
    questions: [
      { id: "qq3", question: "What is the derivative of x^2?", options: ["x", "2x", "x^3/3", "1"], correctAnswerIndex: 1 },
      { id: "qq4", question: "Derivative of sin(x) is:", options: ["-cos(x)", "sin(x)", "cos(x)", "tan(x)"], correctAnswerIndex: 2 },
    ]
  }
];

export const initialEvents = [
  {
    id: "EV-01",
    title: "Annual Science Fair",
    date: "2026-07-15",
    time: "10:00 AM - 03:00 PM",
    location: "Main Gymnasium",
    description: "Showcase your physics and chemistry projects to the entire school and guest judges.",
    enrolledStudentIds: ["S101", "S105"]
  },
  {
    id: "EV-02",
    title: "University Admissions Seminar",
    date: "2026-08-05",
    time: "01:00 PM - 02:30 PM",
    location: "Auditorium",
    description: "Special guest speakers from top universities discuss the application process and requirements.",
    enrolledStudentIds: []
  }
];
