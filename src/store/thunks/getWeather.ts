import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CoordsProps, WeatherDataProps } from './types';
import axios from 'axios';
import { OPENWEATHER_API_KEY } from '../../keys';

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (city: string) => {
    const current = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    const forecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    return { current: current.data, forecast: forecast.data };
  }
);

export const getWeatherByCoords = createAsyncThunk(
  'weather/getWeatherByCoords',
  async ({ lat, lon }: CoordsProps) => {
    const current = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    const forecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    return { current: current.data, forecast: forecast.data };
  }
);

export const getSummary = createAsyncThunk(
  'weather/getSummary', async (data: WeatherDataProps) => {
    const response = await axios.post('/api/summary', data);
    return response.data.summary;
  }
);