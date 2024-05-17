import { render } from '@testing-library/react';
import { Label } from './Label';

describe('Label component', () => {
  it('renders children', () => {
    const { getByText } = render(<Label>Hello World</Label>);
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('adds custom class if provided', () => {
    const { container } = render(<Label className="custom">Hello World</Label>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders with default font-bold class if no custom class provided', () => {
    const { container } = render(<Label>Hello World</Label>);
    expect(container.firstChild).toHaveClass('font-bold');
  });
});
