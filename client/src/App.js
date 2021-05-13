import { useState } from "react"
import { postData } from "./helpers/API"

const ShortPolling = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(message)
    postData({ message: message }).then((result) => {
      console.log(result)
    })
    setMessage("")
  }

  const [message, setMessage] = useState("")

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>New Message</label>
          <input
            className='form-control'
            rows='3'
            required
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>

        <button type='submit' className='btn btn-primary mb-3'>
          Send
        </button>
      </form>
    </div>
  )
}

function App() {
  return <ShortPolling />
}
export default App
