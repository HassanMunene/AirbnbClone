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
$${\color{#AC3097}Verify \space \color{#56565E}packages}$$
```sh
npm list
```
As of september 2024, these are the packages that I have in this application and their versions
```sh
── @next-auth/prisma-adapter@1.0.7
├── @prisma/client@5.19.0
├── @react-icons/all-files@4.1.0
├── autoprefixer@10.4.20
├── axios@1.7.5
├── bcrypt@5.1.1
├── date-fns@3.6.0
├── eslint-config-next@14.2.6
├── eslint@8.57.0
├── leaflet@1.9.4
├── next-auth@4.24.7
├── next-cloudinary@6.12.0
├── next@14.2.6
├── postcss@8.4.41
├── prisma@5.19.0
├── query-string@9.1.0
├── react-date-range@2.0.1
├── react-dom@18.3.1
├── react-hook-form@7.53.0
├── react-hot-toast@2.4.1
├── react-icons@5.3.0
├── react-leaflet@4.2.1
├── react-select@5.8.0
├── react-spinners@0.14.1
├── react@18.3.1
├── sharp@0.33.5
├── tailwindcss@3.4.10
├── world-countries@5.0.0
└── zustand@4.5.5
```

## ⚙️ Understanding the Application Structure

This airbnb clone follows the Next.js **App Router** structure, with all major files located within the `src/` directory. Below is an overview of the key directories and their purposes.
### Key Directories and Files:

- **`/src/app/`**:
  - Houses the routing logic using the **Next.js App Router**.
  - Contains dynamic routing for pages like `listings/`, `profile/`, and more.
  - Each folder represents a route, and `page.js` files represent the components rendered at each route.
  - Includes layout components, which manage shared layouts like the navbar or footers.

- **`/src/components/`**:
  - Stores reusable UI components used across multiple pages.
  - Examples:
    - `Navbar.js`: Manages the navigation bar that appears throughout the app.
    - `CreateListingModal.js`: A modal used for creating new property listings.

