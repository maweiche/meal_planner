'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { scaleLinear } from 'd3-scale'
import { subMonths, format, sub } from 'date-fns'
import { useResizeObserver } from 'usehooks-ts'
import { useActions, useUIState, useAIState } from 'ai/rsc'
import { Meal } from './meal'
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from "framer-motion";
export function MealPlan(
    { meals }: { meals: any[] }
) {
    const [pdf, setPdf] = useState<jsPDF | null>(null);
    const [downloadablePdf, setDownloadablePdf] = useState<string | null>(null);
    const date = new Date().toISOString().slice(0, 10);
    const download_url_string = `meal_plan-${date}.pdf`;
    //
    async function createPdf(
        meals: any[]
    ) {
        const doc = new jsPDF();
        // add font style
        meals.forEach((meal, index) => {
            doc.setFont('hevetica', 'bold');
            doc.text(meal.title, 10, 10).setFont('hevetica', 'normal');
            doc.text(`Calories: ${meal.calories} | Protein: ${meal.protein}`, 10, 20)
            doc.text(`Fat: ${meal.fat} | Carbs: ${meal.carbs}`, 10, 30)
            doc.text(`Ingredients:`, 10, 40).setFont('hevetica', 'italic') //add an indent to the left of the text
            // ingredients is an array of strings, map through it and add to pdf
            meal.ingredients.forEach((ingredient: any, index: any) => {
                doc.text(`- ${ingredient}`, 10, 50 + (index * 10))
            });
            // insert line break
            doc.text('', 10, 55).setFont('hevetica', 'bold')
            doc.text(`Cooking Instructions`, 10,
                55 + (meal.ingredients.length * 10)
            ).setFont('hevetica', 'italic');
            // cooking instructions is an array of strings, map through it and add to pdf
            meal.cookingInstructions.forEach((instruction: any, index: any) => {
                doc.text(`- ${instruction}`, 10, 65 + (meal.ingredients.length * 10) + (index * 10))
            });
            if (index < meals.length - 1) {
                doc.addPage()
            }
        });
        setPdf(doc);
        const pdfUrl = doc.output('bloburl');
        const pdfUrlString = pdfUrl.toString();
        setDownloadablePdf(pdfUrlString);
    };

    useEffect(() => {
        createPdf(meals);
    });


    return (
        <div
            className="flex flex-col items-center"
            style={{ gap: '1rem' }}
        >
            {meals.map((meal, index) => (
                <Meal
                    key={index}
                    props={
                        {
                            meal: meal.meal,
                            calories: meal.calories,
                            protein: meal.protein,
                            fat: meal.fat,
                            carbs: meal.carbs,
                            title: meal.title,
                            ingredients: meal.ingredients,
                            cookingInstructions: meal.cookingInstructions,
                            vegetarian: meal.vegetarian,
                        }
                    }
                />
            ))}
            {downloadablePdf && 
                <a 
                    href={downloadablePdf} 
                    download={download_url_string}
                    // style it to be noticeable to the user, big bold button with a download icon next to it
                    className="text-white font-bold py-2 px-4 rounded"
                    style={{
                        backgroundColor: '#2DD4BF',
                        marginTop: '2rem',
                    }}
                >
                    Download Meal Plan
                </a>
            }
        </div>
    )
}
