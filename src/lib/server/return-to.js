/** Keep redirects within this application's origin, including after URL normalization.
 * @param {string | null | undefined} value
 */
export function safeReturnTo(value) {
	if (!value?.startsWith('/') || /[\\\u0000-\u0020\u007f]/.test(value)) return '/';
	try {
		const origin = 'https://return.invalid';
		const target = new URL(value, origin);
		if (target.origin !== origin) return '/';
		const path = `${target.pathname}${target.search}${target.hash}`;
		// Dot-segment normalization must not create a protocol-relative Location.
		return path.startsWith('//') ? '/' : path;
	} catch {
		return '/';
	}
}
