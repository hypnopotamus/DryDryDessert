import { createContext } from "react";
import type { Product } from "../Entities/Product";

export const ProductContext = createContext<{ product?: Product }>({});