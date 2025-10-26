# Portfolio 2025

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS v4.

## Features

- 🚀 **Next.js 15** with App Router
- 💎 **TypeScript** for type safety
- 🎨 **Tailwind CSS v4** for styling
- 📱 **Responsive Design** for all devices
- ⚡ **Fast Performance** with optimized builds
- 🎯 **SEO Optimized** with proper metadata

## Project Structure

```
portfolio-2025/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── projects/          # Projects page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   └── components/            # Reusable components
│       ├── Header.tsx         # Navigation header
│       └── Footer.tsx         # Site footer
├── public/                    # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd portfolio-2025
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Updating Content

1. **Homepage**: Edit `src/app/page.tsx`
2. **About Page**: Edit `src/app/about/page.tsx`
3. **Projects**: Edit `src/app/projects/page.tsx`
4. **Contact**: Edit `src/app/contact/page.tsx`

### Styling

The project uses Tailwind CSS v4 with custom CSS variables defined in `src/app/globals.css`. You can customize:

- Colors in the `:root` section
- Fonts in the layout
- Component styles using Tailwind classes

### Adding New Pages

1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Update navigation in `src/components/Header.tsx`

## Deployment

The project is ready for deployment on platforms like:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Railway**

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS
- **React 19** - UI library
- **ESLint** - Code linting

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using Next.js and Tailwind CSS
