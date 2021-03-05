import React from 'react';
import { render } from '@testing-library/react';
import { renderWithMemoryRouter } from '../../utils/testUtils';
import ElementCard from '../ElementCard';

const prop = {
  link: '/test',
  title: 'Testing a card',
  image: 'https://via.placeholder.com/600x900',
  extras: [
    {
      title: 'test',
      className: 'bg-red-300',
    },
    {
      title: 'test 2',
      className: '',
    },
  ],
};

describe('ElementCard', () => {
  it('should render a image', () => {
    const { getByRole } = renderWithMemoryRouter(
      <ElementCard image={prop.image} link={prop.link} title={prop.title} />
    );
    expect(getByRole('img')).toHaveAttribute('src', prop.image);
  });

  it('should render a title', () => {
    const { getByText } = renderWithMemoryRouter(
      <ElementCard image={prop.image} link={prop.link} title={prop.title} />
    );
    expect(getByText(prop.title)).toBeInTheDocument();
  });

  it('should have a link', () => {
    const { getByRole } = renderWithMemoryRouter(
      <ElementCard image={prop.image} link={prop.link} title={prop.title} />
    );
    expect(getByRole('link')).toHaveAttribute('href', prop.link);
  });

  it('should have an array of extra cards', () => {
    const { getAllByTestId } = renderWithMemoryRouter(
      <ElementCard
        image={prop.image}
        link={prop.link}
        title={prop.title}
        extras={prop.extras}
      />
    );

    expect(getAllByTestId('extra-card')).toHaveLength(2);
  });

  it('should not have extra cards', () => {
    const { queryByTestId } = renderWithMemoryRouter(
      <ElementCard image={prop.image} link={prop.link} title={prop.title} />
    );

    expect(queryByTestId('extra-card')).not.toBeInTheDocument();
  });
});
