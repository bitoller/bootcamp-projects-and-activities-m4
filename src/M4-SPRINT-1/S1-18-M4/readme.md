<h1>Mercado autônomo</h1>

<h3>Introdução</h3>
Recebemos uma demanda para realizar a criação de uma API REST. Essa API será utilizada para organização do estoque de uma startup em processo de testes que pretende se transformar em uma rede de mercados autônomos (Smart Store). Hoje o mercado trabalha com apenas dois tipos de produtos: comida e limpeza.

Como iremos controlar o estoque do mercado, nossa aplicação deverá ter rotas para a criação, listagem, atualização e deleção de produtos.

O workspace do insomnia será utilizado por instrutores e monitores na correção das entregas, e ele possui duas páginas:

<h4>Pagina para Debug:</h4>
Pode ser utilizado a vontade e ter seus valores para criação, listagem, atualização ou deleção alterados sem problemas.

<h4>Pagina para Testes:</h4>

NUNCA ALTERE NENHUM TESTE OU ROTA DA PÁGINA DE TESTES

Para executar os testes é importante ressaltar:
- Você precisa utilizar a enviroment test
- Você deve realizar ao menos uma requisição em cada uma das rotas de debug da pagina Rotas para Testes, antes de executar os testes.
- ATENÇÃO: sempre REINICIE o servidor a cada novo teste ou bateria de testes que for executar

<h3>Regras da entrega</h3>
A entrega deve seguir as seguintes regras ou será zerada:

- O código deve estar em TypeScript.
- Não deve ser utilizada nenhuma outra tecnologia além das apresentadas e utilizadas nessa sprint.
- A organização de arquivos deve seguir o que foi visto previamente (app.ts, interfaces.ts, logics.ts, database.ts, middlewares.ts).
- Uma constante market deve ser criada em seu arquivo database.ts.
- Deverá ser um array vazio utilizado para simular o banco de dados.
- Todas as funções e atributos devem ser nomeados de acordo com o solicitado.
- Caso não esteja de acordo com o estabelecido, será descontado nota.

<h4>Interfaces da aplicação</h4>
Irão existir dois tipos de produtos, Food Product e Cleaning Product. Ambos terão as mesmas informações, contando apenas com uma adição do atributo calories nos produtos do tipo food.

Para a tipagem dos produtos, deverão ser criadas 3 interfaces:

- IProduct representando os dados em comum entre os dois tipos de produtos;
- ICleaningProduct estendendo de IProduct;
- IFoodProduct também estendendo de IProduct e contendo os dados a mais que os produtos alimentícios têm.

<h3>IProduct</h3>
Atributos


id: 
Tipo: number; 
Representa o número de identificação único do produto; 

name: 
Tipo string; 
Representa o nome do produto. 

price: 
Tipo: number; 
Representa o preço do produto; 
Será enviado na menor casa possível, ou seja, em centavos. 

weight: 
Tipo: number; 
Representa o peso do produto; 
Será enviado na menor casa possível, ou seja, em gramas. 

section: 
Tipo: "food" ou "cleaning"; 
Representa a seção que o produto pertence 

expirationDate: 
Tipo: Date; 
Esse atributo deverá ser gerado automaticamente, pela função de criação do produto; 
Representa a data de expiração do produto; 

<h3>ICleaningProduct</h3>
Estende a interface IProduct e não acrescenta nenhum atributo a mais.

<h3>IFoodProduct</h3>
Deve estender da interface IProduct acrescentando o seguinte atributo:

Atributo

calories:
Tipo: number;
Representa as calorias do produto.

<h3>Endpoints da aplicação</h3>

POST

/products

Criar e adicionar os produtos ao mercado

GET

/products

Listar todos os produtos do mercado, sendo possível listar pela section

GET

/products/:id

Listar um produto específico através do seu id

PATCH

/products/:id

Atualizar os dados de um produto através do seu id

DELETE

/products/:id

Deletar o produto a partir do seu id

<h3>Middlewares da aplicação</h3>

Verificação de nome existente
Esse middleware deverá verificar se o name enviado pelo request.body já existe no banco.

Deverá ser utilizado nas rotas:

POST /products
PATCH /products/:id
Pode ser criado um único middleware para as rotas POST e PATCH, ou podem ser criados middlewares separados, um para a rota de POST e outro para a rota de PATCH.
Caso o produto já exista deverá ser retornando um erro com status code 409 CONFLICT.
Resposta do servidor:

```
{
  "error": "Product already registered"
}
```

Status code: 409 CONFLICT.

Verificação se o id buscado existe

Esse middleware deverá verificar se o id enviado por route params existe de fato no banco;
Deverá ser criado apenas um middleware e utilizado nas rotas:
GET /products/:id
PATCH /products/:id
DELETE /products/:id
Caso o produto não exista deverá retronar um erro com status code 404 NOT FOUND.
Resposta do servidor:

```
{
  "error": "Product not found"
}
```

Status code: 404 NOT FOUND.

<h4>Rotas da aplicação</h4>

POST /products

Envio:
Deverá ser possível criar vários produtos de uma só vez, portanto, o envio dessa rota deve ser um array de objetos contendo todos os produtos que deverão ser cadastrados.
O id não deve ser enviado e sim criado de forma automática. Deve ser um número sequencial e não deve ser repetir.
O expirationDate não deve ser enviado e sim criado de forma automática pelo servidor. O valor deverá ser de 365 dias a partir da data de criação do produto.

Retorno:
Um objeto contendo duas chaves:
total:
Tipo: number;
Deve ser a soma do preço de todos os produtos adicionados ao mercado;
marketProducts:
Tipo: array;
Deve conter TODOS os produtos adicionados ao market no momento da criação.
Exemplos de request e response da requisição
Corpo de envio da requisição:

```
[
  {
    "name": "Queijo",
    "price": 10,
    "weight": 30,
    "calories": 300,
    "section": "food"
  },
  {
    "name": "Presunto",
    "price": 100,
    "weight": 40,
    "calories": 1100,
    "section": "food"
  },
  {
    "name": "Detergente",
    "price": 10,
    "weight": 1000,
    "section": "cleaning"
  }
]
```

Resposta do servidor:

```
{
 "total": 120,
 "marketProducts": [
  {
   "id": 1,
   "name": "Queijo",
   "price": 10,
   "weight": 30,
   "calories": 300,
   "section": "food",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  },
  {
   "id": 2,
   "name": "Presunto",
   "price": 100,
   "weight": 40,
   "calories": 1100,
   "section": "food",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  }
  {
   "id": 3,
   "name": "Detergente",
   "price": 10,
   "weight": 1000,
   "section": "cleaning",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  }
 ]
}
```

Status code:  201 CREATED.

GET /products

Deverá ser possível listar todos os produtos do mercado;
Retorno:
Um objeto contendo duas chaves:
total:
Tipo: number;
Deve ser a soma do preço de todos os produtos no market;
marketProducts:
Tipo: array;
Deve conter todos os produtos encontrados no market.
Exemplo de retorno:
O exemplo abaixo foi realizado na seguinte rota: /products.

Resposta do servidor:

```
{
 "total": 120,
 "marketProducts": [
  {
   "id": 1,
   "name": "Queijo",
   "price": 10,
   "weight": 30,
   "calories": 300,
   "section": "food",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  },
  {
   "id": 2,
   "name": "Presunto",
   "price": 100,
   "weight": 40,
   "calories": 1100,
   "section": "food",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  }
  {
   "id": 3,
   "name": "Detergente",
   "price": 10,
   "weight": 1000,
   "section": "cleaning",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  }
 ]
}
```

Status code:  200 OK.

GET /products/:id

Deve ser possível listar as informações de um produto com base em seu id;
O id do produto deverá ser coletado através do route params.
Exemplo de retorno:
Sucesso:

O exemplo abaixo foi realizado na seguinte rota: /products/1.

Resposta do servidor:

```
{
  "id": 1,
  "name": "Queijo",
  "price": 10,
  "weight": 30,
  "calories": 300,
  "section": "food",
  "expirationDate": "2024-03-06T12:12:32.431Z"
}
```

Status code:  200 OK.

Falha:

Caso seja enviado um id inexistente no banco, não deverá ser possível listar o produto. Deverá ser retornado um objeto contendo a seguinte chave:
error:
Tipo: string;
Deve ser uma mensagem informando que o produto não foi encontrado.

Exemplo de retorno:
O exemplo abaixo foi realizado na seguinte rota: /products/242123 informando um id inexistente.

Resposta do servidor:

```
{
  "error": "Product not found"
}
```

Status code:  404 NOT FOUND.

PATCH /products/:id

Deve ser possível atualizar os dados de um produto de forma opcional.
Não deve ser possível atualizar os valores de id, expirationDate e section.
Esses dados não devem ser enviados
Exemplos de request e response da requisição
Sucesso:

Corpo de envio da requisição:

```
{
  "name": "Presunto defumado",
  "price": 100,
  "weight": 30,
  "calories": 300
}
```

Resposta do servidor:

```
{
  "id": 2,
  "name": "Presunto defumado",
  "price": 100,
  "weight": 30,
  "calories": 300,
  "section": "food",
  "expirationDate": "2024-03-06T12:12:32.431Z"
}
```

Status code:  200 OK.

Falha:

Caso seja enviado um id inexistente no banco, não deverá ser possível atualizar o produto. Deverá ser retornado um objeto contendo a seguinte chave:
error:
Tipo: string;
Deve ser uma mensagem informando que o produto não foi encontrado.
Exemplo de retorno:
O exemplo abaixo foi realizado na seguinte rota: /products/242123 informando um id inexistente.

Resposta do servidor:

```
{
  "error": "Product not found"
}
```

Status code:  404 NOT FOUND.

DELETE /products/:id

Deve ser possível deletar um produto informando o seu id.
Sucesso:

Não deve ser retornada nenhuma mensagem, apenas o status code 204 NO CONTENT.
Exemplo de retorno:
O exemplo abaixo foi realizado na seguinte rota: /products/1.

Resposta do servidor:

Status code:  204 NO CONTENT.

Falha:

Caso seja enviado um id inexistente no banco, não deverá ser possível deletar o produto. Deverá ser retornado um objeto contendo a seguinte chave:
error:
Tipo: string;
Deve ser uma mensagem informando que o produto não foi encontrado.
Exemplo de retorno:
O exemplo abaixo foi realizado na seguinte rota: /products/242123 informando um id inexistente.

Resposta do servidor:

```
{
  "error": "Product not found"
}
```

Status code:  404 NOT FOUND.
<br>
<br>

<p align="center"><b>Taken from Kenzie Academy Brasil</b></p>
