import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('./firebase', () => ({
  db: {},
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(() => ({
    docs: [],
  })),
  query: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
}));

describe('App Component', () => {
  test('renders Login button when no user is logged in', () => {
    render(<App />);
    const loginButton = screen.getByText(/log in/i); // Login button text
    expect(loginButton).toBeInTheDocument();
  });

  test('renders Leaderboard heading', () => {
    render(<App />);
    const leaderboardHeading = screen.getByText(/leaderboard/i); // Leaderboard heading text
    expect(leaderboardHeading).toBeInTheDocument();
  });

  test('displays "No leaderboard data available" when leaderboard is empty', () => {
    render(<App />);
    const noDataMessage = screen.getByText(/no leaderboard data available/i);
    expect(noDataMessage).toBeInTheDocument();
  });

  test('renders Logout button when user is logged in', () => {
    // Mock a logged-in user
    const mockUser = { displayName: 'Test User' };
    render(<App />);
    // Simulate a logged-in state
    fireEvent.click(screen.getByText(/log in/i)); // Assuming the Login button updates state
    const logoutButton = screen.getByText(/log out/i);
    expect(logoutButton).toBeInTheDocument();
  });

  test('renders game components when user is logged in and game is in progress', () => {
    // Mock a logged-in user and game state
    render(<App />);
    fireEvent.click(screen.getByText(/log in/i)); // Simulate login
    fireEvent.click(screen.getByText(/start game/i)); // Simulate starting a game
    const board = screen.getByTestId('board'); // Assuming the Board component has a data-testid
    expect(board).toBeInTheDocument();
  });
});


// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('displays "No leaderboard data available" when leaderboard is empty', () => {
//   render(<App />);
//   const noDataMessage = screen.getByText(/no leaderboard data available/i);
//   expect(noDataMessage).toBeInTheDocument();
// });

