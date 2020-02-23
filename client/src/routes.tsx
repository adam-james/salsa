import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'
import {
  MovesList,
  MovesNew
} from './moves'

const Routes = () => (
  <Router>
    <MovesList path="/" />
    <MovesNew path="/moves/new" />
  </Router>
)

export default Routes
