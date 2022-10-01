import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';

import { Header } from './Header/Header';
import { TabsBlock } from './TabsBlock';
import { Footer } from './Footer/Footer';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getArticles } from 'store/atricles/articlesThunk';
import { ModalWindow } from './Modal';
import { SignUpForm } from './SignUpForm/SignUpForm';
import { SignInForm } from './SignInForm/SignInForm';
import { RecoveryPassword } from './RecoveryPassword';
import { EnterReceivedCode } from './EnterReceivedCode';
import { SetNewPassword } from './SetNewPassword';
import { RecoveryPasswordIsSuccess } from './RecoveryPasswordIsSuccess';
import { RegistrationIsSuccess } from './RegistrationIsSuccess';
import { EnterReceivedCodeForRegistration } from './EnterReceivedCodeForRegistration';

interface ILayout {
  children: ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  const dispatch = useAppDispatch();
  const {
    signUpModalOpen,
    signInModalOpen,
    recoveryPasswordModalOpen,
    setReceivedCodeModalOpen,
    setReceivedCodeForRegistrationModalOpen,
    setNewPasswordModalOpen,
    recoveryPasswordIsSuccessModalOpen,
    registrationIsSuccessModalOpen
  } = useAppSelector(state => state.auth);
  const router = useRouter();
  const language = router.locale as string;

  useEffect(() => {
    dispatch(getArticles(language));
  }, [dispatch, language]);

  return (
      <Flex minH='100vh' w='100%' h='100%' alignItems='center' flexDirection='column'>
        <Header/>
        <TabsBlock/>
        <ModalWindow>
          {signUpModalOpen && <SignUpForm/>}
          {signInModalOpen && <SignInForm/>}
          {recoveryPasswordModalOpen && <RecoveryPassword/>}
          {setReceivedCodeModalOpen && <EnterReceivedCode/>}
          {setReceivedCodeForRegistrationModalOpen && <EnterReceivedCodeForRegistration/>}
          {setNewPasswordModalOpen && <SetNewPassword/>}
          {recoveryPasswordIsSuccessModalOpen && <RecoveryPasswordIsSuccess/>}
          {registrationIsSuccessModalOpen && <RegistrationIsSuccess/>}
        </ModalWindow>
        <Flex justifyContent='center' w='100%'>
          {children}
        </Flex>
        <Footer/>
      </Flex>
  );
};