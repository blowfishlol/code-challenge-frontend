import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react'
import App from './App';
import io from "socket.io-client"

jest.mock('socket.io-client', () =>{
  const emit = jest.fn()
  const on = jest.fn()
  const off = jest.fn()
  const socket = {emit, on, off}
  return jest.fn(() => socket)
})

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
  let button = app.getByLabelText(/submit-button/i)

  fireEvent.click(button, {button: 0})

  let card = app.queryByText(/client/i)

  expect(card).toBeNull();
});

test('chat input and button should be disabled when not connected', () =>{
  const app = render(<App/>)
  let input = app.getByLabelText(/chat-input/i)
  let button = app.getByLabelText(/submit-button/i)

  expect(input).toHaveAttribute("disabled");
  expect(button).toHaveAttribute("disabled");
})

test('chat input and button should be enabled when connected', () =>{

  beforeEach(() =>{
    io.mockClear()
    io().on.mockClear()
    io().emit.mockClear()
  })

  afterEach(() =>{
    jest.restoreAllMocks()
  })
  //expect(io.connect).toHaveBeenCalled()

  const app = render(<App/>)
  let input = app.getByLabelText(/chat-input/i)
  let button = app.getByLabelText(/submit-button/i)

  expect(input.getAttribute("disabled")).toBe("")
  expect(button.getAttribute("disabled")).toBe("")
})