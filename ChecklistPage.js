import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressBar from "./Progress.js";
import "./Subject.css";

export default function ChecklistPage({ subjects, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const subject = subjects.find(sub => sub.id === Number(id));

  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete Unit 1 Notes", done: false },
    { id: 2, text: "Solve Practice Problems", done: false },
    { id: 3, text: "Revise Key Concepts", done: false },
    { id: 4, text: "Attempt Quiz", done: false },
  ]);

  const [progress, setProgress] = useState(subject.studied);

  useEffect(() => {
    const doneCount = tasks.filter(t => t.done).length;
    const newProgress = (doneCount / tasks.length) * subject.total;
    setProgress(newProgress);
    onUpdate(subject.id, newProgress - subject.studied);
  }, [tasks]);

  if (!subject) return <p>Subject not found.</p>;

  const percentage = ((progress / subject.total) * 100).toFixed(1);

  return (
    <div className="subject-card" style={{ maxWidth: "500px", margin: "auto" }}>
      <button onClick={() => navigate("/")}>⬅ Back</button>
      <h2>{subject.name} Checklist</h2>

      <ProgressBar percentage={percentage} />
      <p>
        {progress} / {subject.total} hours ({percentage}%)
      </p>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() =>
                  setTasks(prev =>
                    prev.map(t =>
                      t.id === task.id ? { ...t, done: !t.done } : t
                    )
                  )
                }
              />
              {task.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
