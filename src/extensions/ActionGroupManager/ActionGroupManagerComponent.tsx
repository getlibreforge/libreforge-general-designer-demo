import React, { memo, useContext, useEffect, useState } from 'react';
import { 
  Button, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody, 
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getActionGroup, getSelectedComponent } from '@libreforge/libreforge-designer/dist/core/selectors/pages';
import { InversifyContainerProviderContext, ProviderFactory } from '@libreforge/libreforge-framework';
import { useDispatch } from '@libreforge/libreforge-designer';

type ActionGroupManagerComponentProps = {
  componentName: string,
  onClose: () => void,
  isOpen: boolean,
}

const ActionGroupManagerComponent: React.FC<ActionGroupManagerComponentProps> = ({ componentName, onClose, isOpen }) => {

  const [counter, setCounter] = useState<number>(0);
  const dispatch = useDispatch();
  const container = useContext(InversifyContainerProviderContext);
  const selectedComponent = useSelector(getSelectedComponent);
  const factory = new ProviderFactory(container);
  const actionChoices = ['', ...factory.getActionHandlerNames()];  
  
  const actionGroup = useSelector(getActionGroup(componentName));
  const [numberOfActions, setNumberOfActions] = useState<number>(4);

  const [firstActionName, setFirstActionName] = useState<string>('');
  const [firstActionArgs, setFirstActionArgs] = useState<{ type: string; label: string }[]>([]);

  /* Calculate action arguments list */
  useEffect(() => {
    if (!!firstActionName && firstActionName.length > 0) {
      const action = factory.getActionHandlerByName(firstActionName);
      if (!!action) {
        setFirstActionArgs(action.getArgsDefinition().map((item) => {
          return { name: item.name, type: item.type, label: item.label };
        }));
      } else {
        setFirstActionArgs([]);        
      }
    } else {
      setFirstActionArgs([]);
    }
  }, [firstActionName]);

  const onSave = async () => {
    // setCounter(counter + 1);
    onClose();
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Action Group Manager</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={false}>
              <FormLabel>1st Action</FormLabel>
              <Select size="sm" id={'action1'}
                value={firstActionName}
                onChange={(event) => {
                  setFirstActionName(event.target.value);
                }}
              >
                {actionChoices.map((choice) => (
                  <option key={choice}>{choice}</option>
                ))}
              </Select>
            </FormControl>
            {
              firstActionArgs.map(arg => {
                return (
                  <FormControl>
                    <Input
                      autoComplete="off"
                      size="sm"
                      value={''}
                      type="text"
                      placeholder={arg.label}
                      onChange={(event) => {}}
                    />
                  </FormControl>
                );
              })
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSave} isDisabled={false}>
              Save
            </Button>
            <Button onClick={() => {
              // setCounter(counter + 1);
              onClose();              
            }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal> 
  );
};

export default memo(ActionGroupManagerComponent);
