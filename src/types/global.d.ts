/// <reference types="vite/client" />

declare global {
  interface Window {
    /**
     * Navigate to the auth page with a custom redirect URL
     * @param redirectUrl - URL to redirect to after successful authentication
     */
    navigateToAuth: (redirectUrl: string) => void;
  }

  // allow importing plain CSS files
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// environment variables provided by Vite
interface ImportMetaEnv {
  readonly VITE_APP_VERSION?: string;
  readonly VITE_BUILD_DATE?: string;
  readonly VITE_DEBUG_MODE?: string;
  readonly DEV?: boolean;
  readonly PROD?: boolean;
  // add additional keys as needed, or allow any string
  readonly [key: string]: string | boolean | undefined;
}

declare module "*.css";

enum ViteEnvExample {}

export {};