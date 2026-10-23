import { Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Quality from './pages/Quality'
import ExportProcess from './pages/ExportProcess'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export const ROUTES = ['/', '/about', '/products', '/quality', '/export-process', '/gallery', '/contact']

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="quality" element={<Quality />} />
        <Route path="export-process" element={<ExportProcess />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
