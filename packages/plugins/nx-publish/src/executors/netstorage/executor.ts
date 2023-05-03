import { promisify } from 'util';
import { exec } from 'child_process';
import { NetstorageExecutorSchema } from './schema';
import type { ExecutorContext } from '@nrwl/devkit';

export default async function netstorageExecutor(
  options: NetstorageExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.log(`Preparing to publish ${options.path} to ${options.domainName}`);

  const { stdout, stderr } = await promisify(exec)(
    `${context.cwd}/tools/scripts/upload-to-netstorage.sh ${options.uploadDirectory} ${context.cwd + '/' + options.path} ${options.domainName} ${options.nspath} ${options.dryRun}`
  );

  console.log(stdout);
  console.error(stderr);

  const success = !stderr;

  return { success };
}
