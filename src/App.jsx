import React from "react";  
import { useState, useEffect } from "react";
import { getBreedsList, getRandomDogImage } from "./lib/dogApi";
import Quiz from "./components/Quiz";

export default function App() {
  // 1. Create state for dogs and loading

  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    setLoading(true);
    setError(null);
    getBreedsList()
      .then((list) => setBreeds(list))
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, []);

  async function handleRandomImage() {
    setImageLoading(true);
    setImageUrl(null);
    try {
      const url = await getRandomDogImage();
      setImageUrl(url);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setImageLoading(false);
    }
  }

  // breedName may be "subbreed breed" (e.g. "boston bulldog") — convert to API path
  async function handleBreedImage(breedName) {
    setImageLoading(true);
    setImageUrl(null);
    setError(null);
    try {
      let path;
      const parts = breedName.split(" ");
      if (parts.length === 1) {
        path = `https://dog.ceo/api/breed/${parts[0]}/images/random`;
      } else if (parts.length === 2) {
        // parts[0] = subbreed, parts[1] = breed -> API expects breed/subbreed
        path = `https://dog.ceo/api/breed/${parts[1]}/${parts[0]}/images/random`;
      } else {
        throw new Error("Unsupported breed format");
      }

      const res = await fetch(path);
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const data = await res.json();
      if (!data || data.status !== "success" || typeof data.message !== "string") {
        throw new Error("Unexpected response from breed image API");
      }
      setImageUrl(data.message);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setImageLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Dog Explorer</h1>

      <nav style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setCurrentPage('home')}>Home</button>
        <button onClick={() => setCurrentPage('quiz')}>Dog Quiz</button>
      </nav>

      {currentPage === 'home' && (
        <div>
          <div style={{ marginBottom: 12 }}>
            <button onClick={handleRandomImage} disabled={imageLoading}>
              {imageLoading ? "Loading image..." : "Show Random Image"}
            </button>
          </div>

          {imageUrl && (
            <div style={{ marginBottom: 12 }}>
              <img
                src={imageUrl}
                alt="Dog"
                style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
                onError={() => setError("Failed to load image")}
              />
            </div>
          )}

          {/* 3. Show "Loading..." while loading, otherwise show the list of breeds */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "crimson" }}>Error: {error}</p>
          ) : (
            <div>
              <h2>Breeds ({breeds.length})</h2>
              <ul style={{ columns: 2, gap: 16 }}>
                {breeds.map((b) => (
                  <li key={b} style={{ marginBottom: 8 }}>
                    <button onClick={() => handleBreedImage(b)} style={{ marginRight: 8 }}>
                      Show image
                    </button>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {currentPage === 'quiz' && (
        <div>
          <DogClickQuiz />
        </div>
      )}
    </div>
  );
}
