import { useEffect, useState } from "react";
import { getVideos } from "../../../frontend/src/services/api";

function Videos({ user, onChangeUser }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos()
      .then(data => setVideos(data))
      .catch(() => console.error("Error cargando videos"));
  }, []);

  return (
<div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
  {videos.map(v => (
    <div key={v.id}>
      
      {v.url.includes("youtube") ? (
        <iframe
          width="300"
          height="200"
          src={v.url}
          title={v.titulo}
          allowFullScreen
        />
      ) : (
        <video width="300" controls>
          <source src={v.url} type="video/mp4" />
        </video>
      )}

      <p>{v.titulo}</p>
    </div>
  ))}
</div>
  );
}

export default Videos;