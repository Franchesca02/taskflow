This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# TaskFlow 🚀

A modern, collaborative task management board built with Next.js 16, TypeScript, and Prisma. Drag and drop tasks, organize columns, and boost team productivity with real-time updates.

![TaskFlow Preview](public/og-image.png)

## ✨ Features

- **Drag & Drop Interface** - Intuitively move tasks between columns with smooth animations
- **Real-time Updates** - Changes reflect instantly with optimistic UI updates
- **Task Management** - Create, edit, and delete tasks with rich descriptions
- **Column Organization** - Add, remove, and reorder columns to match your workflow
- **Persistent Storage** - SQLite database with Prisma ORM for reliable data persistence
- **Dark Mode** - Seamless dark/light theme switching
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Keyboard Navigation** - Full accessibility support with keyboard shortcuts

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | SQLite + Prisma ORM |
| **State Management** | TanStack Query + Zustand |
| **Drag & Drop** | dnd-kit |
| **UI Components** | Lucide Icons |
| **Development** | Turbopack, ESLint |

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Franchesca02/taskflow.git
cd taskflow