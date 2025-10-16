export interface Game {
  id: number;
  title: string;
  short_description: string;
  genre: string;
  release_date: string;
  developer: string;
}

export async function fetchGames() {
  try {
    const response = await fetch('https://www.freetogame.com/api/games');
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = (await response.json()) as Game[];
    return data.slice(0, 10);
  } catch (error) {
    console.error('Error fetching games: ', error);
    throw error;
  }
}
