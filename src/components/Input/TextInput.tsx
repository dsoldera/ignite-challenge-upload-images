import {
  Box,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Icon,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';
import { Tooltip } from '../ui/tooltip';

interface InputProps extends ChakraInputProps {
  name: string;
  error?: FieldError;
}

const TextInputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, ...rest },
  ref
) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center">
      <ChakraInput
        aria-label={name}
        name={name}
        ref={ref}
        borderColor="transparent"
        bgColor="pGray.800"
        color="pGray.50"
        _placeholder={{
          color: 'pGray.200',
        }}
        _hover={{
          borderColor: 'orange.400',
        }}
        py={6}
        pr={8}
        {...rest}
      />

      {!!error && (
        <Tooltip 
          content={error.message} 
          contentProps={{ css: { "--tooltip-bg": "red.500" } }}>
          <Box ml={-6} mt={0} zIndex="tooltip">
            <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

export const TextInput = forwardRef(TextInputBase);
