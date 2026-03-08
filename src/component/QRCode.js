import { useState } from "react";

function QRCode({ value, size }) {
  const [loaded, setLoaded] = useState(false);

  const url =
    "https://api.qrserver.com/v1/create-qr-code/?size=" +
    size +
    "x" +
    size +
    "&data=" +
    encodeURIComponent(value);

  return (
    <div className="qr-box" style={{ width: size, height: size }}>
      {!loaded && <p>loading...</p>}
      <img
        src={url}
        width={size}
        height={size}
        alt="qr code"
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? "block" : "none" }}
      />
    </div>
  );
}

export default QRCode;
