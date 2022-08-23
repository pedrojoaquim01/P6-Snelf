# P6-Snelf

## SNELF Container

### Como rodar?
Instalar o Docker e o Python 3.9

### Principal
Rodar o script `sobeDocker.sh` como administrador.
O container subirá no endereço 0.0.0.0 com a porta 8000 exposta.

### Alternativa
Buildar o docker:
`sudo docker build -t snelf-backend-image -f Dockerfile .`

Rodar o container
`sudo docker run -p 8000:8000 --rm --name snelf-container snelf-backend-image`


## SNELF Front End
Para testar a aplicação, clone o repositório.

No diretório raiz `snelf-frontend`, instale as dependências com o comando `npm install`

Inicie a aplicação com `npm start`
