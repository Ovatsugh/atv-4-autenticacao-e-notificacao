# 💧 HydroReminder - App de Hidratação

Aplicativo de lembretes de hidratação com autenticação Google (Clerk) e notificações personalizadas.

## 🎯 Funcionalidades Implementadas

### ✅ Requisitos da Atividade

1. **Login com Google usando Clerk** ✓
   - Autenticação OAuth com Google
   - Gerenciamento de sessão automático
   - Redirecionamento baseado no status de autenticação

2. **Notificações Agendadas (a cada 2 horas)** ✓
   - Lembretes das 8h às 22h
   - Notificações diárias recorrentes
   - Mensagens personalizadas por horário

3. **Notificações Recorrentes (repetir a cada hora)** ✓
   - Sistema de repetição automática
   - Configuração de intervalo de 1 hora
   - Pode ser ativado/desativado pelo usuário

4. **Notificações em Segundo Plano** ✓
   - Funcionam mesmo com app fechado
   - Sistema de notificações do expo-notifications
   - Suporte para Android e iOS

5. **Histórico de Notificações** ✓
   - Lista de notificações recebidas
   - Timestamp de cada notificação
   - Opção de limpar histórico

6. **Personalização de Notificações** ✓
   - Ícone personalizado (💧)
   - Som customizável (notification-sound.wav)
   - Títulos e mensagens personalizadas

7. **Campo para Definir Horário do Lembrete** ✓
   - Seletor de hora (0-23)
   - Seletor de minuto (0, 15, 30, 45)
   - Agendamento de notificação diária no horário escolhido

## 📦 Dependências

```json
{
  "@clerk/clerk-expo": "^2.18.1",
  "expo": "~54.0.22",
  "expo-notifications": "latest",
  "expo-device": "latest",
  "expo-web-browser": "~15.0.9",
  "expo-router": "~6.0.14"
}
```

## 🚀 Como Executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar Clerk

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=sua_chave_aqui
```

Para obter a chave:
1. Acesse [clerk.com](https://clerk.com)
2. Crie/acesse seu projeto
3. Vá em "API Keys"
4. Copie a "Publishable Key"
5. Configure OAuth com Google no Clerk Dashboard

### 3. Executar o projeto

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Ou diretamente no Android
npm run android

# Ou diretamente no iOS
npm run ios
```

## 📱 Estrutura do Projeto

```
auth-clerk-app/
├── src/
│   ├── app/
│   │   ├── _layout.tsx          # Layout principal com ClerkProvider
│   │   ├── (auth)/
│   │   │   └── index.tsx        # Tela principal do app (autenticado)
│   │   └── (public)/
│   │       └── index.tsx        # Tela de login
│   ├── components/
│   │   └── Button/
│   │       ├── index.tsx
│   │       └── styles.ts
│   └── services/
│       └── notificationService.ts  # Serviço de notificações
├── assets/
│   ├── images/                  # Ícones do app
│   └── notification-sound.wav   # Som personalizado (adicionar)
├── app.json                     # Configuração do Expo
└── package.json
```

## 🔔 Funcionalidades de Notificação

### Testar Notificação
Envia uma notificação imediata (2 segundos) para testar o sistema.

### Lembretes a cada 1h
Agenda notificações recorrentes que se repetem a cada hora.

### Lembretes a cada 2h (Recomendado)
Agenda notificações diárias das 8h às 22h, a cada 2 horas:
- 8:00, 10:00, 12:00, 14:00, 16:00, 18:00, 20:00, 22:00

### Horário Personalizado
Permite escolher um horário específico para receber lembretes diários.

### Cancelar Todos
Remove todas as notificações agendadas.

## 📝 Observações Importantes

### Permissões
O app solicita automaticamente permissão para notificações no primeiro uso.

### Dispositivo Físico
Para testar notificações push, é necessário usar um dispositivo físico (não funciona em emuladores).

### Som Personalizado
Para adicionar um som personalizado:
1. Adicione o arquivo `notification-sound.wav` na pasta `assets/`
2. O sistema usará automaticamente esse som nas notificações

### Android
- As notificações são configuradas com prioridade máxima
- Canal de notificação "default" é criado automaticamente
- Vibração e LED configurados

### iOS
- Solicita permissão completa (alerta, som, badge)
- Notificações aparecem mesmo com app em primeiro plano

## 🎨 Design

- **Cores**: Tema azul (água/hidratação)
- **Ícones**: Emojis para melhor UX
- **Layout**: Clean e intuitivo
- **Responsivo**: Adaptado para iOS e Android

## 🔧 Configuração Adicional do Clerk

### Configurar OAuth Google

1. Acesse o [Clerk Dashboard](https://dashboard.clerk.com)
2. Selecione seu projeto
3. Vá em "User & Authentication" > "Social Connections"
4. Ative "Google"
5. Configure:
   - Crie credenciais OAuth no [Google Cloud Console](https://console.cloud.google.com)
   - Adicione o Client ID e Client Secret no Clerk
6. Configure URLs de redirecionamento:
   - Para desenvolvimento: `exp://localhost:8081`
   - Para produção: configure seu scheme personalizado

## 🐛 Solução de Problemas

### Notificações não aparecem
- Verifique se concedeu permissão para notificações
- Teste em dispositivo físico
- Confira se o canal de notificação foi criado (Android)

### Login com Google não funciona
- Verifique se a chave do Clerk está configurada corretamente
- Confirme se o OAuth Google está ativo no Clerk Dashboard
- Verifique as URLs de redirecionamento

### App não compila
- Execute `npm install` novamente
- Limpe o cache: `npx expo start -c`
- Verifique a versão do Node.js (mínimo 20.19.4 recomendado)

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

## 👨‍💻 Autor

Desenvolvido como atividade acadêmica - Mobile Development
