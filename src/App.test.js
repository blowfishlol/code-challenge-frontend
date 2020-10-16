import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react'
import App from './App';

jest.mock('socket.io-client', () =>{
  const emit = jest.fn();
  const on = jest.fn();
  const off = jest.fn();
  const socket = {emit, on, off};
  return jest.fn(() => socket);
});

describe('Test features when offline', () =>{
  test('renders text field and submit button', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/submit/i);
    expect(linkElement).toBeInTheDocument();
  });


  test('able to type to the chat text field', async () => {
    const app = render(<App/>);
    let input = app.getByLabelText(/chat-input/i);

    fireEvent.change(input, {
      target: {value:"5+5"}
    });
    expect(input.value).toBe("5+5")
  });

  test('chat input and button should be disabled', () =>{
    const app = render(<App/>);
    let input = app.getByLabelText(/chat-input/i);
    let button = app.getByLabelText(/submit-button/i);

    expect(input.getAttribute("placeholder")).toBe("Please wait for connection...");
    expect(button).toHaveAttribute("disabled");
  });


  test('card should not appear when submit is clicked', async () => {
    const app = render(<App/>);
    let button = app.getByLabelText(/submit-button/i);

    fireEvent.click(button, {button: 0});

    let card = app.queryByText(/client/i);

    expect(card).toBeNull();
  });

});


