# Computer Science & Informatics Department Website | UENR

The public website for the Department of Computer Science and Informatics(UENR). It presents the department, its academic programmes, staff, student resources, research, events, news, and contact information in a responsive single-page application.

## Features

- Responsive layouts with desktop and mobile navigation.
- Hash-based navigation for the home page and department sections.
- Programme information for undergraduate and postgraduate study.
- Staff, executive, alumni, and student information pages.
- Student resources, including the handbook, calendar, course lists, and internship information.
- Research, news, media, gallery, events, clubs, and contact pages.
- An eligibility checker and career prospects section.
- Home page hero slides and department About content, with fallback content when remote data is unavailable.

## Technology

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4
- Lucide React icons
- ESLint

## Requirements

Install a current Node.js LTS release and npm. The project uses the `package-lock.json` lockfile to keep dependency versions consistent.

## Getting started

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal, usually `http://localhost:5173`.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server with hot reload. |
| `npm run build` | Type-check the application and create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally. Run `npm run build` first. |
| `npm run lint` | Run ESLint against the project. |

## Site navigation

The app uses URL hashes to select pages. Examples include `#home`, `#about`, `#programmes`, `#people`, `#resources`, `#research`, `#news`, `#gallery`, `#events`, `#contact`, `#careers`, and `#clubs`. Some sections have nested hashes, such as `#resources/calendar` and `#people/teaching`.

## Project structure

```text
src/
  App.tsx                 Application shell, navigation, and page selection
  components/             Shared layout and homepage sections
  programs/               Undergraduate and postgraduate programme pages
  People/                 Staff, student, alumni, and profile pages
  Resources/              Student resources and academic information
  Research/               Research page
  News/                   News and media pages
  Gallery/                Department gallery
  Event/                  Events page
  Contact/                Contact page
  about/                  Department overview page
  data/                   Locally defined data
public/                   Images, fonts, and other static assets
```

## Content and remote data

The home page requests its active hero slides from:

```text
https://uenr-csisd-backend.onrender.com/api/v1/heroes/active
```

The department About page tries the following endpoints in order and falls back to its built-in content if none returns usable data:

```text
https://uenr-csisd-backend.onrender.com/api/v1/department/about
https://uenr-csisd-backend.onrender.com/api/v1/department
https://uenr-csisd-backend.onrender.com/api/v1/about
```

The About page caches the normalized response in browser local storage. These service URLs are currently defined in the frontend source; no `.env` configuration is required by the project as it stands.

Some pages use locally defined sample content and images hosted by Unsplash. Replace sample entries, contact details, and social links with approved department information before publishing or when updating the site.

## Production build and deployment

Create the static production site with:

```bash
npm run build
```

Deploy the contents of `dist/` to a static hosting provider. Since navigation uses URL hashes, page selection stays within the single-page application and does not require a server-side route rewrite. Confirm that the deployed site can reach the remote data endpoints and that its image and font assets load correctly.

## Maintenance notes

- Keep `package-lock.json` committed when changing dependencies.
- Place static files served by root-relative paths in `public/`.
- Update the endpoint URLs in the source if the backend host or API paths change.
- Check contact numbers, email addresses, admissions links, and social account URLs against current departmental details before release.


### Development Team

| Name | Team | GitHub |
|---|---|---|
| Richmond Afoblikame| Frontend Team | [@Richmond-24](https://github.com/Richmond-24) |
|  Bright Kwesi Avornyo  | Frontend Team| [@Kelly-ux](https://github.com/kelly-ux)
| Alhassan Iddriss kama | Frontend Team | [@Mr.Karmzy](https://github.com/mr. kamzy) |
| Amadu Abdul-Rauf | Frontend Team  | [@abdulralph-53](https://github.com/abdulralph-53) |

