import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

type SalsaStyle = 'CUBAN' | 'COLOMBIAN' | 'ON_ONE' | 'ON_TWO'
type MoveType = 'TURN' | 'STEP'

type Move = {
  id: string,
  name: string,
  notes: string,
  style: SalsaStyle,
  type: MoveType,
}

const MoveListItem = ({ move }: { move: Move }) => {
  return (
    <li>{move.name} -- {move.type} -- {move.style}</li>
  )
}

const MOVE_LIST = gql`
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

const ADD_MOVE = gql`
  mutation($type: MoveType!, $name: String!, $notes: String!, $style: SalsaStyle!) {
    createMove(type: $type, name: $name, notes: $notes, style: $style) {
      id,
      name,
      notes,
      style,
      type
    }
  }
`

const MoveForm = () => {
  const [ name, setName ] = useState('')
  const [ notes, setNotes ] = useState('')
  const [ moveType, setMoveType ] = useState('STEP')
  const [ salsaStyle, setSalsaStyle ] = useState('COLOMBIAN')

  const [ addMove, _ ] = useMutation(
    ADD_MOVE,
    {
      update(cache, { data: { createMove } }) {
        const result = cache.readQuery<{moves: Move[]}>({ query: MOVE_LIST })
        if (result) {
          cache.writeQuery({
            query: MOVE_LIST,
            data: { moves: [...result.moves, createMove] }
          })
        }
      }
    }
  )

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const variables = { name, notes, type: moveType, style: salsaStyle }
    addMove({ variables })

    setName('')
    setNotes('')
    setMoveType('STEP')
    setSalsaStyle('COLOMBIAN')
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target
          setName(value)
        }}
      />

      <label htmlFor="notes">Notes</label>
      <textarea
        name="notes"
        id="notes"
        value={notes}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const { value } = e.target
          setNotes(value)
        }}
      />

      <label htmlFor="type">Type</label>
      <select
        name="type"
        id="type"
        value={moveType}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const { value } = e.target
          setMoveType(value)
        }}
      >
        <option value="STEP">Step</option>
        <option value="TURN">Turn</option>
      </select>

      <label htmlFor="style">Style</label>
      <select
        name="style"
        id="style"
        value={salsaStyle}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const { value } = e.target
          setSalsaStyle(value)
        }}
      >
        <option value="COLOMBIAN">Colombian</option>
        <option value="CUBAN">Cuban</option>
        <option value="ON_ONE">On One</option>
        <option value="ON_TWO">On Two</option>
      </select>

      <button>Save</button>
    </form>
  )
}

const Moves = () => {
  return (
    <section className="moves">
      <h2>Moves</h2>
      <MoveForm />
      <MoveList />
    </section>
  )
}

export default Moves
