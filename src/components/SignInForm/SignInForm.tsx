import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Flex, Text } from '@chakra-ui/react';

import { FormCustomInput } from 'components/Inputs/FormCustomInput';
import { useAppDispatch, useAppSelector } from 'store/store';
import { recoveryPasswordModalIsOpen, signInModalIsOpen, signUpModalIsOpen } from 'store/auth/authSlice';
import { PrivacyAndConditions } from '../PrivacyAndConditions';
import { Spinner } from 'components/Spinner';
import { ISignInData, TypeLoadingStatus } from 'interfaces';
import { login } from 'store/auth/authThunk';


export const SignInForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading } = useAppSelector(state => state.auth);
  const { register, handleSubmit } = useForm<ISignInData>();

  const onSubmit: SubmitHandler<ISignInData> = async (data) => {
    try {
      const response = await dispatch(login(data));
      // response.type === 'auth/login/fulfilled' && await router.push(process.env.NEXT_PUBLIC_BASE_URL_FOR_PERSONAL_CABINET as string);
    } catch (e) {
      console.log('Error');
    }
  };

  const onLoginButtonClickHandler = () => {
    dispatch(signUpModalIsOpen());
    dispatch(signInModalIsOpen());
  };

  const onRecoveryButtonClickHandler = () => {
    dispatch(signInModalIsOpen());
    dispatch(recoveryPasswordModalIsOpen());
  };

  return (
      <Flex direction='column'>
        <Text as='h2' fontWeight='600' fontSize='32px' letterSpacing='0.3px'>Login</Text>
        <Flex mt='20px'>
          <Text fontSize='16px' lineHeight='140%' letterSpacing='0.7px' color='rgba(0, 18, 64, 0.6)'>
            No account?
          </Text>
          <Button ml='5px' variant='link' color='#0250C8' onClick={onLoginButtonClickHandler}>Login</Button>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCustomInput label='email' {...register('email')} mt='32px' placeholder='Email'/>
          <FormCustomInput label='password' {...register('password')} placeholder='Password'/>
          <Flex mt='20px'>
            <Text fontSize='14px' lineHeight='140%' letterSpacing='0.7px' color='rgba(0, 18, 64, 0.6)'>
              Forgot password?
            </Text>
            <Button ml='5px' variant='link' fontSize='14px' lineHeight='140%' letterSpacing='0.7px'
                    color='#0250C8'
                    onClick={onRecoveryButtonClickHandler}>
              Recovery
            </Button>
          </Flex>
          {
              loading !== TypeLoadingStatus.IS_PENDING &&
              <Button type='submit' mt='20px' w='100%' h='56px' p='20px 24px' bg='#0250C8' borderRadius='32px'
                      _hover={{ bgColor: '#0250C8' }}>
                Login
              </Button>
          }
          {loading === TypeLoadingStatus.IS_PENDING && <Spinner/>}
          <PrivacyAndConditions/>
        </form>
      </Flex>
  );
};