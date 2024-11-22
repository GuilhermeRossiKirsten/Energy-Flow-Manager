# Energy-Flow-Manager

solução integrada para monitorar e gerenciar o processo de recarga de veículos elétricos,
promovendo o uso de fontes renováveis e otimizando o consumo energético.

## Tecnologias Utilizadas

- **Frontend:** [React Native](https://reactjs.org/](https://reactnative.dev/)) | [TypeScript](https://www.typescriptlang.org/) | [Native Base](https://tailwindcss.com/](https://nativebase.io/))
- **Backend:** [Node.js](https://nodejs.org/) | [Express](https://expressjs.com/)
- **Banco de Dados:** [SQLite](https://www.sqlite.org/index.html)

## Instalação e Configuração

### Pré-requisitos

- [Node.js](https://nodejs.org/) (desenvolvido na versão 22.8.0) 
- Gerenciador de pacotes [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Banco de dados configurado (SQLite)

### Passos para Instalação


Clone o repositório:

   ```bash
   git clone https://github.com/GuilhermeRossiKirsten/Energy-Flow-Manager.git
   ```

   
## Backend
```
projeto/
├── backend/
│   ├── src/
│       ├── controllers/       # Lógica de controle
│       ├── middleware/        # Middleware de autenticação
│       ├── models/            # Modelos de banco de dados
│       ├── routes/            # Rotas da API
│       ├── app.js             # Inicialização do servidor
│       ├── .env               # variáveis de ambiente
│       └── energyFlow.sqlite  # Arquivo do banco de dados 
└── package.json         # Dependências do projeto
```


1. Instale as dependências do backend:
   ```bash
   cd Backend
   npm install
   ```

2. Inicie o serviço do backend
   ```bash
   cd src
   node app.js
   ```
   
## Frontend
```
projeto/
└── Frontend/
      ├── .expo/                   # Arquivos internos gerenciados pelo Expo.
      ├── assets/                  # Recursos estáticos como imagens, fontes, sons, etc.
      ├── node_modules/            # Dependências instaladas pelo npm.
      ├── src/                     # Diretório principal do código-fonte.
      │   ├── navigation/          # Arquivos relacionados à navegação entre telas (Stack, Tab, etc.).
      │   ├── screens/             # Componentes das telas do aplicativo (ex.: LoginScreen, SignUpScreen, ManagerScreen).
      │   ├── App.tsx              # Ponto de entrada principal do aplicativo React Native.
      │   └── index.ts             # Arquivo para inicializar o projeto.
      ├── .gitignore               # Arquivo que especifica quais arquivos ou pastas devem ser ignorados pelo Git.
      ├── app.json                 # Configurações específicas do Expo, como nome e ícone do aplicativo.
      ├── package-lock.json        # Arquivo que garante a consistência das dependências instaladas.
      ├── package.json             # Gerenciador de dependências e metadados do projeto.
      └── tsconfig.json            # Configuração do TypeScript, definindo opções como paths e compilação.
```


1. Instale as dependências do frontend:
   ```bash
   cd Frontend
   npm install
   ```

2. Inicie o serviço do frontend
   ```bash
   npm run start
   ```

3. Utilize o navegador para acessar o frontend
     ```bash
     http://localhost:8081
     ```


### Endpoints

### Rotas e Métodos

1. **POST http://localhost:3000/auth/login** - Método: `POST`
   - Descrição: Realiza o login de um usuário e retorna um token JWT.

2. **POST http://localhost:3000/auth/register** - Método: `POST`
   - Descrição: Registra um novo usuário no sistema.

3. **GET http://localhost:3000/stations** - Método: `GET`
   - Descrição: Retorna a lista de estações associadas ao usuário autenticado.

4. **POST http://localhost:3000/stations** - Método: `POST`
   - Descrição: Cria uma nova estação vinculada ao usuário autenticado.

5. **PUT http://localhost:3000/stations** - Método: `PUT`
   - Descrição: Atualiza uma estação existente associada ao usuário autenticado.
  


### Desenvolvedores do projeto
#### Guilherme Rossi Kirsten - RM95230
#### Ronaldo Otsuka Ribeiro Mira - RM95595
#### Gabriel Gino Jorge Dallape - RM94862


