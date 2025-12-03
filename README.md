# UNN Bookshop

Official online bookshop application for the University of Nigeria, Nsukka (UNN). This platform allows students to browse and purchase textbooks, research materials, and merchandise with ease.

## Features

-   **Modern UI/UX**: Built with a "Luxury Minimalist" aesthetic using Tailwind CSS and Framer Motion.
-   **PWA Support**: Installable as a Progressive Web App (PWA) with offline capabilities.
-   **Product Catalog**: Browse books by category and view detailed information.
-   **Shopping Cart**: Add items to cart and manage orders.
-   **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.

## Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **PWA**: [next-pwa](https://www.npmjs.com/package/next-pwa)
-   **Language**: TypeScript

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/unn-bookshop.git
    cd unn-bookshop
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

-   `src/app`: Next.js App Router pages and layouts.
-   `src/components`: Reusable UI components.
    -   `home`: Components specific to the home page.
    -   `layout`: Global layout components (Navbar, Footer).
    -   `ui`: Generic UI components (Buttons, Cards, etc.).
-   `src/lib`: Utility functions and static data.
-   `public`: Static assets (images, icons, manifest).

## PWA Configuration

The app is configured as a PWA. The manifest file is located at `public/manifest.json`.
To prevent build loops during development, PWA generation is disabled in `next.config.ts` when `NODE_ENV` is `development`.

## License

This project is proprietary to the University of Nigeria, Nsukka.
