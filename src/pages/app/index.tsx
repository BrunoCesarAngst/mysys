import { Task } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { signOut, useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import prisma from '../../../lib/prisma'

type TasksProps = {
  tasks: Task[]
}

export default function App({ tasks }: TasksProps) {
  const { data: session } = useSession()

  const [newTask, setNewTask] = useState('')

  async function handleCreteTask(event: FormEvent) {
    event.preventDefault()

    await fetch('http://localhost:3000/api/tasks/create', {
      method: 'POST',
      body: JSON.stringify({ title: newTask }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <div>
      <h1>{`Seja bem vindo ${session?.user?.name}`}</h1>
      <button onClick={() => signOut()}>Sair</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <form onSubmit={handleCreteTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Cadatrar</button>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany()

  const data = tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      isDone: task.isDone,
      date: task.createdAt.toISOString(),
    }
  })

  return {
    props: {
      tasks: data,
    },
  }
}
