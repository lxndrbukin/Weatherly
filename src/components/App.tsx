import './assets/styles.scss';
import { type JSX } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import Header from './Header/Header';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import { Forecast } from './Forecast/Forecast';
import Footer from './Footer/Footer';
import Summary from './Summary/Summary';

export default function App(): JSX.Element {
  const { loading, weather } = useSelector((state: RootState) => state.weatherData);

  const currentWeather = (): JSX.Element | null => {
    const { current } = weather;
    if (current) {
      return <CurrentWeather
        city={current.name}
        weather={current.weather[ 0 ]}
        hwp={{ main: current.main, wind: current.wind }}
        sys={current.sys}
      />;
    }
    return null;
  };

  const forecast = (): JSX.Element | null => {
    const { forecast } = weather;
    if (forecast) {
      return <Forecast list={forecast.list} />;
    }
    return null;
  };

  return (
    <div className="container">
      <Header />
      {loading && currentWeather()}
      {loading && forecast()}
      <Summary />
      <Footer />
    </div>
  );
}