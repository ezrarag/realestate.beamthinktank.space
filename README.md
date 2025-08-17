# BEAM Real Estate NGO

A modern, responsive website for BEAM Real Estate NGO built with Next.js, Tailwind CSS, and Supabase.

## Features

- **Donation Page**: Secure donation processing with project-specific funding options
- **City Selector**: Browse projects by city (Orlando, Atlanta, Nashville)
- **Project Listings**: Comprehensive project showcase with filtering and sorting
- **Milestone Tracker**: Real-time funding progress and milestone celebrations
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Supabase Integration**: Real-time database connectivity for projects and donations

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd beam-real-estate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── donate/            # Donation page
│   ├── projects/          # Projects listing and detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # Reusable components
│   ├── CitySelector.tsx   # City selection component
│   ├── FeaturedProjects.tsx # Featured projects showcase
│   ├── DonationCTA.tsx    # Donation call-to-action
│   └── MilestoneTracker.tsx # Funding milestone tracker
├── lib/                    # Utility libraries
│   └── supabase.ts        # Supabase client configuration
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

## Database Schema

### Projects Table
- `id`: Unique project identifier
- `title`: Project name
- `city`, `state`: Location information
- `type`: Project category (Residential, Commercial, Community, Heritage)
- `funding_goal`: Target funding amount
- `current_funding`: Current raised amount
- `progress`: Funding percentage
- `status`: Project status (active, funded, completed)
- `deadline`: Funding deadline
- `team_size`: Number of team members
- `timeline`: Project duration
- `impact`: Array of community impact points

### Donations Table
- `id`: Unique donation identifier
- `project_id`: Reference to project
- `amount`: Donation amount
- `donor_name`, `donor_email`: Donor information
- `message`: Optional donor message
- `is_recurring`: Recurring donation flag

### Project Updates Table
- `id`: Unique update identifier
- `project_id`: Reference to project
- `date`: Update date
- `title`: Update title
- `content`: Update content
- `type`: Update type (milestone, update, news)

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production

Ensure these are set in your Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.
