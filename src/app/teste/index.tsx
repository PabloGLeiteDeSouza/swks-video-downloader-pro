import { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react';
import { InputGroup } from '@/components/ui/input-group';
import { Formik } from 'formik';

function App() {
  const [status, setStatus] = useState<string>('');

  const handleDownload = async (url: string, outputPath: string) => {
    setStatus('Baixando...');
    try {
      const result = await window.electron.fetchVideoUrl({ url, outputPath });
      setStatus(result);
    } catch (error: unknown) {
      setStatus(`Erro: ${(error as Error).message}`);
    }
  };


  return (
    <Box w="full" display="flex" justifyContent="center" alignItems="center" p="5">
      <Formik
        initialValues={{
          path: "",
          url: "",
        }}
        onSubmit={async ({ path, url }) => {
          handleDownload(url, path);
        }}
      >
        {({ handleSubmit, handleChange, setFieldValue, values }) => {
          const handleSelectDirectory = async () => {
            const selectedDir = await window.electron.selectDirectory();
            if (selectedDir) {
              setFieldValue('path',selectedDir);
            }
          };
          return (
            <VStack w="2/3" mt="5" alignItems="center" gap={4} asChild>
              <form onSubmit={handleSubmit} action="" method="post">
                  <VStack w="full">
                    <Text>Baixe vídeos de qualquer site</Text>
                    <Input
                      placeholder="URL do site"
                      value={values.url}
                      onChange={handleChange('url')}
                    />
                    <InputGroup
                      w="full"
                      endElement={
                        <>
                          <Button onClick={handleSelectDirectory}>
                            Selecionar Diretório
                          </Button>
                        </>
                      }
                    >
                      <Input
                        placeholder="Diretorio"
                        value={values.path}
                        readOnly
                      />
                    </InputGroup>
                    <Button type="submit" colorScheme="blue">
                      Baixar
                    </Button>
                    {status && <Text>{status}</Text>}
                  </VStack>
              </form>
            </VStack>
          )
        }}
      </Formik>
      
    </Box>
  )
}

export default App