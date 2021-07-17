import { useState } from "react"
import Axios from "axios";

const { post } = Axios.create({
  baseURL: "/api/"
})

function HomePage() {

  const [message, setMessage] = useState("")

  const sendMessage = async () => {
    const { data } = await post("/sendMessage", { message })
    console.log({ data })
  }

  return (
    <>
      <h1>Welcome to My Website!</h1>
      <label>Send Message</label>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage} >Submit</button>
    </>
  )
}

export default HomePage