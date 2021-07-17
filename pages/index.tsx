import { useState } from "react"
import Axios from "axios";
import { v4 as uuid } from 'uuid';

const { post } = Axios.create({
  baseURL: "/api/"
})

interface LogItem {
  id: string;
  timestamp: Date;
  action: string;
  message: string;
}

function HomePage() {

  const [message, setMessage] = useState("")

  const [localEvents, setLocalEvents] = useState<LogItem[]>([])

  const sendMessage = async () => {
    setLocalEvents(s => [...s, { id: uuid(), timestamp: new Date(), action: 'sendMessage', message }])
    const { data } = await post("/sendMessage", { message })
    setLocalEvents(s => [...s, { id: uuid(), timestamp: new Date(), action: 'messageAdded', message }])
    console.log({ data })
  }

  return (
    <>
      <h1>Welcome to My Website!</h1>
      <label>Send Message</label>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage} >Submit</button>
      <h3>local Events</h3>
      <Log log={localEvents} />
    </>
  )
}

interface LogProps {
  log: LogItem[];
}

const Log = ({ log }: LogProps) => {
  const list = log.map((logItem) => (
    <span key={logItem.id} >{logItem.timestamp.toTimeString().slice(0,8)} {logItem.action} {logItem.message}</span>
  ))
  return (
    <div>
      {list}
    </div>
  )
}

export default HomePage