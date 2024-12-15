# CSV Transcript to Markdown Converter

A web application that converts CSV transcripts into formatted Markdown files, with optional outline integration.

## Features

- Convert CSV transcripts to Markdown format
- Add optional outline/timestamps
- Live preview and validation
- Dark mode support
- Download generated Markdown files
- Example data for quick testing

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## CSV Format

The input CSV must follow this format:

```csv
"Speaker Name","Start Time","End Time","Text"
"John Doe","00;00;00;03","00;00;02;06","Hello, world!"
```

- Times must use semicolons (;) as separators
- All fields must be quoted
- All columns are required

## Outline Format

The optional outline format should be:

```
00:00 Introduction
01:30 Main Topic
02:45 Conclusion
```

- Each line must start with a timestamp (HH:MM or HH:MM:SS)
- Timestamp must be followed by a space and description
- Lines are sorted automatically by time

## Development

This project uses:

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Turbo](https://turbo.build/) - Monorepo tooling

## License

MIT
