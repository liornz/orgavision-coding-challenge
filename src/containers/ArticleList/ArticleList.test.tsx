import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import ArticleList from './ArticleList';

test('ArticleList Component', async () => {
  render(<ArticleList />);
  await waitFor(() => {
    expect(screen.getByTestId('loading')).not.toBeInTheDocument();
  })
  console.log(window.document.body.innerHTML);
});