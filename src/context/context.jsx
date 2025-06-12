import { createContext, useState } from "react";
import main from '../config/gemini'

export const Context = createContext();

const ContextProvider = ({ children }) => {
      const [input, setInput] = useState('');
      const [recentPrompt, setRecentPrompt] = useState('');
      const [prevPrompts, setPrevPrompts] = useState([]);
      const [showResult, setShowResult] = useState(false);
      const [loading, setLoading] = useState(false);
      const [resultData, setResultData] = useState('');

      const delayPara = (index, nextWords) => {
            setTimeout(() => {
                  setResultData(prev => prev + nextWords);
            }, 75 * index);
      }

      // Function to reset the chat when the user clicks on "New Chat" button.
      const newChat = () => {
            setShowResult(false);
            setLoading(false);
      }
      // Function to handle the input and send it to the Gemini API.
      const onSent = async (prompt) => {
            setResultData("");
            setLoading(true);
            setShowResult(true);
            let response;
            if (prompt !== undefined) {
                  response = await main(prompt);
                  setRecentPrompt(prompt);
            } else {
                  setPrevPrompts(prev => [...prev, input]);
                  setRecentPrompt(input);
                  response = await main(input);
            }

            let responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
                  if (i === 0 || i % 2 !== 1) {
                        newResponse += responseArray[i];
                  }
                  else {
                        newResponse += "<b>" + responseArray[i] + "</b>";
                  }
            }
            let newResponseWithBreaks = newResponse.split("*").join("</br>");

            let newResponseArray = newResponseWithBreaks.split(" ");
            // delay before executing response. Typing effect.         
            for (let i = 0; i < newResponseArray.length; i++) {
                  const nextWord = newResponseArray[i];
                  delayPara(i, nextWord + " ");
            }

            setLoading(false);
            setInput("");
      }

      // Context value to be provided to the components.
      // It contains the state variables and functions that can be accessed by the components wrapped within Context API.
      const contextValue = {
            input,
            setInput,
            prevPrompts,
            setPrevPrompts,
            onSent,
            recentPrompt,
            setRecentPrompt,
            showResult,
            setShowResult,
            loading,
            resultData,
            newChat,
      }

      // Providing the context value to the children components.
      return (
            <Context.Provider value={contextValue}>
                  {children}
            </Context.Provider>
      )
}

export default ContextProvider