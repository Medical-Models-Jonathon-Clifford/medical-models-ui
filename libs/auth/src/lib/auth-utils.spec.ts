import { hashString, decodeIdToken } from './auth-utils';

describe('auth-utils', () => {
  describe('hashString', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it.each`
      input            | hash
      ${'test-string'} | ${'ffe65f1d98fafedea3514adc956c8ada5980c6c5d2552fd61f48401aefd5c00e'}
      ${'rtrenneman'}  | ${'f064a9f1046fd570e5746971a9bf9a78022ff1bd721b562e8e097cbf161d5672'}
    `('should return the hashed string', ({ input, hash }) => {
      const result = hashString(input);
      expect(result).toBe(hash);
    });
  });

  describe('decodeIdToken', () => {
    const TEST_ID_TOKEN = 'eyJraWQiOiJiNmFiNGE1Yy1hOTlmLTQwNDEtOTYzOS03OGM5NmJlYzBkZTEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJydHJlbm5lbWFuIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImJpcnRoZGF0ZSI6IjE5NzAtMDEtMDEiLCJnZW5kZXIiOiJmZW1hbGUiLCJwcm9maWxlIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL3J0cmVubmVtYW4iLCJyb2xlcyI6WyJST0xFX1NVUFBPUlQiXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo3MDcxIiwiZ2l2ZW5fbmFtZSI6IlJveSIsInVzZXJJZCI6IjEiLCJwaWN0dXJlIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL3VzZXJzL3BpY3R1cmUvcnRyZW5uZW1hbi53ZWJwIiwic2lkIjoiUThuOTVlTDBYdlFBcFlkNjRJSWFBU19JVDA1djc3MENrcjZFRVZ6VTJydyIsImF1ZCI6Im5leHQtYXV0aC1jbGllbnQiLCJjb21wYW55SWQiOiIxIiwidXBkYXRlZF9hdCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiYXpwIjoibmV4dC1hdXRoLWNsaWVudCIsImF1dGhfdGltZSI6MTc2MTk5Mzg1NiwibmFtZSI6Ik1yLiBSb3kgVHJlbm5lbWFuIiwiZXhwIjoxNzYxOTk1NjU2LCJpYXQiOjE3NjE5OTM4NTYsImZhbWlseV9uYW1lIjoiVHJlbm5lbWFuIiwianRpIjoiNzhjNGEwMTktOTRkYS00ZDQ3LTljZTYtYmVhYzhhYTA4MWY5IiwiZW1haWwiOiJydHJlbm5lbWFuQGV4YW1wbGUuY29tIiwiaG9ub3JpZmljIjoiTXIuIn0.Br0oxVI1YL-zDi6YlrmzUWWiifROqjopyS7dVZiDmlEuFyxlKO1bgjNamf_R4Skh1-dH0YtxG3glGcdRdvFow0fikXUFvsch6E1zZLuDbmXuBF8atpkTxeF2DsntnjakGHGbh7D8E1N-1ViFSvUZOsLevoQ2sc_zUDGTeBIpQQYPlunVPdV3tCEX4JcYI3yPWaRHZWC4OYjBT6gilC3hH8Q_l5dBBxdXFv9geIEgSHXblqp2vo-3gl4Dc4nOdPnGN1Sc4VbpywGnQmXeAu_hy8odTm7Q_6YsU5jJ1XtEus5AsmVKMHCjToLWOH1Mkzl3RALo4gNOlt3m4zgzAfMBng';

    it('should decode a valid JWT token', () => {
      const mockPayload = {
        "aud": "next-auth-client",
        "auth_time": 1761993856,
        "azp": "next-auth-client",
        "birthdate": "1970-01-01",
        "companyId": "1",
        "email": "rtrenneman@example.com",
        "email_verified": true,
        "exp": 1761995656,
        "family_name": "Trenneman",
        "gender": "female",
        "given_name": "Roy",
        "honorific": "Mr.",
        "iat": 1761993856,
        "iss": "http://localhost:7071",
        "jti": "78c4a019-94da-4d47-9ce6-beac8aa081f9",
        "name": "Mr. Roy Trenneman",
        "picture": "http://localhost:3000/users/picture/rtrenneman.webp",
        "profile": "http://localhost:3000/rtrenneman",
        "roles": [
             "ROLE_SUPPORT",
        ],
        "sid": "Q8n95eL0XvQApYd64IIaAS_IT05v770Ckr6EEVzU2rw",
        "sub": "rtrenneman",
        "updated_at": "1970-01-01T00:00:00Z",
        "userId": "1",
      };

      const result = decodeIdToken(TEST_ID_TOKEN);

      expect(result).toEqual(mockPayload);
    });

    it('should return null for invalid token format', () => {
      const invalidToken = 'invalid-token';
      const result = decodeIdToken(invalidToken);

      expect(result).toBeNull();
    });

    it('should return null when token parts are missing', () => {
      const invalidToken = 'header.';
      const result = decodeIdToken(invalidToken);

      expect(result).toBeNull();
    });

    it('should return null when base64 decoding fails', () => {
      const token = 'header.invalidBase64Payload.signature';
      const result = decodeIdToken(token);

      expect(result).toBeNull();
    });

    it('should return null when JSON parsing fails', () => {
      const payload = '"aGVsbG8gd29ybGQ="'; // "hello world" base64 encoded
      const token = 'header.' + payload + '.signature';
      const result = decodeIdToken(token);

      expect(result).toBeNull();
    });
  });
});
