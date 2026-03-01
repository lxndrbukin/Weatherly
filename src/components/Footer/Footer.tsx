import './assets/styles.scss';
import { type JSX } from 'react';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <a
        className="github"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/lxndrbukin/Weatherly"
      >
        <i className="fa-brands fa-github"></i>
      </a>
      <span>
        Created with{' '}
        <a target="_blank" rel="noreferrer" href="https://react.dev/">
          React
        </a>
        ,{' '}
        <a target="_blank" rel="noreferrer" href="https://redux-toolkit.js.org/">
          Redux Toolkit
        </a>{' '}
        &{' '}
        <a target="_blank" rel="noreferrer" href="https://openweathermap.org/api">
          OpenWeather API
        </a>
      </span>
    </footer>
  );
}
