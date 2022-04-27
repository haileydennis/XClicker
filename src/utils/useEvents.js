
export const useEvents = () => {
  const winEvents = [
    'X-Town awarded you entity of the year, you receive',
    'X-Corp promoted you to mail room manager, you are awarded a bonus of',
    'You found a secret stash of Xs, pocketing', 
    'You discovered a new element: XxX! You decided to sell it to the government (sellout), receiving'
  ]

  const loseEvents = [
    'You were framed stealing from X\'s bank and have to pay a fine of',
    'Detective X caught you attempting to commit tax fraud and confiscated',
    'Da na na na na na na na da na na na na na na na X-Man!... led you into an alley and stole',
    'X marks the spot! Or at least that\'s where you hoped you would land... hospital fees cost you',
  ]

  const getWinEvent = () => {
    return winEvents[Math.floor(Math.random() * winEvents.length)];
  }

  const getLoseEvent = () => {
    return loseEvents[Math.floor(Math.random() * loseEvents.length)];
  }

  return [getWinEvent, getLoseEvent];
}