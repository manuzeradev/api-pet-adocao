<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>README - API Pets Adoção</title>
</head>
<body>
  <h1>🐶 API Pets Adoção</h1>

  <p><strong>Versão:</strong> 1.0.0</p>

  <h2>📋 Descrição do Projeto</h2>
  <p>API RESTful para gerenciamento de adoção de animais de estimação. O sistema permite o cadastro e gerenciamento de usuários e pets, autenticação via JWT e um fluxo completo de adoção com rotas públicas e protegidas.</p>

  <h2>🛠️ Tecnologias Utilizadas</h2>
  <ul>
    <li>Node.js</li>
    <li>Express</li>
    <li>MySQL</li>
    <li>JWT (jsonwebtoken)</li>
    <li>Bcrypt.js</li>
    <li>dotenv</li>
    <li>ESLint + Prettier</li>
    <li>Nodemon</li>
  </ul>

  <h2>⚙️ Instalação e Execução</h2>
  <pre>
git clone https://github.com/seu-usuario/api_pets_adocao.git
cd api_pets_adocao
npm install
npm run dev
  </pre>

  <h2>🗂️ Estrutura de Pastas</h2>
  <pre>
/src
├── config         # Configurações gerais
├── controllers    # Lógica de controle das requisições
├── database       # Scripts SQL e configuração do banco
├── middlewares    # Autenticação, validações, etc.
├── models         # Representação das entidades do banco
├── routes         # Definição das rotas
└── services       # Regras de negócio

/tests             # Testes REST Client
  </pre>

  <h2>🗃️ Estrutura do Banco de Dados (MySQL)</h2>
  <h3>Tabela: users</h3>
  <ul>
    <li>id: int (PK, AI)</li>
    <li>name: string</li>
    <li>email: string (único)</li>
    <li>password: string (bcrypt)</li>
    <li>phone: string</li>
    <li>role: string (admin | adopter)</li>
  </ul>

  <h3>Tabela: pets</h3>
  <ul>
    <li>id: int (PK, AI)</li>
    <li>name: string</li>
    <li>age: int</li>
    <li>species: string (dog, cat...)</li>
    <li>size: string (small, medium, large)</li>
    <li>status: string (available, adopted)</li>
    <li>description: string</li>
  </ul>

  <h3>Tabela: adoptions</h3>
  <ul>
    <li>id: int (PK, AI)</li>
    <li>user_id: int (FK)</li>
    <li>pet_id: int (FK)</li>
    <li>adoption_date: date</li>
  </ul>

  <h2>🔐 Autenticação e Autorização</h2>
  <ul>
    <li>Login via <code>/login</code> com email e senha</li>
    <li>JWT com expiração de 1h contendo userId e role</li>
    <li>Senhas nunca são expostas nas respostas</li>
  </ul>

  <h2>🔀 Principais Rotas</h2>
  <h3>Rotas Públicas</h3>
  <ul>
    <li>GET /pets/available</li>
    <li>POST /users</li>
    <li>POST /login</li>
  </ul>

  <h3>Rotas Protegidas (JWT)</h3>
  <p><strong>Usuários:</strong></p>
  <ul>
    <li>GET /users</li>
    <li>GET /users/:id</li>
    <li>PUT /users/:id</li>
    <li>DELETE /users/:id</li>
  </ul>

  <p><strong>Pets:</strong></p>
  <ul>
    <li>GET /pets</li>
    <li>GET /pets/:id</li>
    <li>POST /pets</li>
    <li>PUT /pets/:id</li>
    <li>DELETE /pets/:id</li>
  </ul>

  <p><strong>Adoções:</strong></p>
  <ul>
    <li>GET /adoptions</li>
    <li>POST /adoptions</li>
  </ul>

  <h2>📌 Regras de Negócio</h2>
  <ul>
    <li>Usuários: role padrão é "adopter"; apenas "admin" gerencia outros usuários.</li>
    <li>Pets: apenas "admin" cadastra/edita; pets adotados não podem ser readotados ou excluídos.</li>
    <li>Adoções: apenas "adopter" pode adotar; o pet deve estar disponível.</li>
  </ul>

  <h2>✍️ Autor</h2>
  <p>Emannuel Simões Gasparetto</p>
</body>
</html>
