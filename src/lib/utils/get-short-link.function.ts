export function getShortLink(uniqueId: string, origin?: string): string {
	if (!origin) {
		origin = `http://localhost:5173`;
	}
	return new URL(uniqueId, origin).href;
}
