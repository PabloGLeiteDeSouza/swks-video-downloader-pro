import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  Heading,
  createListCollection,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import Navbar from '@/components/navbar';
import { useNavigate } from 'react-router-dom';
import { Field } from '@/components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"
import isValidURL from '@/utils/validate_url';

function App() {
  const [status, setStatus] = useState<string>('');
  const [loadingForm, setLoadingForm] = useState<boolean>(true);
  const [storageDirectory, setStorageDirectory] = useState<string>('');
  
  const plataformas = createListCollection({
    items: [
      { label: "YouTube", value: "youtube" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  })

  const tipos_download_ytb  = createListCollection({
    items: [
      { label: "Video", value: "video" },
      { label: "Audio", value: "audio" },
      { label: "Video sem audio", value: "video_no_audio" },
    ],
  })

  const navigate = useNavigate();

  const handleDownload = async (url: string, outputPath: string) => {
    setStatus('Baixando...');
    try {
      const result = await window.electron.fetchVideoUrl({ url, outputPath });
      setStatus(result);
    } catch (error: unknown) {
      setStatus(`Erro: ${(error as Error).message}`);
    }
  };

  React.useEffect(() => {
    async function start () {
      const storage = localStorage.getItem('directory-save-videos');
      if (!storage) {
        alert("Não há um diretório salvo, configure um agora!")
        navigate('/config');
      } else {
        setStorageDirectory(storage);
      }
      setLoadingForm(false);
    }
    if (loadingForm) {
      start();
    }
  }, [navigate, loadingForm])

  return (
    <Box w="full">
        <Navbar />
        <Box w="full" display="flex" flexDir="column" justifyContent="center" alignItems="center" p="5">
          <Box w="full" display="flex" justifyContent="center">
            <Heading>Baixe vídeos de qualquer site</Heading>
          </Box>
            {!loadingForm && (
              <Formik
                initialValues={{
                  plataforma: "",
                  path: storageDirectory,
                  url: "",
                }}
                onSubmit={async ({ path, url }) => {
                handleDownload(url, path);
                }}
            >
                {({ handleSubmit, handleChange, setFieldValue, values }) => {
                return (
                  <VStack w="2/3" mt="5" alignItems="center" gap={4} asChild>
                    <form onSubmit={handleSubmit} action="" method="post">
                      <VStack w="full">
                        <SelectRoot onValueChange={(v) => setFieldValue('plataforma', v.value[0])} collection={plataformas}>
                          <SelectLabel>Selecione uma plataforma:</SelectLabel>
                          <SelectTrigger>
                            <SelectValueText placeholder="Selecione uma plataforma" />
                          </SelectTrigger>
                          <SelectContent>
                            {plataformas.items.map((plataforma) => (
                              <SelectItem item={plataforma} key={plataforma.value}>
                                {plataforma.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectRoot>
                        {values.plataforma !== "" && (
                          <>
                            <Field label={values.plataforma === "youtube" ? "Informe o Link do Video do YouTube" : "Informe o Link"} >
                              <Input
                              placeholder="URL do site"
                              value={values.url}
                              onChange={handleChange('url')}
                              />
                            </Field>
                            {isValidURL(values.url) && (
                              <>
                                <Button type="submit" colorScheme="blue">
                                  Baixar
                                </Button>
                                {status && <Text>{status}</Text>}
                              </>
                            )}
                          </>
                        )}
                      </VStack>
                    </form>
                  </VStack>
                )
                }}
            </Formik>
          )}
        </Box>
    </Box>
  )
}

export default App