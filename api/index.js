// API endpoint for processing webhook data
// This endpoint receives a string, converts it to sorted character array, and returns as word

export default function handler(req, res) {
  // Set CORS headers to allow cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST requests are accepted.' });
  }

  try {
    // Extract the data field from the request body
    const { data } = req.body;

    // Validate that data field exists and is a string
    if (!data || typeof data !== 'string') {
      return res.status(400).json({ error: 'Invalid input. "data" field must be a non-empty string.' });
    }

    // Convert string to array of characters
    const charactersArray = data.split('');

    // Sort the array alphabetically
    const sortedArray = charactersArray.sort();

    // Return the sorted array as "word" in JSON format
    res.status(200).json({ word: sortedArray });

  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ error: 'Internal server error occurred while processing the request.' });
  }
}