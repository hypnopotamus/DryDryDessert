import { useEffect, useState } from 'react';
import { Typography, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { serverClientFactory } from './clients';
import type { WeatherForecast } from './clients/server';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

const asForecasts = (forecasts: WeatherForecast[]): Forecast[] => forecasts.map(asForecast);
const asForecast = (forecast: WeatherForecast): Forecast => ({
    date: forecast.date!.toLocaleDateString(),
    temperatureC: forecast.temperatureC!,
    temperatureF: forecast.temperatureF!,
    summary: forecast.summary ?? ''
});

const useWeatherData = (setForecasts: ReturnType<typeof useState<Forecast[]>>[1]) =>
    useEffect(() => {
        const populateWeatherData = async () => {
            const client = serverClientFactory();
            const response = await client.getWeatherForecast();
            setForecasts(asForecasts(response));
        }

        populateWeatherData();
    }, []);

export const WeatherForecasts = () => {
    const [forecasts, setForecasts] = useState<Forecast[]>();
    useWeatherData(setForecasts);

    if (!forecasts) {
        return <Typography>
            Loading... Please refresh once the ASP.NET backend has started. See <Link href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</Link> for more details.
        </Typography>
    }

    return (
        <>
            <Typography variant="h1">Weather forecast</Typography>
            <Typography>This component demonstrates fetching data from the server.</Typography>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Temp. (C)</TableCell>
                            <TableCell>Temp. (F)</TableCell>
                            <TableCell>Summary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {forecasts.map((f, i) => (
                            <TableRow key={i}>
                                <TableCell>{f.date}</TableCell>
                                <TableCell>{f.temperatureC}</TableCell>
                                <TableCell>{f.temperatureF}</TableCell>
                                <TableCell>{f.summary}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};