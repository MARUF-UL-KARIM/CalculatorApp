"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [currentValue, setCurrentValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const handleNumberClick = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const handleOperationClick = (op: string) => {
    const inputValue = parseFloat(display)
    
    if (currentValue === null) {
      setCurrentValue(inputValue)
    } else if (operation) {
      const result = performCalculation(currentValue, inputValue, operation)
      setCurrentValue(result)
      setDisplay(String(result))
    }

    setWaitingForOperand(true)
    setOperation(op)
  }

  const handleEqualClick = () => {
    if (currentValue !== null && operation) {
      const inputValue = parseFloat(display)
      const result = performCalculation(currentValue, inputValue, operation)
      setDisplay(String(result))
      setCurrentValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const handleClearClick = () => {
    setDisplay("0")
    setCurrentValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performCalculation = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b
      case "-":
        return a - b
      case "*":
        return a * b
      case "/":
        return a / b
      default:
        return b
    }
  }

  return (
    <div className="w-64 mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <Input
        className="mb-4 text-right text-2xl font-bold"
        value={display}
        readOnly
      />
      <div className="grid grid-cols-4 gap-2">
        {[7, 8, 9, "/", 4, 5, 6, "*", 1, 2, 3, "-", 0, ".", "=", "+"].map(
          (item) => (
            <Button
              key={item}
              className={`${
                typeof item === "number" || item === "."
                  ? "bg-white text-black"
                  : item === "="
                  ? "bg-blue-500 text-white col-span-2"
                  : "bg-gray-300 text-black"
              } text-xl font-bold`}
              onClick={() => {
                if (typeof item === "number" || item === ".") {
                  handleNumberClick(String(item))
                } else if (item === "=") {
                  handleEqualClick()
                } else {
                  handleOperationClick(String(item))
                }
              }}
            >
              {item}
            </Button>
          )
        )}
        <Button
          className="bg-red-500 text-white text-xl font-bold col-span-4"
          onClick={handleClearClick}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
