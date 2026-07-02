import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const message = data.get('message');

		// Basic validation
		if (!name || !email || !message) {
			return fail(400, {
				error: '모든 필드를 입력해 주세요.',
				values: { name, email, message }
			});
		}

		// Simulate server database save or email sending delay
		await new Promise((resolve) => setTimeout(resolve, 800));

		return {
			success: true
		};
	}
};
