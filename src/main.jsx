import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ProtectedRoute from './components/AuthLayout.jsx';
import AllPosts from './pages/AllPosts.jsx';
import AddPost from './pages/AddPost.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element:(
          <ProtectedRoute authenticated={false}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element:(
          <ProtectedRoute authenticated={false}>
            <Signup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/all-posts",
        element:(
          <ProtectedRoute authenticated={true}>
            <AllPosts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-posts",
        element:(
          <ProtectedRoute authenticated={true}>
            <AddPost />
          </ProtectedRoute>
        ),
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
  </StrictMode>,
)
