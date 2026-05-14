# Especificação da Solução

## 1. Parceiro / Comunidade

### 1.1 Identificação

| Campo | Descrição |
|-------|-----------|
| **Nome da comunidade/organização** | Alpha Hard Informática |
| **Tipo de organização** | Empresa |
| **CNPJ (se aplicável)** | 35.986.726/0001-20 |
| **Endereço completo** | Rua Pedro Maria Neto, 178 |
| **Bairro / Cidade / UF** | Aterrado - Volta Redonda - RJ |
| **Responsável pelo contato** | Marcus Paulo Araújo - Proprietário - Técnico |
| **E-mail** | contato@alphahard.com |
| **Telefone** | (24) 98111-1523 |
| **Data do primeiro contato** | 10/02/2026 |

### 1.2 Contexto da Comunidade

(Descreva a comunidade parceira: qual é a sua missão/atuação, público atendido, quantidade de pessoas impactadas, infraestrutura atual de tecnologia e redes, principais desafios enfrentados na área de TI/redes.)

Prover soluções ágeis e especializadas em infraestrutura de hardware e conectividade, trabalhando com manutenção preventiva e corretiva de hardware (notebooks, desktops e impressoras), e fazendo implementação e gestão de redes cabeadas e Wi-Fi.

Atende o público geral que procura por soluções de informática, de usuários domésticos a micro e pequenas empresas da região que dependem de uma rede e equipamentos funcionando.

Diretamente estima-se um atendimento médio de 40-60 clientes por mês, indiretamente, ao manter diversas redes corporativas funcionando, o impacto pode chegar em centenas de pessoas.

Atualmente, a infraestrutura é básica e descentralizada, não se faz uso de um software de gestão, partindo então para meios manuais (planilhas, blocos de notas ou mensagens de WhatsApp) para controle de clientes e registros financeiros, tem uma rede interna básica, apenas para testes, sem um servidor de arquivos ou sistema de chamados estruturado.

A falta de infraestrutura própria na unidade, não tendo um sistema de Ordem de Serviço (OS), e uma ferramente de gestão para analisar redes.

### 1.3 Termo de Parceria

*(Indique se o termo de parceria foi assinado e onde está arquivado. O documento escaneado/fotografado deve ser incluído na pasta `evidencias/termos/`.)*

- [ ] Termo de parceria assinado e arquivado em `evidencias/termos/`

---

## 2. Problema Identificado

*(Descreva detalhadamente o problema ou necessidade identificada na comunidade que está relacionada a redes de computadores. Seja específico: qual a situação atual? Quais as consequências do problema? Quem é afetado?)*

Atualmente, a Alpha Hard opera em um modelo de fluxo de trabalho manual, não tendo uma infraestrutura de rede inteligente ou um sistema de gestão centralizado.

A falta de um software e de uma rede estruturada acaba resultando em alguns problemas como: Inconsistência na ordem de serviço (OS), gestão corretiva de redes (Não consegue prever o problema), dificuldade de escalabilidade e vulnerabilidade de dados.

A própria empresa, clientes B2B e B2C.

---

## 3. Solução Proposta

### 3.1 Descrição Geral

*(Descreva a solução que o grupo propõe para resolver o problema identificado. Explique como ela atende às necessidades da comunidade.)*

A solução que o grupo propõe é, o desenvolvimento e a implantação de um software de gerenciamento empresarial, acompanhado de um dashboard para visualização e acompanhamento dos registros, além de um banco de dados para o pleno armazenamento das informações da empresa, dos serviços e dos clientes, de forma segura.

O sistema visa desde a parte técnica e operacional da empresa, permitindo a criação e o controle de Ordens de Serviço (OS), facilitando a organização dos atendimentos, até a área administrativa, como a geração de invoices mensais e relatórios financeiros, auxiliando no controle financeiro e administrativo do negócio.

### 3.2 Objetivos

**Objetivo geral:**

*(Descreva o objetivo geral do projeto.)*

Implantação de um sistema de gerenciamento estruturado, capaz de entregar soluções na área técnica e administrativa da empresa, desenvolvendo uma infraestrutura tecnólogica onde a loja, a partir do sistema, seja capaz de fazer a gestão de ordens de serviço, gestão de clientes, gestão financeira e fiscal, e o monitoramente e gestão de redes.

**Objetivos específicos:**

1. Digitalização e Sistematização operacional.
2. Gestão de Clientes e Inteligência de Negócio.
3. Gestão Financeira e de Recursos.

### 3.3 Escopo da Solução

*(Defina claramente o que faz parte do escopo do projeto e o que está fora do escopo.)*

**Dentro do escopo:**
- Sistema de Gestão de Ordens de Serviço (O.S.)
- Gestão Financeira e Fiscal Integrada

**Fora do escopo:**
- E-commerce ou Venda Online

### 3.4 Tipo de Solução

*(Marque as opções que se aplicam ao seu projeto:)*

- [ ] Shell scripts para automação de tarefas de rede
- [x] Back-end com API (.NET / outra tecnologia)
- [x] Front-end web (HTML + CSS + JS)
- [ ] Aplicação móvel
- [x] Configuração de infraestrutura de rede
- [ ] Outro: *(especificar)*

### 3.5 Justificativa Técnica

*(Justifique as escolhas tecnológicas feitas. Por que essas tecnologias são adequadas para a realidade da comunidade? Considere o nível técnico dos usuários, a infraestrutura disponível, a manutenibilidade da solução, etc.)*

Essa stack é estratégica, pois equilibra alto poder de processamento, fazendo uso de Python, além da simplicidade de uso de um sistema que rodará localmente em computadores, tendo a familiariade e independência do JavaScript, HTML e CSS como interface web, rodando em qualquer computador da loja. O uso de Docker é o que garante a estabilidade técnica da loja, garantindo o isolamento, segurança e portabilidade do sistema.

Por ser uma loja de informática, os proprietários possuem a base técnica para gerir o sistema sem muitas complicações, tendo capacidade até mesmo para fazer uma expansão dele, se necessário.

---

## 4. Requisitos

### 4.1 Requisitos Funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF01 | *Gestão de Ordens de Serviço (O.S.)* | Alta |
| RF02 | *Controle de Status de Serviço* | Média |
| RF03 | *Fluxo de Caixa Básico* | Baixa |

### 4.2 Requisitos Não Funcionais

| ID | Descrição | Categoria |
|----|-----------|-----------|
| RNF01 | *Operação Local (Offline)* | *Disponibilidade* |
| RNF02 | *Autenticação* | *Segurança* |

---

## 5. Arquitetura da Solução

*(Descreva a arquitetura geral da solução. Pode incluir diagrama de rede, diagrama de componentes, ou descrição textual da topologia. Inclua imagens na pasta `docs/prototipos/` e referencie-as aqui.)*

---

## 6. Cronograma do Projeto

| Atividade | Responsável | Início | Fim | Status |
|-----------|-------------|--------|-----|--------|
| Levantamento de requisitos | *(Nome)* | *(Data)* | *(Data)* | *(Pendente/Em andamento/Concluído)* |
| Prototipação | *(Nome)* | *(Data)* | *(Data)* | *(Status)* |
| Desenvolvimento do servidor | *(Nome)* | *(Data)* | *(Data)* | *(Status)* |
| Desenvolvimento do cliente | *(Nome)* | *(Data)* | *(Data)* | *(Status)* |
| Testes | *(Nome)* | *(Data)* | *(Data)* | *(Status)* |
| Documentação | *(Nome)* | *(Data)* | *(Data)* | *(Status)* |
| Apresentação | *(Nome)* | *(Data)* | *(Data)* | *(Status)* |

---

## 7. Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| *(Descrição do risco)* | Alta / Média / Baixa | Alto / Médio / Baixo | *(Ação de mitigação)* |
| *(Descrição do risco)* | *(Prob.)* | *(Imp.)* | *(Mitigação)* |
