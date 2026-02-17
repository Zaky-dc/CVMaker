CV Maker - O Teu Construtor de Currículos Profissional
Bem-vindo ao CV Maker! Este é um construtor de currículos moderno e de alta performance, desenvolvido com React, Vite e Tailwind CSS.

O objetivo? Acabar com a frustração de formatar CVs no Word. Aqui tens visualização em tempo real, otimização perfeita para impressão em múltiplas páginas e formatação automática. Foca-te no conteúdo, nós tratamos do design.

##Funcionalidades Principais
- **Templates Dinâmicos: Escolhe entre designs Criativo, Moderno e Clássico com um clique.
- **Layout de Impressão Perfeito: Otimizado para papel A4. As barras laterais são fixas e o suporte a múltiplas páginas é profissional (adeus textos cortados a meio!).
- **Formatação Inteligente: O editor de descrição cria os "bullet points" automaticamente enquanto escreves.
- **Internacionalização: Suporte completo para Português e Inglês.
- **Integração na Nuvem: Uploads de fotos de perfil e assinaturas geridos de forma segura pelo Cloudinary.

##Como Fazer Deploy na Vercel
### Este projeto está prontíssimo para ir para o ar na Vercel. Segue estes passos:
1. **Código no GitHub
Certifica-te de que o teu código já está no teu repositório GitHub (isto já deves ter feito!).

2. **Conectar à Vercel
Acede a Vercel.com e cria um novo projeto ("Add New...").
Seleciona o teu repositório CVMaker.

3. **Configurar Variáveis de Ambiente (Importante!)
Nas definições do projeto na Vercel (secção Environment Variables), precisas de adicionar as chaves secretas. Copia os valores do teu ficheiro .env local:
 - `VITE_CLOUDINARY_CLOUD_NAME
 - `VITE_CLOUDINARY_UPLOAD_PRESET
 - `VITE_FIREBASE_API_KEY
 - `VITE_FIREBASE_AUTH_DOMAIN
 - `VITE_FIREBASE_PROJECT_ID
 - `VITE_FIREBASE_STORAGE_BUCKET
 - `VITE_FIREBASE_MESSAGING_SENDER_ID
 - `VITE_FIREBASE_APP_ID

4. **Deploy
Clica em "Deploy". A Vercel vai construir o site e colocá-lo online em segundos.

5. **Autorizar Domínio (CRÍTICO)
Para o Login da Google funcionar, tens de "avisar" o Firebase que o teu novo site é seguro. Se vires o erro auth/unauthorized-domain, é por causa disto:
Vai à Consola do Firebase.
Seleciona o teu projeto.
No menu lateral, vai a Authentication > Settings > Authorized domains.
Clica em Add domain e cola o URL que a Vercel gerou para ti (ex: cv-maker-do-zaakir.vercel.app).
Clica em Add.
E já está! O login deve funcionar perfeitamente.

Desenvolvimento Local
Queres mexer no código e adicionar novas funcionalidades
```bash
# Install dependencies
npm install
# Run locally
npm run dev
# Build for production
npm run build
```

