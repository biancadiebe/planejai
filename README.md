
# Planej.ai
Educador Financeiro utilizando React, TypeScript e IA Generativa, desenvolvido em conjunto como projeto final do Bootcamp Santander AI Front-End da DIO. 

## O que faz

- Permite preencher dados financeiros pessoais e objetivo um objetivo de meta financeira
- Calcula quanto deve ser economizado por mês para atingir a meta no prazo definido
- Gera um resumo de simulação e um insight financeiro usando a API do Gemini
- Salva simulações em localStorage
- Exibe um histórico de simulações com acesso rápido aos resultados anteriores
- Inclui um chat para conversar com a IA atuando como um educador financeiro

## Fluxo do usuário

1. O usuário acessa a página inicial e preenche os campos de renda, despesas, dívidas, meta, valor da meta e prazo.
2. Ao enviar o formulário, a simulação é salva no localStorage.
3. O usuário é redirecionado para a página de resultados da simulação.
4. A página de resultados mostra cards com custos, prazo, economia mensal necessária e resumo financeiro.
5. A aplicação busca um insight financeiro via API Gemini e exibe no card de insight.
6. O usuário pode abrir o chat para conversar sobre a simulação e ver o histórico das mensagens.
7. O histórico de simulações fica disponível em '/historico'.

## Rodando o projeto

1. Instale as dependências:
```bash
npm install
```

2. Crie um arquivo `.env` na raiz com sua chave Gemini:

```env
VITE_GEMINI_API_KEY=YOUR_API_KEY
```

3. Rode o projeto em desenvolvimento:

```bash
npm run dev
```

4. Gere o build de produção:

```bash
npm run build
```

5. Visualize o build:

```bash
npm run preview
```

## Tecnologias usadas

- React 19
- TypeScript 6
- Vite
- Tailwind CSS
- React Router v7
- Gemini API 
- LocalStorage
- Lucide icons
