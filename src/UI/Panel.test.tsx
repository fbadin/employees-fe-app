import { render, screen } from '@testing-library/react';
import { Panel } from './Panel';

describe('Panel component', () => {
  it('renders children correctly', () => {
    const text = 'This is some content inside the panel';
    render(
      <Panel>
        {text}
      </Panel>
    );

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(
      <Panel>
        Sample children
      </Panel>
    );

    const panel = screen.getByTestId('panel');

    expect(panel).toHaveClass('bg-dark-gray');
    expect(panel).toHaveClass('rounded-md');
    expect(panel).toHaveClass('text-dark-1');
    expect(panel).toHaveClass('bg-dark-grey');
    expect(panel).toHaveClass('p-3');
  });

  it('applies custom class', () => {
    const customClass = 'my-custom-class';
    render(
      <Panel className={customClass}>
        Sample children
      </Panel>
    );

    const panel = screen.getByTestId('panel');

    expect(panel).toHaveClass(customClass);
  });
});
