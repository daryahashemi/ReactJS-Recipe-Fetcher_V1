import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { DataContextProvider } from './context/DataContex'
import {  QueryClient, QueryClientProvider  } from 'react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <DataContextProvider>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <App />
      </QueryClientProvider>
    </DataContextProvider>
  </React.StrictMode>,
)
