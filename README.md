# 🌍 Country Explorer

<div>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-world--explorer--phi.vercel.app-brightgreen?style=for-the-badge)](https://world-explorer-phi.vercel.app/)
</div>

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Motion](https://img.shields.io/badge/Motion-12-purple)](https://motion.dev/)

![App Demo](./gifs/demo.gif)

An interactive web application for exploring countries and testing your knowledge of world capitals.  
Built with Next.js, TypeScript, and Motion to deliver smooth animations and an engaging learning experience.

## 🎯 Project Goals

This project was built as a frontend learning exercise to practice:

- Writing type-safe code with **TypeScript**
- Building interactive UI with **Next.js App Router**
- Creating smooth UI animations with **Motion**

## ✨ Features

### 🏠 Home Page

- Animated welcome header with dynamic page title and description
- Interactive flag mosaic grid with smooth staggered animations
- Filter countries by continent
- Search countries by name in real-time
- Click any flag to reveal the country name

### 📋 Countries Page

- Comprehensive alphabetical list of all countries
- Quick filter by first letter (A-Z navigation)
- Sort countries by population (ascending/descending)
- Click any flag to zoom in for a closer look
- View each country's location via Google Maps link
- Responsive design for all screen sizes

### 🎮 Quiz Mode

- **Customizable quizzes**: Select continent and number of questions
- **Multiple-choice format**: Guess the capital of each country
- **Progress tracking**: Visual progress bar shows quiz completion
- **Instant feedback**: See results with final score
- **Replay option**: Restart quiz anytime with different settings
- **Celebration effects**: Confetti animation on quiz completion
- **Navigation guard**: Prevents accidental navigation away mid-quiz

### 💬 Feedback Form

- Accessible modal triggered from the footer, available on every page
- Fields: optional name, required email, required message
- Submissions saved to **Supabase** via a Next.js Server Action
- Inline validation with error and success states
- Modal stays open if email or message has content (prevents accidental dismissal)

### 🌙 Theming

- Light and dark mode toggle, persisted across sessions

### 🎨 Animations

- Powered by **Motion** for all transitions
- Staggered card animations when filtering or searching
- Smooth page transitions between routes
- Interactive hover states on all clickable elements

### ♿ Accessibility

- Semantic HTML structure throughout
- Proper ARIA labels for regions and interactive elements
- Screen reader-friendly titles and descriptions
- Keyboard navigation support

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Animation**: [Motion 12](https://motion.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- **Styling**: CSS Modules
- **Database**: [Supabase](https://supabase.com/)
- **Confetti**: [canvas-confetti](https://github.com/catdad/canvas-confetti)
- **Fonts**: [Fontshare](https://www.fontshare.com/) — *Synonym (400), Amulya (700)*

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/polina2410/world-explorer.git
cd world-explorer
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the project root:

```env
SUPABASE_URL=your-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Get these values from your Supabase project under **Settings → API**.

Then create the `feedback` table in your Supabase SQL editor:

```sql
create table feedback
(
    id         uuid primary key default gen_random_uuid(),
    name       text,
    email      text not null,
    message    text not null,
    created_at timestamptz      default now()
);
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open the app**

Visit **http://localhost:3000** in your browser.

---

## 🛠️ Available Scripts

* **npm run dev** – Start development server
* **npm run build** – Build for production
* **npm run start** – Start production server
* **npm run lint** – Run ESLint
* **npm run test** – Run tests in watch mode
* **npm run test:run** – Run tests once

---

## 🌐 Live Demo

Check out the live application:
https://world-explorer-phi.vercel.app/

---

## 📝 License

This project is open source and available under the **MIT License**.

---

## 🙏 Acknowledgments

* Country data provided by **[REST Countries API](https://restcountries.com/)**
* Icons and design inspiration from the open source community
* The tab icon was generated with ChatGPT
* Built with **Next.js** and deployed on **Vercel**

---

## 📧 Contact

Polina – [polinasmekhova@gmail.com](mailto:polinasmekhova@gmail.com)

Project Link:
https://github.com/polina2410/world-explorer
