import { createTheme } from "@mui/material";
import { grey, red } from '@mui/material/colors';

export const theme = createTheme({
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: grey[700]
                    //color: red['A700']
                }
            }
        }
    }
});