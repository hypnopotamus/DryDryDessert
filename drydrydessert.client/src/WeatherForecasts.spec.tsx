import { render } from '@testing-library/react'
import { WeatherForecasts } from "./WeatherForecasts";
import { serverClientFactory } from './clients';
import type { WeatherForecast } from './clients/server';

vi.mock('./clients');


const client: ReturnType<typeof serverClientFactory> = {
    getWeatherForecastRaw: vi.fn(),
    getWeatherForecast: vi.fn()
}
vi.mocked(serverClientFactory).mockReturnValue(client);

describe('<WeatherForecasts />', () => {
    describe('while loading data', () => {
        let release = () => { };
        const semaphore = new Promise<WeatherForecast[]>(resolve => { release = () => resolve([]); });

        beforeEach(() => {
            vi.mocked(client.getWeatherForecast).mockReturnValue(semaphore);
        });

        afterEach(() => {
            release();
        });

        it('shows a loading message', async () => {
            const { queryByText } = render(<WeatherForecasts />);

            expect(queryByText(/Loading/)).toBeInTheDocument();
        });
    });

    describe('when data has loaded', () => {
        const forecast: WeatherForecast = {
            date: new Date(),
            temperatureC: 1,
            temperatureF: 2,
            summary: '123'
        }

        beforeEach(() => {
            vi.mocked(client.getWeatherForecast).mockResolvedValue([forecast]);
        });

        it('shows a data table', async () => {
            const { findByText } = render(<WeatherForecasts />);

            await findByText(forecast.date!.toLocaleDateString());
            await findByText(forecast.temperatureC!);
            await findByText(forecast.temperatureF!);
            await findByText(forecast.summary!);
        });
    });
});