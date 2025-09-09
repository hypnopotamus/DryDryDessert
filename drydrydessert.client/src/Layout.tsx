import type { PropsWithChildren } from "react";
import { Box, Stack, ThemeProvider } from "@mui/material";
import { theme } from "./app.theme";
import { SearchBar, type Props as SearchBarProps } from "./ProductSearch/SearchBar";
import { Menu, type Props as MenuProps } from "./Menu";

type props = PropsWithChildren<SearchBarProps & MenuProps>;

export const Layout = ({ children, ...props }: props) => {
    return (
        <ThemeProvider theme={theme}>
            <Stack height={"100vh"}>
                <Box padding={1}>
                    <SearchBar {...props} />
                </Box>
                <Box flexGrow={1} overflow={"auto"} padding={1}>
                    {children}
                </Box>
                <Menu {...props} />
            </Stack>
        </ThemeProvider>
    );
}