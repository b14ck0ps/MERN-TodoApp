import { useState, useEffect } from 'react'
import axios from 'axios'
function App() {

  const [todo, setTodo] = useState([])
  const [task, setTask] = useState('')


  const API_URL = 'http://localhost:5000/api'

  useEffect(() => {
    fetchTodo()
  }, [])

  async function fetchTodo() {
    const response = await axios.get(`${API_URL}/todo`)
    setTodo(response.data)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (task === '' || task === null) return
    try {
      const res = await axios.post(`${API_URL}/todo`, { task })

      if (res.status === 201) {
        fetchTodo()
        setTask('')
      }

    } catch (error) {
      console.log(error);
    }
  }

  async function setTaskAsDone(id) {
    try {
      await axios.put(`${API_URL}/todo`, { id })
      fetchTodo()
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteTask(id) {
    try {
      await axios.delete(`${API_URL}/todo/${id}`)
      fetchTodo()
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <main className='flex flex-col items-center mt-10'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center max-w-xl'>
        <input name='task' type="text" value={task} onChange={e => setTask(e.target.value)} placeholder="Enter Task..." className="mb-5 input input-bordered input-primary w-[300px] lg:w-[600px] focus:outline-none" />
        <button type='submit' className="w-1/2 btn btn-outline btn-primary">Add Task</button>
      </form>
      <div className="w-[400px] mt-5 overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todo.map((item) =>
              <tr key={item._id}>
                <td className={item.status ? "line-through" : ""}>{item.task}</td>
                <td>
                  {item.status ? <button className='w-20 px-2 text-white bg-red-500 border rounded-sm hover:bg-white hover:text-black hover:border-black' onClick={() => deleteTask(item._id)}>Delete</button> : <button className='w-20 px-2 text-white bg-black border rounded-sm hover:bg-white hover:text-black hover:border-black' onClick={() => setTaskAsDone(item._id)}>Done</button>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default App
