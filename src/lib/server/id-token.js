import { createLocalJWKSet, jwtVerify } from 'jose';

/** Validate the first-party SSO server's RS256 ID token before trusting UserInfo.
 * @param {string} token
 * @param {import('jose').JSONWebKeySet} jwks
 * @param {{ issuer: string, clientId: string, nonce: string }} expected
 */
export async function verifyIdToken(token, jwks, expected) {
	const { payload } = await jwtVerify(token, createLocalJWKSet(jwks), {
		algorithms: ['RS256'],
		issuer: expected.issuer,
		audience: expected.clientId,
		requiredClaims: ['iss', 'aud', 'sub', 'exp', 'iat', 'nonce'],
		clockTolerance: 5
	});
	if (!payload.sub || payload.nonce !== expected.nonce ||
		(payload.azp !== undefined && payload.azp !== expected.clientId) ||
		(Array.isArray(payload.aud) && payload.aud.length > 1 && payload.azp !== expected.clientId) ||
		typeof payload.iat !== 'number' || payload.iat > Date.now() / 1000 + 5) {
		throw new Error('ID token claims do not match the login request');
	}
	return payload;
}
