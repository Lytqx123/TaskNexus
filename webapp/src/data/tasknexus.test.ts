import { strict as assert } from 'node:assert';
import { normalizeShareUrl, optionalExternalUrl, shareEmbedCode } from './tasknexus';

describe('TaskNexus deployment links', () => {
	it('omits external links when their optional configuration is missing', () => {
		assert.equal(optionalExternalUrl(undefined), undefined);
		assert.equal(optionalExternalUrl('  '), undefined);
	});

	it('uses configured web and support addresses without inventing a host', () => {
		assert.equal(optionalExternalUrl(' https://example.com/docs '), 'https://example.com/docs');
		assert.equal(optionalExternalUrl('mailto:support@example.com'), 'mailto:support@example.com');
	});

	it('rejects invalid or executable external addresses', () => {
		for (const value of ['example.com', 'javascript:alert(1)', 'data:text/html,test', '/docs']) {
			assert.equal(optionalExternalUrl(value), undefined);
		}
	});
});

describe('InsightChat shared links', () => {
	it('provides no preview or iframe source before a shared link exists', () => {
		assert.equal(normalizeShareUrl(undefined), undefined);
		assert.equal(normalizeShareUrl(' '), undefined);
		assert.equal(shareEmbedCode(undefined), undefined);
	});

	it('supports real deployment links and local shared paths', () => {
		assert.equal(normalizeShareUrl(' https://example.com/s/team/share '), 'https://example.com/s/team/share');
		assert.equal(normalizeShareUrl('/s/team/share'), '/s/team/share');
		assert.match(shareEmbedCode('/s/team/share'), /src="\/s\/team\/share"/);
	});

	it('rejects executable, email, and protocol-relative preview sources', () => {
		for (const value of ['javascript:alert(1)', 'data:text/html,test', 'mailto:user@example.com', '//example.com/s/share', '/\\example.com/s/share']) {
			assert.equal(normalizeShareUrl(value), undefined);
			assert.equal(shareEmbedCode(value), undefined);
		}
	});

	it('escapes the supplied URL as an iframe attribute', () => {
		const embed = shareEmbedCode('https://example.com/s/share?label="<hello>"&mode=public');
		assert.match(embed, /label=&quot;&lt;hello&gt;&quot;&amp;mode=public/);
		assert.equal(embed.includes('src="https://example.com/s/share?label="'), false);
	});
});
