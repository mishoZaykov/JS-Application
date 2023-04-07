const baseUrl = 'http://localhost:3030/data/movies'

export  const getAll = () =>{
  return fetch(baseUrl).then(res => res.json())
}