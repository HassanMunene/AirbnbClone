<div align="center">
   <img src="https://github.com/user-attachments/assets/deaff4bb-dab2-40d4-974f-98e17d57b633" alt="hi"/>
   <div>
      Live link - <a href="https://airbnb-clone-app-mu.vercel.app/">https://airbnb-clone-app-mu.vercel.app/</a>
   </div>
</div>

## 🗺️ map 
- [<code>📦 Cloning the application</code>](#-cloning-the-application)
- [<code>📦 Installing packages</code>](#-installing-packages)
- [<code>⚙️ Understanding the application structure</code>](#-understanding-application-structure)
- [<code>⚙️ Configuring .env file</code>](#-configuring-env)
- [<code>⚙️ Database setup</code>](#-database-setup)
- [<code>⚙️ Configuring NextAuth.js</code>](#-configuring-nextauth)
- [<code>🚀 Running the application locally</code>](#-running-the-application-locally)
- [<code>💾 Caching and Optimization</code>](#-caching-and-optimization)
- [<code>🌐 Updating dependencies</code>](#-updating-dependencies)
- [<code>📤 Deployment</code>](#-deployment)
- [<code>📝 License</code>](#-license)
- [<code>📢 Acknowledgments</code>](#-acknowledgments)


## 📦 Cloning the application
$${\color{#AC3097}Clone \space \color{#56565E}airbnb-clone-app}$$ 
```sh
git clone https://github.com/HassanMunene/airbnb_clone_app.git
```
After cloning, move into the project directory using the `cd` command:
```sh
cd airbnb_clone_app
```
$${\color{#AC3097}Deleting \space \color{#56565E}airbnb-clone-app}$$
```sh
rm -rf airbnb_clone_app
```

## 📦 Installing Packages
After cloning the repository, the next step is to install the required dependencies.
Ensure that you are in the project directory.

$${\color{#AC3097}Installing \space \color{#56565E}command}$$
```sh
npm install
```
The command above will read the package.json file and install all the dependencies required by the project.
If there are any issues during installation, make sure your Node.js version is up to date. You can check your version with:
```sh
node -v
```
The application typically works best with Node.js version 14.x or higher.
In case you face issues with specific packages, you can manually install them using:
```sh
npm install <package-name>
```
$${\color{#AC3097}Verifying \space \color{#56565E}installations}$$
This will list all installed packages to verify that everything is properly installed.
```sh
npm list
```













## 🚀 Introduction
This project is a clone of Airbnb, built using **Next.js App Router**, with authentication, listing management, and map integration features. The project is designed to demonstrate how to create a property listing application with a focus on full-stack development.

### Features:
- Property listing creation and management.
- User authentication with credentials, Google, and GitHub (NextAuth).
- Map integration using **React-Leaflet** for selecting and displaying property locations.
- State management with **Zustand**.
- Database management with **Prisma** and **MongoDB**.

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd airbnb-clone
