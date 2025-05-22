# Mining Frontend

A modern, responsive web application for mining operations management built with Vue 3 and Tailwind CSS.

![Mining Frontend](https://picsum.photos/800/400)

## Demo Link
🚀[Click here](https://mining-frontend-pi.vercel.app)

## Features

- 📱 **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface using daisyUI components
- 🔄 **Real-time Data**: Monitor mining operations with live updates
- 📊 **Data Visualization**: Comprehensive dashboards and reports
- 🌙 **Dark/Light Mode**: Switchable themes for different lighting conditions
- 🚀 **Fast Performance**: Optimized for speed with Vite

## Tech Stack

- **Frontend Framework**: [Vue 3](https://vuejs.org/) with Composition API
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Framework**: [Tailwind CSS 4](https://tailwindcss.com/) with [daisyUI 5](https://daisyui.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Heroicons](https://heroicons.com/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd mining-frontend
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

## Project Structure

```
mining-frontend/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable Vue components
│   │   └── Layout/     # Layout components (Navbar, Footer, etc.)
│   ├── router/         # Vue Router configuration
│   ├── stores/         # Pinia stores for state management
│   ├── views/          # Page components
│   ├── App.vue         # Root component
│   ├── main.js         # Entry point
│   └── style.css       # Global styles
├── .eslintrc.js        # ESLint configuration
├── index.html          # HTML template
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Coding Standards

This project follows modern JavaScript and Vue.js best practices:

- Vue 3 Composition API with `<script setup>` syntax
- ESLint and Prettier for code quality and formatting
- Husky and lint-staged for pre-commit checks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Vue.js Team](https://vuejs.org/about/team.html)
- [Tailwind CSS](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)
