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

### `/src/app/` Directory Breakdown:

- **`/actions/`**:
  - Contains functions for fetching data such as user, listings, and reservations.
  - Example files:
    - `getCurrentUser.js`: Fetches the current logged-in user.
    - `getFavoriteListings.js`: Retrieves favorite listings for the user.
    - `getListings.js`: Retrieves all available property listings depending on the parameters passed.

- **`/api/`**:
  - Houses API routes using the **Next.js App Router** for handling backend requests.
  - Example structure:
    - **`/auth/`**: Contains routes for handling authentication using NextAuth (e.g., `route.js` for login).
    - **`/listings/`**: Handles CRUD operations for listings, including individual listing operations.
    - **`/favorites/`**: API routes for handling favorite listings.
    - **`/reservations/`**: API routes for managing user reservations.

- **`/hooks/`**:
  - Custom React hooks for reusing logic across components.
  - Example hooks:
    - `useCountries.js`: Hook for handling country selection.
    - `useFavorite.js`: Hook for managing favorite listings.
    - `useCreateListingModal.js`: Hook to control the create listing modal behavior.

- **`/libs/`**:
  - Contains libraries and utility functions.
  - Example:
    - `prismadb.js`: Sets up the connection to the Prisma database.

- **`/listings/`**:
  - Handles individual listing pages.
  - Example files:
    - `ListingPageComponent.jsx`: Component to display detailed information about a single listing.
    - `page.jsx`: Renders the main listing page.

- **`/my_favorites/`**:
  - Handles the user’s favorite listings page.
  - Example files:
    - `FavoriteListingsPageComponent.jsx`: Component to display favorite listings.
    - `page.jsx`: Entry point for the favorites page.

- **`/my_properties/`**:
  - Manages the user’s properties.
  - Example files:
    - `MyPropertiesPageComponent.jsx`: Displays a list of properties created by the user.
    - `page.jsx`: Main entry for the properties page.

- **`/my_reservations/`**:
  - Manages the user’s reservations.
  - Example files:
    - `ReservationPageComponent.jsx`: Displays reservation details.
    - `page.jsx`: Entry point for the reservations page.

- **`/trips/`**:
  - Manages the user’s trips.
  - Example files:
    - `TripsPageComponent.jsx`: Component to display a list of trips.
    - `page.jsx`: Entry point for the trips page.tions.

### Other Important Files:
- **`layout.js`**: Manages the overall layout structure, such as the navbar and footer, applied across all pages.
- **`page.jsx`**: The entry point for the homepage.
- **`globals.css`**: Global CSS for the entire application.
- **`loading.jsx`**: Loading state component that displays during data fetching.
- **`error.jsx`**: Custom error handling component.
- **`favicon.ico`**: Favicon for the application.


### `/src/components/` Directory:

- **`/common/`**:
  - Reusable UI components that can be used across the app.
  - Example components:
    - `Button.jsx`: A general button component used throughout the app.
    - `CategoryBox.jsx`: Displays category-related UI elements.
    - `ImageUploadComponent.jsx`: Handles image uploads for listings.

- **`/listings/`**:
  - Components specifically related to listing functionalities.
  - Example components:
    - `ListingCard.jsx`: Displays an individual listing card.
    - `ListingHead.jsx`: Displays the header for a listing page, including images and titles.

- **`/map/`**:
  - Contains map-related components.
  - Example:
    - `Map.jsx`: Handles the display and interaction with maps using Leaflet.

- **`/modals/`**:
  - Manages modal components used for various actions.
  - Example:
    - `CreateListingModal.jsx`: Modal for users to create new property listings.
    - `LoginModal.jsx`: Modal for user login.

- **`/navbar/`**:
  - Components used in the navigation bar.
  - Example:
    - `Navbar.jsx`: The main navigation bar.
    - `UserMenu.jsx`: Displays user options like profile or logout in the navbar.
    - 
### `/src/svg/` Directory:

- **`airbnb-logo.jsx`**: Contains the SVG for the full Airbnb logo.
- **`airbnb-logo-short.jsx`**: Contains the SVG for the short version of the Airbnb logo.



