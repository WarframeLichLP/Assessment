# 🐶 Which Dog Are You? — Build a Dog Quiz App!

You will make a fun app with dog pictures! Your app will:

1. Show **random dog pictures**
2. Let users take a **quiz to find their dog match**
3. (Extra Challenge) Let users **save their favorite dogs**

Each step should take about **30–45 minutes**.

### [React Slides](https://www.canva.com/design/DAG5oCM82e8/TGmpjENy9jF_DKXeyin_5g/edit?utm_content=DAG5oCM82e8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

# Getting Started

## STEP 0: Install React and Vite (REQUIRED!)

**⚠️ Important: Your project is missing React! Follow these steps first:**

### 1. Add React to your project

Open your terminal and type:

```bash
npm install react react-dom
```

### 2. Add Vite config file

Create a new file called `vite.config.js` in your main folder and add this code:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
  }
})
```

This tells Vite how to understand React code.

### 3. Install other tools you need

```bash
npm install
```

This downloads everything your project needs to work.

### 4. Start your project

```bash
npm run dev
```

You should see a link like `http://localhost:5173`. Click it to see your app!

### 5. Run tests to check your work

```bash
npm test
```

Tests make sure your code works correctly.

---

# What You Will Build

Your app will let users:

* Click a button to see a **random dog picture**
* Pick a **dog breed** from a list and see a dog from that breed
* Take a **quiz** to find out which dog matches them
* (Extra) **Save** their favorite dogs

You will learn:

* How to get pictures from the internet (API calls)
* How to show "Loading..." messages
* How to show pictures and text on the screen
* How to make buttons that do things
* How to test your code

---

# Build Your App Step by Step

Follow these steps in order. Each step adds something new!

---

# Step 1: Set Up Your Project (30–45 minutes)

### ✅ Task 1A — Clean Up the Starting Code

* Open the file `src/App.jsx`
* Delete what's there and write this instead:

  ```jsx
  export default function App() {
    return <h1>Dog Explorer</h1>;
  }
  ```

### ✅ Task 1B — Make Folders for Your Files

Inside the `src/` folder, make these new folders:

```
components/   (for your React pieces)
lib/         (for helper code)
```

**How to make folders:**
- In your code editor, right-click on `src/` and choose "New Folder"
- Or use the terminal: `mkdir src/components src/lib`

### ✅ Task 1C — Add a CSS File (RECOMMENDED)

Create `src/styles.css` and add some basic styles:

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f0f8ff;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

img {
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
```

Then add this to `src/main.jsx` at the top:

```jsx
import './styles.css';
```

### ✅ Check Your Work

1. Type `npm run dev` in the terminal
2. Open the link (usually `http://localhost:5173`)
3. You should see **Dog Explorer** on the page!

---

# Step 2: Show Random Dog Pictures (45 minutes)

### ✅ Task 2A — Make a RandomDog Component

Create a new file called `src/components/RandomDog.jsx` and add this starter code:

```jsx
import { useState } from 'react';

export default function RandomDog() {
  // TODO: Add state variables for imageUrl, breed, isLoading, and error

  return (
    <div>
      <h2>Random Dog Picture</h2>
      <button>Get Random Dog</button>

      {/* TODO: Show loading message */}
      {/* TODO: Show error message */}
      {/* TODO: Show dog image and breed name */}
    </div>
  );
}
```

**What you need to do:**
- Add state for `imageUrl` (to hold the dog picture link)
- Add state for `breed` (to hold the dog's breed name)
- Add state for `isLoading` (to show "Loading..." while we wait)
- Add state for `error` (to show if something goes wrong)

**Hint:** Use `useState` to create variables that can change.

### ✅ Task 2B — Get a Dog Picture from the Internet

**Your tasks:**
1. Create a function called `fetchRandomDog` inside your component
2. When the button is clicked, this function should:
   - Set `isLoading` to true
   - Clear any errors
   - Fetch a dog image from: `https://dog.ceo/api/breeds/image/random`
   - Save the image URL to state
   - Set `isLoading` to false

**Hints:**
- Use `async function fetchRandomDog() { ... }`
- Use `fetch()` to get data from the internet
- Use `await response.json()` to read the data
- The image URL is in `data.message`
- Use `try...catch` to handle errors
- Connect your button: `<button onClick={fetchRandomDog}>`

### ✅ Task 2C — Show the Dog Picture

**Your tasks:**
1. Show "Loading dog picture..." when `isLoading` is true
2. Show an error message (in red) when there's an error
3. Show the dog image and breed name when `imageUrl` exists

**Hints:**
- Use `{isLoading && <p>Loading dog picture...</p>}`
- Use `{error && <p style={{color: 'red'}}>{error}</p>}`
- Use `{imageUrl && <div>...</div>}` to show the image
- For the image: `<img src={imageUrl} alt="A random dog" />`
- For the breed: `<p>Breed: {breed || 'Unknown'}</p>`

### ✅ Task 2D — Figure Out the Dog's Breed

The dog picture link has the breed name hidden inside! For example:
`https://images.dog.ceo/breeds/beagle/n.jpg` ← "beagle" is in the middle!

**Your tasks:**
1. Import the `getBreedFromUrl` function from `../lib/dogApi`
2. Use this function to get the breed name from the image URL
3. Save the breed name to state

**Hint:** In your fetch function, after getting the image URL, add:
```jsx
setBreed(getBreedFromUrl(data.message));
```

### ✅ Task 2E — Add RandomDog to Your App

**Your tasks:**
1. Open `src/App.jsx`
2. Import the `RandomDog` component
3. Add it to your app so it shows on the page

**Hint:** You need to import at the top and use `<RandomDog />` in the return section.

### ✅ Check Your Work

1. Run `npm run dev`
2. Click the "Get Random Dog" button
3. You should see:
   - "Loading dog picture..." while it loads
   - A dog picture
   - The breed name below the picture

4. Run the test:
```bash
npm test
```

The `getBreedFromUrl` test should pass with a ✓ checkmark!

---

# Step 3: Pick Dogs by Breed (45 minutes)

### ✅ Task 3A — Get a List of All Dog Breeds

We need to download a list of dog breeds when the page loads.

**Your tasks:**
1. Import `useEffect` from React (add it next to `useState`)
2. Add a new state variable called `breeds` (it should start as an empty array `[]`)
3. Create a `useEffect` that runs when the page loads
4. Inside the useEffect, fetch the breed list from: `https://dog.ceo/api/breeds/list/all`
5. Turn the data into a list using `Object.keys(data.message)`
6. Save the list to your `breeds` state

**Hints:**
- Import: `import { useState, useEffect } from 'react';`
- Add state: `const [breeds, setBreeds] = useState([]);`
- useEffect runs once if you add `[]` at the end
- The `[]` means "do this once when page loads"

**What useEffect does:**
- `useEffect` runs code when the page first loads
- It's perfect for getting data right away

### ✅ Task 3B — Add a Dropdown Menu

**Your tasks:**
1. Add a dropdown (`<select>`) to your return section
2. Put it after the h2 title
3. Show all the breeds as options
4. When someone picks a breed, call a function to get that dog

**Hints:**
- Use `<select onChange={(e) => fetchDogByBreed(e.target.value)}>`
- Use `breeds.map()` to create an `<option>` for each breed
- Don't forget to add `key={breed}` to each option
- Add a default option: `<option value="">-- Choose a breed --</option>`

### ✅ Task 3C — Get Dogs by Breed

**Your tasks:**
1. Create a new function called `fetchDogByBreed`
2. It should take a `breedName` as input
3. If no breed is picked, return early (do nothing)
4. Fetch a dog image from: `https://dog.ceo/api/breed/${breedName}/images/random`
5. Update the image and breed in state

**Hints:**
- This function is similar to `fetchRandomDog`
- Use `if (!breedName) return;` to exit early
- Use template literals for the URL: `` `https://.../${breedName}/...` ``
- Don't forget to set loading and error states
- You can set the breed directly: `setBreed(breedName);`

### ✅ Check Your Work

1. Run `npm run dev`
2. You should see a dropdown menu with dog breeds
3. Pick a breed from the list
4. A dog from that breed should appear!
5. Try picking different breeds

---

# Step 4: Make the Dog Quiz (45–60 minutes)

### ✅ Task 4A — Create the Quiz Component

Create a new file called `src/components/Quiz.jsx` with this starter code:

```jsx
import { useState } from 'react';

export default function Quiz() {
  // TODO: Add state for answers (start as empty object {})
  // TODO: Add state for result (start as null)

  function handleAnswer(question, answer) {
    // TODO: Update the answers object with the new answer
    // Hint: Use setAnswers({ ...answers, [question]: answer })
  }

  return (
    <div>
      <h2>Which Dog Are You?</h2>
      <p>Answer these questions to find your dog match!</p>

      {/* TODO: Add 3 quiz questions here */}
      {/* TODO: Add a submit button */}
      {/* TODO: Show the result when available */}
    </div>
  );
}
```

**Your tasks:**
1. Add state for `answers` (should start as `{}`)
2. Add state for `result` (should start as `null`)
3. Complete the `handleAnswer` function to save answers

### ✅ Task 4B — Add Quiz Questions

**Your tasks:**
Add 3 questions to your quiz. Each question should:
1. Have a heading (like "1. What do you like to do on weekends?")
2. Have 3 radio button choices
3. Call `handleAnswer` when someone picks an answer

**Example question structure:**
- Question about weekends (values: "chill", "adventure", "social")
- Question about activity level (values: "low", "medium", "high")
- Question about being social (values: "shy", "friendly", "outgoing")

**Hints:**
- Use `<input type="radio" name="weekend" value="chill" onChange={...} />`
- Call `handleAnswer` with the question name and value
- Example: `onChange={(e) => handleAnswer('weekend', e.target.value)}`
- All radio buttons for the same question need the same `name` attribute
- Add a submit button at the end: `<button onClick={handleSubmit}>See My Dog Match!</button>`

### ✅ Task 4C — Make the Quiz Brain

Create a new file called `src/lib/quizLogic.js`:

```js
export function getResultBreed(answers) {
  const { weekend, activity, social } = answers;

  // TODO: Write logic to match answers to dog breeds
  // If someone likes adventure and high activity → return 'husky'
  // If someone is chill with low activity → return 'bulldog'
  // If someone is outgoing and active → return 'labrador'
  // If someone is shy and calm → return 'pug'
  // If someone is social → return 'beagle'
  // Default → return 'retriever'
}
```

**Your tasks:**
1. Write `if` statements to check the answers
2. Return the matching dog breed name
3. Add a default return at the end

**Hints:**
- Use `if (activity === 'high' && weekend === 'adventure') { return 'husky'; }`
- Check multiple conditions to find the best match
- The function should return a string (breed name)

### ✅ Task 4D — Show the Quiz Result

**Your tasks:**
1. Create a `handleSubmit` function in `Quiz.jsx`
2. Check if all questions are answered (if not, show an alert)
3. Use `getResultBreed(answers)` to find the matching breed
4. Fetch a dog image for that breed from the API
5. Save the result (breed and imageUrl) to state

**Hints:**
- Import: `import { getResultBreed } from '../lib/quizLogic';`
- Check answers: `if (!answers.weekend || !answers.activity || !answers.social)`
- API URL: `` `https://dog.ceo/api/breed/${matchedBreed}/images/random` ``
- Save result: `setResult({ breed: matchedBreed, imageUrl: data.message })`

### ✅ Task 4E — Display the Result

**Your tasks:**
1. At the end of your return section, show the result when it exists
2. Display the breed name
3. Display the dog image
4. Add a fun message

**Hints:**
- Use `{result && <div>...</div>}` to show only when result exists
- Access the breed: `{result.breed}`
- Access the image: `<img src={result.imageUrl} alt={result.breed} />`
- Style it with some background color to make it stand out

### ✅ Task 4F — Add Quiz to App

**Your tasks:**
1. Open `src/App.jsx`
2. Import the Quiz component
3. Add it to your app (maybe add an `<hr />` between sections)

### ✅ Task 4G — Create the Quiz Test File

Create `tests/quizLogic.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { getResultBreed } from '../src/lib/quizLogic';

describe('getResultBreed', () => {
  it('matches high energy adventurers with huskies', () => {
    const answers = { weekend: 'adventure', activity: 'high', social: 'friendly' };
    expect(getResultBreed(answers)).toBe('husky');
  });

  it('matches chill people with bulldogs', () => {
    const answers = { weekend: 'chill', activity: 'low', social: 'shy' };
    expect(getResultBreed(answers)).toBe('bulldog');
  });

  it('has a default breed', () => {
    const answers = { weekend: 'other', activity: 'medium', social: 'friendly' };
    expect(getResultBreed(answers)).toBe('retriever');
  });
});
```

### ✅ Check Your Work

1. Run `npm run dev`
2. Scroll down to see the quiz
3. Answer all three questions
4. Click "See My Dog Match!"
5. You should see your dog match with a picture!

6. Run tests:
```bash
npm test
```

Both tests should pass with ✓ checkmarks!

---

# Step 5: Make It Easy to Switch Between Pages (Optional, 30 minutes)

Right now everything is on one long page. Let's add buttons to switch between sections!

### ✅ Task 5A — Add a Simple Navigation

**Your tasks:**
1. Add `useState` to your App.jsx to track which page is showing
2. Create a state called `currentPage` (start with `'explorer'`)
3. Add navigation buttons to switch between pages
4. Show only the selected page

**What you need to do:**
- Import `useState` in App.jsx
- Add state: `const [currentPage, setCurrentPage] = useState('explorer');`
- Create buttons that call `setCurrentPage('explorer')` or `setCurrentPage('quiz')`
- Use conditions to show pages: `{currentPage === 'explorer' && <RandomDog />}`
- Do the same for the quiz page

**Hints:**
- You'll need buttons for "Random Dogs" and "Take Quiz"
- Use `onClick={() => setCurrentPage('explorer')}` on buttons
- Only show one component at a time based on `currentPage`

---

# Extra Challenge — Save Your Favorite Dogs! (45–60 minutes)

**Only try this if you finished everything else!**

This is an extra challenge that teaches you about React Context - a way to share data between different parts of your app.

### ✅ Challenge 1 — Make a Context Folder

Create `src/context/` folder if you haven't already.

### ✅ Challenge 2 — Create DogContext

Create `src/context/DogContext.jsx` and add this starter code:

```jsx
import { createContext, useState, useContext } from 'react';

const DogContext = createContext();

export function DogProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function addFavorite(dog) {
    // TODO: Add logic to save a dog to favorites
    // Hint: Check if the dog is already in favorites first
    // Hint: Use setFavorites to add the new dog
  }

  function removeFavorite(imageUrl) {
    // TODO: Remove a dog from favorites by its imageUrl
    // Hint: Use filter to create a new array without the dog
  }

  function clearFavorites() {
    // TODO: Clear all favorites
  }

  return (
    <DogContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </DogContext.Provider>
  );
}

export function useDogContext() {
  return useContext(DogContext);
}
```

**Your Tasks:**
1. Complete the `addFavorite` function to add dogs to the favorites list
2. Complete the `removeFavorite` function to remove dogs by imageUrl
3. Complete the `clearFavorites` function to empty the favorites list
4. Make sure no duplicate dogs are added to favorites

### ✅ Challenge 3 — Wrap Your App

**Your Task:** Update `src/main.jsx` to wrap your entire app with the DogProvider.

**Steps:**
1. Import the `DogProvider` from your context file
2. Wrap the `<App />` component with `<DogProvider>`
3. This allows all components to access the favorites data

**Hint:** Look at how other providers work in React - you need to put DogProvider around App, similar to how you might wrap something in a `<div>`.

### ✅ Challenge 4 — Add "Save" Buttons

**Your Tasks:**

**For `RandomDog.jsx`:**
1. Import `useDogContext` from your context file
2. Get the `addFavorite` function from the context
3. Add a "Save to Favorites" button next to each dog image
4. When clicked, save the dog's `imageUrl` and `breed` to favorites

**For `Quiz.jsx`:**
1. Import `useDogContext` from your context file
2. Get the `addFavorite` function from the context
3. Add a "Save My Match" button in the quiz result section
4. When clicked, save the quiz result dog to favorites

**Hints:**
- The `addFavorite` function expects an object: `{ imageUrl: '...', breed: '...' }`
- You can add buttons anywhere in your JSX where you display dogs
- Use `onClick={() => addFavorite({...})}` to call the function

### ✅ Challenge 5 — Create Favorites Page

Create `src/components/Favorites.jsx` and add this starter code:

```jsx
import { useDogContext } from '../context/DogContext';

export default function Favorites() {
  const { favorites, removeFavorite, clearFavorites } = useDogContext();

  if (favorites.length === 0) {
    return (
      <div>
        <h2>My Favorite Dogs</h2>
        {/* TODO: Add a message for when there are no favorites */}
      </div>
    );
  }

  return (
    <div>
      <h2>My Favorite Dogs ({favorites.length})</h2>
      {/* TODO: Add a "Clear All Favorites" button */}
      
      {/* TODO: Display all favorite dogs in a grid */}
      {/* Hint: Use favorites.map() to create a list */}
      {/* Hint: Each dog should show image, breed name, and remove button */}
    </div>
  );
}
```

**Your Tasks:**
1. Add a helpful message when there are no favorites saved
2. Add a "Clear All Favorites" button that calls `clearFavorites()`
3. Display all favorite dogs in a grid layout
4. For each dog, show:
   - The dog image
   - The breed name
   - A "Remove" button that calls `removeFavorite(dog.imageUrl)`

**Hints:**
- Use `favorites.map()` to loop through all saved dogs
- You can style the grid with CSS: `display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'`
- Each dog needs a unique `key` prop when mapping

### ✅ Challenge 6 — Add Favorites to Navigation

**Your Tasks:**
1. Import the `Favorites` component in `App.jsx`
2. Add a "My Favorites" button to the navigation section
3. Add the Favorites page to the page display section
4. Test that you can navigate between all three pages

**Hints:**
- Look at how the existing "Random Dogs" and "Take Quiz" buttons work
- The button should set `currentPage` to `'favorites'`
- You'll need to add a condition like `{currentPage === 'favorites' && <Favorites />}`
- Don't forget to import the Favorites component at the top!

---

# Final Checklist

Before you're done, make sure:

### ✅ Tests Pass

Run this command:

```bash
npm test
```

You should see:
- ✅ `dogApi.test.js` - passing
- ✅ `quizLogic.test.js` - passing

### ✅ Everything Works

1. Click "Get Random Dog" button - shows dog pictures
2. Pick breeds from dropdown - shows dogs from that breed
3. Take the quiz - shows your dog match
4. (Optional) Save favorites - favorites appear on favorites page

---

# Turning In Your Project

### Step 1: Check Your Work

Make sure all your files are saved!

### Step 2: Commit Your Changes

If you're using Git:

```bash
git add .
git commit -m "Finished dog quiz project"
git push
```

### Step 3: Submit

Follow your teacher's instructions for submitting!

---

# External Resources

## Learning Resources

### React & JavaScript
- [React Official Documentation](https://react.dev/) - The official React guide with tutorials
- [React for Beginners](https://reactforbeginners.com/) - Step-by-step React course
- [JavaScript Info](https://javascript.info/) - Complete JavaScript tutorial
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - JavaScript reference

### CSS & Styling
- [CSS-Tricks](https://css-tricks.com/) - CSS tutorials and examples
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - Complete guide to CSS Flexbox
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) - Complete guide to CSS Grid
- [Can I Use](https://caniuse.com/) - Check browser support for CSS features

### APIs & Fetch
- [Dog CEO API](https://dog.ceo/dog-api/) - The API we used for dog pictures
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Practice API for testing
- [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - How to use fetch()

### Development Tools
- [Vite Documentation](https://vitejs.dev/) - Build tool we used for this project
- [npm Documentation](https://docs.npmjs.com/) - Package manager guide
- [VS Code Tips](https://code.visualstudio.com/docs) - Visual Studio Code documentation

### Testing
- [Vitest Documentation](https://vitest.dev/) - Testing framework we used
- [Testing Library](https://testing-library.com/) - Testing utilities for React
- [Jest Cheat Sheet](https://devhints.io/jest) - Quick testing reference

### APIs to Try
- [Cat API](https://thecatapi.com/) - Cat pictures (similar to Dog API)
- [Jokes API](https://official-joke-api.appspot.com/) - Random jokes
- [Advice API](https://api.adviceslip.com/) - Random advice
- [Color API](https://www.thecolorapi.com/) - Color information and palettes