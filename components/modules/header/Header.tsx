import Nav from "./Nav"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <>
      <header className="bg-primary border-b border-solid border-white/10 w-full sticky top-0 z-40 lg:bg-white lg:border-light">
        <Nav />
        <MobileNav />
      </header>
    </>
  )
}

export default Header
