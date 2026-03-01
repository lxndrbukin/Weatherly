import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CoordsProps, WeatherDataProps } from './types';
import axios from 'axios';
import { OPENWEATHER_API_KEY } from '../../keys';

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (data: string | CoordsProps) => {
    let current;
    let forecast;
    if (typeof data === "string") {
      current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      forecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
    } else {
      current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      forecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
    }
    return { current: current.data, forecast: forecast.data, summary: null };
  }
);

export const getSummary = createAsyncThunk(
  'weather/getSummary', async (data: WeatherDataProps) => {
    const response = await axios.post('/api/summary', { data });
    return response.data.summary;
  }
);