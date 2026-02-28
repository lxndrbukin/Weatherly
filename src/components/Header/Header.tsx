import './assets/styles.scss';
import { type JSX, FormEvent, MouseEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearch,
  getWeatherByCoords,
  getWeather,
  RootState,
  AppDispatch
} from '../../store';

export default function Header(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { search } = useSelector((state: RootState) => state.weatherData);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    dispatch(getWeather(search));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearch(e.target.value));
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const successCallback = async (position: {
      coords: { latitude: number; longitude: number; };
    }): Promise<void> => {
      const { latitude, longitude } = await position.coords;
      dispatch(getWeatherByCoords({ lat: latitude, lon: longitude }));
    };

    navigator.geolocation.getCurrentPosition(successCallback);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">Weatherly</div>
      </div>
      <div className="header-right">
        <button onClick={handleClick} className="btn crosshair">
          <i className="fa-solid fa-location-crosshairs"></i>
        </button>
        <form className="header-search-form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="search"
            placeholder="Enter city/town name"
          />
          <button onClick={handleSubmit} className="btn glass">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </header>
  );
}