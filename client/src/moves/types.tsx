export type SalsaStyle = 'CUBAN' | 'COLOMBIAN' | 'ON_ONE' | 'ON_TWO'

export type MoveType = 'TURN' | 'STEP'

export type Move = {
  id: string,
  name: string,
  notes: string,
  style: SalsaStyle,
  type: MoveType,
}
