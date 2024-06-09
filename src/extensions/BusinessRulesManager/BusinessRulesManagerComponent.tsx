import React, { memo, useContext, useEffect, useState } from 'react';
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
  Textarea 
} from '@chakra-ui/react';
import { InversifyContainerProviderContext } from '@libreforge/libreforge-framework';
import { useDispatch } from '@libreforge/libreforge-framework';
import { useSelector } from "react-redux";
import { getBusinessRules } from '@libreforge/libreforge-designer';
import { IBusinessRules } from "@libreforge/libreforge-framework-shared"

type BusinessRulesManagerComponentProps = {
  componentName: string,
  onClose: () => void,
  isOpen: boolean,
}

const BusinessRulesManagerComponent: React.FC<BusinessRulesManagerComponentProps> = ({ componentName, onClose, isOpen }) => {

  const [ruleName, setRuleName] = useState<string>('defaultRule');
  const dispatch = useDispatch();
  const container = useContext(InversifyContainerProviderContext);
  const businessRules: IBusinessRules = useSelector(getBusinessRules(componentName));
  const businessRule = businessRules[ruleName];

  const [counter, setCounter] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [script, setScript] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!!businessRule) {
      setMessage(businessRule.message);
      setScript(businessRule.script);
    }

  }, [counter]);

  const onSave = async () => {
    await dispatch.pages.updateBusinessRule({ componentName, ruleName, message, severity: 'error', script });
    setCounter(counter + 1);
    onClose();
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Business Rules Manager</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={false}>
              <FormLabel>Name</FormLabel>
              <Input
                size="md"
                variant="outline"
                width="100%"
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
                value={ruleName}
                disabled={true}
              />
            </FormControl>
            <FormControl isInvalid={false}>
              <FormLabel>Message</FormLabel>
              <Input
                size="md"
                autoFocus
                variant="outline"
                width="100%"
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMessage(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isInvalid={false}>
              <FormLabel>Script</FormLabel>
              <Textarea
                size="md"
                variant="outline"
                width="100%"
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
                value={script}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setScript(e.target.value);
                }}
              />
              <FormHelperText>
                This gallery allows you to upload the image file to an external location and 
                select the image source among the files uploaded.
              </FormHelperText>
            </FormControl>                        
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSave} isDisabled={false}>
              Save
            </Button>
            <Button onClick={() => {
              setCounter(counter + 1);
              onClose();              
            }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal> 
  );
};

export default memo(BusinessRulesManagerComponent);
