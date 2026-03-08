import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function LinkInBio() {
  const { username } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/card/" + username)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [username]);

  if (!data) return <p>loading...</p>;

  let initials = "yn";
  if (data.name) {
    initials = data.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  let skills = [];
  if (data.skills) {
    skills = data.skills.replace(/[\[\]']/g, "").split(", ");
  }

  return (
    <div className="bio">
      <div className="bio-content">
        <div className="bio-avatar">{initials}</div>
        <h1 className="bio-name">{data.name}</h1>
        <p className="bio-title">
          {data.major} @ {data.university}
        </p>
        <p className="bio-year">class of {data.year}</p>

        <div className="bio-skills">
          {skills.map((skill) => (
            <span key={skill} className="bio-skill">
              {skill}
            </span>
          ))}
        </div>

        <hr className="bio-divider" />

        <p className="bio-links-label">links</p>
        <div className="bio-links">
          {data.portfolio && (
            <a
              href={data.portfolio}
              target="_blank"
              rel="noreferrer"
              className="bio-link primary"
            >
              <span className="bio-link-icon">portfolio</span>
              <span className="bio-link-arrow">→</span>
            </a>
          )}
          {data.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noreferrer"
              className="bio-link"
            >
              <span className="bio-link-icon">github</span>
              <span className="bio-link-arrow">→</span>
            </a>
          )}
          {data.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noreferrer"
              className="bio-link"
            >
              <span className="bio-link-icon">linkedin</span>
              <span className="bio-link-arrow">→</span>
            </a>
          )}
          {data.email && (
            <a
              href={"mailto:" + data.email}
              target="_blank"
              rel="noreferrer"
              className="bio-link"
            >
              <span className="bio-link-icon">email</span>
              <span className="bio-link-arrow">→</span>
            </a>
          )}
        </div>

        <p className="bio-footer">devcard.app/{username}</p>
      </div>
    </div>
  );
}

export default LinkInBio;
