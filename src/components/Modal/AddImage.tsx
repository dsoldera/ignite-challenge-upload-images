import {
  DrawerCloseTrigger,
} from '@chakra-ui/react';
import { FormAddImage } from '../Form/FormAddImage';
import { DrawerBackdrop, DrawerBody, DrawerContent, DrawerHeader, DrawerRoot } from '../ui/drawer';

interface ModalAddImageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddImage({
  isOpen,
  onClose,
}: ModalAddImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <DrawerRoot open={isOpen} size="full">
      <DrawerBackdrop />
      <DrawerContent bgColor="pGray.900">
        <DrawerHeader fontSize="4xl">Nova imagem</DrawerHeader>

        <DrawerCloseTrigger />

        <DrawerBody px={60}>
          <FormAddImage closeModal={handleCloseModal} />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
}
