import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, Flex, Text } from '@chakra-ui/react';

import { FormCustomInput } from 'components/Input/FormCustomInput';
import { useAppDispatch, useAppSelector } from 'store/store';
import { recoveryPasswordModalIsOpen, signInModalIsOpen, signUpModalIsOpen } from 'store/auth/authSlice';
import { PrivacyAndConditions } from '../PrivacyAndConditions';
import { Spinner } from 'components/Spinner';
import { ISignInData, TypeLoadingStatus } from 'interfaces';
import { login } from 'store/auth/authThunk';
import { eng, rus } from 'translation';

export const SignInForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;
  const { loading, error } = useAppSelector(state => state.auth);
  const { register, handleSubmit } = useForm<ISignInData>();

  const onSubmit: SubmitHandler<ISignInData> = async (data) => {
    try {
      const response = await dispatch(login(data));
      response.type === 'auth/login/fulfilled' &&
      await router.push(router.locale === 'en' ? process.env.NEXT_PUBLIC_BASE_URL_FOR_PERSONAL_CABINET as string : process.env.NEXT_PUBLIC_BASE_URL_FOR_PERSONAL_CABINET_RU as string);
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
        <Text as='h2' fontWeight='600' fontSize='32px' letterSpacing='0.3px'>{t.login_modal.title}</Text>
        <Flex mt='20px'>
          <Text fontSize='16px' lineHeight='140%' letterSpacing='0.7px' color='rgba(0, 18, 64, 0.6)'>
            {t.login_modal.availability_account}
          </Text>
          <Button ml='5px' variant='link' color='#0250C8' onClick={onLoginButtonClickHandler}>
            {t.login_modal.register_btn}
          </Button>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCustomInput label='email' {...register('email')} mt='32px' placeholder={t.placeholders.email}/>
          <FormCustomInput label='password' {...register('password')} placeholder={t.placeholders.enter_pass}/>
          <Flex mt='20px'>
            <Text fontSize='14px' lineHeight='140%' letterSpacing='0.7px' color='rgba(0, 18, 64, 0.6)'>
              {t.login_modal.forgot_pas}
            </Text>
            <Button ml='5px' variant='link' fontSize='14px' lineHeight='140%' letterSpacing='0.7px'
                    color='#0250C8' onClick={onRecoveryButtonClickHandler}>
              {t.login_modal.recovery_pas}
            </Button>
          </Flex>
          {error &&
              <Text ml='20px' mt='5px' fontSize='12px' color='#FF5353' textAlign='center'>{t.login_modal.error}</Text>}

          {
              loading !== TypeLoadingStatus.IS_PENDING &&
              <Button type='submit' mt='20px' w='100%' h='56px' p='20px 24px' bg='#0250C8' borderRadius='32px'
                      _hover={{ bgColor: '#0250C8' }}>
                {t.login_modal.login_btn}
              </Button>
          }
          {loading === TypeLoadingStatus.IS_PENDING && <Spinner/>}
          <PrivacyAndConditions/>
        </form>
      </Flex>
  );
};