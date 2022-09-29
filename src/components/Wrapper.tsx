import React, { ForwardedRef, forwardRef, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Link, LinkProps } from '@chakra-ui/react';

import style from 'styles/wrapper.module.css';

interface IWrapper extends LinkProps {
  children: ReactNode,
  slug: string,
}

export const Wrapper = forwardRef((props: IWrapper, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { slug, children, ...rest } = props;

  const router = useRouter();
  const language = router.locale as string;

  const [hoverCard, setHoverCard] = useState<string>('');

  const cardIsHover = () => {
    setHoverCard(slug);
  };

  const cardIsNoHover = () => {
    setHoverCard('');
  };

  return (
      <Link ref={ref} href={`${language}/blog/${slug}`} boxShadow={hoverCard === slug ? 'md' : 'none'}
            onMouseEnter={cardIsHover} onMouseLeave={cardIsNoHover} {...rest}>
        <Box className={hoverCard === slug ? style.cardIsHover : style.card}>
          {children}
        </Box>
      </Link>
  );
});
Wrapper.displayName = 'Wrapper';