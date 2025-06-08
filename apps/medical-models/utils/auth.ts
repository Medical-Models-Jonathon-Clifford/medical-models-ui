import NextAuth from 'next-auth';
import 'next-auth/jwt';
import crypto from 'crypto';

import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { createStorage } from 'unstorage';
import memoryDriver from 'unstorage/drivers/memory';
import { UnstorageAdapter } from '@auth/unstorage-adapter';

// const AUTHORIZATION_SERVER_URL = "http://127.0.0.1:8081";
const AUTHORIZATION_SERVER_URL = 'https://api.medicalmodels.net';

function hashString(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

const storage = createStorage({
  driver: memoryDriver(),
});

async function requestLogger(url: string, options: any) {
  const response = await fetch(url, options);

  const clone = response.clone(); // Clone the response for reading it multiple times
  try {
    const textBody = await clone.text(); // Capture raw response body (JSON or text)
    console.log('[OAuth Response Body]', textBody);
  } catch (e) {
    console.error('[Error Logging Response]', e);
  }

  return response;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
  adapter: UnstorageAdapter(storage),
  providers: [
    {
      id: 'my_authorization_server',
      name: 'My Authorization Server',
      type: 'oauth',
      issuer: AUTHORIZATION_SERVER_URL,
      userinfo: AUTHORIZATION_SERVER_URL + '/userinfo',
      token: AUTHORIZATION_SERVER_URL + '/oauth2/token',
      authorization: {
        url: AUTHORIZATION_SERVER_URL + '/oauth2/authorize',
        params: { scope: 'openid' },
      },
      clientId: 'next-auth-client',
      clientSecret: 'next-auth-client-secret',
      profile(profile) {
        console.log('Profile callback ran: %o', profile);
        return {
          id: `${profile.sub}-${hashString(profile.sub)}`,
          name: profile.sub,
          email: `${profile.sub}-test@example.com`,
        };
      },
    },
    GitHub,
    Google,
  ],
  basePath: '/auth',
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ request, auth }) {
      console.log(
        'authorized callback ran. request: %o. auth: %o.',
        request,
        auth
      );
      const { pathname } = request.nextUrl;
      if (pathname === '/middleware-example') return !!auth;
      return true;
    },
    jwt({ token, trigger, session, account }) {
      console.log(
        'jwt callback ran. token: %o. trigger: %o. session: %o. account: %o.',
        token,
        trigger,
        session,
        account
      );
      if (trigger === 'update') token.name = session.user.name;
      if (account?.provider === 'keycloak') {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      console.log(
        'session callback ran. session: %o. token: %o.',
        session,
        token
      );
      if (token?.accessToken) session.accessToken = token.accessToken;

      return session;
    },
    async signIn({ profile }) {
      console.log('sign in callback ran: %o', profile);
      // Only allow sign in for users with email addresses ending with "yourdomain.com"
      return true;
    },
  },
  events: {
    async signOut(message) {
      if (!message) {
        console.log('sign out callback ran. no message.');
      } else if ('token' in message && message.token) {
        console.log('sign out callback ran. token: %o.', message.token);
      } else if ('session' in message && message.session) {
        console.log('sign out callback ran. session: %o.', message.session);
      }
    },
  },
  experimental: { enableWebAuthn: true },
});

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
