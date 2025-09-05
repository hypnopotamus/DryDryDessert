import { createTheme } from "@mui/material";
import { grey, blue } from '@mui/material/colors';

export const theme = createTheme({
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: grey[700]
                    //color: blue
                }
            }
        }
    }
});