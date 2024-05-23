import { render, screen } from '@testing-library/react';
import { CommonTemplate } from './CommonTemplate';

// Mock the NavBar component
jest.mock('../components/NavBar', () => ({
  NavBar: () => <div data-testid="navbar">NavBar</div>,
}));

describe('CommonTemplate', () => {
  it('renders NavBar component', () => {
    render(<CommonTemplate>Test Content</CommonTemplate>);

    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<CommonTemplate>Test Content</CommonTemplate>);

    const main = screen.getByTestId('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent('Test Content');
  });

  it('applies correct classes to main container', () => {
    render(<CommonTemplate>Test Content</CommonTemplate>);

    const main = screen.getByTestId('main');
    expect(main).toHaveClass('bg-dark-2');
    expect(main).toHaveClass('text-dark-gray');
    expect(main).toHaveClass('min-h-full');
    expect(main).toHaveClass('mt-16');
  });
});
