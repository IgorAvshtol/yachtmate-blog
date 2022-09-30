import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Input } from '@chakra-ui/react';
import { InputGroup, InputRightElement } from '@chakra-ui/input';

import eyeOff from 'public/eye-off.png';
import eye from 'public/eye.png';
import { eng, rus } from 'translation';

interface IRepeatPasswordInput {
  repeatPassword: string;
  setRepeatPassword: (value: string) => void;
  valueIsWrong?: boolean;
}

export const RepeatPasswordInput = ({ repeatPassword, setRepeatPassword, valueIsWrong }: IRepeatPasswordInput): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  const repeatPasswordFieldHandler = (e: ChangeEvent<HTMLInputElement>) => setRepeatPassword(e.currentTarget.value);

  return (
      <>
        <InputGroup pos='relative' mt='12px' w='100%' h='58px'>
          <Input w='100%' h='58px' p='20px 24px' bg='rgba(0, 18, 64, 0.04)' borderRadius='32px'
                 borderColor='transparent' isInvalid={valueIsWrong} errorBorderColor='#FF5353'
                 placeholder={t.placeholders.enter_pass_again} value={repeatPassword} focusBorderColor='transparent'
                 _hover={{ borderColor: 'transparent' }} type={show ? 'text' : 'password'}
                 onChange={repeatPasswordFieldHandler}
          />
          <InputRightElement pos='absolute' top='10px' right='15px'>
            <Image src={show ? eyeOff : eye} width='20px' height='20px' alt='eye' onClick={handleClick}/>
          </InputRightElement>
        </InputGroup>
      </>
  );
};