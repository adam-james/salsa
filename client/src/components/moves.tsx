import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  Button,
  Form,
  Input,
  Label,
  Option,
  Select,
  Textarea
} from './form'

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
    <Form onSubmit={onSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target
          setName(value)
        }}
      />

      <Label htmlFor="notes">Notes</Label>
      <Textarea
        name="notes"
        id="notes"
        value={notes}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const { value } = e.target
          setNotes(value)
        }}
      />

      <Label htmlFor="type">Type</Label>
      <Select
        name="type"
        id="type"
        value={moveType}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const { value } = e.target
          setMoveType(value)
        }}
      >
        <Option value="STEP">Step</Option>
        <Option value="TURN">Turn</Option>
      </Select>

      <Label htmlFor="style">Style</Label>
      <Select
        name="style"
        id="style"
        value={salsaStyle}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const { value } = e.target
          setSalsaStyle(value)
        }}
      >
        <Option value="COLOMBIAN">Colombian</Option>
        <Option value="CUBAN">Cuban</Option>
        <Option value="ON_ONE">On One</Option>
        <Option value="ON_TWO">On Two</Option>
      </Select>

      <Button>Save</Button>
    </Form>
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
