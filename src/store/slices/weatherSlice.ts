import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Slices, type State, type WeatherProps } from './types';
import { getWeather, getSummary } from '../thunks/getWeather';

const initialState: State = {
  weather: {
    current: null,
    forecast: null,
    summary: null
  },
  search: '',
  loading: false,
  summaryLoading: false,
};

const weatherSlice = createSlice({
  name: Slices.Weather,
  initialState,
  reducers: {
    setSearch: (state: State, action: PayloadAction<string>): void => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder): void => {
    builder.addCase(getWeather.pending, (state: State): void => {
      state.loading = true;
      state.summaryLoading = true;
    });
    builder.addCase(
      getWeather.fulfilled,
      (state: State, action: PayloadAction<WeatherProps>): void => {
        state.loading = false;
        state.weather = { ...action.payload };
      }
    );
    builder.addCase(
      getSummary.fulfilled,
      (state: State, action: PayloadAction<string>): void => {
        state.summaryLoading = false;
        state.weather.summary = action.payload;
      }
    );
  },
});

export default weatherSlice.reducer;
export const { setSearch } = weatherSlice.actions;
