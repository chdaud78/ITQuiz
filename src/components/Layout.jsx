import Header from '@/components/Header.jsx'
import Footer from '@/components/Footer.jsx'

function Layout({ children }) {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />

      {/* Main */}
      <main className="p-4 flex-1">{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
