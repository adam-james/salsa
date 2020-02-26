import React, { useState } from 'react'
import { Link, RouteComponentProps } from '@reach/router'
import { Move } from './types'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { Label, Option, Select } from '../components/form'

// COMPONENTS
import styled from 'styled-components'

const Table = styled.table`
  width: 100%;
  text-align: left;
`

const TableHead = styled.thead``

const TableHeadRow = styled.tr``

const TH = styled.th``

const TableBody = styled.tbody``

const TableBodyRow = styled.tr``

const TD = styled.td``

type MoveTableProps = {
  moves: Move[]
}

const MoveTable = (props: MoveTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableHeadRow>
          <TH>Name</TH>
          <TH>Style</TH>
          <TH>Type</TH>
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {props.moves.map(move => {
          return (
            <TableBodyRow key={move.id}>
              <TD>{move.name}</TD>
              <TD>{move.style}</TD>
              <TD>{move.type}</TD>
            </TableBodyRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

type MoveFilterTableProps = {
  moves: Move[]
}

const MoveFilterTable = (props: MoveFilterTableProps) => {
  const [ moveType, setMoveType ] = useState('')
  const [ salsaStyle, setSalsaStyle ] = useState('')

  const moves: Move[] = props.moves.filter(m => {
    if (moveType && salsaStyle) {
      return m.style === salsaStyle && m.type === moveType
    }
    
    if (moveType) {
      return m.type === moveType
    }

    if (salsaStyle) {
      return m.style === salsaStyle
    }

    return true
  })

  return (
    <>
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
        <Option value=""></Option>
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
        <Option value=""></Option>
        <Option value="COLOMBIAN">Colombian</Option>
        <Option value="CUBAN">Cuban</Option>
        <Option value="ON_ONE">On One</Option>
        <Option value="ON_TWO">On Two</Option>
      </Select>

      <MoveTable moves={moves} />
    </>
  )
}

const PageContainer = styled.div`
  padding: 16px;
`

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

  if (data) {
    return <MoveFilterTable moves={data.moves} />
  }

  return null
}

const MovesList = (props: RouteComponentProps) => {
  return (
    <PageContainer>
      <h2>Moves</h2>
      <Link to="/moves/new">New Move</Link>
      <MoveList />
    </PageContainer>
  )
}

export default MovesList
