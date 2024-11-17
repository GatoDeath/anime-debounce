import React from "react";
import "./AnimeCard.css";

const AnimeCard = ({ anime }) => {
  const handleAnimeClick = () => {
    if (anime.url) {
      window.open(anime.url, "_blank");
    }
  };

  return (
    <div className="anime-card" onClick={handleAnimeClick}>
      {anime.images?.jpg?.image_url ? (
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title || "Anime"}
          className="anime-image"
        />
      ) : (
        <div className="placeholder">
          <p>Imagen no disponible</p>
        </div>
      )}
      <p className="anime-title">{anime.title || "Título no disponible"}</p>
    </div>
  );
};

export default AnimeCard;
