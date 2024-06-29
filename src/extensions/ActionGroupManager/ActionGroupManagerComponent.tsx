import React, { memo, useContext, useEffect, useState } from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  FormControl, Input, Select, VStack, Heading, HStack, StackDivider, FormErrorMessage,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getActionGroup } from '@libreforge/libreforge-designer/dist/core/selectors/pages';
import { InversifyContainerProviderContext, ProviderFactory } from '@libreforge/libreforge-framework';
import { useDispatch } from '@libreforge/libreforge-designer';
import { AddIcon } from '@chakra-ui/icons';
import { IActionGroup, IActionParams } from '@libreforge/libreforge-framework-shared/src/types/IComponent';

type Arg = {
  name: string;
  value: string | undefined;
};

type Action = {
  name: string;
  args: Arg[];
};

type ActionGroupManagerComponentProps = {
  isOpen: boolean;
  componentId: string;
  onClose: () => void;
};

const ActionGroupManagerComponent: React.FC<ActionGroupManagerComponentProps> = ({ componentId, onClose, isOpen }) => {

  const dispatch = useDispatch();
  const container = useContext(InversifyContainerProviderContext);
  const factory = new ProviderFactory(container);
  const actionChoices = ['', ...factory.getActionHandlerNames()];

  const actionGroup = useSelector(getActionGroup(componentId));

  const [counter, setCounter] = useState<number>(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [actions, setActions] = useState<Action[]>([{ name: '', args: [] }]);

  useEffect(() => {
    
    if (!!actionGroup) {
      console.log(actionGroup);

      const _actions = Object.keys(actionGroup).map(key => {
        const storageArgs = actionGroup[Number.parseInt(key)].params;
        const args = Object.keys(storageArgs).map(argName => {
          return {
            name: argName,
            value: storageArgs[argName]
          }
        })

        return {
          name: actionGroup[Number.parseInt(key)].action,
          args: args || []
        }
      });
      setActions(_actions);

    } else {

      setActions([]);
    }
  }, [counter, actionGroup]);

  const allowSaveOrAdd = actions.every(
    (item) => item.name && item.args.every((arg) => arg.value),
  );

  const getActionArgLabel = (actionName: string, argumentName: string) => {
    const action = factory.getActionHandlerByName(actionName);
    if (!!action) {
      return action.getArgsDefinition().filter(item => item.name === argumentName).map((item) => {
        return item.label
      })?.[0] || '';
    } else {
      return '';
    }
  };

  const getActionArgs = (actionName: string) => {
    const action = factory.getActionHandlerByName(actionName);
    if (!!action) {
      return action.getArgsDefinition().map((item) => {
        return {
          name: item.name,
          type: item.type,
          label: item.label,
          value: undefined,
        };
      });
    } else {
      return [];
    }
  };

  const handleAdd = () => {
    setIsSubmit(true);

    if (!allowSaveOrAdd) {
      return;
    }

    setIsSubmit(false);

    setActions((prevState) => {
      const newState = [...prevState];
      newState.push({ name: '', args: [] });
      return newState;
    });
  };

  const handleRemove = (index: number) => {
    setActions((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  const handleSave = async () => {
    setIsSubmit(true);

    if (!allowSaveOrAdd) {
      return;
    }

    setIsSubmit(false);

    const actionGroup: IActionGroup = actions.reduce(
      (acc: IActionGroup, action, index) => {
        acc[index] = {
          action: action.name,
          params: action.args.reduce((acc: IActionParams, arg, index) => {
            acc[arg.name] = arg.value;
            return acc;
          }, {} as IActionParams)
        };

        return acc;
      },
      {} as IActionGroup,
    );

    console.log('actionGroup', actionGroup);
    await dispatch.pages.replaceActionGroup({ componentName: componentId, actionGroup });

    setCounter(counter + 1);
    onClose();
  };

  const handleCancel = () => {
    setIsSubmit(false);
    setCounter(counter + 1);
    onClose();
  };

  return (
    <Modal onClose={handleCancel} isOpen={isOpen} scrollBehavior={'inside'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Action Group Manager</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="flex-start" spacing={3} divider={<StackDivider />}>
            {actions.map((item, index) => (
              <VStack key={index} width="full" align="flex-start" spacing={3}>
                <HStack width="full" justify="space-between" align="center">
                  <Heading size="sm" lineHeight="24px">
                    Action {index + 1}
                  </Heading>

                  {actions.length > 0 && (
                    <Button
                      variant="ghost"
                      colorScheme="red"
                      size="xs"
                      onClick={() => {
                        handleRemove(index);
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </HStack>
                <VStack width="full" spacing={3}>
                  <FormControl isInvalid={isSubmit && !item.name}>
                    <Select
                      size="sm"
                      value={item.name}
                      onChange={(event) => {
                        const value = event.target.value;
                        setActions((prevState) => {
                          const newState = [...prevState];
                          newState[index] = {
                            ...newState[index],
                            name: value,
                            args: getActionArgs(value),
                          };
                          return newState;
                        });
                      }}
                    >
                      {actionChoices.map((choice) => (
                        <option key={choice}>{choice}</option>
                      ))}
                    </Select>
                    <FormErrorMessage>Action is required</FormErrorMessage>
                  </FormControl>
                  {item.args.map((arg) => {
                    return (
                      <FormControl isInvalid={isSubmit && !arg.value}>
                        <Input
                          autoComplete="off"
                          size="sm"
                          value={arg.value}
                          type="text"
                          placeholder={getActionArgLabel(item.name, arg.name)}
                          onChange={(event) => {
                            const value = event.target.value;
                            setActions((prevState) => {
                              const newState = [...prevState];
                              newState[index] = {
                                ...newState[index],
                                args: newState[index].args.map((item) => {
                                  if (item.name === arg.name) {
                                    return { ...item, value };
                                  }
                                  return item;
                                }),
                              };
                              return newState;
                            });
                          }}
                        />
                        <FormErrorMessage>
                          Argument {getActionArgLabel(item.name, arg.name)} is required
                        </FormErrorMessage>
                      </FormControl>
                    );
                  })}
                </VStack>
              </VStack>
            ))}
          </VStack>

          <Button
            mt={3}
            leftIcon={<AddIcon />}
            variant="ghost"
            size="sm"
            onClick={handleAdd}
          >
            Add Action
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ActionGroupManagerComponent);
