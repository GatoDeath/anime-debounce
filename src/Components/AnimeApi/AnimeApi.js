import React, { useEffect, useState } from "react";
import { useDebounce } from "../../Hooks/useDebounce";
import AnimeCard from "../AnimeCard/AnimeCard";
import "./AnimeApi.css";

const AnimeApi = () => {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceValue = useDebounce(userInput, 1000);

  useEffect(() => {
    const getData = async () => {
      if (!debounceValue) {
        setData([]);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      setHasSearched(true);
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${debounceValue}`
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data from Jikan API:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [debounceValue]);

  const handleChange = ({ target }) => {
    setUserInput(target.value);
  };

  return (
    <div className="animes-container">
      <input
        className="search-input"
        id="search"
        type="text"
        placeholder="Buscar un anime"
        required
        value={userInput}
        onChange={handleChange}
      />
      {isLoading && <p className="loading">Cargando...</p>}
      <div className="anime-list">
        {!isLoading && hasSearched && data.length === 0 && (
          <p className="no-results">No se encontraron resultados.</p>
        )}
        {data.map((anime, index) => (
          <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default AnimeApi;
