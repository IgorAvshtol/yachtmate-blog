import React, { ForwardedRef, forwardRef, ReactNode, useState } from 'react';
import { Box, Link, LinkProps } from '@chakra-ui/react';

import style from 'styles/wrapper.module.css';
import { useAppSelector } from 'store/store';

interface IWrapper extends LinkProps {
  children: ReactNode,
  slug: string,
}

export const Wrapper = forwardRef((props: IWrapper, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { slug, children, ...rest } = props;

  const { currentLanguage } = useAppSelector(state => state.articles);
  const [hoverCard, setHoverCard] = useState<string>('');

  const cardIsHover = () => {
    setHoverCard(slug);
  };

  const cardIsNoHover = () => {
    setHoverCard('');
  };

  return (
      <Link ref={ref} href={`${currentLanguage}/blog/${slug}`} boxShadow={hoverCard === slug ? 'md' : 'none'}
            onMouseEnter={cardIsHover} onMouseLeave={cardIsNoHover} {...rest}>
        <Box className={hoverCard === slug ? style.cardIsHover : style.card}>
          {children}
        </Box>
      </Link>
  );
});
Wrapper.displayName = 'Wrapper';