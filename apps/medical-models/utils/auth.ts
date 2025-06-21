import NextAuth from 'next-auth';
import 'next-auth/jwt';
import crypto from 'crypto';

import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { createStorage } from 'unstorage';
import memoryDriver from 'unstorage/drivers/memory';
import { UnstorageAdapter } from '@auth/unstorage-adapter';

const AUTHORIZATION_SERVER_URL = process.env.AUTHORIZATION_SERVER_URL;

if (AUTHORIZATION_SERVER_URL === undefined) {
  console.error(
    'AUTHORIZATION_SERVER_URL environment variable must be defined'
  );
}

function hashString(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

const storage = createStorage({
  driver: memoryDriver(),
});

function decodeIdToken(idToken: string) {
  try {
    const base64Payload = idToken.split('.')[1]; // Get the payload section
    return JSON.parse(atob(base64Payload));
  } catch (error) {
    console.error('Error decoding ID token:', error);
    return null;
  }
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
      if (account?.id_token) {
        token.id_token = account.id_token;
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
      if (token?.id_token) {
        console.log('token had an id_token: %o', token.id_token);
        const idToken = decodeIdToken(token.id_token as string);
        session.user.middle_name = idToken.middle_name;
        session.user.honorific = idToken.honorific;
        session.user.givenName = idToken.given_name;
        session.user.familyName = idToken.family_name;
        session.user.fullName = idToken.name;
        session.user.picture = idToken.picture;
        session.user.email = idToken.email;
        session.user.roles = idToken.roles;
      } else {
        session.user.middle_name = 'placeholder middle name';
      }
      console.log('session after adding properties: %o', session);
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

type AuthUser = {
  name: string;
  honorific: string;
  givenName: string;
  familyName: string;
  fullName: string;
  email: string;
  middle_name: string;
  picture: string;
  roles: string[];
};

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
    expires: string;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
