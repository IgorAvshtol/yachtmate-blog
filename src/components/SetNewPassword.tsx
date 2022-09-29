import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/store';
import { FormCustomInput } from './Inputs/FormCustomInput';
import { isError } from 'store/auth/authSlice';
import { RepeatPasswordInput } from './Inputs/RepeatPasswordInput';
import { TypeLoadingStatus } from '../interfaces';
import { Spinner } from './Spinner';
import { setNewPassword } from 'store/auth/authThunk';
import { eng, rus } from 'translation';

interface ISetNewPassword {
  password: string;
}

export const SetNewPassword = (): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;
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
        <Text fontWeight='600' fontSize='32px' lineHeight='110%' letterSpacing='0.3px'>{t.set_new_pas.title}</Text>
        <Text mt='12px' fontWeight='00' fontSize='16px' lineHeight='140%' letterSpacing='0.7px'
              color='rgba(0, 18, 64, 0.6)'>
          {t.set_new_pas.description}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mt='32px'>
            <FormCustomInput
                {...register('password', {
                  minLength: 8,
                  validate: () => {
                    if (watch('password') !== repeatPassword) {
                      return `${t.set_new_pas.dont_match_error}`;
                    }
                  }
                })}
                label='password'
                placeholder={t.placeholders.enter_pass}/>
            <RepeatPasswordInput repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword}/>
            {errors?.password?.message && <Text color='red' textAlign='center'>{errors.password.message}</Text>}
            {errors.password && errors.password.type === 'minLength' &&
                <Text color='red' textAlign='center'>{t.set_new_pas.pass_length_error}</Text>
            }
          </Box>
          {
              loading !== TypeLoadingStatus.IS_PENDING &&
              <Button type='submit' my='32px' w='100%' h='56px' p='20px 24px' bg='#0250C8' borderRadius='32px'
                      _hover={{ bgColor: '#0250C8' }}>
                {t.set_new_pas.save_btn}
              </Button>
          }
          {loading === TypeLoadingStatus.IS_PENDING && <Spinner/>}
        </form>
      </Flex>
  );
};