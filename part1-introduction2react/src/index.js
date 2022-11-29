import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './AppRandomAnecdote'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)


// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import App from './App3'

// let counter = 1

// const refresh = () => {
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <App counter={counter} />
//   )
// }

// setInterval(() => {
//     refresh()
//     counter += 1
//   }, 1000)