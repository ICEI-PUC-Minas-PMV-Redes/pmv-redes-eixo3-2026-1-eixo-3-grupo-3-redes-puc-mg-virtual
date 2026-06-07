# 📗 Manual do Usuário – Sistema Alpha Hard Informática

**Bem-vindo ao sistema de gerenciamento da Alpha Hard Informática!**  
Este guia foi feito para te ajudar a usar o sistema de forma simples e rápida. Não é preciso ter conhecimento técnico.

---

## Sumário

1. [O que é este sistema?](#o-que-é-este-sistema)
2. [Como acessar o sistema](#como-acessar-o-sistema)
3. [Tela inicial – Dashboard](#tela-inicial--dashboard)
4. [Cadastrar um novo cliente](#cadastrar-um-novo-cliente)
5. [Buscar um cliente](#buscar-um-cliente)
6. [Criar uma Ordem de Serviço](#criar-uma-ordem-de-serviço)
7. [Acompanhar ordens de serviço](#acompanhar-ordens-de-serviço)
8. [Ver relatórios e invoices](#ver-relatórios-e-invoices)
9. [Dúvidas frequentes](#dúvidas-frequentes)
10. [Contato e suporte](#contato-e-suporte)

---

## 1. O que é este sistema?

O sistema foi criado para facilitar o trabalho da **Alpha Hard Informática** no dia a dia. Com ele, você pode:

- ✅ **Cadastrar clientes** de forma organizada
- ✅ **Criar ordens de serviço** para cada atendimento
- ✅ **Acompanhar o status** dos serviços em andamento
- ✅ **Gerar relatórios financeiros** e invoices mensais
- ✅ **Consultar o histórico** de atendimentos de qualquer cliente

Chega de planilha Excel! Tudo agora fica salvo em um banco de dados seguro.

---

## 2. Como acessar o sistema

1. Abra o navegador de internet (Chrome, Firefox, Edge, etc.)
2. Na barra de endereços, digite o endereço do sistema:
   ```
   http://localhost:3000
   ```
   > Se o sistema estiver instalado em um servidor na rede local, o endereço será informado pelo responsável técnico.
3. A tela inicial (dashboard) será exibida automaticamente.

> 💡 **Dica:** Salve o endereço nos favoritos do navegador para acessar mais rápido!

---

## 3. Tela inicial – Dashboard

Ao entrar no sistema, você verá o **Dashboard**, que é um painel com um resumo de tudo que está acontecendo:

- 📊 **Total de clientes cadastrados**
- 🔧 **Ordens de serviço abertas** (aguardando atendimento)
- ✅ **Ordens finalizadas no mês**
- 💰 **Faturamento do mês**

Use o menu lateral ou superior para navegar entre as seções do sistema.

---

## 4. Cadastrar um novo cliente

Quando um cliente novo chegar à loja:

1. Clique em **"Clientes"** no menu
2. Clique no botão **"Novo Cliente"** ou **"Cadastrar"**
3. Preencha os dados:
   - **Nome completo** *(obrigatório)*
   - **Telefone** *(obrigatório)*
   - **E-mail** *(opcional)*
   - **Endereço** *(opcional)*
4. Clique em **"Salvar"**

O cliente já estará disponível no sistema para criar ordens de serviço.

> 📝 **Importante:** Preencha pelo menos o nome e o telefone para facilitar o contato futuro.

---

## 5. Buscar um cliente

Para encontrar um cliente já cadastrado:

1. Clique em **"Clientes"** no menu
2. Use a **barra de busca** e digite o nome ou o telefone do cliente
3. Clique no cliente encontrado para ver seus dados e histórico de atendimentos

---

## 6. Criar uma Ordem de Serviço

Quando um cliente trouxer um equipamento para conserto ou serviço:

1. Clique em **"Ordens de Serviço"** no menu
2. Clique em **"Nova Ordem"**
3. Preencha as informações:
   - **Cliente** – busque pelo nome do cliente cadastrado
   - **Equipamento** – descreva o equipamento (ex.: "Notebook Dell Inspiron")
   - **Problema relatado** – descreva o que o cliente disse (ex.: "não liga")
   - **Técnico responsável** – selecione o técnico que vai atender
   - **Data de entrada** – preenchida automaticamente com a data de hoje
4. Clique em **"Salvar Ordem"**

A ordem será criada com o status **"Em aberto"** e aparecerá no dashboard.

---

## 7. Acompanhar ordens de serviço

Para ver todas as ordens e atualizar o status:

1. Clique em **"Ordens de Serviço"** no menu
2. Você verá a lista de todas as ordens, com os seguintes status:
   - 🟡 **Em aberto** – aguardando diagnóstico ou peça
   - 🔵 **Em andamento** – sendo trabalhado pelo técnico
   - 🟢 **Concluído** – serviço finalizado, pronto para entrega
   - ❌ **Cancelado** – ordem cancelada

3. Clique em uma ordem para **editar**, **atualizar o status** ou **registrar o valor do serviço**
4. Ao finalizar um serviço, mude o status para **"Concluído"** e informe o valor cobrado

---

## 8. Ver relatórios e invoices

Para ver o resumo financeiro do mês ou emitir uma invoice:

1. Clique em **"Relatórios"** no menu
2. Escolha o período desejado (mês e ano)
3. Clique em **"Gerar Relatório"**

Você verá:
- Total de serviços realizados
- Valor total faturado
- Lista detalhada de cada atendimento

Para **gerar uma invoice** (para um cliente específico):
1. Acesse o cliente em **"Clientes"**
2. Clique em **"Gerar Invoice"**
3. Selecione o período e clique em **"Gerar"**
4. O documento estará disponível para impressão ou download

---

## 9. Dúvidas frequentes

**❓ Esqueci de colocar uma informação no cadastro. Posso editar?**  
Sim! Basta buscar o cliente ou a ordem de serviço, clicar nele e depois em **"Editar"**.

---

**❓ Apaguei uma ordem de serviço por engano. O que faço?**  
Entre em contato com o responsável técnico para recuperar o registro pelo banco de dados.

---

**❓ O sistema não abre no navegador. O que pode ser?**  
Verifique se o computador onde o sistema está instalado está ligado e conectado à rede. Se o problema persistir, fale com o responsável técnico.

---

**❓ Como faço para imprimir uma ordem de serviço?**  
Abra a ordem desejada e clique em **"Imprimir"** ou use o atalho `Ctrl + P` do navegador.

---

**❓ Os dados ficam salvos mesmo se eu fechar o navegador?**  
Sim! Todos os dados são salvos automaticamente no banco de dados do sistema.

---

## 10. Contato e suporte

Em caso de dúvidas ou problemas técnicos, entre em contato com a equipe responsável pela implantação do sistema:

| Campo | Informação |
|---|---|
| **Projeto** | PUC Minas – Eixo 3, Grupo 03 |
| **Parceiro** | Alpha Hard Informática |
| **Endereço** | Rua Pedro Maria Neto, 178 – Aterrado, Volta Redonda/RJ |
| **Contato na loja** | Marcus Paulo Araújo |
| **E-mail** | contato@alphahard.com |
| **Telefone** | (24) 98111-1523 |

---

> 📌 **Lembrete:** Este sistema foi desenvolvido especialmente para a Alpha Hard Informática pelo Grupo 03 do curso de Tecnologia em Redes de Computadores da PUC Minas, como projeto extensionista do Eixo 3 – 2026/1.
