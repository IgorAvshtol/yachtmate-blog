import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Checkbox, Flex, Text } from '@chakra-ui/react';

import { FormCustomInput } from 'components/Input/FormCustomInput';
import { useAppDispatch, useAppSelector } from 'store/store';
import { signInModalIsOpen, signUpModalIsOpen } from 'store/auth/authSlice';
import { PrivacyAndConditions } from '../PrivacyAndConditions';
import { ISignUpData, TypeLoadingStatus } from 'interfaces';
import { Spinner } from '../Spinner';
import { getRegistrationCode } from 'store/auth/authThunk';
import { eng, rus } from 'translation';

export const SignUpForm = (): JSX.Element => {
  const { currentLanguage } = useAppSelector(state => state.articles);
  const t = currentLanguage === 'en' ? eng : rus;
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const [acceptConditions, setAcceptConditions] = useState<boolean>(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ISignUpData>();

  const onSubmit: SubmitHandler<ISignUpData> = data => {
    const registerData: ISignUpData = {
      email: data.email,
      name: data.name,
      password: data.password
    };
    dispatch(getRegistrationCode(registerData));
  };

  const acceptTermHandler = () => setAcceptConditions(!acceptConditions);

  const onLogUpButtonClickHandler = () => {
    dispatch(signUpModalIsOpen());
    dispatch(signInModalIsOpen());
  };

  return (
      <Flex direction='column'>
        <Text as='h2' fontWeight='600' fontSize='32px' letterSpacing='0.3px'>
          {t.registration_modal.title}
        </Text>
        <Flex mt='20px'>
          <Text fontSize='16px' lineHeight='140%' letterSpacing='0.7px' color='rgba(0, 18, 64, 0.6)'>
            {t.registration_modal.availability_account}
          </Text>
          <Button ml='5px' variant='link' color='#0250C8' onClick={onLogUpButtonClickHandler}>
            {t.registration_modal.login_btn}
          </Button>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCustomInput label='email' {...register('email')} mt='32px' placeholder={t.placeholders.email}/>
          <FormCustomInput label='name' {...register('name')} mt='12px' placeholder={t.placeholders.name}/>
          <FormCustomInput
              {...register('password', {
                minLength: {
                  value: 8,
                  message: `${t.set_new_pas.pass_length_error}`
                }
              })}
              label='password'
              isInvalid={!!errors.password}
              placeholder={t.placeholders.enter_pass}/>
          {errors.password && <Text mt='px' color='red' textAlign='center'>{errors.password.message}</Text>}
          <FormCustomInput
              {...register('password_repeat', {
                validate: value =>
                    value === watch('password') || `${t.set_new_pas.dont_match_error}`
              })}
              label='password'
              isInvalid={!!errors.password_repeat}
              placeholder={t.placeholders.enter_pass_again}/>
          {errors.password_repeat &&
              <Text mt='px' color='red' textAlign='center'>{errors.password_repeat.message}</Text>}
          <Flex w='80%' mt='30px'>
            <Checkbox fontSize='16px' lineHeight='20px' color='#00124080'
                      isChecked={acceptConditions} onChange={acceptTermHandler}>
              {t.registration_modal.accept_conditions}
            </Checkbox>
          </Flex>
          <Text ml='20px' mt='5px' fontSize='12px' color='#FF5353' textAlign='center'>
            {error}
          </Text>
          {
              loading !== TypeLoadingStatus.IS_PENDING &&
              <Button disabled={!acceptConditions} type='submit' mt='20px' w='100%' h='56px' p='20px 24px' bg='#0250C8'
                      borderRadius='32px' _hover={{ bgColor: '#0250C8' }} zIndex='20'>
                {t.registration_modal.logup_btn}
              </Button>
          }
          {loading === TypeLoadingStatus.IS_PENDING && <Spinner/>}
          <PrivacyAndConditions/>
        </form>
      </Flex>
  );
};