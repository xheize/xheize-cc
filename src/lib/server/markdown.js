import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

/** Render Markdown while rejecting scripts, event handlers and unsafe URLs.
 * @param {string} source
 */
export function renderMarkdown(source) {
	return sanitizeHtml(marked.parse(source, { async: false, gfm: true }), {
		allowedTags: sanitizeHtml.defaults.allowedTags,
		allowedAttributes: {
			a: ['href', 'title'],
			code: ['class']
		},
		allowedSchemes: ['https', 'http', 'mailto'],
		allowProtocolRelative: false
	});
}
