import * as natural from 'natural';

// const natural = require('natural');

// Function to calculate cosine similarity between two sentences
function cosineSimilarity(sentence1, sentence2) {
  const tokenizer = new natural.WordTokenizer();
  const tokens1 = tokenizer.tokenize(sentence1.toLowerCase());
  const tokens2 = tokenizer.tokenize(sentence2.toLowerCase());

  const vector1 = new Map();
  const vector2 = new Map();

  // Count the occurrences of each token in the sentences
  tokens1.forEach((token) => {
    vector1.set(token, (vector1.get(token) || 0) + 1);
  });

  tokens2.forEach((token) => {
    vector2.set(token, (vector2.get(token) || 0) + 1);
  });

  // Compute the dot product
  let dotProduct = 0;
  vector1.forEach((count, token) => {
    if (vector2.has(token)) {
      dotProduct += count * vector2.get(token);
    }
  });

  // Compute the magnitudes
  const magnitude1 = Math.sqrt(
    Array.from(vector1.values()).reduce((sum, count) => sum + count ** 2, 0),
  );
  const magnitude2 = Math.sqrt(
    Array.from(vector2.values()).reduce((sum, count) => sum + count ** 2, 0),
  );

  // Compute the cosine similarity
  return dotProduct / (magnitude1 * magnitude2);
}

// Function to match a sentence with the trained utterances
export function matchSentence(sentence: string, utterances: string[]) {
  const threshold = 0.5; // Set the similarity threshold

  // Iterate through the trained utterances
  let matchedUtterance = null;
  let maxSimilarity = 0;

  // Iterate through examples of each utterance
  utterances.forEach((utterance) => {
    const similarity = cosineSimilarity(sentence, utterance);
    // Update the matched utterance if similarity exceeds the threshold
    if (similarity >= threshold && similarity > maxSimilarity) {
      matchedUtterance = utterance;
      maxSimilarity = similarity;
    }
  });

  return matchedUtterance;
}
