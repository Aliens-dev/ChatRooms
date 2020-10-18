import React from 'react';
import { Container,Settings,Header,Title,CardLink, Image,Footer} from './styles/card';


const Card = ({children, ...restProps}) => {
    return (
        <Container {...restProps}>
            {children}
        </Container>
    )
}
Card.Header = function CardHeader({children, ...restProps}) {
    return (
        <Header {...restProps}>
            {children}
        </Header>
    )
}
Card.Title = function CardTitle({children, ...restProps}) {
    return (
        <Title {...restProps}>
            {children}
        </Title>
    )
}
Card.Image = function CardImage({children, ...restProps}) {
    return (
        <Image {...restProps}>
            {children}
        </Image>
    )
}
Card.CardLink = function MyCardLink({children, ...restProps}) {
    return (
        <CardLink {...restProps}>
            {children}
        </CardLink>
    )
}
Card.Settings = function CardSettings({children, ...restProps}) {
    return (
        <Settings {...restProps}>
            {children}
        </Settings>
    )
}

Card.Footer = function CardFooter({children, ...restProps}) {
    return (
        <Footer {...restProps}>
            {children}
        </Footer>
    )
}

export default Card;
