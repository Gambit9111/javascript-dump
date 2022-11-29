import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCalculator, faUserNinja, faDollarSign, faStarAndCrescent } from '@fortawesome/free-solid-svg-icons'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import LoginForm from './components/LoginForm'
import AllAccounts from './components/AllAccounts'
import { useState, useEffect } from 'react'
import loginService from '../services/login'
import usersService from '../services/users'
import trading_accountsService from '../services/trading_accounts'

function App() {
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [trading_accounts, setTrading_accounts] = useState([])

  useEffect(() => {
    trading_accountsService.getAll().then(trading_accounts => {
      setTrading_accounts(trading_accounts)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTradyUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      trading_accountsService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        email, password,
      })

      window.localStorage.setItem(
        'loggedTradyUser', JSON.stringify(user)
      ) 

      trading_accountsService.setToken(user.token)
      setUser(user)
      setEmail('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    // main layout
    <div className="h-screen w-sceen bg-blue-950 bg-opacity-95">

      {/* navbar */}
      <Navbar user={user}/>

      {/* main content */}
      <div className="flex flex-col sm:flex-row w-full h-[90vh]  bg-blue-400">

        {/* sidebar */}
        {user && <Sidebar />}

        {/* main content */}
        <div className="w-full h-full flex flex-col sm:w-10/12 bg-blue-750">

          <h1 className='text-2xl text-white'>CONTENT</h1>
          {/* map the users */}

          {user === null ?
            <LoginForm handleLogin={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
            :
            <AllAccounts trading_accounts={trading_accounts} />
          }

          {user && <p className='text-white'>{user.token}</p>}

        </div>
      </div>
    </div>
  );
}

export default App;