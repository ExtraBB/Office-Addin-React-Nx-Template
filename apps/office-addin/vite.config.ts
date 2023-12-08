/// <reference types='vitest' />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import officeAddin from 'vite-plugin-office-addin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { getHttpsServerOptions } from 'office-addin-dev-certs';

async function getHttpsOptions() {
  const httpsOptions = await getHttpsServerOptions();
  return {
    ca: httpsOptions.ca,
    key: httpsOptions.key,
    cert: httpsOptions.cert,
  };
}

export default defineConfig(async () => ({
  root: __dirname + '/src',
  cacheDir: '../../../node_modules/.vite/apps/office-addin',

  server: {
    port: 4200,
    host: 'localhost',
    https: await getHttpsOptions(),
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    officeAddin({
      devUrl: 'https://localhost:4200',
      prodUrl: 'https://www.contoso.com', // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../../dist/apps/office-addin',
    rollupOptions: {
      input: {
        taskpane: '/taskpane/taskpane.html',
        commands: '/commands/commands.html',
      },
    },
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/office-addin',
    },
  },
}));
