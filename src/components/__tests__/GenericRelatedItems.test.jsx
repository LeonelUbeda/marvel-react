import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithMemoryRouter } from '../../utils/testUtils';
import GenericRelatedItems from '../GenericRelatedItems';

const title = 'Testing this';

describe('Generic related item', () => {
  it('should render a title', () => {
    const { getByText } = renderWithMemoryRouter(
      <GenericRelatedItems title={title} items={[]} />
    );
    expect(getByText(title)).toBeInTheDocument();
  });

  it('should show items after click event', () => {
    const { getByText, getByRole } = renderWithMemoryRouter(
      <GenericRelatedItems
        title={title}
        items={[{ title: 'item title', link: '/test' }]}
      />
    );
    const button = getByRole('button');
    const itemTitle = getByText('item title');
    expect(itemTitle).not.toBeVisible();
    fireEvent.click(button);
    expect(itemTitle).toBeVisible();
  });

  it('should show default message if items is an empty array', () => {
    const { getByText } = renderWithMemoryRouter(
      <GenericRelatedItems title={title} items={[]} />
    );
    expect(getByText('No related items found')).toBeInTheDocument();
  });
});
