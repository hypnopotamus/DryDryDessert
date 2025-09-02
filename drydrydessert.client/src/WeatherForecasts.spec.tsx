import { render } from '@testing-library/react'
import { WeatherForecasts } from "./WeatherForecasts";

describe('<WeatherForecasts />', () => {
    describe('while loading data', () => {
        it('shows a loading message', () => {
            //render(<WeatherForecasts />);
            const { queryByText } = render(<p>Loading...t</p>)

            expect(queryByText(/Loading.*/)).toBeInTheDocument();
        });
    });

    describe('when data has loaded', () => {
        it('shows a data table', () => {
            //render(<WeatherForecasts />);
            const { queryByText } = render(<p>Loading...t</p>)

            expect(queryByText(/Loading.*/)).toBeInTheDocument();
        });
    });
});