import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Flex, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../store/store';
import { FormCustomInput } from './Inputs/FormCustomInput';
import { resetPasswordModalIsOpen, recoveryPasswordModalIsOpen } from '../store/auth/authSlice';
import { sendEmailForRecoveryPassword } from '../store/auth/authThunk';

interface IRecoveryPassword {
  email: string;
}

export const RecoveryPassword = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { loading, recoveryPasswordModalOpen, userData } = useAppSelector(state => state.auth);
  const { register, handleSubmit } = useForm<IRecoveryPassword>();

  const onSubmit: SubmitHandler<IRecoveryPassword> = data => {
    dispatch(sendEmailForRecoveryPassword(data.email));
    dispatch(recoveryPasswordModalIsOpen());
    dispatch(resetPasswordModalIsOpen());
  };

  return (
      <Flex direction='column'>
        <Text fontWeight='600' fontSize='32px' lineHeight='110%' letterSpacing='0.3px'>Recovery password</Text>
        <Text mt='12px' fontWeight='00' fontSize='16px' lineHeight='140%' letterSpacing='0.7px'
              color='rgba(0, 18, 64, 0.6)'>
          Введите адрес электронной почты, чтобы восстановить пароль. Мы отправим вам электронное письмо с инструкциями
          по восстановлению
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCustomInput label='email' {...register('email')} mt='32px' placeholder='Email'/>
          <Button type='submit' my='32px' w='100%' h='56px' p='20px 24px' bg='#0250C8' borderRadius='32px'
                  _hover={{ bgColor: '#0250C8' }}>
            Send
          </Button>
        </form>
      </Flex>
  );
};