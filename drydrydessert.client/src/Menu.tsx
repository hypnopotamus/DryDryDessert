import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import type { navigateToHome, navigateToCheckout } from "./App";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

export interface Props {
    navigateToHome: navigateToHome
    navigateToCheckout: navigateToCheckout
}

export const Menu = ({ navigateToHome, navigateToCheckout }: Props) => (
    <BottomNavigation>
        <BottomNavigationAction label="home" icon={<HomeIcon />} onClick={navigateToHome}/>
        <BottomNavigationAction label="cart" icon={<ShoppingCartCheckoutIcon />}  onClick={navigateToCheckout}/>
    </BottomNavigation>
);