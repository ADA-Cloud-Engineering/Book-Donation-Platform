import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './components/Button/Button';
import Book from './components/Book/Book';

const bookDetails = {
  title: 'purple hibiscus',
  author: 'chimamda adichie',
  donated_by: 'jon doe'
}

// test for button component
test('renders Donate button', () => {
  render(<Button text={'test-button'} />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveTextContent('test-button');
});

// test for book component
// test('renders Donate button', () => {
//   render(<Book book={bookDetails} />);
  
//  // assert that title appears in document
//   const titleElement = screen.getAllByText('title');
//   expect(titleElement).toHaveTextContent('purple hibiscus');
// });
