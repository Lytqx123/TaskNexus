'use strict';

import { execSync } from 'child_process';

export function getShortCommitHash() {
	try {
		return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
			.toString()
			.trim();
	} catch {
		return 'local';
	}
}
