'use client'
import { UseChatHelpers } from 'ai/react'
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'

export function EmptyScreen() {
  const [activePage, setActivePage] = useState(0);
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()

  const muscleBuildObj = useMemo(() => {
    return {
      weight: 0,
      proteinSources: [] as string[],
    }
  } , []);

  const weightLossObj = useMemo(() => {
    return {
      weight: 0,
      targetWeight: 0,
      activityLevel: '',
    }
  } , []);

  const quickEasyObj = useMemo(() => {
    return {
      totalCookingTime: '',
      totalPrepTime: '',
    }
  } , []);

  const generalQuestionObj = useMemo(() => {
    return {
      goal: '',
      allergies: [] as string[],
      restrictions: [] as string[],
      targetCuisine: [] as string[],
      servingsPerMeal: 0,
      mealsPerDay: 0,
      totalDays: 0,
      mealTypes: [] as string[]
    }
  }, []);

  const page1Questions = [
    {
      heading: 'Quick and Easy',
      subheading: 'Meals for Busy People',
      action: () => {generalQuestionObj.goal = 'quick and easy', setActivePage(2)}
    },
    {
      heading: 'Muscle Building',
      subheading: 'Meals for Gaining Muscle',
      action: () => {generalQuestionObj.goal = 'muscle building', setActivePage(3)}
    },
    {
      heading: 'Weight Loss',
      subheading: 'Meals for Losing Weight',
      action: () => {generalQuestionObj.goal = 'weight loss', setActivePage(4)}
    },
  ]

  // questions for quickEasyObj
  const page2Questions = [
    {
      heading: '15 minutes or less',
      subheading: 'busy - on the go',
      action: () => {quickEasyObj.totalPrepTime = '15 minutes', setActivePage(5)}
    },
    {
      heading: '30 minutes or less',
      subheading: 'quick - nothing too fancy',
      action: () => {quickEasyObj.totalPrepTime = '30 minutes', setActivePage(5)}
    },
    {
      heading: '1 hour or less',
      subheading: 'got time - no rush',
      action: () => {quickEasyObj.totalPrepTime = '1 hour', setActivePage(5)}
    },
    {
      heading: 'No time limit',
      subheading: 'no time limit - just easy',
      action: () => {quickEasyObj.totalPrepTime = 'No time limit', setActivePage(5)}
    }
  ];

  // questions for muscleBuildObj
  const page3Questions = [
    {
      heading: 'What is your current weight?',
      subheading: 'Enter your weight in pounds',
      // action: () => muscleBuildObj.weight = 0
    },
    {
      heading: 'What are your favorite protein sources?',
      subheading: 'Select all that apply',
      options: [
        'Beef',
        'Chicken',
        'Eggs',
        'Fish',
        'Pork',
        'Tofu',
        'Turkey',
        'None',
      ],
      action: () => {muscleBuildObj.proteinSources = [], setActivePage(5)}
    },
  ];

  // questions for weightLossObj
  const page4Questions = [
    {
      heading: 'What is your current weight?',
      subheading: 'Enter your weight in pounds',
      // action: () => weightLossObj.weight = 0
    },
    {
      heading: 'What is your target weight?',
      subheading: 'Enter your target weight in pounds',
      action: () => weightLossObj.targetWeight = 0
    },
    {
      heading: 'What is your activity level?',
      subheading: 'Select one',
      options: [
        'Sedentary',
        'Lightly Active',
        'Moderately Active',
        'Very Active',
        'Extremely Active',
      ],
      action: () => {weightLossObj.activityLevel = ''}
    },
  ];

  const page5Questions = [
    // questions for generalQuestionObj
    {
      heading: 'Do you have any allergies?',
      subheading: 'Select all that apply',
      options: [
        'Dairy',
        'Eggs',
        'Fish',
        'Gluten',
        'Peanuts',
        'Shellfish',
        'Soy',
        'Tree Nuts',
        'Wheat',
        'None',
      ],
      action: () => generalQuestionObj.allergies = []
    },
    {
      heading: 'Do you have any dietary restrictions?',
      subheading: 'Select all that apply',
      options: [
        'Dairy-Free',
        'Gluten-Free',
        'Keto',
        'Low-Carb',
        'Low-Fat',
        'Low-Sodium',
        'Paleo',
        'Vegan',
        'Vegetarian',
        'None',
      ],
      action: () => generalQuestionObj.restrictions = []
    },
    {
      heading: 'What type of cuisine do you prefer?',
      subheading: 'Select all that apply',
      options: [
        'American',
        'Chinese',
        'French',
        'Indian',
        'Italian',
        'Japanese',
        'Mediterranean',
        'Mexican',
        'Thai',
        'None',
      ],
      action: () => generalQuestionObj.targetCuisine = []
    },
    {
      heading: 'How many servings per meal?',
      subheading: 'Select one',
      options: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
      ],
      action: () => generalQuestionObj.servingsPerMeal = 0
    },
    {
      heading: 'How many meals per day?',
      subheading: 'Select one',
      options: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
      ],
      action: () => generalQuestionObj.mealsPerDay = 0
    },
    {
      heading: 'How many days of meals do you need?',
      subheading: 'Select one',
      options: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
      ],
    },
    {
      heading: 'What type of meals do you prefer?',
      subheading: 'Select all that apply',
      options: [
        'Breakfast',
        'Lunch',
        'Dinner',
        'Snacks',
        'Desserts',
        'All',
      ],
      action: () => generalQuestionObj.mealTypes = []
    },
  ];

  const renderPage0 = () => {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
          <h1 className="text-lg font-semibold">
            Welcome to Plan 2 Eat!!
          </h1>
          <p className="leading-normal text-muted-foreground">
            Plan 2 Eat is a chatbot that helps you plan your meals based on
            your needs and preferences.
          </p>
          <p className="leading-normal text-muted-foreground">
            The goal is to make it easy for you to think of and plan your meals
            in a nutritious and easy way.
          </p>

          <p className="leading-normal text-muted-foreground">
            To provide the best recommendations, we'll ask a few questions.
          </p>

          <button
            onClick={() => setActivePage(1)}
            className="bg-primary text-secondary py-2 px-4 rounded-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    )
  }

  const renderPage1 = () => {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">

          <h1 className="text-lg font-semibold">
              Let's get started with your goals!
          </h1>
          {
            page1Questions.map((question, index) => (
              <div
                key={question.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
                onClick={question.action}
              >
                <div className="text-sm font-semibold">{question.heading}</div>
                <div className="text-sm text-secondary-foreground">
                  {question.subheading}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  const renderPage2 = () => {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">

          <h1 className="text-lg font-semibold">
              How much time do you have to prep for each meal?
          </h1>
          <h3 className="text-sm text-muted-foreground">
            Prepping ahead can save you time and make it easier to stick to your meal plan.
          </h3>
          {
            page2Questions.map((question, index) => (
              <div
                key={question.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }
                  ${quickEasyObj.totalPrepTime.includes(question.heading.split(' ').slice(0, 2).join(' ')) && 'border-green-500'} 
                `}
                onClick={
                  () => {
                    question.action()
                  }                  
                }
              >
                <div className="text-sm font-semibold">{question.heading}</div>
                <div className="text-sm text-zinc-600">
                  {question.subheading}
                </div>
              </div>
            ))
          }
          <div className="flex justify-between">
            <Button
              onClick={() => setActivePage(1)}
              className="self-start"
              
            >
              Back
            </Button>
            <Button
              onClick={() => setActivePage(5)}
              className="self-start"
            >
              Next <IconArrowRight />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderPage3 = () => {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">

          <h1 className="text-lg font-semibold">
              Let's get started with your muscle building goals!
          </h1>
          {
            page3Questions.map((question, index) => (
              <div
                key={question.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
              >
                <div className="text-sm font-semibold">{question.heading}</div>
                <div className="text-sm text-zinc-600">
                  {question.subheading}
                </div>
                {index == 0 && (
                  <input type="number" 
                    onChange={(e) => muscleBuildObj.weight = parseInt(e.target.value)}
                    // value={muscleBuildObj.weight}
                    className='w-full p-2 mt-2 rounded-lgborder bg-white dark:bg-zinc-950 dark:border-zinc-900'
                  />
                )}
                <div
                  className="grid grid-cols-2 md:grid-cols-3 gap-2"
                >
                  {question.options?.map(option => (
                    <div
                      key={option}
                      className="flex items-center gap-2"
                      onClick={() => {
                        if (muscleBuildObj.proteinSources.includes(option)) {
                          muscleBuildObj.proteinSources = muscleBuildObj.proteinSources.filter(protein => protein !== option)
                        } else {
                          muscleBuildObj.proteinSources.push(option)
                        }
                      }}
                    >
                      <input type="checkbox" />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
          <div className="flex justify-between">
            <Button
              onClick={() => setActivePage(1)}
              className="self-start"
            >
              Back
            </Button>
            <Button
              onClick={() => setActivePage(5)}
              className="self-start"
            >
              Next <IconArrowRight />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderPage4 = () => {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">

          <h1 className="text-lg font-semibold">
              Let's get started with your weight loss goals!
          </h1>
          {
            page4Questions.map((question, index) => (
              <div
                key={question.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
              >
                <div className="text-sm font-semibold">{question.heading}</div>
                <div className="text-sm text-zinc-600">
                  {question.subheading}
                </div>
                {index == 0 && (
                  <input type="number" 
                    onChange={(e) => weightLossObj.weight = parseInt(e.target.value)}
                    className='w-full p-2 mt-2 rounded-lgborder bg-white dark:bg-zinc-950 dark:border-zinc-900'
                  />
                )}
                {index == 1 && (
                  <input type="number" 
                    onChange={(e) => weightLossObj.targetWeight = parseInt(e.target.value)}
                      className='w-full p-2 mt-2 rounded-lgborder bg-white dark:bg-zinc-950 dark:border-zinc-900'
                  />
                )}
                <div
                  className="grid grid-cols-2 md:grid-cols-3 gap-2"
                >
                  {question.options?.map(option => (
                    <div
                      key={option}
                      className="flex items-center gap-2"
                      onClick={question.action}
                    >
                      <input type="checkbox" />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
          <div className="flex justify-between">
            <Button
              onClick={() => setActivePage(1)}
              className="self-start"
            >
              Back
            </Button>
            <Button
              onClick={() => setActivePage(5)}
              className="self-start"
            >
              Next <IconArrowRight />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderPage5 = () => {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">

          <h1 className="text-lg font-semibold">
              Let's cover your general preferences!
          </h1>
          {
            page5Questions.map((question, index) => (
              <div
                key={question.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
              >
                <div className="text-sm font-semibold">{question.heading}</div>
                <div className="text-sm text-zinc-600">
                  {question.subheading}
                </div>
                <div
                  className="grid grid-cols-2 md:grid-cols-3 gap-2"
                >
                  {question.options?.map(option => (
                    <div
                      key={option}
                      className="flex items-center gap-2"
                      onClick={ () => {
                        index == 0 ? (
                          generalQuestionObj.allergies.includes(option) ?
                          generalQuestionObj.allergies = generalQuestionObj.allergies.filter(allergy => allergy !== option) :
                          generalQuestionObj.allergies.push(option)
                        ) :
                        index == 1 ? (
                          generalQuestionObj.restrictions.includes(option) ?
                          generalQuestionObj.restrictions = generalQuestionObj.restrictions.filter(restriction => restriction !== option) :
                          generalQuestionObj.restrictions.push(option)
                        ) :
                        index == 2 ? (
                          generalQuestionObj.targetCuisine.includes(option) ?
                          generalQuestionObj.targetCuisine = generalQuestionObj.targetCuisine.filter(cuisine => cuisine !== option) :
                          generalQuestionObj.targetCuisine.push(option)
                        ) :
                        index == 3 ? (
                          generalQuestionObj.servingsPerMeal = parseInt(option) ?
                          generalQuestionObj.servingsPerMeal = parseInt(option) :
                          generalQuestionObj.servingsPerMeal = parseInt(option)
                        ) :
                        index == 4 ? (
                          generalQuestionObj.mealsPerDay = parseInt(option) ?
                          generalQuestionObj.mealsPerDay = parseInt(option) :
                          generalQuestionObj.mealsPerDay = parseInt(option)
                        ) : 
                        index === 5 ? (
                          generalQuestionObj.totalDays = parseInt(option) ?
                          generalQuestionObj.totalDays = parseInt(option) :
                          generalQuestionObj.totalDays = parseInt(option)
                        
                        ) :
                        generalQuestionObj.mealTypes.push(option)
                      }}
                    >
                      <input type="checkbox" />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
          <div className="flex justify-between">
            <Button
              onClick={() => setActivePage(1)}
              className="self-start"
            >
              Back
            </Button>
            <Button
              onClick={async () => {
                setMessages(currentMessages => [
                  ...currentMessages,
                  {
                    id: nanoid(),
                    display: (
                      <UserMessage>
                        {
                          `Getting an ideal meal plan for the goal ${generalQuestionObj.goal} based on your preferences.
                          `
                        }
                      </UserMessage>)
                  }
                ])

                const responseMessage = await submitUserMessage(
                  `
                  get_meal_plan
                  total meals: ${generalQuestionObj.totalDays * generalQuestionObj.mealsPerDay},
                  preferences:
                  Goal: ${generalQuestionObj.goal},
                  ${quickEasyObj.totalPrepTime ? `Max Total Prep Time: ${quickEasyObj.totalPrepTime},` : ''}
                  ${quickEasyObj.totalCookingTime ? `Max Total Cooking Time: ${quickEasyObj.totalCookingTime},` : ''}
                  ${muscleBuildObj.weight ? `Current Weight: ${muscleBuildObj.weight},` : ''}
                  ${muscleBuildObj.proteinSources.length ? `Protein Sources: ${muscleBuildObj.proteinSources.join(', ')},` : ''}
                  ${weightLossObj.weight ? `Current Weight: ${weightLossObj.weight},` : ''}
                  ${weightLossObj.targetWeight ? `Target Weight: ${weightLossObj.targetWeight},` : ''}
                  ${weightLossObj.activityLevel ? `Activity Level: ${weightLossObj.activityLevel},` : ''}
                  ${generalQuestionObj.allergies.length ? `Allergies: ${generalQuestionObj.allergies.join(', ')},` : ''}
                  ${generalQuestionObj.restrictions.length ? `Dietary Restrictions: ${generalQuestionObj.restrictions.join(', ')},` : ''}
                  ${generalQuestionObj.targetCuisine.length ? `Target Cuisine: ${generalQuestionObj.targetCuisine.join(', ')},` : ''}
                  ${generalQuestionObj.servingsPerMeal ? `Servings Per Meal: ${generalQuestionObj.servingsPerMeal},` : ''}
                  ${generalQuestionObj.mealsPerDay ? `Meals Per Day: ${generalQuestionObj.mealsPerDay},` : ''}
                  ${generalQuestionObj.mealTypes.length ? `Meal Types: ${generalQuestionObj.mealTypes.join(', ')},` : ''}
                  `
                )

                setMessages(currentMessages => [
                  ...currentMessages,
                  responseMessage
                ])
              }}
            >
              Get Meal Plan
            </Button>
          </div>
        </div>
      </div>
    )
  };

  switch (activePage) {
    case 0:
      return renderPage0();
    case 1:
      return renderPage1();
    case 2:
      return renderPage2();
    case 3:
      return renderPage3();
    case 4:
      return renderPage4();
    case 5:
      return renderPage5();
    default:
      return null;
  }
}
