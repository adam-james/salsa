import React from 'react';
import './App.css';
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'http://localhost:4000/api/graphql'
})

type Task = {
  id: string,
  completed: boolean,
  description: string
}

const TaskListItem = ({ task }: { task: Task }) => {
  return (
    <li>{task.description} -- {task.completed ? 'done' : 'not done'}</li>
  )
}

const TASK_LIST = gql`
  {
    tasks {
      id,
      description,
      completed
    }
  }
`

type TaskListData = {
  tasks: Task[]
}

const TaskList = () => {
  const { loading, error, data } = useQuery<TaskListData>(TASK_LIST) 

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <ul>
      {data && data.tasks.map((task: Task) => {
        return (
          <TaskListItem task={task} key={task.id} />
        )
      })}
    </ul>
  )
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>TODOs</h2>
        <TaskList />
      </div>
    </ApolloProvider>
  );
}

export default App;
