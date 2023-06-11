/*! SPDX-FileCopyrightText: 2023 Samuel Wu
 *
 * SPDX-License-Identifier: MIT
 */

import { Suspense, lazy, useState } from 'react'

import LoadList from '../LoadList'
import Loading from '../Loading'

import type { PlayerList } from '../hooks/useEloSystem'
import type { RankerResults } from '../Results'

const Ranker = lazy(async () => await import('../Ranker'))
const Results = lazy(async () => await import('../Results'))

function App (): JSX.Element {
  const [players, setPlayer] = useState<PlayerList | null>(null)
  const [results, setResults] = useState<RankerResults | null>(null)

  const getPlayers = (playerList: PlayerList | null): void => {
    setPlayer(playerList)
  }
  const getResults = (results: RankerResults | null): void => {
    setResults(results)
  }

  if (players == null) return <LoadList callback={getPlayers} />

  if (results == null) {
    return (
      <Suspense fallback={<Loading />}>
        <Ranker data={players} callback={getResults} />
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<Loading />}>
      <Results
        results={results} resetData={getPlayers} resetResults={getResults}
      />
    </Suspense>
  )
}

export default App