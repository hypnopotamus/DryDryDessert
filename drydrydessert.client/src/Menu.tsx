import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import type { navigateToHome, navigateToCheckout } from "./App";
import { Home, ShoppingCartCheckout } from '@mui/icons-material';

export interface Props {
    navigateToHome: navigateToHome
    navigateToCheckout: navigateToCheckout
}

export const Menu = ({ navigateToHome, navigateToCheckout }: Props) => (
    <BottomNavigation>
        <BottomNavigationAction label="home" icon={<Home />} onClick={navigateToHome}/>
        <BottomNavigationAction label="cart" icon={<ShoppingCartCheckout />}  onClick={navigateToCheckout}/>
    </BottomNavigation>
);