import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex } from '@chakra-ui/react';

import { Header } from './Header/Header';
import { TabsBlock } from './TabsBlock';
import { Footer } from './Footer/Footer';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getArticles } from 'store/atricles/articlesThunk';
import { auth } from 'store/auth/authThunk';
import { ModalWindow } from './Modal';
import { SignUpForm } from './SignUpForm/SignUpForm';
import { SignInForm } from './SignInForm/SignInForm';
import { RecoveryPassword } from './RecoveryPassword';
import { EnterReceivedCode } from './EnterCode/EnterReceivedCode';
import { SetNewPassword } from './SetNewPassword';
import { RecoveryPasswordIsSuccess } from './RecoveryPasswordIsSuccess';
import { RegistrationIsSuccess } from './RegistrationIsSuccess';
import { EnterReceivedCodeForRegistration } from './EnterCode/EnterReceivedCodeForRegistration';
import { getUserFromLocalStorage } from 'services/localStorage';
import { getCurrentUser } from 'store/auth/authSlice';
import { SidebarDown } from './Sidebar/SidebarDown';

interface ILayout {
  children: ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  const router = useRouter();
  const language = router.locale as string;
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

  const { articlesCount } = useAppSelector(state => state.articles);

  useEffect(() => {
    dispatch(getArticles({ lang: language, pageSize: articlesCount }));
    const currentUser = getUserFromLocalStorage();
    if (!currentUser) {
      dispatch(auth());
    } else {
      dispatch(getCurrentUser(currentUser));
    }
  }, [articlesCount, dispatch, language]);

  return (
      <Flex minH='100vh' w='100%' h='100%' alignItems='center' flexDirection='column'>
        <Header/>
        <Box w='100%'>
          <TabsBlock/>
        </Box>
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
        <SidebarDown/>
        <Footer/>
      </Flex>
  );
};