import "./Subject.css";
import ProgressBar from "./Progress.js";

export default function SubjectCard({ subject, onUpdate }) {
  const percentage = ((subject.studied / subject.total) * 100).toFixed(1);

  return (
    <div className="subject-card">
      <h2>{subject.name}</h2>
      <ProgressBar percentage={percentage} />
      <p>
        {subject.studied} / {subject.total} hours ({percentage}%)
      </p>
      <button onClick={() => onUpdate(subject.id)}>+5 hours</button>
    </div>
  );
}
