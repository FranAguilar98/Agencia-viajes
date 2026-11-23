import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Configuración de Vite: React + Tailwind CSS v4 + Vitest (pruebas)
export default defineConfig(({ command }) => ({
    // Ruta base: solo al publicar (build) es el nombre del repositorio;
    // en desarrollo (npm run dev) el sitio abre en http://localhost:5173/
    base: command === 'build' ? '/Agencia-viajes/' : '/',
    plugins: [react(), tailwindcss()],
    test: {
        // jsdom simula el navegador para probar componentes
        environment: 'jsdom',
        // La URL base permite que MSW resuelva rutas como /api/destinos
        environmentOptions: { jsdom: { url: 'http://localhost:3000' } },
        setupFiles: ['./test/setup.js'],
        globals: true
    }
}))