import { join } from 'node:path';
import { readdir, readFile, writeFile } from 'fs/promises';
import { PackageJson } from 'type-fest';

const APPS_FOLDER_PATH = join(process.cwd(), 'apps');
const PROJECT_JSON_NAME = 'project.json';
const PACKAGE_JSON_PATH = join(process.cwd(), 'package.json');

interface ProjectJSON {
  'firebase-function': boolean;
  targets: {
    build: {
      options: {
        outputPath: string;
      };
    };
  };
}

let packageJSON: PackageJson | null = null;

async function getPackageJSON(): Promise<PackageJson> {
  if (!packageJSON) {
    packageJSON = JSON.parse(
      await readFile(PACKAGE_JSON_PATH, { encoding: 'utf-8' })
    );
  }
  return { ...packageJSON };
}

async function copy(path: string): Promise<void> {
  try {
    const projectJSON: ProjectJSON = JSON.parse(
      await readFile(join(path, PROJECT_JSON_NAME), { encoding: 'utf-8' })
    );
    if (projectJSON['firebase-function']) {
      const dest = join(
        process.cwd(),
        projectJSON.targets.build.options.outputPath,
        'package.json'
      );
      const packageJSON = await getPackageJSON();
      packageJSON.main = 'main.js';
      await writeFile(dest, JSON.stringify(packageJSON, null, 2));
    }
  } catch (error) {
    console.error(`Error trying to process ${path}`, error);
  }
}

async function main(): Promise<void> {
  const dirs = await readdir(APPS_FOLDER_PATH);
  await Promise.all(dirs.map((dir) => copy(join(APPS_FOLDER_PATH, dir))));
}

main();
