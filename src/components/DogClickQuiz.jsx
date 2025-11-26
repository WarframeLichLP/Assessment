import { useEffect, useState } from 'react';
import { getBreedFromUrl, fetchBreedList, fetchRandomImage } from '../lib/dogApi';

export default function DogClickQuiz() {
  const TOTAL_QUESTIONS = 5;
  const [breeds, setBreeds] = useState([]);
  const [questions, setQuestions] = useState([]); // [{imageUrl, breed, options}]
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      setLoading(true);
      const list = await fetchBreedList();
      setBreeds(list);
      const qs = [];
      for (let i = 0; i < TOTAL_QUESTIONS; i++) {
        const img = await fetchRandomImage();
        const breed = getBreedFromUrl(img) || 'unknown';
        // pick two wrong choices
        const choices = new Set([breed]);
        while (choices.size < 3 && list.length > 1) {
          const other = list[Math.floor(Math.random() * list.length)];
          choices.add(other);
        }
        // shuffle options
        const options = Array.from(choices).sort(() => Math.random() - 0.5);
        qs.push({ imageUrl: img, breed, options });
      }
      setQuestions(qs);
      setIndex(0);
      setScore(0);
      setFinished(false);
      setLoading(false);
    }
    init();
  }, []);

  function handleChoice(choice) {
    const q = questions[index];
    if (!q) return;
    if (choice === q.breed) setScore((s) => s + 1);
    const next = index + 1;
    if (next >= questions.length) {
      setFinished(true);
    } else {
      setIndex(next);
    }
  }

  function restart() {
    // simple reload: re-run the effect by resetting state
    setQuestions([]);
    setIndex(0);
    setScore(0);
    setFinished(false);
    setLoading(true);
    // re-run init by forcing effect: easiest is to reload window or re-run fetch sequence
    // We'll re-run by fetching new questions inline:
    (async () => {
      const list = await fetchBreedList();
      setBreeds(list);
      const qs = [];
      for (let i = 0; i < TOTAL_QUESTIONS; i++) {
        const img = await fetchRandomImage();
        const breed = getBreedFromUrl(img) || 'unknown';
        const choices = new Set([breed]);
        while (choices.size < 3 && list.length > 1) {
          const other = list[Math.floor(Math.random() * list.length)];
          choices.add(other);
        }
        const options = Array.from(choices).sort(() => Math.random() - 0.5);
        qs.push({ imageUrl: img, breed, options });
      }
      setQuestions(qs);
      setIndex(0);
      setScore(0);
      setFinished(false);
      setLoading(false);
    })();
  }

  if (loading) return <p>Preparing quiz...</p>;
  if (questions.length === 0) return <p>No questions available.</p>;

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    let className = 'score-mid';
    if (percent === 100) className = 'score-100';
    else if (percent === 0) className = 'score-0';

    return (
      <div style={{ maxWidth: 600 }}>
        <h2>Quiz Result</h2>
        <div className={`score-box ${className}`} style={{ padding: 16, borderRadius: 8 }}>
          <p style={{ margin: 0 }}>You scored {score} / {questions.length}</p>
          <p style={{ fontSize: 24, fontWeight: 'bold', margin: '8px 0' }}>{percent}%</p>
        </div>
        <button onClick={restart} style={{ marginTop: 12 }}>Try Again</button>
      </div>
    );
  }

  const q = questions[index];
  return (
    <div style={{ maxWidth: 700 }}>
      <h2>Which Dog is This?</h2>
      <p>Question {index + 1} of {questions.length}</p>

      <div style={{ marginBottom: 12 }}>
        <img src={q.imageUrl} alt="dog" style={{ maxWidth: '100%', borderRadius: 8 }} />
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {q.options.map((opt) => (
          <button key={opt} onClick={() => handleChoice(opt)}>{opt}</button>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <small>Score: {score}</small>
      </div>
    </div>
  );
}
