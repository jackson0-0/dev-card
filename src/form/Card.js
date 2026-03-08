import QRCode from "../component/QRCode";

function Card({ data }) {
  let qrValue =
    data.portfolio ||
    data.github ||
    data.linkedin ||
    data.email ||
    "https://github.com";

  return (
    <div className="card">
      <div className="card-top">
        <div>
          <p className="card-tag">developer</p>
          <h2 className="card-name">{data.name || "your name"}</h2>
          <p className="card-major">
            {data.major || "computer science"}
            {data.year ? " - class of " + data.year : ""}
          </p>
          <p className="card-uni">{data.university || "your university"}</p>
        </div>
        <QRCode value={qrValue} size={90} />
      </div>

      <hr className="card-divider" />

      <div className="card-links">
        {data.email && (
          <div className="card-link-row">
            <span className="card-link-icon">email</span>
            <span className="card-link-text">{data.email}</span>
          </div>
        )}
        {data.github && (
          <div className="card-link-row">
            <span className="card-link-icon">github</span>
            <span className="card-link-text">
              {data.github.replace("https://", "")}
            </span>
          </div>
        )}
        {data.linkedin && (
          <div className="card-link-row">
            <span className="card-link-icon">linkedin</span>
            <span className="card-link-text">
              {data.linkedin.replace("https://linkedin.com/in/", "@")}
            </span>
          </div>
        )}
        {data.portfolio && (
          <div className="card-link-row">
            <span className="card-link-icon">portfolio</span>
            <span className="card-link-text">
              {data.portfolio.replace("https://", "")}
            </span>
          </div>
        )}
      </div>

      {data.skills.length > 0 && (
        <div className="card-skills">
          {data.skills.map((skill) => (
            <span key={skill} className="card-skill">
              {skill}
            </span>
          ))}
        </div>
      )}

      <p className="card-footer">scan to connect</p>
    </div>
  );
}

export default Card;
