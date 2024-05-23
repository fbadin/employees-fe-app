import { act, render, screen } from '@testing-library/react';
import App from './App';

global.fetch = jest.fn().mockImplementation((url, options) => {
  return Promise.resolve({
    status: 200,
    ok: true,
    json: async () => ({}),
  });
}) as jest.Mock;

describe('App', () => {
  it('renders the App without crashing', async ()=>{
    await act(async () => {
      render(<App />);
    });

    const bodyFirstChild = screen.getByTestId('app-root');
    expect(bodyFirstChild).toBeInTheDocument();
  });

  it('renders the navbar and common template', async ()=>{
    await act(async () => {
      render(<App />);
    });

    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();

    const CommonTemplate = screen.getByTestId('main');
    expect(CommonTemplate).toBeInTheDocument();
    expect(CommonTemplate).toHaveClass('bg-dark-2 text-dark-gray min-h-full mt-16')
  })

  it('renders the Dashboard as a main route', async ()=>{
    await act(async () => {
      render(<App />);
    });

    const Dashboard = screen.getByTestId('dashboard');
    expect(Dashboard).toBeInTheDocument();
  });
})

