import { useState, useEffect, useCallback } from "react"
import words from "../data/wordList.json"
import { HangmanDrawing } from "../components/Games/HangmanDrawing"
import { HangmanWord } from "../components/Games/HangmanWord"
import { Keyboard } from "../components/Games/Keyboard"


function getWord() {
    return words[Math.floor(Math.random() * words.length)]
}

export function Game() {
    // Generate a random word from file
    const [wordToGuess, setWordToGuess] = useState(getWord)

    // Which letters we had guessed -> array of strings
    const [ guessedLetters, setGuessedLetters ] = useState<string[]>([])

    // Get all the letters that we guessed and filter them => letter that is not a letter from the word to guess
    const incorrectLetters = guessedLetters.filter(
        letter => !wordToGuess.includes(letter))

    const isLoser = incorrectLetters.length >= 6
    const isWinner = wordToGuess
        .split("")
        .every(letter => guessedLetters.includes(letter))

    // we want to rerun the useEffect only when we have something changed in guessedLetters array => useCallback
    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isLoser || isWinner) return

            setGuessedLetters(currentLetters => [...currentLetters, letter])
        },
        [guessedLetters, isWinner, isLoser]
    )

    // create a hook for the case when we click on the actual keyboard
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key
            if (!key.match(/^[a-z]$/)) return

            e.preventDefault()
            addGuessedLetter(key)
        }

        document.addEventListener("keypress", handler)

        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [guessedLetters])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key
            if (key !== "Enter") return

            e.preventDefault()
            setGuessedLetters([])
            setWordToGuess(getWord())
        }

        document.addEventListener("keypress", handler)

        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [])

    return (
        <div
            style={{
                maxWidth: '800px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                margin: '0 auto',
                alignItems: 'center'
            }}>
            <div style={{ fontSize: "2rem", textAlign: "center" }}>
                {isWinner && "Winner! - Refresh to try again"}
                {isLoser && "Nice Try - Refresh to try again"}
            </div>
            <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            <HangmanWord
                reveal={isLoser}
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
            />
            <div style={{ alignSelf: 'stretch'}}>
                <Keyboard
                    disabled={isWinner || isLoser}
                    activeLetters={guessedLetters.filter(letter =>
                        wordToGuess.includes(letter)
                    )}
                    inactiveLetters={incorrectLetters}
                    addGuessedLetter={addGuessedLetter}
                />
            </div>

        </div>

    )
}
