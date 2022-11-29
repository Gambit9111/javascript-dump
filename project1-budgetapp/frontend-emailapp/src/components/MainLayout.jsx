import SideNav from "./SideNav"
import Main from "./Main"

export default function MainLayout() {
  return(
    // sets widht to half of screen
    <div className="w-10/12 flex h-[90vh] bg-blue-200">
      <SideNav />
      <Main />
    </div>
  )
}