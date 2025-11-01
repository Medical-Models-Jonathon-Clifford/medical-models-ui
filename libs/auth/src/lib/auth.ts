import NextAuth from 'next-auth';
import 'next-auth/jwt';
import { createStorage } from 'unstorage';
import memoryDriver from 'unstorage/drivers/memory';
import { UnstorageAdapter } from '@auth/unstorage-adapter';
import { AUTHORIZATION_SERVER_URL } from '@mm/config';
import { decodeIdToken, hashString } from './auth-utils';
import { AuthUser } from '@mm/types';

const storage = createStorage({
  driver: memoryDriver(),
});

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  theme: {
    colorScheme: 'light',
    logo: '/favicon.png',
  },
  adapter: UnstorageAdapter(storage),
  providers: [
    {
      id: 'my_authorization_server',
      name: 'Medical Models',
      type: 'oauth',
      style: {
        logo: '/favicon.png',
      },
      allowDangerousEmailAccountLinking: true,
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
  ],
  basePath: '/api/auth', // Needs to match location of [...nextauth]/route.ts
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
      if (account) {
        token.accessToken = account.access_token;
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
        session.user.userId = idToken.userId;
        session.user.companyId = idToken.companyId;
        session.user.honorific = idToken.honorific;
        session.user.givenName = idToken.given_name;
        session.user.familyName = idToken.family_name;
        session.user.fullName = idToken.name;
        session.user.picture = idToken.picture;
        session.user.email = idToken.email;
        session.user.roles = idToken.roles;
        session.idToken = token.id_token;
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

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
    expires: string;
    accessToken?: string;
    idToken?: object;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
