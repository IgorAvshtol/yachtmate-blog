import { ReactNode, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Flex, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/store';
import { closeAllModals, isError } from 'store/auth/authSlice';
import logo from 'public/secondLogo.png';

interface IModalWindow {
  children: ReactNode;
}

export const ModalWindow = ({ children }: IModalWindow): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query['modal'] as string;

  const {
    signInModalOpen,
    signUpModalOpen,
    recoveryPasswordModalOpen,
    setReceivedCodeModalOpen,
    setReceivedCodeForRegistrationModalOpen,
    setNewPasswordModalOpen,
    recoveryPasswordIsSuccessModalOpen,
    registrationIsSuccessModalOpen,
    addYachtModalOpen
  } = useAppSelector(state => state.auth);
  const initRef = useRef(null);

  const onCloseModal = async () => {
    dispatch(closeAllModals());
    dispatch(isError(''));
    await router.push('/', '/', { locale: router.locale });
  };

  return (
      <>
        <Modal onClose={onCloseModal} isCentered initialFocusRef={initRef}
               isOpen={signUpModalOpen && signUpModalOpen
                   || query === 'signup'
                   || signInModalOpen && signInModalOpen
                   || recoveryPasswordModalOpen && recoveryPasswordModalOpen
                   || setReceivedCodeModalOpen && setReceivedCodeModalOpen
                   || setReceivedCodeForRegistrationModalOpen && setReceivedCodeForRegistrationModalOpen
                   || setNewPasswordModalOpen && setNewPasswordModalOpen
                   || recoveryPasswordIsSuccessModalOpen && recoveryPasswordIsSuccessModalOpen
                   || registrationIsSuccessModalOpen && registrationIsSuccessModalOpen
                   || addYachtModalOpen && addYachtModalOpen
               }
        >
          <ModalOverlay/>
          <ModalContent maxW='690px' h={{ md: 'auto', sm: '100%' }} pos={{ sm: 'absolute' }}
                        borderRadius={{ md: '12px', sm: '0' }} tabIndex={-1} ref={initRef}>
            <Flex>
              <Flex display={{ md: 'block', sm: 'none' }} minW='240px' p='20px' borderRadius='12px 0px 0px 12px'
                    bg='linear-gradient(180deg, #1974FE 0%, #05285C 121.08%)'>
                <Box>
                  <Image src={logo} width='40px' height='40px' alt='logo'/>
                </Box>
              </Flex>
              <Flex w='100%' direction='column' alignItems='center' p='20px'>
                {(query === 'signup' || signInModalOpen || signUpModalOpen || recoveryPasswordIsSuccessModalOpen || registrationIsSuccessModalOpen || addYachtModalOpen)
                    &&
                    <Flex mb={{ md: '0', sm: '44px' }} w='100%' justifyContent='end'>
                      <ModalCloseButton mt='24px' pos={{ md: 'static', sm: 'absolute' }} left={{ sm: '30px' }} size='md'
                                        w='40px' h='40px' rounded='full' bgColor='rgba(0, 18, 64, 0.04)'/>
                    </Flex>
                }
                <Box mt='24px' w='95%'>
                  {children}
                </Box>
              </Flex>
            </Flex>
          </ModalContent>
        </Modal>
      </>
  );
};