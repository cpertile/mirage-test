import { render, waitForElement, prettyDOM } from '@testing-library/react';
import React from 'react';
import App from './App';
import { startMirage } from './server';

/*
  Test Setup: start up Mirage server in 'test' environment (no delay and no records)
  This ensures a esterile environment for each test
*/
let server

beforeEach(() => {
  server = startMirage({ environment: 'test' })
})

afterEach(() => {
  server.shutdown()
})

/* Tests */
it('renders App', () => {
  render(<App />);
})

it('renders the list', () => {
  const { getByTestId } = render(<App />);
  const listElement = getByTestId('list');
  expect(listElement).toBeInTheDocument();
});

it('renders the list items', async () => {
  // Here is where the factory come into play
  server.createList('User', 5)
  const { container, getAllByTestId } = render(<App />)
  const listItemElements = await waitForElement(() => getAllByTestId('list-item'))
  expect(listItemElements.length).toBe(5)
  console.log(prettyDOM(container))
})