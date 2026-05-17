# Relatório da Disciplina de Extensão

> Relatório final da atividade extensionista desenvolvida no âmbito da disciplina de Desenvolvimento de Sistema para Redes de Computadores, conforme exigências da curricularização da extensão (Resolução CNE/CES nº 7/2018).

---

## 1. Dados da Atividade

| Campo | Descrição |
|-------|-----------|
| **Instituição** | Pontifícia Universidade Católica de Minas Gerais (PUC Minas) |
| **Curso** | Curso Superior de Tecnologia em Redes de Computadores |
| **Disciplina** | Desenvolvimento de Sistema para Redes de Computadores |
| **Eixo** | 3 |
| **Semestre/Ano** | *01/2026*  |
| **Professor(a) orientador(a)** | *Harison Herman Silva* |
| **Carga horária de extensão** | * 320 horas* |

---

## 2. Equipe Executora

| Nome Completo | Matrícula | E-mail Institucional |
|---------------|-----------|----------------------|
| *Leonardo Silva Amaral* | *884122* | *209958@sga.pucminas.br* |
| *Luis Augusto da Silva* | *888923* | *1593374@sga.pucminas.br* |
| *Luis Felipe Guimarães Toledo da Silva* | *884414* | *1589063@sga.pucminas.br* |
| *Talita Rosalina Ribeiro* | *890496* | *1369795@sga.pucminas.br* |
| *Thiago Hideki do Prado Suzuki* | *889683* | *1594093@sga.pucminas.br* |

---

## 3. Comunidade Parceira

| Campo | Descrição |
|-------|-----------|
| **Nome** | *Alpha Hard Informática* |
| **Tipo** | *Empresa* |
| **Endereço** | *Rua Pedro Maria Neto, 178 – Aterrado – Volta Redonda/RJ* |
| **Responsável** | *Marcus Paulo Araújo – Proprietário / Técnico* |
| **Contato** | *contato@alphahard.com / (24) 98111-1523* |
| **Público atendido** | *A solução desenvolvida atende diretamente os colaboradores da Alpha Hard Informática, proporcionando melhorias operacionais e administrativas no fluxo de trabalho da empresa. De forma indireta, beneficia usuários domésticos, microempreendedores e pequenas empresas da região de Volta Redonda/RJ, impactando aproximadamente 40 a 60 clientes atendidos mensalmente por meio de maior organização, agilidade e qualidade nos serviços prestados.* |

---

## 4. Resumo da Atividade

*O projeto extensionista foi desenvolvido em parceria com a empresa Alpha Hard Informática, sediada em Volta Redonda/RJ, com o propósito de atender às demandas relacionadas à ausência de um sistema estruturado de gerenciamento e de uma infraestrutura tecnológica adequada para suporte às operações da organização.

Antes da implementação da solução, os processos internos eram executados de forma manual, utilizando planilhas eletrônicas, anotações informais e aplicativos de mensagens, o que ocasionava inconsistências no controle das Ordens de Serviço (OS), dificuldades na organização das informações, baixa rastreabilidade dos atendimentos e limitações nos processos administrativos e financeiros.

Como resposta às necessidades identificadas, foi desenvolvido e implantado um sistema web integrado de gestão empresarial, contemplando funcionalidades para controle de Ordens de Serviço, cadastro e gerenciamento de clientes, emissão de relatórios financeiros e acompanhamento operacional por meio de dashboard administrativo. Complementarmente, foi estruturada uma infraestrutura local baseada em Docker, banco de dados MariaDB e aplicação desenvolvida em Python (Flask), HTML, CSS e JavaScript.

As atividades executadas compreenderam levantamento e análise de requisitos junto à comunidade parceira, modelagem da solução, prototipação, desenvolvimento das camadas back-end e front-end, realização de testes funcionais, capacitação dos usuários e elaboração da documentação técnica do sistema.

Os resultados obtidos proporcionaram melhorias significativas na organização operacional da empresa, redução no tempo de atendimento, aumento da segurança e confiabilidade das informações, além do aprimoramento do controle administrativo e financeiro. O projeto também contribuiu de forma relevante para a formação acadêmica e profissional dos alunos envolvidos, promovendo a aplicação prática dos conhecimentos adquiridos ao longo do curso e fortalecendo competências técnicas, sociais e colaborativas.*

---

## 5. Objetivos

### 5.1 Objetivo Geral

*Desenvolver e implementar uma solução tecnológica integrada para a Alpha Hard Informática, visando otimizar os processos operacionais, administrativos e de gerenciamento de serviços da empresa, por meio da informatização das rotinas internas e da estruturação de uma infraestrutura computacional segura, estável e escalável.*

### 5.2 Objetivos Específicos

1. *Realizar o levantamento e análise das necessidades operacionais da empresa parceira, identificando os principais desafios relacionados à gestão de serviços e informações.*
2. *Digitalizar e padronizar os processos internos da organização, reduzindo a dependência de controles manuais e descentralizados.
Desenvolver um sistema web para gerenciamento de clientes, Ordens de Serviço, controle financeiro e acompanhamento operacional.*
3. *Estruturar uma infraestrutura tecnológica baseada em containers Docker e banco de dados relacional MariaDB, garantindo maior confiabilidade, segurança e facilidade de manutenção.*
4. *Implementar mecanismos de organização, rastreabilidade e armazenamento seguro das informações da empresa.*
5. *Capacitar os usuários da comunidade parceira para utilização da solução desenvolvida, promovendo autonomia operacional e melhor aproveitamento dos recursos tecnológicos disponibilizados.*
6. *Aplicar, de forma prática, os conhecimentos adquiridos ao longo da disciplina, fortalecendo competências técnicas e profissionais dos integrantes do projeto.*

---

## 6. Fundamentação Teórica

O desenvolvimento do projeto fundamentou-se em conceitos relacionados à engenharia de software, desenvolvimento de aplicações web, infraestrutura computacional e gerenciamento de redes, contemplando práticas voltadas à construção de soluções tecnológicas voltadas para ambientes corporativos de pequeno porte.

A arquitetura da solução foi baseada no modelo cliente-servidor, amplamente utilizado em aplicações web devido à sua eficiência na separação entre interface de usuário, lógica de negócio e persistência de dados. Para o desenvolvimento do sistema, foi utilizado o framework Flask, escrito em Python, escolhido por sua flexibilidade, leveza e facilidade de integração com diferentes serviços e bibliotecas.

No contexto da infraestrutura, adotou-se a virtualização por containers utilizando Docker, tecnologia que possibilita maior padronização do ambiente de execução, isolamento dos serviços, portabilidade e simplificação do processo de implantação. Essa abordagem contribui diretamente para a estabilidade da aplicação e para a facilidade de manutenção do sistema.

O armazenamento e gerenciamento das informações foram realizados por meio do banco de dados relacional MariaDB, solução amplamente utilizada em ambientes corporativos devido à sua confiabilidade, desempenho e suporte à integridade dos dados.

Também foram aplicados conceitos relacionados à segurança da informação, autenticação de usuários, persistência de dados, controle de acesso e organização de processos empresariais informatizados, buscando assegurar maior confiabilidade operacional e proteção das informações manipuladas pela empresa.

Os conhecimentos desenvolvidos ao longo da disciplina contribuíram significativamente para a compreensão dos processos de integração entre sistemas, administração de serviços em rede, disponibilidade computacional e boas práticas de desenvolvimento e implantação de soluções tecnológicas voltadas às demandas reais da comunidade parceira.

---

## 7. Metodologia

O projeto foi desenvolvido por meio de uma abordagem incremental, colaborativa e orientada à resolução de problemas reais identificados na comunidade parceira.

Inicialmente, foram realizadas reuniões técnicas com os responsáveis pela Alpha Hard Informática com o objetivo de compreender o funcionamento dos processos internos da empresa, identificar as principais dificuldades operacionais e levantar os requisitos funcionais e não funcionais da solução proposta.

Com base nas informações coletadas, foi realizada a etapa de análise e modelagem da solução, contemplando a elaboração de protótipos, definição da arquitetura do sistema, organização do banco de dados e planejamento das funcionalidades prioritárias.

Na etapa de desenvolvimento, a aplicação foi construída utilizando Python com o framework Flask no back-end, HTML, CSS e JavaScript no front-end, além da utilização do MariaDB como sistema gerenciador de banco de dados. A infraestrutura da aplicação foi estruturada utilizando Docker, permitindo maior padronização do ambiente e simplificação do processo de implantação.

Durante todo o desenvolvimento, foram executados testes contínuos para validação das funcionalidades implementadas, identificação de inconsistências e realização de ajustes corretivos e evolutivos.

Ao final do projeto, foram realizadas atividades de treinamento e orientação junto à comunidade parceira, permitindo a correta utilização da plataforma e promovendo maior autonomia operacional aos usuários responsáveis pela gestão do sistema.

Além das atividades técnicas, também foram produzidas documentações funcionais e técnicas da solução desenvolvida, registrando a estrutura da aplicação, funcionalidades implementadas e procedimentos operacionais necessários para manutenção e utilização do sistema.

---

## 8. Cronograma Executado

| Atividade | Período Planejado | Período Executado | Observações |
|-----------|-------------------|-------------------|-------------|
| Contato inicial com a comunidade | *10/02/2026* | *10/02/2026* | *Realização da reunião inicial para apresentação do projeto* |
| Levantamento de requisitos | *10/02/2026 – 24/02/2026* | *10/02/2026 – 24/02/2026* | *Identificação das necessidades operacionais da empresa* |
| Especificação e prototipação | *24/02/2026 – 09/03/2026* | *24/02/2026 – 09/03/2026* | *Validação dos protótipos e definição da arquitetura* |
| Desenvolvimento do back-end | *10/03/2026 – 12/04/2026* | *10/03/2026 – 12/04/2026* | *Implementação das APIs e regras de negócio* |
| Desenvolvimento do front-end | *13/04/2026 – 17/05/2026* | *13/04/2026 – 17/05/2026* | *Construção das interfaces do sistema* |
| Testes e ajustes | *10/03/2026 – 21/06/2026* | *Em andamento* | *Correções e melhorias contínuas* |
| Documentação | *10/02/2026 – 21/06/2026* | *Em andamento* | *Elaboração dos relatórios e documentação funcional* |
| Apresentação | *08/06/2026 – 21/06/2026* | *Em andamento* | *Demonstração oficial da solução desenvolvida* |

---

## 9. Resultados Alcançados

O projeto extensionista proporcionou melhorias significativas para a Alpha Hard Informática, especialmente nos processos de organização operacional, gerenciamento de serviços e controle administrativo e financeiro.

A implementação da solução permitiu maior centralização das informações, redução de falhas operacionais decorrentes de controles manuais e aprimoramento do fluxo de atendimento aos clientes da empresa.

### 9.1 Resultados Técnicos

*
- Desenvolvimento de um sistema web integrado para gerenciamento de Ordens de Serviço e cadastro de clientes.
- Implementação de dashboard administrativo para acompanhamento operacional e financeiro.
- Estruturação de banco de dados relacional utilizando MariaDB, garantindo maior integridade e organização das informações.
- Implantação da solução em ambiente conteinerizado utilizando Docker.
- Melhoria da infraestrutura computacional e da organização dos serviços internos da empresa.
- Aumento da segurança e confiabilidade no armazenamento dos dados operacionais.
*

### 9.2 Resultados para a Comunidade

*
- Redução do tempo necessário para localização e gerenciamento das informações dos clientes.
- Maior controle e rastreabilidade das Ordens de Serviço executadas pela empresa.
- Otimização parcial dos processos administrativos e financeiros.
- Melhoria na organização operacional e no fluxo de atendimento aos clientes.
- Capacitação tecnológica dos responsáveis pela utilização do sistema.
- Maior eficiência no gerenciamento dos serviços prestados pela empresa parceira.
*

### 9.3 Resultados para a Formação dos Alunos

*
- Aplicação prática dos conhecimentos adquiridos ao longo da disciplina.
- Desenvolvimento de competências técnicas em desenvolvimento web, banco de dados e infraestrutura computacional.
- Experiência prática em levantamento de requisitos e relacionamento com a comunidade parceira.
- Aprimoramento das habilidades de trabalho em equipe, comunicação e gestão de projetos.
- Desenvolvimento de visão crítica sobre o impacto social das soluções tecnológicas.
*

---

## 10. Dificuldades Encontradas

Durante a execução do projeto, foram identificados desafios relacionados principalmente ao levantamento inicial dos requisitos e à adaptação da solução às necessidades específicas da empresa parceira.

A ausência de processos formalmente documentados dificultou a identificação inicial do fluxo operacional da organização, exigindo reuniões periódicas para refinamento das funcionalidades e validação das etapas de desenvolvimento.

Também foram encontrados desafios técnicos relacionados à integração entre front-end, back-end e banco de dados, bem como à definição de uma infraestrutura adequada para implantação local da aplicação de forma segura, estável e de fácil manutenção.

As dificuldades identificadas foram mitigadas por meio da divisão estratégica das atividades entre os integrantes da equipe, realização de testes contínuos, reuniões de alinhamento técnico e acompanhamento constante junto à comunidade parceira.

---

## 11. Conclusão

O projeto extensionista atingiu os objetivos propostos ao desenvolver e implementar uma solução tecnológica funcional e alinhada às necessidades operacionais da Alpha Hard Informática.

A implantação do sistema proporcionou melhorias significativas nos processos de organização, gerenciamento de Ordens de Serviço, controle financeiro e administração interna da empresa, contribuindo diretamente para o aumento da eficiência operacional e da qualidade dos serviços prestados aos clientes.

Além dos benefícios gerados para a comunidade parceira, o projeto proporcionou aos integrantes da equipe uma experiência prática relevante, permitindo a aplicação dos conhecimentos adquiridos ao longo da formação acadêmica em um contexto real de desenvolvimento tecnológico e atendimento à comunidade.

A atividade extensionista reforçou a importância da integração entre universidade e sociedade, evidenciando o potencial das soluções computacionais como ferramentas de transformação organizacional, inovação e impacto social.

---

## 12. Registro de Interações com a Comunidade


| Data | Tipo de Interação | Participantes | Descrição | Evidência |
|------|-------------------|---------------|-----------|-----------|
| *10/02/2026* | *Reunião inicial* | *Equipe do projeto e Marcus Paulo Araújo* | *Apresentação do projeto e levantamento preliminar das necessidades da empresa* | *(Referência a foto/ata em evidencias/)* |
| *24/02/2026* | *Reunião técnica* | *Equipe do projeto e representante da empresa* | *Validação dos requisitos funcionais e definição do escopo da solução* | ** |
| *23/03/2026* | *Capacitação*| *Equipe do projeto e colaboradores da empresa* | *Treinamento para utilização das funcionalidades do sistema* | ** |
| *08/06/2026* | *Apresentação final*| *Equipe do projeto e comunidade parceira* | *Demonstração da solução implementada e validação final do projeto* | ** |

---

## 13. Referências

*
- Docker Inc. Docker Documentation. Disponível em: https://www.docker.com/
- Flask Documentation. Disponível em: https://flask.palletsprojects.com/
- MariaDB Foundation. MariaDB Documentation. Disponível em: https://mariadb.org/
- PRESSMAN, Roger S. Engenharia de Software: uma abordagem profissional.
- TANENBAUM, Andrew S.; WETHERALL, David. Redes de Computadores.
*

---

## 14. Anexos

*(Liste os documentos anexos ao relatório, referenciando os arquivos nas pastas do repositório.)*

| Anexo | Descrição | Localização no Repositório |
|-------|-----------|----------------------------|
| Termo de parceria | Termo assinado com a comunidade | `evidencias/termos/` |
| Atas de reunião | Atas das reuniões com a comunidade | `evidencias/atas/` |
| Registro fotográfico | Fotos das visitas e atividades | `evidencias/fotos/` |
| Depoimentos | Depoimentos dos membros da comunidade | `evidencias/depoimentos/` |

---

> **Nota:** Este relatório é um documento oficial da atividade extensionista e poderá ser utilizado para comprovação junto ao MEC. Preencha com atenção e inclua todas as evidências solicitadas.
