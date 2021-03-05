import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';

const prop = {
  title: 'An error has ocurred',
  actionTitle: 'Go back',
  actionLink: '/',
  className: 'bg-red-600',
};

describe('Error message', () => {
  it('should render a title', () => {
    const { getByText } = render(<ErrorMessage title={prop.title} />);
    expect(getByText(prop.title)).toBeInTheDocument();
  });

  it('should render a action title', () => {
    const { getByText } = render(
      <ErrorMessage title={prop.title} actionTitle={prop.actionTitle} />
    );
    expect(getByText(prop.actionTitle)).toBeInTheDocument();
  });

  it('should render a link with actionTitle', () => {
    const { getByText, getByRole } = render(
      <ErrorMessage
        title={prop.title}
        actionTitle={prop.actionTitle}
        actionLink={prop.actionLink}
      />,
      { wrapper: MemoryRouter }
    );
    expect(getByText(prop.actionTitle)).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', prop.actionLink);
  });

  it('should render a default button actionLink', () => {
    const { getByRole } = render(
      <ErrorMessage title={prop.title} actionTitle={prop.actionTitle} />,
      { wrapper: MemoryRouter }
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('container should have css class', () => {
    const { getByTestId } = render(
      <ErrorMessage title={prop.title} className={prop.className} />
    );
    expect(getByTestId('container')).toHaveClass(prop.className);
  });
});
