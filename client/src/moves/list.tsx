import React from 'react'
import { Link, RouteComponentProps } from '@reach/router'
import { Move } from './types'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const MoveListItem = ({ move }: { move: Move }) => {
  return (
    <li>{move.name} -- {move.type} -- {move.style}</li>
  )
}

export const MOVE_LIST = gql`
  {
    moves {
      id,
      name,
      notes,
      style,
      type
    }
  }
`

type MoveListData = {
  moves: Move[]
}

const MoveList = () => {
  const { loading, error, data } = useQuery<MoveListData>(MOVE_LIST) 

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <ul>
      {data && data.moves.map((move: Move) => {
        return (
          <MoveListItem move={move} key={move.id} />
        )
      })}
    </ul>
  )
}

const MovesList = (props: RouteComponentProps) => {
  return (
    <>
      <h2>Moves</h2>
      <Link to="/moves/new">New Move</Link>
      <MoveList />
    </>
  )
}

export default MovesList
