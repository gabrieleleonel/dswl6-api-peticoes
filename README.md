# DSWL6 API Petições

## Rotas:

### Não necessário autenticação

<img src="https://img.shields.io/badge/METHOD-GET-green">

Obter todas as petições: `"/api/peticoes"`

Obter petição a partir de um id: `"/api/peticao/:id"`

---

### Necessário autenticação de usuário

<img src="https://img.shields.io/badge/METHOD-POST-orange">

Adicionar uma petição: 
  * endpoint: `"/api/peticao/:id"`
  * body: `{ "titulo": "XXXX","descricao": "XXXX"}`
  * header bearer token: token passado

Adicionar usuário:  
  * endpoint: `"/api/usuario"`
  * body: `{ "usuario": "XXXX", "senha":"XXXX"}`
  * retorno positivo: será retornado um token o qual deve ser utilizado para funcionalidades de adição ou edição

Logar usuário: 
  * endpoint: `"/api/login"`
  * body: `{ "usuario": "XXXX", "senha":"XXXX"}`

Logout usuário: `"/api/logout"`

<img src="https://img.shields.io/badge/METHOD-PUT-blue">

Alterar usuário: 
  * endpoint: `"/api/usuario/:id"`
  * body: `{ "usuario": "XXXX", "senha":"XXXX"}`
  * header bearer token: token passado

Alterar uma petição:
  * endpoint: `"/api/peticao/:id"`
  * body: `{ "titulo": "XXXX","descricao": "XXXX"}`
  * header bearer token: token passado

Assinar uma petição:
  * endpoint: `"/api/peticao/:id/assinar"`
  * header bearer token: token passado


<img src="https://img.shields.io/badge/METHOD-DELETE-red">

Deletar uma petição:
  * endpoint: `"/api/peticao/:id"`
  * header bearer token: token passado
