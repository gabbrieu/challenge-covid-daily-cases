# Backend Challenge 🏅 2022 - Covid Daily Cases

<p align="center">
  API para obtenção de dados sobre variantes da Covid por país e data.
</p>

# Tabela de conteúdos

- [Tabela de conteúdos](#tabela-de-conteúdos)
  - [⚙️ Funcionalidades](#️-funcionalidades)
  - [🚀 Como Executar o projeto](#-como-executar-o-projeto)
    - [Pré-requisitos](#pré-requisitos)
    - [🎲 Rodando a API](#-rodando-a-api)
  - [🛠 Tecnologias](#-tecnologias)
  - [👦 Autor](#-autor)
  - [📝 Licença](#-licença)

<h4 align="center"> 
  🚧 Concluído 🚀🚧
</h4>

---

## ⚙️ Funcionalidades

- [x] Envia a mensagem inicial de "Backend Challenge 2022 🏅 - Covid Daily Cases".
- [x] Lista todos os registros da base de dados, retornando a soma dos casos registrados de acordo com a data selecionada, agrupados por país e separados por variante.
- [x] Lista todos os registros da base de dados, retornando a soma dos casos registrados desde o primeiro dia até a data enviada, agrupados por país e separados por variante.
- [x] Lista as datas disponíveis no dataset.

---

## 🚀 Como Executar o projeto

### Pré-requisitos

É preciso ter instalado o [Node.js](https://nodejs.org/en/) (foi utilizado a versão 16.14.2), [Nest.js](https://nestjs.com/) e o [PostgreSQL](https://www.postgresql.org/) na sua máquina local se for desejado rodar a API localmente.

### 🎲 Rodando a API

Abra seu terminal/cmd e digite o comando abaixo:

```bash
# Clone este repositório
$ git clone git@github.com:gabbrieu/challenge-covid-daily-cases.git
```

#### Rodando a api localmente

Caso desejar rodar localmente o banco de dados, será necessário fazer o download do [CSV](https://challenges.coode.sh/covid/data/covid-variants.csv). Após, rode o comando em seu banco de dados local, substituindo 'caminho_do_arquivo' pelo caminho do arquivo em seu computador:

```sql
COPY cases (location, date, variant, num_sequences, perc_sequences, num_sequences_total) FROM 'caminho_do_arquivo' CSV HEADER
```

Caso não tenha permissão de superuser, pode rodar o seguinte comando no psql:

```bash
$ \copy cases (LOCATION, date, variant, num_sequences, perc_sequences, num_sequences_total) FROM '/home/gabbrieu/covid-variants.csv' CSV HEADER
```

Após, crie um arquivo chamado .env na raiz da pasta "challenge-covid-daily-cases" pelo terminal/cmd ou manualmente. Com isso, preencha-o seguindo como modelo o arquivo .env.example. Após, volte para o terminal/cmd e digite os comandos nessa ordem (levando em consideração que voçê esteja já na raiz da pasta challenge-covid-daily-cases, se não estiver a acesse pelo terminal/cmd):

```bash
# Instale as dependências
$ yarn

# Execute a aplicação
$ yarn start:dev

# O servidor inciará na porta definida no .env - acesse <http://localhost:PORT/api> lá terá a API toda documentada e pronta pra uso com o próprio Swagger seguindo a Open API 3.0.
# Mas você ainda pode utilizar o Postman e o Insomnia, ou qualquer outro se preferir.
```

Para os testes unitários rode o seguinte comando pelo terminal/cmd na pasta raíz do projeto:

```bash
$ yarn test:cov

# Para ver os detalhes dos testes o seguinte comando pode ser rodado também
$ yarn test:ver
```

#### Rodando a api deployada do Heroku

Essa API foi deployada no Heroku. A URL base é esta: https://challenge-coodesh-covid.herokuapp.com/
Já o Swagger está na URL: https://challenge-coodesh-covid.herokuapp.com/api

O Banco de dados foi criado no Supabase devido ao máximo de linhas permitido no plano gratúito do Heroku que é de 10.000 linhas, mas o banco fornecido tem 100.000+ linhas de dados.

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Nest.js](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/pt-BR/)
- [class-validator](https://github.com/typestack/class-validator)
- [dotENV](https://github.com/motdotla/dotenv)

---

## 👦 Autor

<img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/73564749?s=460&u=dca37f3c329fbfd9342f541e37629f9c2747afd6&v=4" width="100px;" alt="foto perfil"/>

<sub><b>Gabriel Mendes</b></sub>

[![Linkedin Badge](https://img.shields.io/badge/-Gabriel-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabbrieu/)](https://www.linkedin.com/in/gabbrieu/) [![Gmail Badge](https://img.shields.io/badge/-gabrielhmendes@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:gabrielhmendes@gmail.com)](mailto:gabrielhmendes@gmail.com)

---

## 📝 Licença

Este projeto está sobe a licença [MIT](../LICENSE).

Feito com ❤️ por Gabriel Mendes 👋🏽 [Entre em contato!](https://www.linkedin.com/in/gabbrieu/)

---

> This is a challenge by [Coodesh](https://coodesh.com/)
