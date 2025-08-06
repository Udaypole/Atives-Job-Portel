What is Atives?
Atives is a platform built for creatives—designers, developers, photographers, and artists—to showcase their portfolios, discover jobs, and connect with like-minded professionals. I created this to solve three pain points:

Fragmented portfolios (No central place for multi-disciplinary work)

Boring job boards (Most lack creative-friendly filtering)

Isolated communities (Hard to find collaborators)

Key Features
🖥️ Interactive Feed
Browse creative work with hover animations

Like, save, and comment on posts

Filter by creative field (Design, Dev, Photo, etc.)

👤 Smart Profiles
Portfolio showcase with project categorization

Stats dashboard (views, engagement)

"Open for Work" toggle for recruiters

💼 Job Board Done Right
Salary range transparency

"Creative-friendly" tags (e.g. "Remote-first", "Design-driven")

One-click application system

✨ Thoughtful Touches
Dark mode that remembers preference

Keyboard navigation support

3 loading skeleton variants for different content types

Tech Stack Choices
Area	                   Technology	                   Why I Chose It
Frontend	               Next.js 14 (App Router)	     Server components + great SEO
Styling                  Tailwind + ShadCN	           Rapid iteration with design consistency
Animations	             Framer Motion	               Buttery smooth transitions
State	                   React Context	               Simple enough for current scale
Backend	                 Next API Routes               Keeps everything in one repo

Project Structure Highlights
text
app/
  (auth)/          # All auth-related routes
  (main)/          # Protected routes
    @feed/         # The main creative feed
    @jobs/         # Job board with filters
    @profile/      # User profile pages

components/
  cards/           # All card variations
    PostCard.tsx   # With hover animations
    JobCard.tsx    # With salary badge
  layout/          # Header, footer, etc.

# Install deps (using pnpm for speed)
cd atives
pnpm instal
pnpm dev
Then open http://localhost:3000

