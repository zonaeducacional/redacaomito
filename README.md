# O Mito da Caverna: Uma Jornada Interativa

Uma plataforma educacional interativa projetada para explorar a Alegoria da Caverna de Platão, incentivando o pensamento crítico e a produção textual (redação) em ambientes escolares.

## 🚀 Tecnologias Utilizadas

- **Core**: [Next.js 15+](https://nextjs.org/) (React 19)
- **Estilização**: [TailwindCSS 4](https://tailwindcss.com/)
- **Animações**: [Motion](https://motion.dev/) & `tw-animate-css`
- **PWA**: [@ducanh2912/next-pwa](https://github.com/ducanh2912/next-pwa)
- **IA**: [Google Gemini SDK](https://ai.google.dev/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **PDF/Imagens**: `jspdf`, `html2canvas`

## 📖 Objetivo do Projeto

O projeto visa transformar o ensino da filosofia clássica em uma experiência digital imersiva. Através de estágios interativos (Introdução, Bio de Platão, Texto da Caverna, Quiz, Reflexão e Redação), os alunos são conduzidos a compreender as sombras da sociedade contemporânea e a importância de buscar a "luz" do conhecimento.

## 🛠️ Instalação e Execução Local

1.  **Clone o repositório**:
    ```bash
    git clone https://github.com/zonaeducacional/redacaomito.git
    cd o-mito-da-caverna_-uma-jornada
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente**:
    Crie um arquivo `.env.local` e adicione sua chave do Gemini:
    ```env
    GEMINI_API_KEY=sua_chave_aqui
    ```

4.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

## 🌐 Deployment

- **GitHub Repository**: [zonaeducacional/redacaomito](https://github.com/zonaeducacional/redacaomito)
- **Live Demo (Surge)**: [https://redacao-mito.surge.sh](https://redacao-mito.surge.sh)

## 📋 Changelog / Histórico

- **2026-04-19**: 
    - Inicialização do repositório Git.
    - Configuração de `output: 'export'` no Next.js para suporte a static hosting.
    - Correção de rota dinâmica no `manifest.ts` para compatibilidade com exportação estática.
    - Deploy bem-sucedido no Surge.sh.
    - Push inicial para GitHub.

---
Desenvolvido com ❤️ por **Sérgio** - Salinas da Margarida, Bahia.
