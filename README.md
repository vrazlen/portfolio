# My Personal Portfolio

Welcome to the repository of my personal website! This project is a reflection of my work, built with a focus on simplicity, performance, and automation.

## 🌟 About This Project

I wanted a portfolio that feels "alive" without requiring me to constantly update it manually. This site uses a **"Serverless on Static"** architecture:
- **Design**: A clean Bento Grid layout that adapts to any screen.
- **Tech Stack**: Built with [Astro](https://astro.build), [React](https://react.dev), and [Tailwind CSS](https://tailwindcss.com).
- **Automation**: GitHub Actions automatically fetch my latest **Spotify** listening history and **GitHub** repositories, so the content is always fresh.

## 🛠️ How It Works

- **Spotify Widget**: Shows what I'm currently listening to (or the last song I played). It updates every 30 minutes via a background job.
- **GitHub Stats**: Automatically pins my top repositories.
- **Location Card**: A simple visual indicator of where I am based.
- **Links**: A central hub for all my social media profiles.

## 🚀 Running Locally

If you want to poke around the code or build your own version:

1.  **Clone the repo**:
    ```bash
    git clone https://github.com/vrazlen/portfolio.git
    cd portfolio
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the dev server**:
    ```bash
    npm run dev
    ```

## 📝 License

Feel free to use this code as a starting point for your own portfolio!

---
*Built with ❤️ by Lenz Vrazda*
