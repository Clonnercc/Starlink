# Starlink Internet — site de revenda

Projeto pronto para Node.js + Render.

## Publicação
1. Crie um repositório no GitHub.
2. Envie todos os arquivos deste projeto.
3. No Render, crie um Web Service conectado ao repositório.
4. Build: `npm install`
5. Start: `npm start`
6. Configure:
   - `ADMIN_USER` = usuário do painel
   - `ADMIN_PASSWORD` = senha forte do painel
   - `DATABASE_PATH` = `/tmp/starlink.db` (padrão do render.yaml)

## Painel
Acesse `/admin.html`.

O painel permite alterar:
- WhatsApp
- telefone
- cidade/estado
- texto principal
- texto de atendimento

### Persistência
A configuração é salva em SQLite. No Render, o armazenamento local pode ser perdido em redeploy/restart. Para produção, use um banco PostgreSQL do Render e adapte a camada de persistência.

## Observação de marca
O projeto usa a identificação "Starlink Internet" como nome informado pelo proprietário. Se a empresa não for oficialmente autorizada, não use "Revendedor Autorizado". Use somente afirmações que você possa comprovar.
