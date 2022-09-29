import { forwardRef, useState } from 'react';
import Image from 'next/image';
import { InputElementProps, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Flex, Input } from '@chakra-ui/react';

import eye from 'public/eye.png';
import eyeOff from 'public/eye-off.png';

interface InputProps extends InputElementProps {
  label: string;
}

export const FormCustomInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, ...inputProps } = props;
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
      <InputGroup>
        {
          label === 'password' ?
              <Flex pos='relative' mt='12px' w='100%' h='58px'>
                <Input label={label} ref={ref} {...inputProps} w='100%' h='58px' p='20px 24px'
                       bg='rgba(0, 18, 64, 0.04)'
                       borderRadius='32px' borderColor='transparent' focusBorderColor='transparent'
                       _hover={{ borderColor: 'transparent' }}
                       type={show ? 'text' : 'password'}
                />
                <InputRightElement pos='absolute' top='10px' right='15px'>
                  <Image src={show ? eyeOff : eye} width='20px' height='20px' alt='eye' onClick={handleClick}/>
                </InputRightElement>
              </Flex>
              :
              <Input label={label} ref={ref}{...inputProps} w='100%' h='58px' p='20px 24px' bg='rgba(0, 18, 64, 0.04)'
                     borderRadius='32px' borderColor='transparent' focusBorderColor='transparent'
                     _hover={{ borderColor: 'transparent' }}
              />
        }
      </InputGroup>
  );
});

FormCustomInput.displayName = 'CustomFormInput';