import { render, screen } from '@testing-library/react';
import React from 'react';
import Price from '../Price';

describe('Price component', () => {
  it('renders a price type', () => {
    render(<Price type="printPrice" price={30} />);
    expect(screen.getByText('Print')).toBeInTheDocument();
  });
  it('renders price', () => {
    render(<Price type="printPrice" price={30} />);
    expect(screen.getByText('$30')).toBeInTheDocument();
  });
});
