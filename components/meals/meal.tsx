'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { scaleLinear } from 'd3-scale'
import { subMonths, format } from 'date-fns'
import { useResizeObserver } from 'usehooks-ts'
import { useAIState } from 'ai/rsc'

interface Meal {
  meal: string,
  calories: number,
  protein: number,
  fat: number,
  carbs: number
}

export function Meal({ props: { meal, calories, protein, fat, carbs } }: { props: Meal }) {
  const [aiState, setAIState] = useAIState()
  const id = useId()

  return (
    <div className="rounded-xl border bg-zinc-950 p-4 text-green-400">
      <div className="float-right inline-block rounded-full bg-white/10 px-2 py-1 text-xs">
        { meal }
      </div>
      <div className="text-lg text-zinc-300">{calories} Calories</div>
      <div className="text-lg text-zinc-300">{protein} Protein</div>
      <div className="text-3xl font-bold">{fat} Fat</div>
      <div className="text mt-1 text-xs text-zinc-500">{carbs} Carbs</div>
    </div>
  )
}
