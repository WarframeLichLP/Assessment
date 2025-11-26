export function getResultBreed(answers) {
  const { weekend, activity, social } = answers;

  // normalize inputs to make matching tolerant of variations
  const w = (weekend || '').toString().toLowerCase();
  const a = (activity || '').toString().toLowerCase();
  const s = (social || '').toString().toLowerCase();

  // Priority rules (as described in comments)
  // If someone likes adventure and high activity → 'husky'
  if (w.includes('advent') && (a.includes('high') || a.includes('active') || a.includes('ener'))) {
    return 'husky';
  }

  // If someone is chill with low activity → 'bulldog'
  if (a.includes('low') || a.includes('chill') || a.includes('relax')) {
    return 'bulldog';
  }

  // If someone is outgoing and active → 'labrador'
  if ((s.includes('out') || s.includes('outgoing') || s.includes('friendly')) &&
      (a.includes('active') || a.includes('high') || a.includes('ener'))) {
    return 'labrador';
  }

  // If someone is shy and calm → 'pug'
  if ((s.includes('shy') || s.includes('intro')) &&
      (a.includes('calm') || a.includes('low') || a.includes('relax'))) {
    return 'pug';
  }

  // If someone is social → 'beagle'
  if (s.includes('social') || s === 'yes' || s.includes('people') || s.includes('friendly')) {
    return 'beagle';
  }

  // Default → 'retriever'
  return 'retriever';
}