import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

type MoveType = 'TURN' | 'STEP'

type Move = {
  id: string,
  name: string,
  notes: string,
  type: MoveType
}

const MoveListItem = ({ move }: { move: Move }) => {
  return (
    <li>{move.name} -- {move.type}</li>
  )
}

const MOVE_LIST = gql`
  {
    moves {
      id,
      name,
      notes,
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

const Moves = () => {
  return (
    <section className="moves">
      <h2>Moves</h2>
      <MoveList />
    </section>
  )
}

export default Moves
