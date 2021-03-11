import { render } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SectionCard from '../SectionCard';

const props = {
  title: 'Comics',
  image: 'https://via.placeholder.com/600x900',
  link: '/hey',
};
describe('Section Card', () => {
  it('renders a title', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <SectionCard
          title={props.title}
          image={props.image}
          link={props.link}
        />
      </Router>
    );
    expect(getByText(props.title)).toBeInTheDocument();
  });

  it('renders a image', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <SectionCard
          title={props.title}
          image={props.image}
          link={props.link}
        />
      </Router>
    );
    expect(getByTestId('image')).toHaveAttribute('src', props.image);
  });
  it('renders a link', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <SectionCard
          title={props.title}
          image={props.image}
          link={props.link}
        />
      </Router>
    );
    expect(getByRole('link')).toHaveAttribute('href', props.link);
  });
});
