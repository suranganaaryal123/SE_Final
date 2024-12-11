import { render, screen } from '@testing-library/react';
import App from './App';

test('displays "No leaderboard data available" when leaderboard is empty', () => {
  render(<App />);
  const noDataMessage = screen.getByText(/no leaderboard data available/i);
  expect(noDataMessage).toBeInTheDocument();
});

