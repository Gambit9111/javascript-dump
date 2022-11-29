import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarAndCrescent } from '@fortawesome/free-solid-svg-icons'

function NavbarLogo() {
  return (
    <div className="sm:w-64 h-16 bg-yellow-950 flex items-center justify-center border-b-4 sm:border-0 border-blue-750">
      <span className="text-4xl pr-3">Trady</span>
      <FontAwesomeIcon icon={faStarAndCrescent} size="2x" />
    </div>
  );
}

export default NavbarLogo;