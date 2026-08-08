# Portfolio

My personal portfolio site. It's a single page with a WebGL hero, smooth scrolling, a custom cursor, and a few animated case studies of work I've done.

Live at https://portfolio-manasdubey.vercel.app

## Built with

- Next.js 16 (App Router) and React 19, in TypeScript
- Tailwind CSS 4 for styling
- Three.js with React Three Fiber, Drei and postprocessing for the hero scene
- GSAP and Framer Motion for animation
- Lenis for smooth scroll
- Fonts (Bricolage Grotesque, Instrument Sans, Space Mono) loaded through `next/font`

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Other scripts: `npm run build` and `npm run start` for a production build, `npm run lint` to run ESLint.

## Layout

Everything lives under `src/`. The home page (`app/page.tsx`) stitches together the sections in `components/sections/` — Hero, Intro, SelectedWork, Experience, AboutSkills and Contact. Case studies are dynamic routes under `app/work/[slug]/`. The 3D hero is in `components/webgl/`, and the smaller pieces (cursor, grain overlay, scroll progress, reveal/magnetic wrappers) sit directly in `components/`. Content like my links, skills, projects and experience is kept separate in `src/data/`.

## Deploying

It's set up for Vercel — pushing to the connected repo deploys it. To self-host, `npm run build` then `npm run start`.

## Contact

- Email — manas.dubey007@gmail.com
- GitHub — https://github.com/Manasd007
- LinkedIn — https://www.linkedin.com/in/manasdubey0007/
