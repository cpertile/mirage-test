import { fireEvent, render, waitForElement, prettyDOM } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  const { getAllByTestId } = render(<App />)
  const listItemElements = await waitForElement(() => getAllByTestId('list-item'))
  expect(listItemElements.length).toBe(5)
})

it('can create a user', async () => {
  const { getByTestId } = render(<App />);
  const newUserForm = await waitForElement(() => getByTestId('new-user-form'))

  userEvent.type(newUserForm.querySelector('input[name="first_name"]'), 'Jhonny')
  userEvent.type(newUserForm.querySelector('input[name="last_name"]'), 'Rocket')
  userEvent.type(newUserForm.querySelector('input[name="email"]'), 'jhonnyrocket@email.com')
  fireEvent.submit(getByTestId('new-user-form'))

  const newUser = await waitForElement(() => getByTestId('list-item'))
  expect(newUser.querySelector('input[name="first_name"]').value).toBe('Jhonny')
  expect(newUser.querySelector('input[name="last_name"]').value).toBe('Rocket')
  expect(newUser.querySelector('input[name="email"]').value).toBe('jhonnyrocket@email.com')
  expect(server.db.users.length).toBe(1);
  expect(server.db.users[0].first_name).toBe('Jhonny');
  expect(server.db.users[0].last_name).toBe('Rocket');
  expect(server.db.users[0].email).toBe('jhonnyrocket@email.com');
})

it.only('can delete a user', async () => {
  const { container, getAllByTestId } = render(<App />);
  const button = await waitForElement(() => getAllByTestId('button-delete'))
  console.log(prettyDOM(button))
})