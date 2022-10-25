import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Flex, Text } from '@chakra-ui/react';

import { useAppDispatch } from 'store/store';
import { FormCustomInput } from './Input/FormCustomInput';
import { recoveryPasswordModalIsOpen, resetPasswordModalIsOpen, signInModalIsOpen } from 'store/auth/authSlice';
import { sendEmailForRecoveryPassword } from 'store/auth/authThunk';
import { eng, rus } from 'translation';
import back from 'public/backBtn.svg';

interface IRecoveryPassword {
  email: string;
}

export const RecoveryPassword = (): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<IRecoveryPassword>();

  const onSubmit: SubmitHandler<IRecoveryPassword> = data => {
    dispatch(sendEmailForRecoveryPassword(data.email));
    dispatch(recoveryPasswordModalIsOpen());
    dispatch(resetPasswordModalIsOpen());
  };

  const onBackBtnClickHandler = () => {
    dispatch(signInModalIsOpen());
    dispatch(recoveryPasswordModalIsOpen());
  };

  return (
      <Flex direction='column'>
        <Button display='flex' justifyContent='flex-start' alignItems='center' w='100%' p='0' bg='transparent'
                _hover={{ bg: 'transparent' }} _focus={{ border: 'none' }}
                _active={{ bg: 'transparent', borderColor: 'transparent' }} onClick={onBackBtnClickHandler}>
          <Flex justifyContent='center' alignItems='center' w='32px' h='32px' rounded='full' bg='rgba(0, 18, 64, 0.04)'>
            <Image src={back} width='7px' height='10px' alt='back'/>
          </Flex>
        </Button>
        <Text mt='24px' fontWeight='600' fontSize='32px' lineHeight='110%'
              letterSpacing='0.3px'>{t.recovery_pas.title}</Text>
        <Text mt='12px' fontWeight='00' fontSize='16px' lineHeight='140%' letterSpacing='0.7px'
              color='rgba(0, 18, 64, 0.6)'>
          {t.recovery_pas.description}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCustomInput
              {...register('email', {
                required: 'Required'
              })}
              label='email'
              isInvalid={!!errors.email}
              mt='32px'
              placeholder={t.placeholders.email}/>
          {/*{errors.email && <Text mt='px' color='red' textAlign='center'>{errors.email.message}</Text>}*/}
          <Button type='submit' my='32px' w='100%' h='56px' p='20px 24px' bg='#0250C8' borderRadius='32px'
                  _hover={{ bgColor: '#0250C8' }}>
            {t.recovery_pas.send_btn}
          </Button>
        </form>
      </Flex>
  );
};