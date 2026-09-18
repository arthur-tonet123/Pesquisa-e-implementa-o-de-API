# Busca de Endereço por CEP

Atividade avaliativa — Desenvolvimento de Sistemas. Página que consome uma API pública e mostra o resultado na tela.

**Estudante:** _(seu nome aqui)_
**Turma:** _(sua turma aqui)_

## 1. Qual API foi usada

ViaCEP — documentação em https://viacep.com.br/

## 2. O que ela devolve

Um objeto JSON único (não é uma lista) com os campos do endereço correspondente ao CEP: `cep`, `logradouro` (rua), `bairro`, `localidade` (cidade), `uf`, `ddd`, entre outros. Quando o CEP não existe, devolve `{"erro": true}` em vez dos campos de endereço.

## 3. O endereço que foi chamado

Exemplo de consulta que funciona:
`https://viacep.com.br/ws/01310100/json/`

## 4. Como rodar

Abra o arquivo `index.html` diretamente no navegador (duplo clique). Não precisa de servidor, não precisa de instalação e não precisa de chave de acesso.

## 5. Print da tela funcionando

_(cole aqui a imagem do print, por exemplo: `![print da busca funcionando](print.png)`)_

## 6. Uma dificuldade que houve

_(troque este texto por um problema real que você teve ao rodar o projeto e como resolveu — por exemplo, um CEP que devolvia `{"erro": true}` e a página tentava ler `logradouro` de um objeto que não tinha esse campo, até adicionar a verificação `if (data.erro)`)_
