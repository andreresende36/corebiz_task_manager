Corebiz Task Manager API
========================

Este repositório contém a implementação de uma API de gerenciamento de tarefas, desenvolvida como parte de um desafio técnico para a empresa Corebiz. A API permite a criação, edição, listagem e exclusão de tarefas, incluindo funcionalidades como atribuição de usuário, status, data de vencimento e mais.

🛠️ Stack Utilizada
-------------------

- **Node.js**
- **TypeScript**
- **Fastify**: Framework web focado em performance.
- **Prisma**: ORM (Object-Relational Mapping) para gerenciamento de banco de dados.
- **Kysely**: Biblioteca de consulta a banco de dados SQL para TypeScript.
- **Swagger**: Ferramenta para documentação de APIs.
- **Scalar**: Biblioteca para criação de uma interface de usuário (UI) para documentação de APIs.
- **MySQL**

📋 Requisitos
-------------

- **Node.js** versão 18 ou superior
- **Docker** e **Docker Compose** instalados para rodar o ambiente em containers

🚀 Instalação e Inicialização
-----------------------------

### Clonar o Repositório

Execute os comandos abaixo para clonar o repositório e acessá-lo:

```shell
git clone https://github.com/andreresende36/corebiz_task_manager.git
cd corebiz_task_manager
```

### Subir os containeres com Docker Compose

Para iniciar o ambiente de desenvolvimento completo utilizando Docker, execute o seguinte comando na raiz do projeto:

```shell
docker compose up
```

Se tudo deu certo, a API já estará rodando e o banco de dados estará populado com 10 tarefas e 10 usuários para realização de testes.

🌐 URLs Importantes
-------------------

- **URL da API**: `http://localhost:3000`
- **Documentação API com o Swagger**: `http://localhost:3000/docs`

📊 Diagrama Entidade-Relacionamento (ERD)
-----------------------------------------

O diagrama abaixo descreve a estrutura de entidades e seus relacionamentos na base de dados:

![diagrama-er](https://imgur.com/q54IUG8.png)

📝 Contato
----------

- **Nome**: André Resende
- **LinkedIn**: [linkedin.com/in/andrediasresende](https://www.linkedin.com/in/andrediasresende/)
- **Email**: <andreresende36@gmail.com>
- **Whatsapp**: [62 98151-0256](https://wa.me/5562981510256)

Estou à disposição para qualquer esclarecimento!
