// This is the configuration file for Vite, a build tool for modern web applications.
// It sets up the base path for the application and includes the React plugin for Vite.
// This configuration allows for efficient development and building of the frontend application.

// Vite configuration for the Chessfull frontend application.
// Vite is a modern build tool that provides fast development server with HMR (Hot Module Replacement).
// React plugin is included to enable JSX compilation.
// The base path is set to "/" for deployment on root of a domain.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
});
