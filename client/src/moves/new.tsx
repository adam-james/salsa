import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import {
  Link,
  navigate,
  RouteComponentProps
} from '@reach/router'
import { gql } from 'apollo-boost'
import { Move } from './types'
import {
  Button,
  Form,
  Input,
  Label,
  Option,
  Select,
  Textarea
} from '../components/form'
import { MOVE_LIST } from './list'

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

    navigate('/')
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

const MovesNew = (props: RouteComponentProps) => {
  return (
    <>
      <h2>New Move</h2>
      <Link to="/">Back</Link>
      <MoveForm />
    </>
  )
}

export default MovesNew
