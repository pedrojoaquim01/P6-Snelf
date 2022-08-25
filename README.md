# P6-Snelf

## Sobre a ferramenta

O SNELF é uma plataforma para detecção de disparidades de preços em compras públicas. O objetivo é auxiliar na auditoria de notas fiscais relacionadas a compras, e verificar possíveis fraudes. A ferramenta permite a importação de um CSV, nesse caso uma base de dados de medicamentos, para que possa ser treinado um modelo de predição que associe medicamentos iguais porém que possuem nomes diferentes nas notas fiscais, dado que o campo de descrição da nota fiscal é livre.
Assim, quando importamos a base de dados, o modelo já classifica cada registro com um código diferente, que relaciona os mesmos medicamentos porém com nomes distintos. Após isso, podem ser realizadas buscas por nomes de medicamentos, que retornam um conjunto de compras de notas fiscais. Na tela podemos observar dados sobre o conjunto de dados requisitado, como média, moda, mediana, uma tabela com todas as compras retornadas, e um gráfico boxplot com a variável preço no tempo. Também conseguimos excluir algum registro do cálculo se for desejado, dando mais flexibilidade para quem está fazendo a análise.

### Arquitetura e tecnologias
O SNELF foi desenvolvido utilizando arquitetura REST, então subindo o docker conseguimos tornar nossos endpoints públicos para acesso. O frontend foi desenvolvido utilzando ReactJS, framework javascript bem flexível e level.

## Como utilizar?

### 1. Subir o SNELF Container

#### Requerimentos
Instalar o Docker e o Python 3.9

#### Execução
Rodar o script `sobeDocker.sh` como administrador.
O container subirá no endereço 0.0.0.0 com a porta 8000 exposta.

#### Alternativa
Buildar o docker:
`sudo docker build -t snelf-backend-image -f Dockerfile .`

Rodar o container
`sudo docker run -p 8000:8000 --rm --name snelf-container snelf-backend-image`


### 2. Subir o SNELF Front End
Para testar a aplicação, clone o repositório.

No diretório raiz `snelf-frontend`, instale as dependências com o comando `npm install`

Inicie a aplicação com `npm start`

Após isso basta utilizar a aplicação.
