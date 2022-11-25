import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex } from '@chakra-ui/react';

import { Header } from './Header/Header';
import { TabsBlock } from './TabsBlock';
import { Footer } from './Footer/Footer';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getArticles } from 'store/atricles/articlesThunk';
import { auth } from 'store/auth/authThunk';
import { ModalWindow } from './Modals';
import { SignUpFormModal } from './Modals/SignUpFormModal';
import { SignInFormModal } from './Modals/SignInFormModal';
import { RecoveryPassword } from './RecoveryPassword';
import { EnterReceivedCode } from './EnterCode/EnterReceivedCode';
import { SetNewPassword } from './SetNewPassword';
import { RecoveryPasswordIsSuccess } from './RecoveryPasswordIsSuccess';
import { RegistrationIsSuccess } from './RegistrationIsSuccess';
import { EnterReceivedCodeForRegistration } from './EnterCode/EnterReceivedCodeForRegistration';
import { SidebarDown } from './Sidebar/SidebarDown';
import { AddYachtModal } from './Modals/AddYachtModal';
import { HeaderBlockSkeleton } from './Skeleton/HeaderBlockSkeleton';
import { TypeLoadingStatus } from '../interfaces';

interface ILayout {
  children: ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  const router = useRouter();
  const language = router.locale as string;
  const query = router.query['modal'] as string;
  const dispatch = useAppDispatch();
  const [showChild, setShowChild] = useState(false);

  const {
    signUpModalOpen,
    signInModalOpen,
    recoveryPasswordModalOpen,
    setReceivedCodeModalOpen,
    setReceivedCodeForRegistrationModalOpen,
    setNewPasswordModalOpen,
    recoveryPasswordIsSuccessModalOpen,
    registrationIsSuccessModalOpen,
    addYachtModalOpen,
      loading
  } = useAppSelector(state => state.auth);

  const { articlesCount } = useAppSelector(state => state.articles);

  // useLayoutEffect(() => {
  //   dispatch(auth());
  // }, [dispatch]);

  useEffect(() => {
    // const currentUser = getUserFromLocalStorage();
    // dispatch(getCurrentUser(currentUser));
    dispatch(auth());
    setShowChild(true);
    dispatch(getArticles({ lang: language, pageSize: articlesCount }));
  }, [articlesCount, dispatch, language]);


  return (
      <Flex minH='100vh' w='100%' h='100%' alignItems='center' flexDirection='column'>
        {(!showChild || loading === TypeLoadingStatus.IS_PENDING) ? <HeaderBlockSkeleton/> : <Header/>}
        <Box w='100%'>
          <TabsBlock/>
        </Box>
        <ModalWindow>
          {/*This condition we use to redirect when click on Register in footer article*/}
          {query === 'signup' && <SignUpFormModal/>}

          {signUpModalOpen && <SignUpFormModal/>}
          {signInModalOpen && <SignInFormModal/>}
          {recoveryPasswordModalOpen && <RecoveryPassword/>}
          {setReceivedCodeModalOpen && <EnterReceivedCode/>}
          {setReceivedCodeForRegistrationModalOpen && <EnterReceivedCodeForRegistration/>}
          {setNewPasswordModalOpen && <SetNewPassword/>}
          {recoveryPasswordIsSuccessModalOpen && <RecoveryPasswordIsSuccess/>}
          {registrationIsSuccessModalOpen && <RegistrationIsSuccess/>}
          {addYachtModalOpen && <AddYachtModal/>}
        </ModalWindow>
        <Flex justifyContent='center' w='100%'>
          {children}
        </Flex>
        <SidebarDown/>
        <Footer/>
      </Flex>
  );
};