import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Checkbox, Flex, Text } from '@chakra-ui/react';

import { FormCustomInput } from 'components/Inputs/FormCustomInput';
import { RepeatPasswordInput } from '../Inputs/RepeatPasswordInput';
import { useAppDispatch, useAppSelector } from 'store/store';
import { signInModalIsOpen, signUpModalIsOpen } from 'store/auth/authSlice';
import { PrivacyAndConditions } from '../PrivacyAndConditions';
import { ISignUpData, TypeLoadingStatus } from 'interfaces';
import { Spinner } from '../Spinner';
import { getRegistrationCode } from 'store/auth/authThunk';


export const SignUpForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);
  const [acceptConditions, setAcceptConditions] = useState<boolean>(false);
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const { register, handleSubmit } = useForm<ISignUpData>();

  const onSubmit: SubmitHandler<ISignUpData> = data => {
    dispatch(getRegistrationCode(data));
  };

  const acceptTermHandler = () => setAcceptConditions(!acceptConditions);

  const onLogUpButtonClickHandler = () => {
    dispatch(signUpModalIsOpen());
    dispatch(signInModalIsOpen());
  };

  return (
      <Flex direction='column'>
        <Text as='h2' fontWeight='600' fontSize='32px' letterSpacing='0.3px'>Registration</Text>
        <Flex mt='20px'>
          <Text fontSize='16px' lineHeight='140%' letterSpacing='0.7px' color='rgba(0, 18, 64, 0.6)'>
            Have an account?
          </Text>
          <Button ml='5px' variant='link' color='#0250C8' onClick={onLogUpButtonClickHandler}>Log Up</Button>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCustomInput label='email' {...register('email')} mt='32px' placeholder='Email'/>
          <FormCustomInput label='name' {...register('name')} mt='12px' placeholder='Name'/>
          <FormCustomInput label='password' {...register('password')} placeholder='Password'/>
          <RepeatPasswordInput repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword}/>
          <Flex w='80%' mt='30px'>
            <Checkbox fontSize='16px' lineHeight='20px' color='#00124080'
                      isChecked={acceptConditions} onChange={acceptTermHandler}>
              I have read and accept the terms and conditions of use
            </Checkbox>
          </Flex>
          {
              loading !== TypeLoadingStatus.IS_PENDING &&
              <Button disabled={!acceptConditions} type='submit' mt='20px' w='100%' h='56px' p='20px 24px' bg='#0250C8'
                      borderRadius='32px' _hover={{ bgColor: '#0250C8' }}>
                Log up
              </Button>
          }
          {loading === TypeLoadingStatus.IS_PENDING && <Spinner/>}
          <PrivacyAndConditions/>
        </form>
      </Flex>
  );
};