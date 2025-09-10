import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import type { navigateToSearch } from "../App";
import { useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';

export interface Props {
    search: navigateToSearch
}

export const SearchBar = ({ search }: Props) => {
    const searchValue = useRef<HTMLInputElement>(null);
    const performSearch = () => search(searchValue.current?.value ?? "");

    return (
        <OutlinedInput placeholder="search" aria-label="search" name="search" role="search"
            fullWidth
            inputRef={searchValue}
            onKeyDown={e => { if (e.key === "Enter") { performSearch(); } }}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton onClick={performSearch}>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            } />
    );
};