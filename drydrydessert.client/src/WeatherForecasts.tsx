import { useEffect, useState } from 'react';
import { Typography, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

const useFetchWeatherData = (setForecasts: React.Dispatch<React.SetStateAction<Forecast[] | undefined>>) =>
    useEffect(() => {
        async function populateWeatherData() {
            const response = await fetch('weatherforecast');
            if (response.ok) {
                const data = await response.json();
                setForecasts(data);
            }
        }

        populateWeatherData();
    }, []);

export const WeatherForecasts = () => {
    const [forecasts, setForecasts] = useState<Forecast[]>();
    useFetchWeatherData(setForecasts);

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