# `src` Directory

The `src` directory contains the main source code for the application.


## Overview of Each Subdirectory

### `app/`

The `app` directory is the heart of the application, containing all the routing and layout logic. Each folder within `app` typically represents a route, and can include nested routes, layouts, and page components.

- **Example**: 
  - `src/app/page.js` represents the root route (`/`).
  - `src/app/dashboard/page.js` represents the `/dashboard` route.

This directory also includes:
- **Layouts**: Shared layouts for multiple routes.

### `components/`

This folder contains all reusable React components. Components here are often used across different pages and parts of the app, helping to maintain a DRY (Don't Repeat Yourself) codebase.

- **Example**: A `Button` component that can be used across multiple routes.


### `store/`
This directory handles state management using Zustand. The state is organized into slices, which are combined into a single store, enabling a centralized state management system across the app.

- **Example**: 
  - `authSlice.js` manages authentication state.
  - `listingSlice.js` handles state related to listings.


