# ProactivePay: AI-Powered Financial Management

ProactivePay is a modern, intuitive financial application designed to simplify your money management. It provides secure payment processing, peer-to-peer (P2P) transfers, bill payments, and a suite of AI-powered tools to offer personalized financial insights. Built with a cutting-edge tech stack, it delivers a seamless and responsive user experience.

## Core Features

- **Dashboard Overview**: A clean, centralized view of your account balance, recent transactions, and quick actions.
- **P2P Transfers**: Easily send money to your contacts in just a few clicks.
- **Bill Payments**: A simple interface to manage and pay your upcoming bills.
- **Transaction History**: A detailed and searchable log of all your financial activities. You can also export your history to a CSV file.
- **AI Financial Coach**: Get personalized insights into your spending habits:
    - **Spending Summary**: Understand where your money is going with AI-generated summaries.
    - **Budget Suggestions**: Receive tailored advice to improve your financial health.
    - **Proactive Advice**: Get timely tips based on your transaction patterns.
- **Savings Finder**: An AI agent that analyzes your transaction history to find and suggest concrete opportunities to save money.
- **Light & Dark Mode**: A theme toggle to switch between light and dark modes for comfortable viewing.
- **Responsive Design**: A mobile-first design that works beautifully across all devices, from desktops to smartphones.

## Tech Stack

This project is built with a modern, type-safe, and performant technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **AI/Generative**: [Genkit](https://firebase.google.com/docs/genkit) (with Google's Gemini models)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing.

### Prerequisites

Make sure you have Node.js and npm (or a compatible package manager like Yarn or pnpm) installed on your system.

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/proactive-pay.git
    cd proactive-pay
    ```

2.  **Install dependencies:**
    This project uses npm for package management. Run the following command to install all the required packages defined in `package.json`:
    ```bash
    npm install
    ```

### Running the Development Server

Once the dependencies are installed, you can start the Next.js development server. This will launch the app in development mode with hot-reloading enabled.

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002). Open this URL in your web browser to see the running application. Any changes you make to the source code will be automatically reflected in the browser.

### Building for Production

To create a production-ready build of the application, run the following command:

```bash
npm run build
```

This will generate an optimized and minified version of the application in the `.next` directory. You can then start the production server with:

```bash
npm run start
```
