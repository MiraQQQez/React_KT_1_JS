import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import store from './store/store'
import { fetchTeachers } from './store/teachersSlice'
import { worker } from './server'

if (import.meta.env.DEV) {
  worker.start().then(() => {
    void store.dispatch(fetchTeachers())
  })
} else {
  void store.dispatch(fetchTeachers())
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
