import { useState } from 'react';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Flex, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/store';
import { FormCustomInput } from './Inputs/FormCustomInput';
import { confirmRegistrationUserModalIsOpen, isError, signUpModalIsOpen } from 'store/auth/authSlice';
import back from 'public/back.png';
import { Timer } from './Timer';
import { getRegistrationCode, registration, sendRegistrationCode } from 'store/auth/authThunk';

interface IResetPassword {
  code: string;
}

export const EnterReceivedCodeForRegistration = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [seconds, setSeconds] = useState<number>(45);
  const { emailForRecoveryPassword, temporaryUserData, } = useAppSelector(state => state.auth);
  const { register, handleSubmit } = useForm<IResetPassword>();

  const onSubmit: SubmitHandler<IResetPassword> = data => {
    try {
      const recoveryCodeData = {
        code: data.code,
        email: temporaryUserData?.email
      };
      dispatch(sendRegistrationCode(recoveryCodeData));
      temporaryUserData && dispatch(registration(temporaryUserData));
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
        <Button display='flex' justifyContent='flex-start' alignItems='center' w='90px' p='0' bg='transparent'
                _hover={{ bg: 'transparent' }} _focus={{ border: 'none' }}
                _active={{ bg: 'transparent', borderColor: 'transparent' }}
                onClick={onBackBtnClickHandler}>
          <Flex justifyContent='center' alignItems='center' w='32px' h='32px' rounded='full' bg='rgba(0, 18, 64, 0.04)'>
            <Image src={back} width='7px' height='10px' alt='back'/>
          </Flex>
          <Text ml='10px' fontWeight='600' fontSize='16px' lineHeight='24px' letterSpacing='0.4px'>Back</Text>
        </Button>
        <Text mt='32px' fontWeight='600' fontSize='32px' lineHeight='110%' letterSpacing='0.3px'>Enter code</Text>
        <Text mt='12px' fontWeight='500' fontSize='16px' lineHeight='140%' letterSpacing='0.7px'
              color='rgba(0, 18, 64, 0.6)'>
          Чтобы подтвердить эл. почту введите код, которы мы отправили на: {emailForRecoveryPassword}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCustomInput label='code' {...register('code')} mt='32px' placeholder='Enter code'/>
          <Flex alignItems='flex-end'>
            <Text mt='12px' fontWeight='500' fontSize='14px' lineHeight='140%' letterSpacing='0.7px'
                  color='rgba(0, 18, 64, 0.6)'>
              Не пришел код?
            </Text>
            {seconds !== 0 && <Timer seconds={seconds} setSeconds={setSeconds}/>}
            {seconds === 0 &&
                <Button ml='5px' variant='link' fontWeight='500' fontSize='14px' lineHeight='140%' letterSpacing='0.7px'
                        color='#0250C8' _focus={{ border: 'none' }} onClick={onSendAgainBtnClickHandler}>
                  Отправить повторно
                </Button>
            }
          </Flex>
          <Button type='submit' my='32px' w='100%' h='56px' p='20px 24px' bg='#0250C8'
                  borderRadius='32px' _hover={{ bgColor: '#0250C8' }}>
            Send
          </Button>
        </form>
      </Flex>
  );
};
