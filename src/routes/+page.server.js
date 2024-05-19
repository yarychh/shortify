import { nanoid } from 'nanoid';
import { getShortLink, isValidUrl } from '$lib';
import { fail } from '@sveltejs/kit';

export const actions = {
	async createShortLink({ request }) {
		const data = await request.formData();
		try {
			const originalUrl = data.get('originalUrl');
			if (!isValidUrl(String(originalUrl))) {
				return fail(400, { invalidURL: true, message: 'Invalid URL', originalUrl });
			}
			const linkId = nanoid(8);
			return {
				status: 200,
				body: {
					originalUrl,
					shortenedUrl: getShortLink(linkId)
				}
			};
		} catch (error) {
			console.error(error);
		}
	}
};
