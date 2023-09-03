import ReactStripe from './components/reactstripe'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Success from './transactionpages/success'
import Cancel from './transactionpages/cancel'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<ReactStripe/>} />
      <Route path="/success" element={<Success /> } />
      <Route path="/cancel" element={<Cancel />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App