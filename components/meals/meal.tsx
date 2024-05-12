'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { scaleLinear } from 'd3-scale'
import { subMonths, format, sub } from 'date-fns'
import { useResizeObserver } from 'usehooks-ts'
import { useActions, useUIState, useAIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'

interface Meal {
  meal: string,
  calories: number,
  protein: number,
  fat: number,
  carbs: number,
  title: string,
  ingredients: string[],
  cookingInstructions: string[],
}

export function Meal({ props: { meal, calories, protein, fat, carbs, title, ingredients, cookingInstructions } }: { props: Meal }) {
  const [aiState, setAIState] = useAIState()
  const { submitUserMessage } = useActions()
  const [, setMessages] = useUIState<typeof AI>()
  const id = useId()
  const message = 'What is the price of $DOGE right now?';
  console.log('props', { meal, calories, protein, fat, carbs, title, ingredients, cookingInstructions })
  return (
    <div className="rounded-xl border bg-zinc-950 p-4 text-green-400">
      <div className="float-right inline-block rounded-full bg-white/10 px-2 py-1 text-xs">
        { meal }
      </div>
      <div className="text-lg text-zinc-300">{calories} Calories</div>
      <div className="text-lg text-zinc-300">{protein} Protein</div>
      <div className="text-3xl font-bold">{fat} Fat</div>
      <div className="text mt-1 text-xs text-zinc-500">{carbs} Carbs</div>
      <div className="text-lg text-zinc-300">{title}</div>
      <div className="text-sm text-zinc-500">Ingredients:</div>
      <ul className="list-disc list-inside text-xs text-zinc-500">
        {ingredients.map(ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <div className="text-sm text-zinc-500">Cooking Instructions:</div>
      <ul className="list-inside text-xs text-zinc-500">
        {cookingInstructions.map(instruction => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ul>

      {/* include a button that prompts the ai for a different recipe */}
      <button
        onClick={async () => {
          const response = await submitUserMessage('Get a new meal.');
          setMessages(currentMessages => [...currentMessages, response])
          console.log('response', response)
        }}
        className="mt-4 bg-green-400 text-black px-4 py-2 rounded-lg"
      >
        Get a different recipe
      </button>
    </div>
  )
}
