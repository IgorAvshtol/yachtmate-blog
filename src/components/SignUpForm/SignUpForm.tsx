import { useState } from 'react';
import { useRouter } from 'next/router';
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
import { eng, rus } from 'translation';


export const SignUpForm = (): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);
  const [acceptConditions, setAcceptConditions] = useState<boolean>(false);
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [wrongValue, setWrongValue] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<ISignUpData>();

  const onSubmit: SubmitHandler<ISignUpData> = data => {
    if (data.password === repeatPassword) {
      setWrongValue(false);
      dispatch(getRegistrationCode(data));
    } else {
      setWrongValue(true);
    }
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
          <FormCustomInput label='password' {...register('password')} placeholder={t.placeholders.enter_pass}/>
          <RepeatPasswordInput valueIsWrong={wrongValue} repeatPassword={repeatPassword}
                               setRepeatPassword={setRepeatPassword}/>
          <Flex w='80%' mt='30px'>
            <Checkbox fontSize='16px' lineHeight='20px' color='#00124080'
                      isChecked={acceptConditions} onChange={acceptTermHandler}>
              {t.registration_modal.accept_conditions}
            </Checkbox>
          </Flex>
          {
              loading !== TypeLoadingStatus.IS_PENDING &&
              <Button disabled={!acceptConditions} type='submit' mt='20px' w='100%' h='56px' p='20px 24px' bg='#0250C8'
                      borderRadius='32px' _hover={{ bgColor: '#0250C8' }}>
                {t.registration_modal.logup_btn}
              </Button>
          }
          {loading === TypeLoadingStatus.IS_PENDING && <Spinner/>}
          <PrivacyAndConditions/>
        </form>
      </Flex>
  );
};