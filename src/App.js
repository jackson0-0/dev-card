import { useState, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Card from "./form/Card";
import LinkInBio from "./component/LinkInBio";
import html2canvas from "html2canvas";

const skills = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "FastAPI",
  "Java",
  "C++",
  "C",
  "Go",
  "Rust",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Git",
  "AWS",
  "Linux",
  "Machine Learning",
  "TailwindCSS",
];

function Generator() {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  function addSkill() {
    if (
      skillInput &&
      !selectedSkills.includes(skillInput) &&
      selectedSkills.length < 8
    ) {
      setSelectedSkills([...selectedSkills, skillInput]);
    }
    setSkillInput("");
  }

  function removeSkill(skill) {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  }

  function downloadCard() {
    html2canvas(cardRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "devcard.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  function saveCard() {
    fetch("https://dev-card-production.up.railway.app/save-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("card saved! your url is: localhost:3000/" + data.url);
      });
  }

  const cardData = {
    name,
    university,
    major,
    year,
    email,
    github,
    linkedin,
    portfolio,
    skills: selectedSkills,
  };

  return (
    <div className="app">
      <h1>dev card generator</h1>
      <p>create your student developer portfolio card</p>

      <div className="app-body">
        <div className="form">
          <label>full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="bruh"
          />

          <label>university</label>
          <input
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            placeholder="mit"
          />

          <label>major</label>
          <input
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="computer science"
          />

          <label>graduation year</label>
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2027"
          />

          <label>email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="bruh@mit.edu"
          />

          <label>github url</label>
          <input
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="https://github.com/bruh"
          />

          <label>linkedin url</label>
          <input
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/bruh"
          />

          <label>portfolio / resume url</label>
          <input
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            placeholder="https://bruh.dev"
          />

          <label>skills (max 8)</label>
          <div className="skill-row">
            <select
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            >
              <option value="">pick a skill...</option>
              {skills
                .filter((s) => !selectedSkills.includes(s))
                .map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
            <button className="add-btn" onClick={addSkill}>
              +
            </button>
          </div>

          <div className="skill-tags">
            {selectedSkills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
                <span onClick={() => removeSkill(skill)}>x</span>
              </span>
            ))}
          </div>

          <button
            className="preview-btn"
            onClick={() => navigate("/" + name.toLowerCase().replace(" ", ""))}
          >
            preview page
          </button>
        </div>

        <div className="card-preview">
          <p>card preview</p>
          <div ref={cardRef}>
            <Card data={cardData} />
          </div>
          <button className="download-btn" onClick={downloadCard}>
            download card
          </button>
          <button className="save-btn" onClick={saveCard}>
            save card
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Generator />} />
      <Route path="/:username" element={<LinkInBio />} />
    </Routes>
  );
}

export default App;
