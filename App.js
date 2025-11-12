import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SubjectCard from "./Components/Subject.js";
import ChecklistPage from "./Components/ChecklistPage.js";
import subjectsData from "./Components/data/subjectData.js";
import "./Components/Subject.css";

export default function App() {
  const [subjects, setSubjects] = useState(subjectsData);
  const navigate = useNavigate();

  const updateSubject = (id, hours) => {
    setSubjects(prev =>
      prev.map(sub =>
        sub.id === id
          ? { ...sub, studied: Math.min(sub.studied + hours, sub.total) }
          : sub
      )
    );
  };

  return (
    <Routes>
      {/* Home page showing subject cards */}
      <Route
        path="/"
        element={
          <div className="subject-list">
            {subjects.map(subject => (
              <div
                key={subject.id}
                onClick={() => navigate(`/subject/${subject.id}`)}
              >
                <SubjectCard
                  subject={subject}
                  onUpdate={() => updateSubject(subject.id, 5)}
                />
              </div>
            ))}
          </div>
        }
      />

      {/* Individual subject page with checklist */}
      <Route
        path="/subject/:id"
        element={<ChecklistPage subjects={subjects} onUpdate={updateSubject} />}
      />
    </Routes>
  );
}


