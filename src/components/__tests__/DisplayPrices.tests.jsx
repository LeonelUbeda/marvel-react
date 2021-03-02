import { render, screen } from '@testing-library/react';
import React from 'react';
import Price from '../Price';

const data = [
  {
    type: 'printPrice',
    price: '30'
  },
  {
    type: 'printPrice',
    price: '70'
  }
];

test('renders a text with price type', () => {
  const { container } = render(<Price prices={data} />);
  const list = screen.findBy
  const elements = container.querySelectorAll('.element-price');
  expect(container.querySelector()).toBe('Print');
  expect(elements[1].textContent).toBe('$30');
});


