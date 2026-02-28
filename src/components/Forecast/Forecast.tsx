import './assets/styles.scss';
import { Component } from 'react';
import { ForecastProps } from './types';
import Day from '../Day/Day';

export class Forecast extends Component<ForecastProps> {
  days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

  constructor (props: ForecastProps) {
    super(props);
    this.renderDays = this.renderDays.bind(this);
  }

  renderDays(): Array<JSX.Element | null> {
    return this.props.list.map((time): JSX.Element | null => {
      if (time.dt_txt.includes('12:00:00')) {
        const dayNum = new Date(time.dt * 1000).getDay();
        return (
          <Day
            key={dayNum}
            day={this.days[ dayNum ]}
            icon={time.weather[ 0 ].icon}
            description={time.weather[ 0 ].description}
            main={time.main}
          />
        );
      }
      return null;
    });
  }

  render(): JSX.Element {
    return (
      <section className="forecast">
        <h4 className="forecast-header">5-day forecast</h4>
        <div className="forecast-days">{this.renderDays()}</div>
      </section>
    );
  }
}
