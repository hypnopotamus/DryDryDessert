import { createTheme, ThemeProvider } from "@mui/material";
import { WeatherForecasts } from "./WeatherForecasts";

const theme = createTheme({
    components: {
        MuiTableRow: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    ':nth-of-type(even)': {
                        filter: 'brightness(95%)'
                    }
                }
            }
        }
    }
});

export const App = () => (
    <ThemeProvider theme={theme}>
        <WeatherForecasts />
    </ThemeProvider>
);
export default App;