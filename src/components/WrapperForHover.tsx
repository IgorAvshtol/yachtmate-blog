import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { Link, Box } from '@chakra-ui/react';

import style from 'styles/wrapper.module.css';

interface IWrapper {
  children: ReactNode,
  slug: string
}

export const WrapperForHover = ({ children, slug }: IWrapper): JSX.Element => {
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
      <Link href={`${language}/blog/${slug}`} boxShadow={hoverCard === slug ? 'md' : 'none'} onMouseEnter={cardIsHover}
            onMouseLeave={cardIsNoHover} borderRadius='12px' _hover={{ textDecoration: 'none' }}>
        <Box className={hoverCard === slug ? style.cardIsHover : style.card}>
          {children}
        </Box>
      </Link>
  );
};
