/* eslint-disable no-restricted-globals */
import { Card } from '../types/Card'; // Ensure this path is correct
import { saveCardsToCatalog, getCatalogCount } from '../utils/indexedDB'; // Adjust the import path if necessary

// Helper function to fetch and store cards from a single page
async function fetchAndStoreCards(pageUrl: string): Promise<{ cards: Card[], totalElements: number }> {
  try {
    // Fetch the page of cards from the API
    const response = await fetch(pageUrl);
    console.log(`Fetched page: ${pageUrl}, Status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && !contentType.includes('application/json')) {
      throw new Error('Response is not JSON.');
    }

    const data = await response.json();

    // Check and process the cards
    if (!data.content || !Array.isArray(data.content)) {
      throw new Error('Invalid or missing content in response.');
    }

    return { cards: data.content as Card[], totalElements: data.totalElements };
  } catch (error) {
    self.postMessage({ status: 'error', message: (error as Error).message });
    console.error(`Failed to fetch cards: ${(error as Error).message}`);
    throw error; // Rethrow error to handle it outside
  }
}

// Function to get the total number of pages from the API
async function getTotalPages(baseUrl: string, pageSize: number): Promise<number> {
  try {
    const response = await fetch(`${baseUrl}?page=0&size=${pageSize}&search=&rarity=&type=&color=&set=`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data.totalPages || 0;
  } catch (error) {
    console.error(`Failed to get total pages: ${(error as Error).message}`);
    throw error; // Rethrow error to handle it outside
  }
}

// Function to process pages and reprocess until IndexedDB has the correct number of elements
async function processPagesUntilComplete(baseUrl: string, pageSize: number): Promise<void> {
  let totalElements: number = 0;
  let currentPage = 0;
  let totalPages = 0;

  // Initial retrieval of total pages
  try {
    totalPages = await getTotalPages(baseUrl, pageSize);
    console.log(`Total pages: ${totalPages}`);
  } catch (error) {
    self.postMessage({ status: 'error', message: `Failed to retrieve total pages: ${(error as Error).message}` });
    throw error;
  }

  while (true) {
    const promises = [];
    let fetchedAny = false;

    for (let i = 0; i < totalPages; i++) {
      const pageUrl = `${baseUrl}?page=${currentPage}&size=${pageSize}&search=&rarity=&type=&color=&set=`;

      // Fetch and store cards
      const fetchPromise = fetchAndStoreCards(pageUrl)
        .then(async ({ cards, totalElements: apiTotalElements }) => {
          fetchedAny = cards.length > 0;
          totalElements = apiTotalElements;
          await saveCardsToCatalog(cards);
          console.log(`Processed page: ${currentPage}`);
        })
        .catch((error) => console.error(`Error processing page ${currentPage}: ${error.message}`));

      promises.push(fetchPromise);
      currentPage++;

      // Break if we have processed all pages
      if (currentPage >= totalPages) {
        break;
      }
    }

    // Wait for all concurrent fetches to complete
    await Promise.all(promises);

    // Check if all cards are stored
    const storedCount = await getCatalogCount();
    if (storedCount >= totalElements || !fetchedAny) {
      break; // Exit the loop if all cards are stored or no more cards to fetch
    }

    // Reset the page to reprocess
    currentPage = 0;
  }
}

self.onmessage = async function (event) {
  const baseUrl = 'http://localhost:8080/api/cards/';
  const pageSize = 25000; // Number of cards per page

  try {
    await processPagesUntilComplete(baseUrl, pageSize);
    self.postMessage({ status: 'complete' });
  } catch (error) {
    self.postMessage({ status: 'error', message: (error as Error).message });
    console.error(`Failed to process all pages: ${(error as Error).message}`);
  }
};
