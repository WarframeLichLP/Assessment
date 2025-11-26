/**
 * dogApi.js
 * Utility functions to interact with the Dog API.
 * 
 * Usage:
 *   import { getRandomDogImage, getBreedsList } from './dogApi';
 */

const DOG_API_BASE_URL = 'https://dog.ceo/api';

/**
 * Fetches a random dog image.
 * @returns {Promise<string>} URL of the random dog image.
 */
export async function getRandomDogImage() {
  // Build URL
  const url = `${DOG_API_BASE_URL}/breeds/image/random`;

  // Fetch and validate
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Network error fetching random dog image: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (!data || data.status !== 'success' || typeof data.message !== 'string') {
    throw new Error('Unexpected API response while fetching random dog image');
  }

  return data.message;
}

/**
 * Fetches the list of all dog breeds.
 * @returns {Promise<string[]>} Array of breed names.
 */
export async function getBreedsList() {
  const url = `${DOG_API_BASE_URL}/breeds/list/all`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Network error fetching breeds list: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (!data || data.status !== 'success' || typeof data.message !== 'object') {
    throw new Error('Unexpected API response while fetching breeds list');
  }

  // data.message is an object: { breed: [subBreeds...] }
  const breeds = [];
  for (const [breed, subBreeds] of Object.entries(data.message)) {
    if (Array.isArray(subBreeds) && subBreeds.length > 0) {
      // include sub-breeds as "subbreed breed"
      for (const sub of subBreeds) {
        breeds.push(`${sub} ${breed}`);
      }
    } else {
      breeds.push(breed);
    }
  }

  return breeds;
}

export async function fetchBreedList() {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();
    const breedsObj = data.message || {};
    const breeds = Object.keys(breedsObj);
    return breeds;
  } catch (err) {
    return ['retriever','beagle','pug','bulldog','husky','labrador','chihuahua'];
  }
}

export async function fetchRandomImage() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await res.json();
  return data.message;
}

export function getBreedFromUrl(url) {
  if (!url) return '';
  // URL pattern: .../breeds/{breed[-subbreed]}/...
  try {
    const parts = url.split('/');
    const idx = parts.findIndex((p) => p === 'breeds');
    if (idx >= 0 && parts.length > idx + 1) {
      const breedPart = parts[idx + 1]; // may be "hound-english"
      // prefer the sub-breed or main breed? take last part if hyphenated for readability
      return breedPart.split('-').reverse()[0];
    }
    return '';
  } catch {
    return '';
  }
}
