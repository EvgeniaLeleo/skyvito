import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store/store'
// import { store } from './store'
// import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'
// import { SpinnerModal } from './components/SpinnerModal/SpinnerModal'
// import { SuspenseRouter } from './components/SuspenseRouter/SuspenseRouter'

import './index.css'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <SuspenseRouter> */}
      {/* <ScrollToTop /> */}
      <App />
      {/* </SuspenseRouter> */}
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
)
