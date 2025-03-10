import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import { fileURLToPath } from 'url';

// Define types for configurations
interface Configuration {
  path: string;
  description: string;
}

interface Configurations {
  [key: string]: Configuration;
}

// Get dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Available configurations
const configurations: Configurations = {
  cursor: {
    path: path.join(__dirname, '..', '.cursor'),
    description: 'Cursor IDE configuration',
  },
};

/**
 * Check if command is valid and return true if it is 'init'
 */
export function isValidCommand(command: string | undefined): boolean {
  if (command !== 'init') {
    console.log(chalk.red('Error: Unknown command'));
    console.log(chalk.yellow(`Usage: ${chalk.bold('npx doton init')}`));
    return false;
  }
  return true;
}

/**
 * Initialize the selected configuration
 */
export async function init(): Promise<void> {
  console.log(chalk.blue('\n🚀 Welcome to Doton (The Dev Config Initializer)! 🚀\n'));
  
  try {
    // Ask which config to init
    const { configType } = await inquirer.prompt<{ configType: string }>([
      {
        type: 'list',
        name: 'configType',
        message: 'Choose which config to initialize:',
        choices: Object.keys(configurations).map(key => ({
          name: `${key} - ${configurations[key].description}`,
          value: key,
        })),
      },
    ]);
    
    // Ask for target directory
    const { targetDir } = await inquirer.prompt<{ targetDir: string }>([
      {
        type: 'input',
        name: 'targetDir',
        message: 'Enter target directory:',
        default: './',
        validate: (input: string): boolean | string => {
          if (!input) return 'Target directory cannot be empty';
          return true;
        },
      },
    ]);
    
    // Resolve target directory path
    const targetPath = path.resolve(process.cwd(), targetDir);
    
    // Ensure target directory exists
    await fs.ensureDir(targetPath);
    
    // Get source path
    const sourcePath = configurations[configType].path;
    
    // Check if target directory already has the content
    const spinner = ora(`Checking and copying ${configType} configuration to ${targetPath}...`).start();
    
    try {
      // Check if directory already exists and contains files
      const targetExists = await fs.pathExists(path.join(targetPath, '.cursor'));
      if (targetExists) {
        spinner.fail(`${chalk.red('Error!')} The target directory already contains .cursor folder.`);
        console.log(chalk.yellow('Cannot overwrite existing configuration.'));
        process.exit(1);
        return; // This ensures code below doesn't execute if process.exit is mocked in tests
      }
      
      // Copy configuration files
      await fs.copy(sourcePath, path.join(targetPath, '.cursor'), { overwrite: false });
      spinner.succeed(`${chalk.green('Success!')} ${configType} configuration initialized in ${targetPath}`);
    } catch (err: unknown) {
      spinner.fail('Failed to copy configuration');
      console.error(chalk.red(`Error: ${(err as Error).message}`));
      process.exit(1);
      return; // This ensures code below doesn't execute if process.exit is mocked in tests
    }
  } catch (error: unknown) {
    console.error(chalk.red(`Error: ${(error as Error).message}`));
    process.exit(1);
    return; // This ensures code below doesn't execute if process.exit is mocked in tests
  }
}

// Only call init if this file is being executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];
  if (isValidCommand(command)) {
    init();
  } else {
    process.exit(1);
  }
} 
