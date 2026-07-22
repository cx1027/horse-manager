# Horse Info Sharing Application

A modern PWA for horse information management and sharing, built with Next.js, Strapi, PostgreSQL, and S3 storage.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, PWA
- **Backend**: Strapi 5 (Node.js)
- **Database**: PostgreSQL 15
- **Storage**: AWS S3 / Cloudflare R2
- **Authentication**: Google OAuth 2.0
- **Deployment**: Vercel (Frontend) + Railway/Render (Backend)

## Features

- Horse profile management (basic info, photos, medical records)
- Health data tracking (weight, vitals, exercise)
- Feeding records management
- Commercial activities and race records
- Insurance information
- Role-based access (Admin, Staff, User, Investor)
- Google Sign-in
- Progressive Web App (PWA)

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Local Development

1. Clone the repository
2. Run `docker-compose up -d` to start PostgreSQL
3. Set up environment variables
4. Run `npm install` in both frontend and backend directories
5. Start development servers

See individual READMEs for detailed setup instructions.

## Project Structure

```
├── frontend/          # Next.js PWA application
├── backend/           # Strapi CMS
├── docker-compose.yml # PostgreSQL setup
├── SPEC.md           # Detailed specifications
└── README.md
```

## License

MIT
