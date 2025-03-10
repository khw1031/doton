# Doton

[![Test and Publish](https://github.com/khw1031/doton/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/khw1031/doton/actions/workflows/publish.yml)
[![npm version](https://img.shields.io/npm/v/doton.svg)](https://www.npmjs.com/package/doton)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Support-yellow.svg)](https://buymeacoffee.com/fkmgifhne)

English | [한국어](./README.ko.md)

A CLI tool to easily initialize development configurations.

## Features

- Cross-platform support (macOS, Linux, Windows)
- Interactive CLI interface
- Multiple configuration templates
- Easy installation and usage with npx
- Written in TypeScript

## Installation

No installation required! Simply use npx:

```shell
npx doton init
```

Or install globally:

```shell
pnpm install -g doton
doton init
```

## Usage

1. Run the initializer:
   ```shell
   npx doton init
   ```

2. Choose a configuration type from the menu:
   ```
   Choose which config to initialize:
   > cursor - Cursor configuration
   > vscode - VSCode configuration
   ```

3. Enter the target directory where you want to save the configuration:
   ```
   Enter target directory: ./my-config
   ```

4. The configuration files will be copied to your specified directory!

## Available Configurations

- **cursor** - Cursor configuration
- **vscode** - Visual Studio Code configuration

## Development

### Requirements

- Node.js 18.0.0 or higher (LTS version recommended)
- pnpm 10.0.0 or higher

### Setup

This project uses [pnpm](https://pnpm.io/) as the package manager. If you don't have pnpm installed, you can install it with:

```bash
npm install -g pnpm
```

Then, you can set up the project:

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run in development mode with watch
pnpm dev

# Run tests
pnpm test

# Lint the code
pnpm lint
```

## CI/CD

This project uses GitHub Actions for continuous integration and deployment.

### Pull Request Checks

When a PR is created or updated, the following checks run automatically:
- Linting
- Tests on current LTS Node.js versions (18.x, 20.x)

### Publish Process

When code is merged or pushed to the `main` branch:
1. Tests are run to ensure everything is working
2. If tests pass, the package version is checked against npm
3. If the current version is less than or equal to the published version, a patch version bump is applied
4. The package is built and published to npm

### Status Badge

The CI status badge at the top of this README shows the current status of the Test and Publish workflow from the main branch. If you fork this repository, make sure to update the badge URLs in the README with your username.

## Adding Your Own Configurations

To add your own configuration files to use with this tool:

1. Create a new directory in the project root with your configuration name
2. Add your configuration files inside that directory
3. Update the `configurations` object in `src/index.ts` to include your new configuration

## License

MIT

## Support

If you find this tool helpful, you can [buy me a coffee](https://buymeacoffee.com/fkmgifhne)!
