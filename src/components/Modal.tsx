import { ReactNode, useRef } from 'react';
import Image from 'next/image';
import { Box, Flex, Modal, ModalCloseButton, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/store';
import { closeAllModals, isError } from 'store/auth/authSlice';
import logo from 'public/secondLogo.png';

interface IModalWindow {
  children: ReactNode;
}

export const ModalWindow = ({ children }: IModalWindow): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    signInModalOpen,
    signUpModalOpen,
    error,
    recoveryPasswordModalOpen,
    setReceivedCodeModalOpen,
    setReceivedCodeForRegistrationModalOpen,
    setNewPasswordModalOpen,
    recoveryPasswordIsSuccessModalOpen,
    registrationIsSuccessModalOpen
  } = useAppSelector(state => state.auth);
  const initRef = useRef(null);

  const onCloseModal = () => {
    dispatch(closeAllModals());
    dispatch(isError(''));
  };

  return (
      <>
        <Modal onClose={onCloseModal} isCentered initialFocusRef={initRef}
               isOpen={signUpModalOpen && signUpModalOpen
                   || signInModalOpen && signInModalOpen
                   || recoveryPasswordModalOpen && recoveryPasswordModalOpen
                   || setReceivedCodeModalOpen && setReceivedCodeModalOpen
                   || setReceivedCodeForRegistrationModalOpen && setReceivedCodeForRegistrationModalOpen
                   || setNewPasswordModalOpen && setNewPasswordModalOpen
                   || recoveryPasswordIsSuccessModalOpen && recoveryPasswordIsSuccessModalOpen
                   || registrationIsSuccessModalOpen && registrationIsSuccessModalOpen
               }
        >
          <ModalOverlay/>
          <ModalContent maxW='690px' borderRadius='12px' tabIndex={-1} ref={initRef}>
            <Flex>
              <Flex display={{ md: 'block', sm: 'none' }} minW='240px' p='20px' borderRadius='12px 0px 0px 12px'
                    bg='linear-gradient(180deg, #1974FE 0%, #05285C 121.08%)'>
                <Box>
                  <Image src={logo} width='40px' height='40px' alt='logo'/>
                </Box>
              </Flex>
              <Flex w='100%' direction='column' alignItems='center' p='20px'>
                <ModalCloseButton size='lg' color='rgba(0, 18, 64, 0.4)'/>
                <Box mt='26px' w='95%'>
                  {children}
                  {error && <Text color='red' textAlign='center'>{error}</Text>}
                </Box>
              </Flex>
            </Flex>
          </ModalContent>
        </Modal>
      </>
  );
};