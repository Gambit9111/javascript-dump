import NavbarControls from "./NavbarControls";
import NavbarLogo from "./NavbarLogo";

function Navbar({ user }) {
  return (
    <div className="h-32 sm:h-16 w-full flex flex-col sm:flex-row justify-between bg-blue-950">
      <NavbarLogo />
      {user === null ? null : <NavbarControls />}
    </div>
  );
}

export default Navbar;