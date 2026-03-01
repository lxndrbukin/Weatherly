import './assets/styles.scss';
import { type JSX } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import Day from '../Day/Day';

export default function Forecast(): JSX.Element {
  const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

  const { list } = useSelector((state: RootState) => state.weatherData.weather.forecast!);

  const renderDays = (): Array<JSX.Element | null> => {
    return list.map((time): JSX.Element | null => {
      if (time.dt_txt.includes('12:00:00')) {
        const dayNum = new Date(time.dt * 1000).getDay();
        return (
          <Day
            key={dayNum}
            day={days[ dayNum ]}
            icon={time.weather[ 0 ].icon}
            description={time.weather[ 0 ].description}
            main={time.main}
          />
        );
      }
      return null;
    });
  };

  return (
    <section className="forecast">
      <h4 className="forecast-header">5-day forecast</h4>
      <div className="forecast-days">{renderDays()}</div>
    </section>
  );
}