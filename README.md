<div align="center">
   <img src="https://github.com/user-attachments/assets/deaff4bb-dab2-40d4-974f-98e17d57b633" alt="hi"/>
   <div>
      Live link - <a href="https://airbnb-clone-app-mu.vercel.app/">https://airbnb-clone-app-mu.vercel.app/</a>
   </div>
</div>

## 🗺️ map 
- [<code>📦 Cloning the application</code>](#-cloning-the-application)
- [<code>📦 Installing packages</code>](#-installing-packages)
- [<code>⚙️ Database setup</code>](#-database-setup)
- [<code>⚙️ Configuring NextAuth.js</code>](#-configuring-nextauth)
- [<code>⚙️ Understanding the application structure</code>](#-understanding-application-structure)
- [<code>🚀 Running the application locally</code>](#-running-the-application-locally)
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

## ⚙️ Database Setup


This project uses **Prisma** as the ORM and **MongoDB** as the database. Follow the steps below to set up your database and Prisma schema.

### Step 1: Configure Prisma with MongoDB

1. **Install Prisma and the Prisma MongoDB connector**:
   If you haven't already installed Prisma, run the following commands:
   ```bash
   npm install prisma --save-dev
   npm install @prisma/client
   ```
### Step 2: Initialize prisma
run the following command
```sh
npx prisma init
```
This will create a prisma/ directory with a schema.prisma file and a .env file for the database URL. These files already exist in the project but I think
its best you understand how they go there. 

### Step 3: Update the DATABASE_URL in .env
If you dont have a mongodb account, then you will have to create one because you will need it to store your data. You can follow a tutorial to see how to create
one. 
```sh
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/airbnb"
```

### Step 4: Define prisma schema
These have already been defined in the application and this is how the file looks like
```sh
prisma/schema.prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  name String?
  email String? @unique
  emailVerified DateTime?
  image String?    @default("https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg")
  hashedPassword String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  favoriteListingsIds String[] @db.ObjectId

  accounts Account[]
  listings Listing[]
  reservations Reservation[]
}

model Account {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  userId String @db.ObjectId
  type String
  provider String
  providerAccountId String
  refresh_token String? @db.String
  access_token String? @db.String
  expires_at Int?
  token_type String?
  scope String?
  id_token String? @db.String
  session_state String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Listing {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  userId String @db.ObjectId
  title String
  description String
  imageSrc String
  createdAt DateTime @default(now())
  category String
  roomCount Int
  bathroomCount Int
  guestCount Int
  locationValue String
  price Int

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  reservations Reservation[]
}

model Reservation {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  userId String @db.ObjectId
  listingId String @db.ObjectId
  startDate DateTime
  endDate DateTime
  totalPrice Int
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  listing Listing @relation(fields: [listingId], references: [id], onDelete: Cascade)
}
```
### Step 5: Generate prisma client
```sh
npx prisma generate
```
This command will create the necessary Prisma client files in your node_modules/@prisma/client/ directory, allowing you to interact with your database in the application.


## ⚙️ Configuring NextAuth.js

This project uses **NextAuth.js** for handling authentication. NextAuth allows users to log in using credentials, Google, or GitHub. Follow the steps below to configure it properly.

### Step 1: Install NextAuth.js

when you installed packages it was one of the packages you installed so the only thing remaining is to set up the environment variable as oultined below
```sh
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

NEXTAUTH_SECRET_KEY="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```
These values will be used for GitHub and Google OAuth authentication.
The following below is the API route we are using for authentication in this application
```sh
airbnb_clone_app/src/app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismaClient from "@/app/libs/prismadb";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authenticationOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'},
            },
            async authorize(credentials) {
                console.log('yoo')
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }
                const user = await prismaClient.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }
                return user;
            }
        }),
    ],
    pages: {
        signIn: '/',  // Custom sign-in page
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET_KEY,
}

const handler = NextAuth(authenticationOptions)

export { handler as GET, handler as POST }

```
With these steps, you’ll have NextAuth.js properly configured for authentication in your app, including GitHub, Google, and credentials-based sign-ins.




## ⚙️ Understanding the application structure

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


## 🚀 Running the Application Locally
Once you’ve configured your environment variables and set up the database, you’re ready to run the application locally. Follow the steps below:

### Step 1: Ensure Dependencies are Installed

Make sure that all necessary dependencies have been installed by running:

```bash
npm install
```
This will install any missing packages listed in the package.json file.

### Step 2: Run the Development Server
```sh
npm run dev
```
This will start the application in development mode and allow hot-reloading as you make changes.

### Step 3: Access the application
```sh
http://localhost:3000
```

### Step 4: Verify database connection
Ensure that your application is successfully connected to the MongoDB database by verifying that you can perform actions like:

    Registering a new user.
    Creating a new listing.
    Viewing existing listings.

If there are any issues, check the .env file for correct database credentials.

By following these steps, you will have the application running on your local machine for development. Make sure to test key features like authentication, listing creation, and reservations to verify everything is working as expected.


## 📤 Deployment

Once your application is ready for production, you can deploy it on platforms like **Vercel**, which works seamlessly with Next.js. Below are the steps to deploy the application.

### Step 1: Setup Environment Variables on Vercel

1. Go to your project settings in Vercel.
2. Under the **Environment Variables** section, add the same environment variables from your local `.env` file, such as:
   - `DATABASE_URL`
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_SECRET_KEY`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

### Step 2: Deploy to Vercel

1. Push your code to GitHub (or any Git provider).
2. Sign in to [Vercel](https://vercel.com/).
3. Import your GitHub repository into Vercel.
4. Vercel will automatically detect your Next.js project and provide the necessary settings for deployment.
5. Click **Deploy**.

### Step 3: Testing the Production Build

Once deployed, your app will be live, and you can visit it using the production URL provided by Vercel. Verify that:
- All routes are working as expected.
- Authentication with Google and GitHub works.
- Listings, reservations, and user data are properly fetched from MongoDB.

By following these steps, you can easily deploy and manage your Airbnb clone on Vercel or any other platform of your choice.

## 📝 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this software as long as the original copyright notice and this permission notice are included in all copies or substantial portions of the software.

## 📢 Acknowledgments

I would like to acknowledge the following resources and individuals for their contributions and support throughout the development of this project:

- **Next.js** – for providing a robust framework to build this full-stack application. [Next.js Documentation](https://nextjs.org/docs)
- **Prisma** – for simplifying database interactions with MongoDB. [Prisma Documentation](https://www.prisma.io/docs)
- **MongoDB** – for offering a scalable and flexible database solution. [MongoDB Documentation](https://docs.mongodb.com/)
- **NextAuth.js** – for handling authentication with ease. [NextAuth.js Documentation](https://next-auth.js.org/)
- **Zustand** – for lightweight and efficient state management. [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- **React-Leaflet** – for providing map integration capabilities. [React-Leaflet Documentation](https://react-leaflet.js.org/)
- **Cloudinary** – for image storage and management. [Cloudinary Documentation](https://cloudinary.com/documentation)
- **My friends and family** – for their continuous encouragement and feedback throughout the project development.

Special thanks to **[Antonio Erdeljac](https://github.com/AntonioErdeljac)** for guiding me through this process. He is a great tutor, and his mentorship played a significant role in shaping this project.

---

#### $${\color{#AC3097}airbnb-clone-app \space \color{#56565E}is \space  made  \space  by  \space  \color{#FF99EE} @HassanMunene \color{#56565E} \space with \space \color{red} ❤️}$$





