import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { name: "Aman", score: 78 },
    { name: "Riya", score: 45 },
  ]);

  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const addStudent = () => {
    if (!name || !score) return;
    setStudents([...students, { name, score: Number(score) }]);
    setName("");
    setScore("");
  };

  const updateScore = (index, newScore) => {
    const updated = [...students];
    updated[index].score = Number(newScore);
    setStudents(updated);
  };

  const total = students.length;
  const passed = students.filter((s) => s.score >= 40).length;
  const avg =
    total === 0
      ? 0
      : Math.round(
          students.reduce((acc, s) => acc + s.score, 0) / total
        );

  return (
    <div className="container">
      <h1 className="title">STUDENT SCOREBOARD</h1>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Score (0-100)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button onClick={addStudent}>+ ADD</button>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="card">
          <h3>Total</h3>
          <p>{total}</p>
        </div>
        <div className="card">
          <h3>Passed</h3>
          <p>{passed}</p>
        </div>
        <div className="card">
          <h3>Avg Score</h3>
          <p>{avg}</p>
        </div>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.score}</td>
              <td className={s.score >= 40 ? "pass" : "fail"}>
                {s.score >= 40 ? "PASS" : "FAIL"}
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={s.score}
                  onBlur={(e) => updateScore(i, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;