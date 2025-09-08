import { Card, CardActionArea, CardMedia, CardContent, CardActions } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";
import type { Product } from "../Entities/Product";
import { useLoadProductImage } from "../Entities/useLoadProductProperty";

type slottedChildren = {
    content?: ReactNode,
    actions?: ReactNode,
};
interface props {
    product: Pick<Product, 'image' | 'name'>;
    onClick?: () => void;
    children: slottedChildren | ReactNode;
}

const isStructuredChildren = (children: slottedChildren | any): children is slottedChildren =>
    'content' in children && 'actions' in children;

export const ProductCard = ({ product, onClick, children }: props) => {
    const image = useLoadProductImage(product);

    const { content, actions } = isStructuredChildren(children)
        ? children
        : { content: children, actions: undefined };
    const ContentArea = ({ children }: PropsWithChildren<any>) => onClick
        ? <CardActionArea onClick={onClick}>{children}</CardActionArea>
        : <CardContent>{children}</CardContent>;

    return (
        <Card raised>
            <ContentArea>
                <CardMedia
                    component="img"
                    image={image?.href}
                    alt={product.name}
                />
                {content}
            </ContentArea>
            {actions && <CardActions>
                {actions}
            </CardActions>}
        </Card>
    );
};