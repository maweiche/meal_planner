import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue,
  render
} from 'ai/rsc'
// import { openai } from '@ai-sdk/openai'
import OpenAI from 'openai'
import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
  Stock,
  Purchase
} from '@/components/stocks'
import { Meal } from '@/components/meals/meal'
import { MealPlan } from '@/components/meals/mealPlan'
import { z } from 'zod'
import { EventsSkeleton } from '@/components/stocks/events-skeleton'
import { Events } from '@/components/stocks/events'
import { StocksSkeleton } from '@/components/stocks/stocks-skeleton'
import { Stocks } from '@/components/stocks/stocks'
import { StockSkeleton } from '@/components/stocks/stock-skeleton'
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat } from '@/lib/types'
import { auth } from '@/auth'
import { Session } from 'next-auth'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

async function confirmPurchase(symbol: string, price: number, amount: number) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  const purchasing = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>
  )

  const systemMessage = createStreamableUI(null)

  runAsyncFnWithoutBlocking(async () => {
    await sleep(1000)

    purchasing.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">
          Purchasing {amount} ${symbol}... working on it...
        </p>
      </div>
    )

    await sleep(1000)

    purchasing.done(
      <div>
        <p className="mb-2">
          You have successfully purchased {amount} ${symbol}. Total cost:{' '}
          {formatNumber(amount * price)}
        </p>
      </div>
    )

    systemMessage.done(
      <SystemMessage>
        You have purchased {amount} shares of {symbol} at ${price}. Total cost ={' '}
        {formatNumber(amount * price)}.
      </SystemMessage>
    )

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages.slice(0, -1),
        {
          id: nanoid(),
          role: 'function',
          name: 'showStockPurchase',
          content: JSON.stringify({
            symbol,
            price,
            defaultAmount: amount,
            status: 'completed'
          })
        },
        {
          id: nanoid(),
          role: 'system',
          content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${
            amount * price
          }]`
        }
      ]
    })
  })

  return {
    purchasingUI: purchasing.value,
    newMessage: {
      id: nanoid(),
      display: systemMessage.value
    }
  }
}

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()
  console.log('submitUserMessage', content)
  console.log('aiState', aiState.get())
  aiState.update({
    ...aiState.get(),
    saved: false,
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode
  console.log('about to start streamUI', ...aiState.get().messages)
  const ui = render({
    model: 'gpt-3.5-turbo',
    provider: openai,
    initial: <SpinnerMessage />,
    messages: [ 
      {
        role: 'system',
        content: `\
          You are a Health Coach who specializes in designing nutritous meal plans based on the users needs, wants, and allegeries.
          The My Plate Method is an example of a balanced meal with all three macros (protein, carbs, and fat), along with fruits and vegetables.
          Your goal is to provide meals that follow the My Plate method along with user preferences.
      
          As a Health Coach you can provide meal plans, recipes, and nutritional information to the user,
          but you cannot provide medical advice or diagnose any medical conditions.
      
          You are also not meant to provide any solutions to health-conditions, but you can provide general advice on how to eat healthier.
  
          Messages inside [] means that it's a UI element or a user event. For example:
          - "[I'm allergic to tree nuts]" means that the meal plan should remove or subsitute any ingredients or meals that include the stated allergy.
          - "[I am a vegetarian]" means that the user is a vegetarian and should adjust the meal plan to not include meat or any animal derived ingredients.

          For any requests that use get_meal_plan with preferences call \`get_meal_plan\` to get a meal plan based on their preferences and goals. Please make sure to include the correct amount of meals based on the total defined.

          All meals returned should display the name of the dish (i.e. Chicken Alfredo), the ingredients, and the recipe.
          You should always provide the user with nutrional information of a meal recomennded, call \`get_nutritional_info\` to get the information.
                
          If the user wants to complete another impossible task, respond that you are a demo and cannot do that.

          Besides that, you can also chat with users and create custom meal plans if needed.
        `
      },
    
      ...aiState.get().messages.map((message: any) => ({
        role: message.role ? message.role : 'assistant',
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        let state = aiState.get()
        console.log('state', state.saved)
        state.messages = [
          ...state.messages,
          {
            id: nanoid(),
            role: 'assistant',
            content
          }
        ]
        console.log('done***', state.messages)
        if (!state.saved) {
          console.log('state', state.messages)
          // Check if not already saved
          addOrUpdateChat(state) // Save if this is the final response
          state.saved = true
        }
        aiState.done({ ...state, saved: true })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    functions: {
      getNutritionalInfo: {
        description:
          'Get the nutritional information of a meal. Use this to show the nutritional information to the user. Provide the title of the meal being queried along with the cooking instructions and ingredients.',
        parameters: z.object({
          meal: z.string().describe('The name of the meal'),
          calories: z.number().describe('The calories of the meal'),
          protein: z.number().describe('The protein of the meal'),
          fat: z.number().describe('The fat of the meal'),
          carbs: z.number().describe('The carbs of the meal'),
          title: z.string().describe('The title of the dish, i.e. "Chicken Alfredo"'),
          ingredients: z.array(z.string()).describe('The ingredients of the meal'),
          cookingInstructions: z.array(z.string()).describe('The cooking instructions of the meal')
        }),
        render: async function* ({ meal, calories, protein, fat, carbs, title, ingredients, cookingInstructions }) {
          yield (
            <BotCard>
              <StockSkeleton />
            </BotCard>
          )

          await sleep(1000)
          
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'getNutritionalInfo',
                content: JSON.stringify({ meal, calories, protein, fat, carbs, title, ingredients, cookingInstructions})
              }
            ]
          })

          let state = aiState.get()

          state.messages = [
            ...state.messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]

          if (!state.saved) {
            // Check if not already saved
            addOrUpdateChat(state) // Save if this is the final response
            state.saved = true
          }
          return (
            <BotCard>
              <Meal props={{ meal, calories, protein, fat, carbs, title, ingredients, cookingInstructions }} />
            </BotCard>
          )
        }
      },
      getNewMeal: {
        description:
          'Provide a new meal option. Get the nutritional information of a meal. Use this to show the nutritional information to the user. Provide the title of the meal being queried along with the cooking instructions and ingredients.',
        parameters: z.object({
          meal: z.string().describe('The name of the meal'),
          calories: z.number().describe('The calories of the meal'),
          protein: z.number().describe('The protein of the meal'),
          fat: z.number().describe('The fat of the meal'),
          carbs: z.number().describe('The carbs of the meal'),
          title: z.string().describe('The title of the dish, i.e. "Chicken Alfredo"'),
          ingredients: z.array(z.string()).describe('The ingredients of the meal'),
          cookingInstructions: z.array(z.string()).describe('The cooking instructions of the meal'),
          vegetarian: z.boolean().optional().describe('Whether the meal is vegetarian')
        }),
        render: async function* ({ meal, calories, protein, fat, carbs, title, ingredients, cookingInstructions, vegetarian }) {
          yield (
            <BotCard>
              <Meal
                props={{ meal, calories, protein, fat, carbs, title, ingredients, cookingInstructions, vegetarian: vegetarian || false }}
              />
            </BotCard>
          )

          await sleep(1000)
          
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'getNutritionalInfo',
                content: JSON.stringify({ meal, calories, protein, fat, carbs, title, ingredients, cookingInstructions})
              }
            ]
          })

          let state = aiState.get()

          state.messages = [
            ...state.messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]

          if (!state.saved) {
            // Check if not already saved
            addOrUpdateChat(state) // Save if this is the final response
            state.saved = true
          }
          return (
            <BotCard>
              <Meal props={{ meal, calories, protein, fat, carbs, title, ingredients, cookingInstructions, vegetarian: vegetarian || false }} />
            </BotCard>
          )
        }
      },
      // :
                          // Goal: ${generalQuestionObj.goal},
                          // ${quickEasyObj.totalPrepTime ? `Max Total Prep Time: ${quickEasyObj.totalPrepTime},` : ''}
                          // ${quickEasyObj.totalCookingTime ? `Max Total Cooking Time: ${quickEasyObj.totalCookingTime},` : ''}
                          // ${muscleBuildObj.weight ? `Current Weight: ${muscleBuildObj.weight},` : ''}
                          // ${muscleBuildObj.proteinSources.length ? `Protein Sources: ${muscleBuildObj.proteinSources.join(', ')},` : ''}
                          // ${weightLossObj.weight ? `Current Weight: ${weightLossObj.weight},` : ''}
                          // ${weightLossObj.targetWeight ? `Target Weight: ${weightLossObj.targetWeight},` : ''}
                          // ${weightLossObj.activityLevel ? `Activity Level: ${weightLossObj.activityLevel},` : ''}
                          // ${generalQuestionObj.allergies.length ? `Allergies: ${generalQuestionObj.allergies.join(', ')},` : ''}
                          // ${generalQuestionObj.restrictions.length ? `Dietary Restrictions: ${generalQuestionObj.restrictions.join(', ')},` : ''}
                          // ${generalQuestionObj.targetCuisine.length ? `Target Cuisine: ${generalQuestionObj.targetCuisine.join(', ')},` : ''}
                          // ${generalQuestionObj.servingsPerMeal ? `Servings Per Meal: ${generalQuestionObj.servingsPerMeal},` : ''}
                          // ${generalQuestionObj.mealsPerDay ? `Meals Per Day: ${generalQuestionObj.mealsPerDay},` : ''}
                          // ${generalQuestionObj.totalDays ? `Total Days: ${generalQuestionObj.totalDays},` : ''}
                          // ${generalQuestionObj.mealTypes.length ? `Meal Types: ${generalQuestionObj.mealTypes.join(', ')},` : ''}

                          // Please provide a total of ${generalQuestionObj.totalDays * generalQuestionObj.mealsPerDay} different meals.
      getMealPlan: {
        description:
          'Provide a healthy and nutritious meal plan. Total amount of different meals needed is defined by total meals (e.g. total meals: 6). The preferences will be defined. Provide a DIFFERENT meal for each meal needed. The preferences will contain a Goal (e.g. lose weight, build muscle, quick and easy), please make each meal consistent with the goal in mind.',
        parameters: z.object({
          // the object will be an array of meals with the following properties
          meals: z.array(
            z.object({
              meal: z.string().describe('The name of the meal'),
              calories: z.number().describe('The calories of the meal'),
              protein: z.number().describe('The protein of the meal'),
              fat: z.number().describe('The fat of the meal'),
              carbs: z.number().describe('The carbs of the meal'),
              title: z.string().describe('The title of the dish, i.e. "Chicken Alfredo"'),
              ingredients: z.array(z.string()).describe('The quantifiable amount of ingredients needed for the meal, take into account the serving amount needed (e.g. 2 Salmon fillets, 1 clove garlic)'),
              cookingInstructions: z.array(z.string()).describe('The cooking instructions of the meal'),
              vegetarian: z.boolean().optional().describe('Whether the meal is vegetarian'),
            })
          )
        }),
        render: async function* ({
          meals
         }) {
          yield (
            <BotCard>
              <MealPlan
                meals={meals}
              />
            </BotCard>
          )

          await sleep(1000)
          
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'getNutritionalInfo',
                content: JSON.stringify({ 
                  meal: meals[0].meal, 
                  calories: meals[0].calories, 
                  protein: meals[0].protein, 
                  fat: meals[0].fat, 
                  carbs: meals[0].carbs, 
                  title: meals[0].title, 
                  ingredients: meals[0].ingredients, 
                  cookingInstructions: meals[0].cookingInstructions
                })
              }
            ]
          })

          let state = aiState.get()

          state.messages = [
            ...state.messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]

          if (!state.saved) {
            // Check if not already saved
            addOrUpdateChat(state) // Save if this is the final response
            state.saved = true
          }
          return (
            <BotCard>
              <MealPlan
                meals={meals}
              />
            </BotCard>
          )
        }
      },
      listStocks: {
        description: 'List three imaginary stocks that are trending.',
        parameters: z.object({
          stocks: z.array(
            z.object({
              symbol: z.string().describe('The symbol of the stock'),
              price: z.number().describe('The price of the stock'),
              delta: z.number().describe('The change in price of the stock')
            })
          )
        }),
        render: async function* ({ stocks }) {
          yield (
            <BotCard>
              <StocksSkeleton />
            </BotCard>
          )

          await sleep(1000)

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'listStocks',
                content: JSON.stringify(stocks)
              }
            ]
          })

          return (
            <BotCard>
              <Stocks props={stocks} />
            </BotCard>
          )
        }
      },
      showStockPrice: {
        description:
          'Get the current stock price of a given stock or currency. Use this to show the price to the user.',
        parameters: z.object({
          symbol: z
            .string()
            .describe(
              'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
            ),
          price: z.number().describe('The price of the stock.'),
          delta: z.number().describe('The change in price of the stock')
        }),
        render: async function* ({ symbol, price, delta }) {
          yield (
            <BotCard>
              <StockSkeleton />
            </BotCard>
          )

          await sleep(1000)

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'showStockPrice',
                content: JSON.stringify({ symbol, price, delta })
              }
            ]
          })

          return (
            <BotCard>
              <Stock props={{ symbol, price, delta }} />
            </BotCard>
          )
        }
      },
      showStockPurchase: {
        description:
          'Show price and the UI to purchase a stock or currency. Use this if the user wants to purchase a stock or currency.',
        parameters: z.object({
          symbol: z
            .string()
            .describe(
              'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
            ),
          price: z.number().describe('The price of the stock.'),
          numberOfShares: z
            .number()
            .describe(
              'The **number of shares** for a stock or currency to purchase. Can be optional if the user did not specify it.'
            )
        }),
        render: async function* ({ symbol, price, numberOfShares = 100 }) {
          if (numberOfShares <= 0 || numberOfShares > 1000) {
            aiState.done({
              ...aiState.get(),
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'system',
                  content: `[User has selected an invalid amount]`
                }
              ]
            })

            return <BotMessage content={'Invalid amount'} />
          }

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'showStockPurchase',
                content: JSON.stringify({
                  symbol,
                  price,
                  numberOfShares
                })
              }
            ]
          })

          return (
            <BotCard>
              <Purchase
                props={{
                  numberOfShares,
                  symbol,
                  price: +price,
                  status: 'requires_action'
                }}
              />
            </BotCard>
          )
        }
      },
      getEvents: {
        description:
          'List funny imaginary events between user highlighted dates that describe stock activity.',
        parameters: z.object({
          events: z.array(
            z.object({
              date: z
                .string()
                .describe('The date of the event, in ISO-8601 format'),
              headline: z.string().describe('The headline of the event'),
              description: z.string().describe('The description of the event')
            })
          )
        }),
        render: async function* ({ events }) {
          yield (
            <BotCard>
              <EventsSkeleton />
            </BotCard>
          )

          await sleep(1000)

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'getEvents',
                content: JSON.stringify(events)
              }
            ]
          })

          return (
            <BotCard>
              <Events props={events} />
            </BotCard>
          )
        }
      }
    }
  })

  return {
    id: nanoid(),
    display: ui,
  }
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id: string
  name?: string
}

export type AIState = {
  chatId: string
  messages: Message[]
  saved?: boolean
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

async function addOrUpdateChat(state: AIState, session: Session | null = null) {
  if (!session) {
    session = await auth()
    if (!session?.user?.id) {
      throw new Error('User not Authorized to save')
    }
  }

  const { chatId, messages } = state

  const createdAt = new Date()
  const userId = session.user?.id as string
  const path = `/chat/${chatId}`
  const title = messages[0].content.substring(0, 100)

  const chat: Chat = {
    id: chatId,
    title,
    userId,
    createdAt,
    path,
    messages
  }

  await saveChat(chat)
}

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    confirmPurchase
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state, done }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      // only save it once it's done. No need to save it after each streamed result
      if (done && !state.saved) {
        await addOrUpdateChat(state, session)
        state.saved = true
      }
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  console.log('aiState', aiState.messages)
  return aiState.messages
    .filter(message => message.role && message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'function' ? (
          message.name === 'listStocks' ? (
            <BotCard>
              <Stocks props={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'showStockPrice' ? (
            <BotCard>
              <Stock props={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'showStockPurchase' ? (
            <BotCard>
              <Purchase props={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'getEvents' ? (
            <BotCard>
              <Events props={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'getNutritionalInfo' ? (
            <BotCard>
              <Meal props={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'getNewMeal' ? (
            <BotCard>
              <Meal props={JSON.parse(message.content)} />
            </BotCard>
          ) : null
        ) : message.role === 'user' ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        )
    }))
}
