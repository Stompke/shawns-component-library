#!/usr/bin/env node

(() => {
  const { execSync } = require('child_process');
  const { argv } = require('process');

  const PROJECT_OUTPUT_PATH = argv[2];
  const REGISTRY = argv[3] !== ('true' || 'false') ? argv[3] : undefined;
  const DRY_RUN = argv[argv.length - 1] === 'true' ? '--dry-run' : '';

  execSync(
    `npm config set registry ${
      REGISTRY || 'https://www.npmjs.com/settings/tompke/packages'
    }`, { encoding: 'utf8' }
  );

  const deploy = execSync(
    `cd ${PROJECT_OUTPUT_PATH} && npm publish --access public ${REGISTRY ? "--registry " + REGISTRY : ''} ${DRY_RUN}`,
    { encoding: 'utf8' }
  );

  console.log(deploy.toString());
})();
