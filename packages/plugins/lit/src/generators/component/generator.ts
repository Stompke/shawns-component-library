import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import * as path from 'path';
import { ComponentGeneratorSchema } from './schema';

interface NormalizedSchema extends ComponentGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: ComponentGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = `tompke/${name}`;
  const projectName = `@${projectDirectory}`;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  parsedTags.push('component');

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export default async function (tree: Tree, options: ComponentGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'library',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    targets: {
      build: {
        executor: '@nrwl/vite:build',
        outputs: ['{options.outputPath}'],
        options: {
          outputPath: `dist/packages/tompke/${normalizedOptions.name}`,
          entry: './src/index.ts',
          sourcemap: true,
        },
      },
      test: {
        executor: '@nrwl/vite:test',
        outputs: ['{projectRoot}/coverage'],
        options: {
          coverage: true,
          passWithNoTests: true,
        },
      },
      lint: {
        executor: '@nrwl/linter:eslint',
        outputs: ['{options.outputFile}'],
        options: {
          lintFilePatterns: [
            `packages/tompke/${normalizedOptions.name}/**/*.ts`,
          ],
        },
      },
      version: {
        executor: '@jscutlery/semver:version',
        options: {
          preset: 'angular',
        },
      },
      publish: {
        executor: 'ngx-deploy-npm:deploy',
        options: {
          access: 'public',
        },
      },
    },
    tags: normalizedOptions.parsedTags,
    implicitDependencies: ["@tompke/tailwind"],
  });
  updateJson(tree, 'tsconfig.base.json', (tsconfig) => {
    tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths ?? {};
    tsconfig.compilerOptions.paths[`@tompke/${normalizedOptions.name}`] = [
      `packages/tompke/${normalizedOptions.name}/src/index.ts`,
    ];

    return tsconfig;
  });
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
