import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('renders primary button with correct classes', () => {
    render(<Button variant="primary" children="Primary Button" onClick={()=>{}} />);

    const button = screen.getByTestId('custom-button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('!bg-primary !border-primary hover:bg-primary hover:border-primary btn btn-primary');
  });

  it('renders danger button with correct classes', () => {
    render(<Button variant="danger" children="Danger Button" onClick={()=>{}} />);

    const button = screen.getByTestId('custom-button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn btn-danger');
  });

  it('renders button with default classes', () => {
    render(<Button children="Default Button" onClick={()=>{}} />);

    const button = screen.getByTestId('custom-button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn btn-primary');
  });

  it('renders button with custom class', () => {
    const customClass = 'my-custom-class';
    render(<Button className={customClass} children="Custom Button" onClick={()=>{}} />);

    const button = screen.getByTestId('custom-button');

    expect(button).toHaveClass(customClass);
  });

  it('renders disabled button correctly', () => {
    render(<Button disabled children="Disabled Button" onClick={()=>{}} />);

    const button = screen.getByTestId('custom-button');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick} children="Click Me" />);

    const button = screen.getByTestId('custom-button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
