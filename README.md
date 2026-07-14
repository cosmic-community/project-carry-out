# Project Carry Out

![App Preview](https://imgix.cosmicjs.com/97fc5ea0-7f31-11f1-bda7-c54391d68ce2-autopilot-photo-1545459720-aac8509eb02c-1783998640506.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive road rehabilitation project management platform built with Next.js and [Cosmic](https://www.cosmicjs.com). Track construction projects, monitor milestones through construction and defects liability phases, and manage defect reports — all in one beautiful dashboard.

## Features

- 🛣️ **Project Dashboard** — Overview of all road rehabilitation projects with status, contract value, road length, and duration
- 🚧 **Milestone Tracking** — Visual progress bars for each project phase across the 12-month construction period
- 🔧 **Defect Reports** — Manage 180-day defects liability defects with severity, status, and rectification tracking
- 📊 **Project Detail Pages** — Deep-dive into individual projects with linked milestones and defect reports
- 📱 **Fully Responsive** — Beautiful UI that works on desktop, tablet, and mobile
- ⚡ **Server-Rendered** — Fast page loads powered by Next.js Server Components and Cosmic

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a55a8628be639e4dddbbfdb&clone_repository=6a55a96b8be639e4dddbc03a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: A project to carry out road rehabilitation 12 months and 180 days defects liability"

### Code Generation Prompt

> Build a Next.js application for a website called "Project carry out". The content is managed in Cosmic CMS with the following object types: projects, milestones, defect-reports. Create a beautiful, modern, responsive design with a homepage and pages for each content type. A project to carry out road rehabilitation 12 months and 180 days defects liability

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account and bucket with the `projects`, `milestones`, and `defect-reports` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set the following environment variables:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all projects with linked data
const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch milestones for a specific project
const { objects: milestones } = await cosmic.objects
  .find({ type: 'milestones', 'metadata.project': projectId })
  .depth(1)
```

## Cosmic CMS Integration

This app uses three [Cosmic](https://www.cosmicjs.com/docs) object types:

- **Projects** — road rehabilitation projects with contract value, duration, and defects liability info
- **Milestones** — phase-based progress tracking linked to projects
- **Defect Reports** — defect management during the defects liability period

All data is fetched server-side using the Cosmic SDK with `depth(1)` for linked objects.

## Deployment Options

- **Vercel** — Import your repo, set environment variables, and deploy
- **Netlify** — Connect your repo and configure environment variables

Set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting platform's dashboard.
<!-- README_END -->