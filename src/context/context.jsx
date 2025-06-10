import { createContext } from "react";
import main from '../config/gemini'

export const Context = createContext();

const ContextProvider = ({children}) => {


      const [input, setInput] = useState('');
      const [recentPrompt, setRecentPrompt] = useState('');
      const [prevPrompts, setPrevPrompts] = useState([]);
      const [showResult, setShowResult] = useState(false);
      const [loading, setLoading] = useState(false);
      const [resultData, setResultData] = useState('');


      const onSent = async (prompt) => {
         await main(prompt);
      }
      
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
            resultData
      }

      return (
            <Context.Provider value={contextValue}>
                  {children}
            </Context.Provider>
      )
}

export default ContextProvider