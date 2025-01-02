import { Heading, HStack } from "@chakra-ui/react"
import { ColorModeButton } from "../ui/color-mode"
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu"
import { Button } from "../ui/button"
import { FaBars, FaGear } from "react-icons/fa6"
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
    return (
        <HStack px="5" py="2.5" _light={{ bgColor: "gray.300" }} _dark={{ bgColor: "gray.800" }} w="full" justifyContent="space-between">
            <HStack>
                <Heading>
                    <Link to="/">
                        Swks Video Downloader Pro
                    </Link>
                </Heading>
            </HStack>
            <HStack>

            </HStack>
            <HStack>
                <ColorModeButton />
                <MenuRoot>
                    <MenuTrigger asChild>
                        <Button variant="plain">
                            <FaBars />
                        </Button>
                    </MenuTrigger>
                    <MenuContent>
                        <MenuItem value="1">
                            Configuracoes
                        </MenuItem>
                        <MenuItem value="2">
                            Configuracoes
                        </MenuItem>
                        <MenuItem value="3">
                            Configuracoes
                        </MenuItem>
                        <MenuItem value="4">
                            Configuracoes
                        </MenuItem>
                        <MenuItem value="5">
                            Configuracoes
                        </MenuItem>
                        <MenuItem value="6">
                            Configuracoes
                        </MenuItem>
                        <MenuItem value="7">
                            Configuracoes
                        </MenuItem>
                        <MenuItem value="config" asChild>
                            <Link to="/config">
                                <FaGear /> Configuracoes
                            </Link>
                        </MenuItem>
                    </MenuContent>
                </MenuRoot>
            </HStack>
        </HStack>
    )
}

export default Navbar;