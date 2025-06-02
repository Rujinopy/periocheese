# Periocheese 🦷 🧀

A voice-controlled dental charting application that helps dentists create periodontal charts through speech commands.

## Features

- 🎙️ Speech-to-chart conversion
- ✏️ Full editing capabilities for chart customization
- 📸 Export charts to JPG format
- 💾 Save and load charts as JSON (coming soon)

## Getting Started

1. Clone the repository
2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key to the `.env` file
3. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Radix UI Components
- OpenAI Integration

## Development

This project uses:
- TypeScript for type safety
- Tailwind CSS for styling
- Radix UI for accessible components
- React Hook Form for form handling
- HTML2Canvas for chart export

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
