import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const renderWithMemoryRouter = (element) =>
  render(element, { wrapper: MemoryRouter });

export default { renderWithMemoryRouter };
