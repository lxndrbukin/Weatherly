export enum Slices {
  Weather = 'weather',
}

export type State = {
  weather: WeatherProps;
  search: string;
  loading: boolean;
  summaryLoading: boolean;
};

export type ForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  dt_txt: string;
};

export type ForecastProps = {
  list: ForecastItem[];
};

export type CurrentProps = {
  coord: {
    lat: number;
    lon: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
};

export type WeatherProps = {
  current: CurrentProps | null;
  forecast: ForecastProps | null;
  summary: string | null;
};
