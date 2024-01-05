import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';

//Notes
//Deleted extraneous images, stylesheets
//Deleted web manifest (doesn't need to run offline)

//Deleted App.test.js and setupTests.js
/*
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import '@testing-library/jest-dom';
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
