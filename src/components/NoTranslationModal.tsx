import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { eng, rus } from 'translation';

interface INoTranslationModal {
  isShow: boolean;
  onClose: () => void;
}

export const NoTranslationModal = ({ isShow, onClose }: INoTranslationModal): JSX.Element => {
  const { locale } = useRouter();
  const t = locale === 'en' ? eng : rus;

  return (
      <>
        <Modal isOpen={isShow} onClose={onClose} isCentered>
          <ModalOverlay/>
          <ModalContent>
            <ModalBody>
              <Text textAlign='center' color='rgba(0, 18, 64, 0.6)'>
                {t.translate_modal.description}
              </Text>
            </ModalBody>
            <ModalFooter justifyContent='center'>
              <Button color='#0250C8' onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  );
};