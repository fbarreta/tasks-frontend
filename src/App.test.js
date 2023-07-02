import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app tittle', () => {
  render(<App />);
  const linkElement = screen.getByText(/Marvelous v2.0/i);
  expect(linkElement).toBeInTheDocument();
});
