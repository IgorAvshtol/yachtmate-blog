import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/store';
import { FormCustomInput } from './Inputs/FormCustomInput';
import { isError } from 'store/auth/authSlice';
import { RepeatPasswordInput } from './Inputs/RepeatPasswordInput';
import { TypeLoadingStatus } from '../interfaces';
import { Spinner } from './Spinner';
import { setNewPassword } from 'store/auth/authThunk';

interface ISetNewPassword {
  password: string;
}

export const SetNewPassword = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const { loading, emailForRecoveryPassword } = useAppSelector(state => state.auth);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ISetNewPassword>();
  const onSubmit: SubmitHandler<ISetNewPassword> = data => {
    try {
      const newPasswordData = {
        email: emailForRecoveryPassword,
        password: data.password
      };
      dispatch(setNewPassword(newPasswordData));
    } catch (e) {
      dispatch(isError('Error 500'));
    }
  };

  return (
      <Flex direction='column'>
        <Text fontWeight='600' fontSize='32px' lineHeight='110%' letterSpacing='0.3px'>New password</Text>
        <Text mt='12px' fontWeight='00' fontSize='16px' lineHeight='140%' letterSpacing='0.7px'
              color='rgba(0, 18, 64, 0.6)'>
          Введите новый надежный пароль длиной не менее 8 символов.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mt='32px'>
            <FormCustomInput label='password'
                             {...register('password', {
                               validate: () => {
                                 if (watch('password') !== repeatPassword) {
                                   return 'Your passwords do no match';
                                 }
                               }
                             })} placeholder='Enter your password'/>
            <RepeatPasswordInput repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword}/>
            {errors?.password?.message && <Text color='red' textAlign='center'>{errors.password.message}</Text>}
          </Box>
          {
              loading !== TypeLoadingStatus.IS_PENDING &&
              <Button type='submit' my='32px' w='100%' h='56px' p='20px 24px' bg='#0250C8' borderRadius='32px'
                      _hover={{ bgColor: '#0250C8' }}>
                Save
              </Button>
          }
          {loading === TypeLoadingStatus.IS_PENDING && <Spinner/>}
        </form>
      </Flex>
  );
};