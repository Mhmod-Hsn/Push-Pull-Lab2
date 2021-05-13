import { useEffect, useState } from "react"
// import { getData } from "./helpers/API"

function Messages() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/subscribe")

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data)
      console.log(data)
      setMessages((prev) => prev.concat(data))
    }
  }, [])

  if (messages.length) {
    return messages.map((message) => {
      console.log(message)
      return (
        <div className='card p-1 my-1'>
          <p key={message.id} className='mb-0'>
            {message.text}
          </p>
        </div>
      )
    })
  } else {
    return <div className='alert alert-info'>No Messages yet</div>
  }
}
export default Messages
