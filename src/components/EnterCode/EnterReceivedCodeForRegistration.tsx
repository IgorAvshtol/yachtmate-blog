import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Flex, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/store';
import { FormCustomInput } from '../Input/FormCustomInput';
import { confirmRegistrationUserModalIsOpen, isError, signUpModalIsOpen } from 'store/auth/authSlice';
import back from '../../../public/backBtn.svg';
import { Timer } from '../Timer';
import { getRegistrationCode, registration, sendRegistrationCode } from 'store/auth/authThunk';
import { eng, rus } from 'translation';

interface IResetPassword {
  code: string;
}

export const EnterReceivedCodeForRegistration = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [seconds, setSeconds] = useState<number>(45);
  const { emailForRecoveryPassword, temporaryUserData, error } = useAppSelector(state => state.auth);
  const t = router.locale === 'en' ? eng : rus;

  const { register, handleSubmit } = useForm<IResetPassword>();

  const onSubmit: SubmitHandler<IResetPassword> = async (data) => {
    try {
      const recoveryCodeData = {
        code: data.code,
        email: temporaryUserData?.email
      };
      const response = await dispatch(sendRegistrationCode(recoveryCodeData));
      response.payload === 'success' && dispatch(registration(temporaryUserData));
    } catch (e) {
      dispatch(isError('Code is wrong'));
    }
  };

  const onBackBtnClickHandler = () => {
    dispatch(signUpModalIsOpen());
    dispatch(confirmRegistrationUserModalIsOpen());
  };

  const onSendAgainBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSeconds(45);
    dispatch(getRegistrationCode(temporaryUserData));
  };

  return (
      <Flex direction='column'>
        <Button display='flex' justifyContent='flex-start' alignItems='center' w='100%' p='0' bg='transparent'
                _hover={{ bg: 'transparent' }} _focus={{ border: 'none' }}
                _active={{ bg: 'transparent', borderColor: 'transparent' }}
                onClick={onBackBtnClickHandler}>
          <Flex justifyContent='center' alignItems='center' w='32px' h='32px' rounded='full' bg='rgba(0, 18, 64, 0.04)'>
            <Image src={back} width='7px' height='10px' alt='back'/>
          </Flex>
        </Button>
        <Text mt='32px' fontWeight='600' fontSize='32px' lineHeight='110%' letterSpacing='0.3px'>
          {t.enter_code_for_signup.enter_code}
        </Text>
        <Text mt='12px' fontWeight='500' fontSize='16px' lineHeight='140%' letterSpacing='0.7px'
              color='rgba(0, 18, 64, 0.6)'>
          {t.enter_code_for_signup.description}: {emailForRecoveryPassword}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCustomInput label='code' isInvalid={!!error} {...register('code')} mt='32px'
                           placeholder={t.placeholders.enter_code}/>
          <Flex alignItems='flex-end'>
            <Text mt='12px' fontWeight='500' fontSize='14px' lineHeight='140%' letterSpacing='0.7px'
                  color='rgba(0, 18, 64, 0.6)'>
              {t.enter_code_for_signup.didnt_get_code}
            </Text>
            {seconds !== 0 && <Timer seconds={seconds} setSeconds={setSeconds}/>}
            {seconds === 0 &&
                <Button ml='5px' variant='link' fontWeight='500' fontSize='14px' lineHeight='140%' letterSpacing='0.7px'
                        color='#0250C8' _focus={{ border: 'none' }} onClick={onSendAgainBtnClickHandler}>
                  {t.enter_code_for_signup.send_again_btn}
                </Button>
            }
          </Flex>
          <Button type='submit' my='32px' w='100%' h='56px' p='20px 24px' bg='#0250C8'
                  borderRadius='32px' _hover={{ bgColor: '#0250C8' }}>
            {t.enter_code_for_signup.send_btn}
          </Button>
        </form>
      </Flex>
  );
};
