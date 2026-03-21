import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'

import Home from './home.jsx'
import Drawings from "./drawings.jsx"
import Animations from './animations.jsx'
import Other from './other.jsx'


const router = createBrowserRouter([

  {
    path: "/",
    element: <Home />,  //racine
  },


  {
    path: "/drawings",
    element: <Drawings />
  },

    {
    path: "/animations",
    element: <Animations />
  },

  {
    path: "/other",
    element: <Other />
  },


], {
  basename: "/oxfrz-art-gallery"
});


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>

)
