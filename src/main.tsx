import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { Router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={Router} />
)
