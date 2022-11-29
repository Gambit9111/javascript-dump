import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCalculator, faUserNinja, faDollarSign } from '@fortawesome/free-solid-svg-icons'

function NavbarControls() {
  return (
    <div className="sm:w-96 h-16 bg-yellow-950">
      <div className="w-full h-full flex gap-2 justify-center items-center">
        <button className="w-24 h-10 border-solid border-2 border-blue-850"><FontAwesomeIcon icon={faDollarSign} />Account</button>
        <button className="w-12 h-10 border-solid border-2 border-blue-850"><FontAwesomeIcon icon={faCalculator} /></button>
        <button className="w-12 h-10 border-solid border-2 border-blue-850"><FontAwesomeIcon icon={faCoffee} /></button>
        <button className="w-32 h-10 border-solid border-2 border-blue-850">Profile <FontAwesomeIcon icon={faUserNinja } size="lg"/></button>
      </div>
    </div>
  );
}

export default NavbarControls;