const genericBacklog = [
  {
    id: 'test',
    instance: '0'
  },
  {
    id: 'hero',
    instance: '0'
  },
  {
    id: 'monster',
    instance: '0'
  },
  {
    id: 'pawn',
    instance: '0'
  },
  {
    id: 'beast',
    instance: '0'
  }
]

const opponentBacklog = {
  leftOpponentBacklog: genericBacklog.slice(),
  middleOpponentBacklog: genericBacklog.slice(),
  rightOpponentBacklog: genericBacklog.slice(),
}

export default opponentBacklog;