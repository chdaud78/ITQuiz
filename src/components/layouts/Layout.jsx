import Footer from '@/components/layouts/Footer.jsx'
import Header from '@/components/layouts/Header.jsx'

function Layout({ children }) {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
