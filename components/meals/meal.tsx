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
  vegetarian?: boolean,
}

export function Meal({ props: { meal, calories, protein, fat, carbs, title, ingredients, cookingInstructions, vegetarian } }: { props: Meal }) {
  const [aiState, setAIState] = useAIState()
  const { submitUserMessage } = useActions()
  const [color, setColor] = useState('red');
  const [, setMessages] = useUIState<typeof AI>()
  const id = useId()
  const message = 'What is the price of $DOGE right now?';
  console.log('props', { meal, calories, protein, fat, carbs, title, ingredients, cookingInstructions })
  const meatOptions = ['Beef', 'Chicken', 'Pork', 'Turkey']
  const fishOptions = ['Fish', 'Salmon fillets', 'Tuna', 'Cod'];

  const bgGreen = "#F0FDFA";
  const headerGreen = "text-3xl font-bold text-green-600";
  const subheaderGreen = "text-sm text-zinc-500";
  const copyBtnGreen = "hover:bg-green rounded-full px-2 py-1 border";
  const recipeBtnGreen = "mt-4 bg-green-400 text-white px-4 py-2 rounded-lg";

  const bgRed = "#FEF2F2";
  const headerRed = "text-3xl font-bold text-red-600";
  const subheaderRed = "text-sm text-red-500";
  const copyBtnRed = "hover:bg-red rounded-full px-2 py-1 border";
  const recipeBtnRed = "mt-4 bg-red-400 text-white px-4 py-2 rounded-lg";

  const bgBlue = "#EFF6FF";
  const headerBlue = "text-3xl font-bold text-blue-600";
  const subheaderBlue = "text-sm text-blue-500";
  const copyBtnBlue = "hover:bg-blue rounded-full px-2 py-1 border";
  const recipeBtnBlue = "mt-4 bg-blue-400 text-white px-4 py-2 rounded-lg";

  useEffect(() => {
    if (vegetarian) {
      setColor('green')
    }
    if (
      ingredients.some(ingredient => meatOptions.includes(ingredient))
    ) {
      setColor('red')
    }
    if (
      ingredients.some(ingredient => fishOptions.includes(ingredient))
    ) {
      setColor('blue')
    }
  }, [vegetarian, ingredients])

  return (
    <div className="rounded-xl border p-4"
      style={{
        backgroundColor: color === 'green' ? bgGreen : color === 'red' ? bgRed : bgBlue,
      }}
    >
      <button
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify({ meal, calories, protein, fat, carbs, title, ingredients, cookingInstructions }))
        }}
        className= {color === 'green' ? copyBtnGreen : color === 'red' ? copyBtnRed : copyBtnBlue}
        style={{ 
          float: 'right',
          fontSize: '0.75rem',
        }}
      >
        Copy
      </button>
      <div className={
        color === 'green' ? headerGreen : color === 'red' ? headerRed : headerBlue}>{title}</div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-sm text-zinc-500">Ingredients:</div>
          <ul className="list-disc mb-6 list-inside text-xs text-zinc-500">
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
        </div>
        <div className="flex flex-col">
          <div className={
            color === 'green' ? subheaderGreen : color === 'red' ? subheaderRed : subheaderBlue
          }>{calories} Calories</div>
          <div className="text mt-1 text-xs text-zinc-500">{protein} Protein | {fat} Fat | {carbs} Carbs</div>
        </div>
      </div>
      <button
        onClick={async () => {
          const response = await submitUserMessage('Get a new meal.');
          setMessages(currentMessages => [...currentMessages, response])
          console.log('response', response)
        }}
        className={
          color === 'green' ? recipeBtnGreen : color === 'red' ? recipeBtnRed : recipeBtnBlue
        }
      >
        Get a different recipe
      </button>
    </div>
  )
}
