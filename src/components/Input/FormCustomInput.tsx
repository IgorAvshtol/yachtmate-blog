import { forwardRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { InputElementProps, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Flex, Input, Text, Box } from '@chakra-ui/react';

import eye from 'public/eye.png';
import eyeOff from 'public/eye-off.png';
import { eng, rus } from 'translation';

interface InputProps extends InputElementProps {
  label: string;
  isInvalid?: boolean;
}

export const FormCustomInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;
  const { label, isInvalid, ...inputProps } = props;
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
      <InputGroup>
        {
          label === 'password' || label === 'password_repeat' ?
              <Flex pos='relative' mt='12px' w='100%' h='58px'>
                <Input label={label} ref={ref} {...inputProps} w='100%' h='58px' p='20px 24px'
                       bg='rgba(0, 18, 64, 0.04)'
                       borderRadius='32px' focusBorderColor='transparent'
                       border={isInvalid ? '0.5px solid #FF5353' : '0.5px solid transparent'}
                       _focus={isInvalid ? { border: '0.5px solid #FF5353' } : { border: '0.5px solid transparent' }}
                       type={show ? 'text' : 'password'}
                />
                <InputRightElement pos='absolute' top='10px' right='15px'>
                  <Image src={show ? eyeOff : eye} width='20px' height='20px' alt='eye' onClick={handleClick}/>
                </InputRightElement>
              </Flex>
              :
              <Box w='100%'>
                <Input label={label} ref={ref} {...inputProps} w='100%' h='58px' p='20px 24px'
                       bg='rgba(0, 18, 64, 0.04)'
                       borderRadius='32px' focusBorderColor='transparent'
                       border={isInvalid ? '0.5px solid #FF5353' : '0.5px solid transparent'}
                       _focus={isInvalid ? { border: '0.5px solid #FF5353' } : { border: '0.5px solid transparent' }}
                />
                {isInvalid &&
                    <Text ml='20px' mt='5px' fontSize='12px' color='#FF5353' textAlign='center'>
                      {label === 'email' && t.recovery_pas.required}
                      {label === 'code' && t.enter_code_for_recovery_pas.wrong_code}
                    </Text>
                }
              </Box>
        }
      </InputGroup>
  );
});

FormCustomInput.displayName = 'CustomFormInput';