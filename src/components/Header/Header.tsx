import './assets/styles.scss';
import { type JSX, FormEvent, MouseEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearch,
  getWeather,
  getSummary,
  type RootState,
  type AppDispatch,
  type WeatherDataProps,
  type WeatherProps
} from '../../store';

export default function Header(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { search } = useSelector((state: RootState) => state.weatherData);

  const buildWeatherData = (payload: WeatherProps): WeatherDataProps | null => {
    if (!payload.current || !payload.forecast) return null;
    return {
      city: payload.current.name,
      current: {
        temp: payload.current.main.temp,
        feels_like: payload.current.main.feels_like,
        humidity: payload.current.main.humidity,
        description: payload.current.weather[ 0 ].description,
        wind_speed: payload.current.wind.speed
      },
      forecast: payload.forecast.list.slice(0, 4).map((item) => ({
        dt_txt: item.dt_txt,
        temp: item.main.temp,
        description: item.weather[ 0 ].description
      }))
    };
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const result = await dispatch(getWeather(search));
    const payload = result.payload as WeatherProps;
    const weatherData = buildWeatherData(payload);
    if (weatherData) dispatch(getSummary(weatherData));
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
      const result = await dispatch(getWeather({ lat: latitude, lon: longitude }));
      const payload = result.payload as WeatherProps;
      const weatherData = buildWeatherData(payload);
      if (weatherData) dispatch(getSummary(weatherData));
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