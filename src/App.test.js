import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react'
import App from './App';

test('renders text field and submit button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/submit/i);
  expect(linkElement).toBeInTheDocument();
});


test('able to type to the chat text field', async () => {
  const app = render(<App/>)
  let input = app.getByLabelText(/chat-input/i)

  fireEvent.change(input, {
    target: {value:"5+5"}
  })
  expect(input.value).toBe("5+5")
});


test('card should appear when submit is clicked when the input have value', async () => {
  const app = render(<App/>)
  let input = app.getByLabelText(/chat-input/i)
  let button = app.getByLabelText(/submit-button/i)

  fireEvent.change(input, {
    target: {value:"5+5"}
  })

  fireEvent.click(button, {button: 0})

  let card = app.getByText(/client/i)

  expect(card).toBeInTheDocument();
});


test('card should not appear when submit is clicked when the input dont have value', async () => {
  const app = render(<App/>)
  let input = app.getByLabelText(/chat-input/i)
  let button = app.getByLabelText(/submit-button/i)

  fireEvent.click(button, {button: 0})

  let card = app.queryByText(/client/i)

  expect(card).toBeNull();
});