const URL = "http://localhost:3000/messages"
const headers = { "Content-Type": "application/json" }

const postData = async (data = {}, url = URL) => {
  const response = await fetch(URL, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })

  return response.status === 200 ? response.json() : undefined
}
const getData = async (url = URL) => {
  const response = await fetch(URL, {
    method: "GET",
    headers,
  })

  return response.status === 200 ? response.json() : undefined
}

export { postData, getData }
