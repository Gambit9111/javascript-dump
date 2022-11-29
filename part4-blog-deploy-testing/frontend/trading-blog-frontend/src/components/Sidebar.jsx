import { useState } from 'react'
import SidebarTop from './SidebarTop';
import SidebarBottom from './SidebarBottom';

function Sidebar () {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
    <button onClick={handleOpen} className="sm:hidden">OPEN</button>
    {open ?
      <div className="w-full sm:w-2/12 bg-blue-700 flex flex-col justify-between py-1 gap-1">
        {/* top controls */}
        <SidebarTop />
        {/* bottom */}
        <SidebarBottom />
      </div>
      : null}
    </>
  )
}

export default Sidebar