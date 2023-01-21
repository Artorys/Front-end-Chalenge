# Sobre o Projeto

Esse projeto visa saber quanto custa antecipar uma transação, e para isso, desenvolvi uma calculadora de antecipação para que os mesmos consigam saber quais valores receberão caso optem por antecipar o recebimento.

### Feito Com

Abaixo segue o que foi utilizado na criação deste projeto:

 - React - Framework Utilizado para desenvolver interfaces web.
 - Vite - Agiliza nosso processo de desenvolvimento, com instalacoes e build de pacotes/modulos javascript feitas rapidamente.
 - typescript - Linguagem totalmente tipada baseada no javascript, para fortalecer o seu desenvolvimento em equipe,rendendo mais e fazendo voce perder menos tempo procurando propriedades ou metodos escondidos no objeto.
 - Axios - Biblioteca Utilizada para trabalhar com requisicoes.
 - styled-components - Biblioteca de estilizacao utilizada em conjunto com o react

<!-- GETTING STARTED -->

## Começando

Para conseguir utilizar o projeto localmente,siga os passos abaixo.

### Pré-requisitos

Necessário uma IDE,de preferência uma com terminal integrado em sua interface,(para facilitar a execucão dos comandos).

### Estrutura de Arquivos

A estrutura de arquivos está da seguinte maneira:

```bash
front-end-chalenge
│  ├── node_modules/
│  ├── src/
│    ├── @types/
│    │   └── index.d.ts
│    ├── api/
│    │   ├── index.ts
│    ├── assets/svg-loaders
│    │           └── oval.svg
│    ├── components/
│    │     ├── Button/
│    │     │     ├── index.tsx
│    │     │     ├── style.ts
│    │     ├── DescriptionInput/
│    │     │      ├── index.tsx
│    │     │      ├── style.ts
│    │     ├── ErrorMessage/
│    │     │      ├── index.tsx
│    │     │      ├── style.ts
│    │     ├── Header/
│    │     │      ├── index.tsx
│    │     │      ├── style.ts
│    │     ├── Input/
│    │     │      ├── index.tsx
│    │     │      ├── style.ts
│    │     ├── Line/
│    │     │      ├── index.tsx
│    │     │      ├── style.ts
│    │     ├── Loading/
│    │     │      ├── index.tsx
│    │     │      ├── style.ts
│    │     ├── Result/            
│    │     │      ├── index.tsx
│    │     │      ├── style.ts
│    │     ├── Title/
│    │           ├── index.tsx
│    │           ├── style.ts
│    └── App.tsx
│    └── main.tsx
│    └── vite-env.d.ts
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── readme.md
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── LICENSE
└── yarn.lock
```

### Instalação

1. Para inicializar a aplicação é bem simples, bastar clonar o repositório, e detro da pasta executar:

```sh
  yarn #instala as depêndencias para inicializar o projeto
  yarn dev  #inicializar o projeto.
```
2. Você verá uma opção no seu terminal:
```sh
  -> Local : #Clique segurando ctrl nesse link que abrirá seu projeto localmente no seu navegador padrão.
```