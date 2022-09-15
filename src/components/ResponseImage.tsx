import { ForwardedRef, forwardRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { BoxProps, chakra, Flex } from '@chakra-ui/react';

const ChakraNextUnwrappedImage = chakra(Image, {
  shouldForwardProp: (prop) =>
      ['width', 'height', 'src', 'alt', 'layout'].includes(prop),
});

export const ResponseImage = forwardRef((props: ImageProps & BoxProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { src, alt, width, height, layout, objectFit, ...rest } = props;
  return (
      <Flex alignItems='center' pos='relative' cursor='pointer' {...rest}>
        <button ref={ref} style={{ display: 'flex' }}>
          <ChakraNextUnwrappedImage
              layout={layout}
              width={width}
              height={height}
              objectFit={objectFit}
              src={src}
              alt={alt}
          />
        </button>
      </Flex>
  );
});
ResponseImage.displayName = 'ResponseImage';