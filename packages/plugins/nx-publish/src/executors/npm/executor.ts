import { promisify } from 'util';
import { exec } from 'child_process';
import { NpmExecutorSchema } from './schema';
import type { ExecutorContext } from '@nrwl/devkit';

export default async function npmExecutor(
  options: NpmExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.log(
    `Preparing to publish ${context.projectName} to https://packages.aa.com`
  );

  const { stdout, stderr } = await promisify(exec)(
    `${context.cwd}/tools/scripts/publish-to-npm.js ${context.cwd + '/' + options.output} ${options.registry} ${options.dryRun}`
  );

  console.log(stdout);
  console.error(stderr);

  const success = !stderr;

  return { success };
}
