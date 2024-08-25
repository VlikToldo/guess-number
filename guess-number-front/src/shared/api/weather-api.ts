import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const startGame = async (): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/start_game`);
  } catch (error) {
    throw new Error(`Error starting game: ${(error as Error).message}`);
  }
};

export const guessApi = async (guess: number): Promise<{ message: string; status: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/guess`, { guess });
    return response.data;
  } catch (error) {
    throw new Error(`Error making guess: ${(error as Error).message}`);
  }
};