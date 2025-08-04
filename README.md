
# ARPassWizard

![License](https://img.shields.io/badge/license-MIT-blue.svg)

> A blazing fast React application powered by [Vite](https://vitejs.dev/) and modern development practices. Perfect for rapid development, prototyping, and deployment.

---

## 📝 Table of Contents

1. [ARPassWizard React App (LocalStorage)](#ar-passwizard-react-localStorage)
2. [Overview](#-overview)
3. [Prerequisites](#-prerequisites)
4. [Installation](#-installation)
5. [Running the Application](#-running-the-application)
6. [Project Structure](#-project-structure)
7. [Available Scripts](#-available-scripts)
8. [Deployment](#-deployment)
9. [Technologies Used](#-technologies-used)
10. [Contributing](#-contributing)
11. [License](#-license)

---

## 📖 Overview

This project is a React + Vite-based web application designed to save your url, username and password in your browsers localStorage.  
It emphasizes performance, fast refresh, minimal configuration, and ease of use.

**Key Features:**
- Lightning-fast development with Vite
- React with hooks and functional components

---

## ✅ Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 16.x)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- Git

Check versions:

```bash
node -v
npm -v
git --version
```

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Aamir-Rafique/ar-passwizard-react-localStorage.git
cd ar-passwizard-react-localStorage
npm install
# or
yarn install
# then 
npm i react-toastify
npm i uuid
```

---

## 🚀 Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev

```

Then open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 📁 Project Structure

```
ar-passwizard-react-localStorage/
├── public
    ├── images/
│   └── icons/
├── src/
│   ├── assets/
│   ├── components
            ├── Navbar.jsx
            ├── Manager.jsx
            └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── LICENSE
├── vite.config.js

```

---

## ⚙️ Available Scripts

| Script           | Description                           |
|------------------|---------------------------------------|
| `npm run dev`    | Runs app in development mode          |

---

## 🚢 Deployment

You can deploy this app using:

- **Vercel**
- **Netlify**
- **GitHub Pages**
- Any static host (upload the `dist/` folder after `npm run build`)

**Example (Vercel):**

1. Push your repo to GitHub
2. Link it in your [Vercel dashboard](https://vercel.com/)
3. Set `npm run build` as the build command
4. Set `dist` as the output directory

---

## 🛠 Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (optional)
- [React-toastify](https://fkhadra.github.io/react-toastify/introduction/)
- Browser localStorage for Storing data

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit them
4. Push to your fork (`git push origin feature/your-feature`)
5. Open a pull request

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) standard for commits.

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.

---

## 📷 Screenshots (Optional)

<p align="center">
  <img src="./public/images/SS-ARPassWizard.png" alt="App Screenshot" width="700" />
</p>

---

## 🙋‍♂️ Questions?

If you have any questions or suggestions, feel free to open an issue or reach out on (amirrafique6400@gmail.com), [LinkedIn](https://www.linkedin.com/in/aamir-rafique-7a5bb1336/), [GitHub](https://github.com/Aamir-Rafique).

---

> Made with ❤️ by Aamir-Rafique
