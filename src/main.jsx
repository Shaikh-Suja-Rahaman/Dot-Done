import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './Router.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import { TodoProvider } from './context/TodoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <TodoProvider>
        <RouterProvider router={router} />
      </TodoProvider>
    </AuthContextProvider>
  </StrictMode>,
)
