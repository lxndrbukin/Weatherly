import { type JSX } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store";

export default function Summary(): JSX.Element {
  const { summary } = useSelector((state: RootState) => state.weatherData.weather);
  const { summaryLoading } = useSelector((state: RootState) => state.weatherData);

  return <section className="summary">
    <h4 className="summary-header">Summary</h4>
    <p className="summary-info">  {summaryLoading
      ? 'Generating weather summary...'
      : summary}</p>
  </section>;
}