import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ArticleCard from './ArticleCard';
import { MemoryRouter as Router } from 'react-router-dom';

afterEach(cleanup);

const article = {
  id: 1,
  title: 'Test article',
  content: 'Test article content',
  author: 'John Doe',
  tags: [{ id: 1, name: 'Test' }],
  image: 'image.jpg'
};

it('renders the component', () => {
  const { getByText, getByAltText } = render(
    <Router>
      <ArticleCard article={article} />
    </Router>
  );

  expect(getByText(article.title)).toBeInTheDocument();
  expect(getByText(article.content.substr(0, 250) + '...')).toBeInTheDocument();
  expect(getByText(`By: ${article.author}`)).toBeInTheDocument();
  expect(getByText(article.tags[0].name)).toBeInTheDocument();
  expect(getByAltText(article.title)).toBeInTheDocument();
});

it('navigates to the correct article page on read more button click', () => {
  const { getByText } = render(
    <Router>
      <ArticleCard article={article} />
    </Router>
  );

  fireEvent.click(getByText('More'));

  expect(window.location.pathname).toBe(`/articles/${article.id}`);
});
