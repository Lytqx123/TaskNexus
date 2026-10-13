export function optionalExternalUrl(value?: string): string | undefined {
	const url = value?.trim();
	if (!url) return undefined;
	try {
		const parsed = new URL(url);
		return ['https:', 'http:', 'mailto:'].includes(parsed.protocol) ? url : undefined;
	} catch {
		return undefined;
	}
}

export const taskNexusLinks = {
	website: optionalExternalUrl(process.env.NEXT_PUBLIC_TASKNEXUS_WEBSITE_URL),
	docs: optionalExternalUrl(process.env.NEXT_PUBLIC_TASKNEXUS_DOCS_URL),
	terms: optionalExternalUrl(process.env.NEXT_PUBLIC_TASKNEXUS_TERMS_URL),
	privacy: optionalExternalUrl(process.env.NEXT_PUBLIC_TASKNEXUS_PRIVACY_URL),
	support: optionalExternalUrl(process.env.NEXT_PUBLIC_TASKNEXUS_SUPPORT_URL),
	source: optionalExternalUrl(process.env.NEXT_PUBLIC_TASKNEXUS_SOURCE_URL),
	community: optionalExternalUrl(process.env.NEXT_PUBLIC_TASKNEXUS_COMMUNITY_URL),
	linkedin: optionalExternalUrl(process.env.NEXT_PUBLIC_TASKNEXUS_LINKEDIN_URL),
	youtube: optionalExternalUrl(process.env.NEXT_PUBLIC_TASKNEXUS_YOUTUBE_URL),
	contact: optionalExternalUrl(process.env.NEXT_PUBLIC_TASKNEXUS_CONTACT_URL),
	meeting: optionalExternalUrl(process.env.NEXT_PUBLIC_TASKNEXUS_MEETING_URL),
	structuredOutputDocs: optionalExternalUrl(process.env.NEXT_PUBLIC_TASKNEXUS_STRUCTURED_OUTPUT_DOCS_URL)
};

export function normalizeShareUrl(value?: string): string | undefined {
	const url = value?.trim();
	if (!url) return undefined;
	if (url.startsWith('/') && !url.startsWith('//') && !url.includes('\\')) return url;
	try {
		return ['https:', 'http:'].includes(new URL(url).protocol) ? url : undefined;
	} catch {
		return undefined;
	}
}

export function shareEmbedCode(shareUrl?: string): string | undefined {
	const url = normalizeShareUrl(shareUrl);
	if (!url) return undefined;
	const escapedUrl = url.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return `<iframe\n  src="${escapedUrl}"\n  width="100%"\n  height="600px"\n  frameborder="0"\n></iframe>`;
}
