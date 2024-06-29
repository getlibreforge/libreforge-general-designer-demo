import React, { memo } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';

type ImageManagerComponentProps = {
  attributeName: string;
  defaultValue: string;
  onChange: (name: string, value: any) => void;
  onClose: () => void;
  isOpen: boolean;
};

const ImageManagerComponent: React.FC<ImageManagerComponentProps> = ({
  attributeName,
  defaultValue,
  onChange,
  onClose,
  isOpen,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Image Gallery</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={false}>
            <FormLabel>Source</FormLabel>
            <Input
              size="md"
              autoFocus
              variant="outline"
              width="100%"
              focusBorderColor="blue.500"
              errorBorderColor="red.500"
              value={defaultValue || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(attributeName, e.target.value);
              }}
            />
            <FormHelperText>
              This gallery allows you to upload the image file to an external
              location and select the image source among the files uploaded.
            </FormHelperText>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            isDisabled={false}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ImageManagerComponent);
