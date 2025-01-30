import { toaster } from "@/components/ui/toaster";
import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import axios, { CancelTokenSource } from 'axios';
import {
  Dispatch,
  ForwardRefRenderFunction,
  SetStateAction,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  FieldError,
  FieldValues,
  UseFormSetError,
  UseFormTrigger,
} from 'react-hook-form';
import { FiAlertCircle, FiPlus } from 'react-icons/fi';
import { api } from '../../services/api';
import { Field } from "../ui/field";
import { ProgressCircleRoot, ProgressCircleValueText } from "../ui/progress-circle";
import { Tooltip } from '../ui/tooltip';

export interface FileInputProps {
  name: string;
  error?: FieldError;
  setImageUrl: Dispatch<SetStateAction<string>>;
  localImageUrl: string;
  setLocalImageUrl: Dispatch<SetStateAction<string>>;
  setError: UseFormSetError<FieldValues>;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<boolean | void>;
  trigger: UseFormTrigger<FieldValues>;
}

const FileInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  FileInputProps
> = (
  {
    name,
    error = null,
    setImageUrl,
    localImageUrl,
    setLocalImageUrl,
    setError,
    onChange,
    trigger,
    ...rest
  },
  ref
) => {
  const [progress, setProgress] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [cancelToken, setCancelToken] = useState<CancelTokenSource>(
    {} as CancelTokenSource
  );

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (!event.target.files?.length) {
        return;
      }

      setImageUrl('');
      setLocalImageUrl('');
      setError('image', null);
      setIsSending(true);

      await onChange(event);
      trigger('image');

      const formData = new FormData();

      formData.append(event.target.name, event.target.files[0]);
      // formData.append('key', process.env.NEXT_PUBLIC_IMGBB_API_KEY);

      const { CancelToken } = axios;
      const source = CancelToken.source();
      setCancelToken(source);

      // const config = {
      //   headers: { 'content-type': 'multipart/form-data' },
      //   onUploadProgress: (e: ProgressEvent) => {
      //     setProgress(Math.round((e.loaded * 100) / e.total));
      //   },
      //   cancelToken: source.token,
      // } as AxiosRequestConfig;

      try {
        const response = await api.post(
          'https://api.imgbb.com/1/upload',
          formData,
          //config
        );

        setImageUrl(response.data.data.url);
        setLocalImageUrl(URL.createObjectURL(event.target.files[0]));
      } catch (err) {
        //if (err?.message === 'Cancelled image upload.') return;

        toaster.create({
          title: 'Falha no envio',
          description: 'Ocorreu um erro ao realizar o upload da sua imagem.',
          type: 'error',
          duration: 5000,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      } finally {
        setIsSending(false);
        setProgress(0);
      }
    },
    [onChange, setError, setImageUrl, setLocalImageUrl, trigger, toast]
  );

  useEffect(() => {
    if (error?.message && isSending && cancelToken?.cancel) {
      cancelToken.cancel('Cancelled image upload.');
      //setCancelToken(null);
    }
  }, [cancelToken, error, isSending]);

  return (
    <Box>
      <Field
        mx="auto"
        w={40}
        h={40}
        cursor={isSending ? 'progress' : 'pointer'}
        opacity={isSending ? 0.5 : 1}
      >
        {localImageUrl && !isSending ? (
          <Image
            w="full"
            h="full"
            src={localImageUrl}
            alt="Uploaded photo"
            borderRadius="md"
          />
        ) : (
          <Flex
            w="full"
            h="full"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            borderRadius="md"
            bgColor="pGray.800"
            color="pGray.200"
            borderWidth={error?.message && 2}
            borderColor={error?.message && 'red.500'}
          >
            {isSending ? (
              <>
                <ProgressCircleRoot
                  colorPalette={"pGray.200"}
                  value={progress}
                  color="orange.500"
                >
                  <ProgressCircleValueText />
                </ProgressCircleRoot>
                <Text as="span" pt={2} textAlign="center">
                  Enviando...
                </Text>
              </>
            ) : (
              <Box pos="relative" h="full">
                {!!error && (
                  <Tooltip 
                    content={error.message} 
                    contentProps={{ css: { "--tooltip-bg": "red.500" } }}>
                    <Box
                      pos="absolute"
                      right={2}
                      top={2}
                      mt={0}
                      zIndex="tooltip"
                    >
                      <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
                    </Box>
                  </Tooltip>
                )}

                <Flex
                  h="full"
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                >
                  <Icon as={FiPlus} w={14} h={14} />
                  <Text as="span" pt={2} textAlign="center">
                    Adicione sua imagem
                  </Text>
                </Flex>
              </Box>
            )}
          </Flex>
        )}
        <input
          data-testid={name}
          disabled={isSending}
          id={name}
          name={name}
          onChange={handleImageUpload}
          ref={ref}
          type="file"
          style={{
            display: 'none',
          }}
          {...rest}
        />
      </Field>
    </Box>
  );
};

export const FileInput = forwardRef(FileInputBase);
