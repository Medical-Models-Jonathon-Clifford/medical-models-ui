import crypto from 'crypto';

export function hashString(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

export function decodeIdToken(idToken: string) {
  try {
    const base64Payload = idToken.split('.')[1]; // Get the payload section
    return JSON.parse(atob(base64Payload));
  } catch (error) {
    console.error('Error decoding ID token:', error);
    return null;
  }
}
