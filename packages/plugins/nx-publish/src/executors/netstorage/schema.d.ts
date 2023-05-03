export interface NetstorageExecutorSchema {
  uploadDirectory: string;
  path: string;
  domainName: string;
  nspath: string;
  dryRun?: boolean = false;
}
