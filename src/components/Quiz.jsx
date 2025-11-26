import { useState } from 'react';

export default function Quiz() {
  // State for answers (start as empty object {})
  const [answers, setAnswers] = useState({});
  // State for result (start as null)
  const [result, setResult] = useState(null);

  // Add an error state to show message when quiz is incomplete
  const [error, setError] = useState('');

  // Define required questions and check whether all have been answered
  const requiredQuestions = ['color', 'activity', 'size'];
  const answeredAll = requiredQuestions.every((q) => Boolean(answers[q]));

  function handleAnswer(question, answer) {
    setAnswers({ ...answers, [question]: answer });
  }

  function handleSubmit() {
    // Prevent submitting if not all questions answered
    if (!answeredAll) {
      setError('Please answer all questions before submitting.');
      return;
    }

    // Clear any previous error and proceed with existing scoring logic
    setError('');
    // Example dog types: Labrador, Poodle, Bulldog
    const { color, activity, size } = answers;
    if (color === 'yellow' && activity === 'fetch' && size === 'large') {
      setResult('You are a Labrador!');
    } else if (color === 'white' && activity === 'run' && size === 'medium') {
      setResult('You are a Poodle!');
    } else if (color === 'brown' && activity === 'nap' && size === 'small') {
      setResult('You are a Bulldog!');
    } else {
      setResult('You are a unique mix!');
    }
  }

  return (
    <div>
      <h2>Which Dog Are You?</h2>
      <p>Answer these questions to find your dog match!</p>

      {/* Question 1 */}
      <div>
        <p>What is your favorite color?</p>
        <button onClick={() => handleAnswer('color', 'yellow')}>Yellow</button>
        <button onClick={() => handleAnswer('color', 'white')}>White</button>
        <button onClick={() => handleAnswer('color', 'brown')}>Brown</button>
      </div>

      {/* Question 2 */}
      <div>
        <p>What is your favorite activity?</p>
        <button onClick={() => handleAnswer('activity', 'fetch')}>Playing Fetch</button>
        <button onClick={() => handleAnswer('activity', 'run')}>Running</button>
        <button onClick={() => handleAnswer('activity', 'nap')}>Napping</button>
      </div>

      {/* Question 3 */}
      <div>
        <p>What is your ideal size?</p>
        <button onClick={() => handleAnswer('size', 'large')}>Large</button>
        <button onClick={() => handleAnswer('size', 'medium')}>Medium</button>
        <button onClick={() => handleAnswer('size', 'small')}>Small</button>
      </div>

      {/* Show error if quiz incomplete */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Submit button (disabled until all required questions answered) */}
      <button onClick={handleSubmit} disabled={!answeredAll}>
        Submit
      </button>

      {/* Show result when available */}
      {result && (
        <div>
          <h3>Your Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}