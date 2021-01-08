import React from 'react';
import { render, screen, getByTestId, waitFor } from '@testing-library/react';

import ArticleList from './ArticleList';

test('ArticleList Component', async () => {
  render(<ArticleList />);
  await waitFor(() => {
    expect(screen.getByTestId('loading')).not.toBeInTheDocument();
  })
  console.log(window.document.body.innerHTML);
  // expect(screen.getByText('Hello')).toBeInTheDocument();
});