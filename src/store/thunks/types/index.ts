export type CoordsProps = {
  lat: number;
  lon: number;
};

export type WeatherDataProps = {
  city: string;
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    description: string;
    wind_speed: number;
  };
  forecast: Array<{ dt_txt: Date, temp: number, description: string; }>;
};