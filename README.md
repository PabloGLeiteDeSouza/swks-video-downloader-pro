# Swks Vídeo Downloader

Este projeto ultiliza das tecnologias:

## [React](https://react.dev/)
Uma biblioteca JavaScript de código aberto para a construção de interfaces de usuário. O React permite a criação de componentes reutilizáveis e a gestão eficiente do estado, facilitando a construção de aplicações web dinâmicas e responsivas. A abordagem baseada em componentes do React torna o desenvolvimento mais modular e escalável, garantindo alta performance e manutenção simplificada. Com React, a interface do usuário é atualizada de maneira eficiente quando o estado da aplicação muda, proporcionando uma experiência interativa e fluida.

## [Vite](https://vite.dev/)
Uma ferramenta de build moderna que oferece um ambiente de desenvolvimento rápido e otimizado. Vite aproveita a funcionalidade de módulos ES nativos no navegador, o que permite recarregamentos instantâneos e uma experiência de desenvolvimento mais ágil. Ele também realiza a otimização de recursos na hora de construir o projeto para produção, resultando em tempos de build significativamente mais rápidos em comparação com outras ferramentas tradicionais. A simplicidade de configuração e a integração perfeita com frameworks como React tornam o Vite uma escolha ideal para projetos modernos.

## [Electron](https://www.electronjs.org/)
Um framework que permite a criação de aplicativos de desktop multiplataforma com tecnologias web como HTML, CSS e JavaScript. Com Electron, é possível criar aplicações de desktop nativas para Windows, macOS e Linux, aproveitando os recursos da web e a integração com o sistema operacional. A combinação de um renderizador web (usando tecnologias da web) e um processo principal que gerencia as interações com o sistema permite criar aplicativos poderosos com uma base de código unificada. O Electron facilita o acesso a APIs nativas, como o sistema de arquivos, notificações e muito mais, mantendo uma experiência de desenvolvimento web simples.

## [Electron-Vite](https://electron-vite.github.io/)
Uma ferramenta que combina a experiência de desenvolvimento rápida e moderna do Vite com o poder do Electron. electron-vite oferece uma configuração otimizada para o desenvolvimento de aplicativos desktop, permitindo recarregamentos rápidos durante o desenvolvimento, integração fácil com o Electron e uma experiência de build eficiente. Com o electron-vite, é possível aproveitar todos os benefícios do Vite, como o suporte a módulos ES nativos e a construção otimizada, ao mesmo tempo em que cria aplicativos multiplataforma usando Electron. Isso resulta em um fluxo de desenvolvimento mais ágil e simplificado, além de builds de produção rápidos e eficientes.

## [Chakra Ui](https://www.chakra-ui.com/)
Uma biblioteca de componentes React que oferece uma maneira simples, acessível e modular de criar interfaces de usuário. Com Chakra UI, é possível construir layouts e componentes de forma rápida, mantendo a consistência visual e a acessibilidade em todo o aplicativo. A biblioteca vem com uma série de componentes prontos para uso, como botões, inputs, modais e muito mais, que podem ser facilmente customizados através de temas e estilos. Além disso, o Chakra UI segue as melhores práticas de design responsivo, garantindo que o aplicativo seja visualmente agradável e funcional em qualquer dispositivo. desenvolvida pelo [Seguna Debayo](https://x.com/thesegunadebayo), que tem suporte para react, next.js, vite, vue e entre outras tecnologias.

Estas tecnologias são fundamentais para a construção deste aplicativo, alem de serem flexiveis tornam viavel o uso do mesmo em computadores com sistemas operacionais windows, macOS e Linux.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
