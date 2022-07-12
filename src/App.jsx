import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function useAnimalSearch() {
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery')
    search(lastQuery)
  }, [])

  const search = async (q) => {
    const response = await fetch(
      `http://localhost:9898?${new URLSearchParams({ q })}`
    )
    const data = await response.json()
    setAnimals(data)

    localStorage.setItem('lastQuery', q)
  }

  return { search, animals }
}

function App() {
  const { search, animals } = useAnimalSearch()
  return (
    <main>
      <h1>Animal Farm</h1>

      <input
        type='text'
        name=''
        id=''
        placeholder='Search'
        onChange={(e) => search(e.target.value)}
      />
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <Animal {...animal} />
          </li>
        ))}

        {animals.length === 0 && 'No animals found'}
      </ul>
    </main>
  )
}

function Animal({ name, type, age }) {
  return (
    <>
      <strong>{type}</strong> {name} ({age} years old)
    </>
  )
}

export default App
