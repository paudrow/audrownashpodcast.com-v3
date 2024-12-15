# AudrowNashPodcast.com Tools

This monorepo contains the website and associated tools for AudrowNashPodcast.com.

## Project Structure

The monorepo is organized into two main directories:

- `apps/*` - Contains standalone applications
- `packages/*` - Contains shared libraries and tools

### Applications

#### CSV Transcript to Markdown Converter

A web application that converts podcast transcript CSVs into formatted Markdown files. Features include:

- Convert CSV transcripts to Markdown format
- Add optional outline/timestamps
- Live preview and validation
- Download generated Markdown files
- Example data for quick testing

### Shared Packages

- **@repo/markdown-tools**: Tools for generating markdown from transcripts
- **@repo/outline-tools**: Tools for parsing and handling outlines/timestamps
- **@repo/time-tools**: Utilities for time manipulation and formatting
- **@repo/transcript-tools**: Tools for handling transcript data
- **@repo/typescript-config**: Shared TypeScript configurations
- **@repo/jest-config**: Shared Jest configurations

## Development

### Prerequisites

- Node.js (version specified in package.json)
- npm (version specified in package.json)

### Setup

1. Clone the repository
2. Install dependencies:
   """bash
   npm install
   """

### Available Scripts

"""bash

# Build all packages and applications

npm run build

# Run type checking across all packages

npm run check-types

# Start development servers

npm run dev

# Run tests

npm run test

# Run tests in watch mode

npm run test:watch

# Format code

npm run format

# Check formatting

npm run format:check
"""

### Development Workflow

This project uses:

- [Turborepo](https://turbo.build/repo) for build system and task running
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Jest](https://jestjs.io/) for testing
- [Prettier](https://prettier.io/) for code formatting
- [Next.js](https://nextjs.org/) for web applications
- [Tailwind CSS](https://tailwindcss.com/) for styling

## License

MIT
