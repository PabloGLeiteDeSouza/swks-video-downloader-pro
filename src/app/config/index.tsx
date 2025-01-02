import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Toaster, toaster } from "@/components/ui/toaster";
import {
  Box,
  Group,
  Heading,
  Input,
  InputAddon,
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import React from "react";

const Configuracoes: React.FC = () => {
  const [configurations, setConfigurations] = React.useState({
    directorySaveVideos: "",
    directorySavePlaylists: "",
    directorySaveMusicas: "",
  });
  const [loadingForm, setLoadingForm] = React.useState(true);

  const StartConfigurationScreen = async () => {
    const saveVideos = localStorage.getItem("directory-save-videos") as string;
    const savePlaylists = localStorage.getItem(
      "directory-save-playlists"
    ) as string;
    const saveMusicas = localStorage.getItem(
      "directory-save-musicas"
    ) as string;
    setConfigurations({
      directorySaveVideos: saveVideos,
      directorySavePlaylists: savePlaylists,
      directorySaveMusicas: saveMusicas,
    });
    setLoadingForm(false);
  };

  React.useEffect(() => {
    StartConfigurationScreen();
  }, []);

  return (
    <Box w="full">
      <Navbar />
      <Box mt="5" w="full">
        <Box w="full" display="flex" justifyContent="center">
          <Heading size="4xl">Configuracões</Heading>
        </Box>
        <VStack w="full" my="5">
          {!loadingForm && (
            <Formik
              initialValues={configurations}
              onSubmit={({
                directorySaveMusicas,
                directorySavePlaylists,
                directorySaveVideos,
              }) => {
                localStorage.setItem(
                  "directory-save-videos",
                  directorySaveMusicas
                );
                localStorage.setItem(
                  "directory-save-playlists",
                  directorySavePlaylists
                );
                localStorage.setItem(
                  "directory-save-musicas",
                  directorySaveVideos
                );
                
                toaster.create({
                  title: "Configurações salvas com sucesso",
                  type: "success",
                });
                console.log("Salvou");
              }}
            >
              {({ handleSubmit, setFieldValue, values }) => {
                return (
                  <VStack
                    w="5/12"
                    gap="5"
                    bgColor="gray.600"
                    rounded="md"
                    py="5"
                    px="5"
                    asChild
                  >
                    <form onSubmit={handleSubmit}>
                      <Field label="Diretório dos vídeos">
                        <Group w="full" attached>
                          <Input
                            readOnly
                            placeholder="Diretório dos vídeos"
                            value={values.directorySaveVideos}
                          />
                          <InputAddon padding={0}>
                            <Button
                              onClick={async () => {
                                const dir =
                                  await window.electron.selectDirectory();
                                setFieldValue("directorySaveVideos", dir);
                              }}
                            >
                              Seelcionar
                            </Button>
                          </InputAddon>
                        </Group>
                      </Field>

                      <Field label="Diretório das playlists">
                        <Group w="full" attached>
                          <Input
                            readOnly
                            placeholder="Diretório das playlists"
                            value={values.directorySavePlaylists}
                          />
                          <InputAddon padding={0}>
                            <Button
                              onClick={async () => {
                                const dir =
                                  await window.electron.selectDirectory();
                                setFieldValue("directorySavePlaylists", dir);
                              }}
                            >
                              Seelcionar
                            </Button>
                          </InputAddon>
                        </Group>
                      </Field>

                      <Field label="Diretório das músicas">
                        <Group w="full" attached>
                          <Input
                            readOnly
                            placeholder="diretorio das musicas"
                            value={values.directorySaveMusicas}
                          />
                          <InputAddon padding={0}>
                            <Button
                              onClick={async () => {
                                const dir =
                                  await window.electron.selectDirectory();
                                setFieldValue("directorySaveMusicas", dir);
                              }}
                            >
                              Seelcionar
                            </Button>
                          </InputAddon>
                        </Group>
                      </Field>

                      <Box>
                        <Button type="submit">Salvar Configuracões</Button>
                      </Box>
                    </form>
                  </VStack>
                );
              }}
            </Formik>
          )}
        </VStack>
        <Toaster />
      </Box>
    </Box>
  );
};

export default Configuracoes;
