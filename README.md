
### QuickCard API

## Controller

**Parado URL**

http://{URL_API}/api/{VERSION}/{CONTROLLER}/{ID}

- URL_API: IP/Domain da API
- VERSION: Versão de utilização da API.
- CONTROLLER: Controle para a requisição.
- ID: Identificador para filtros de ação para os controles.

**Versões** 
- v1: versão de desenvolvimento

[REST API](https://pt.wikipedia.org/wiki/REST)

A arquitetura da API se baseia no padrão REST e se estrutura na seguinte forma:
*para solicitações que sejam realizadas com sucesso:*

| Método | URL | Descrição | 
|--|--|-- | 
| [GET] |  /{CONTROLLER} | Retorna uma lista de objetos referente a entidade que representa o controller  | 
| [GET]  |  /{CONTROLLER}/{ID}|Retorna a entidade referente ao identificador passado | 
| [POST]  |  /{CONTROLLER}|Criação de uma nova entidade com os parâmetros passados| 
| [PUT]  |  /{CONTROLLER}/{ID}|Atualização de uma entidade com os parâmetros passados | 
| [DELETE]  |  /{CONTROLLER}/{ID}| Inativação da entidade referente ao identificador passado 

**Rotas de Controllers Disponíveis**
- Login
- Student 
- deck
- card
- notePad
- note

## Cabeçalho da Requisição

**Autenticação** 

O padrão de autenticação para API se baseia no padrão [JWT](https://jwt.io/) token. O token deve vir presente dentro do cabeçalho da seguinte forma:
```json
"authorization": "Bearer  {TOKEN}"
```
O token é adquirido na controller de login .

## Login
Para autenticação é necessário passar o email e senha do usuário correspondente.
exemplo:
```json
{
	"email" : "email de acesso"
	,"password" : "senha de acesso"
}
```
**Resposta do login**

para sucesso: 
```json
{
	"student": {
		 "id": "identificador do estudante"
		 , "name": "nome do estudante"
		 , "email": "email estudante"
		 , "isActive": true // flag para controle de ativo/inativo 
	},
	"token": "token de acesso"
}
```
para erro de login:
```json
{
	"status": 400,
	"message": "Invalid password or email"
}
```
# Entidades

## Student (Estudante):
```json
{ 
	 "id": "identificador do estudante"
	 , "name": "nome do estudante"
	 , "email": "email estudante"
	 , "password": "hash - senha do estudante"
	 , "isActive": true // flag para controle de ativo/inativo 
}
```
exemplo: 
```json
{
	"_id": "5e80fd2529d3f509d046bc2e"
	, "email": "p.hsouza@live.com"
	, "name": "paulo"
	, "password": '$2a$10$xzH78BxqNiwVhfuSZWmbGuD7X4h86XtUFJUznviPEEKwjzh0OH5RO'
	, "isActive": true
}
```
## Deck (Baralho):
```json
{ 
	 "id": "identificador do deck"
	 , "student" : {
		// student entity - estudante ao qual pertence o baralho
	}
	 , "name": "nome do baralho"
	 , "card": [
		{
		//  list card entiy - lista de cartões que tem referencia ao baralho
		}
	]
	 , "isActive": true // flag para controle de ativo/inativo 
}
```

## Card (Cartão):
```json
{ 
	 "id": "identificador do cartão"
	 , "deck": {
		// deck entity - baralho ao qual pertence o cartão
	}
	, "front": "frente do cartão"
	, "verse": "verso do cartão"
	, "isActive": true // flag para controle de ativo/inativo 
}
```
## NotePad (Bloco de notas):
```json
{ 
	 "id": "identificador do cartão"
	 , "name": "nome do bloco cartão"
	 , "student": {
		// student entity - estudante ao qual pertence o baralho
	}
	, "note": [
		{
		// list note entiy - lista de anotações que tem referencia ao bloco de notas
		}
	]
	, "isActive": true // flag para controle de ativo/inativo 
}
```
## Note (Anotação):
```json
{ 
	 "id": "identificador do cartão"
	 , "notePad": {
		// notePad entity - bloco de anotação ao qual pertence a anotação
	}
	, "content": "conteúdo da anotação"
	, "isActive": true // flag para controle de ativo/inativo 
}
```

## Models Status

**200 Ok** 
Status code 200. Sucesso na ação do controller.

**400 Bad Request**
Status code 400. Requisição ruim.
```json
{
	"status":400
	,"message":"mensagem error"
	"notifications": [
		"lista de notificações para o pedido ruim"
	]
}
```

**401 Unauthorized**
Status code 401. Não autorizado no controller 
```json
{
	"status":401
	,"name":"unauthorized"
	,"level":"Stop request"
	,"message":"mensagem error"
}
```
**404 Not found**
Status code 404. Nenhuma rota encontrada para URL.
response body: *Cannot GET {URL}*

**500 Error Server**
Status code 500. Erro interno na API
