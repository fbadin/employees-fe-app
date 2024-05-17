import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the navbar', async ()=>{
  render(<App />);
  await waitFor(() => {
    const navbar = screen.getByTestId('header');
    expect(navbar).toBeInTheDocument();
  });
});

