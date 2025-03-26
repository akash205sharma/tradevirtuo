import { createContext, useState, useEffect, useContext } from 'react';
import { ReactNode } from 'react';

interface SessionContextType {
    session: { [key: string]: any };
    updateSession: (newSession: { [key: string]: any }) => void;
    setSession : React.Dispatch<React.SetStateAction<Session>>
}

export interface Session {
    [key: string]: any;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

 
// const storage = sessionStorage
const storage = localStorage

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    
    const [session, setSession] = useState<Session>({})

    useEffect(() => {
        // Load room from storage on mount
        setSessionToState();
    }, []);



    const updateSession = (newSession: Session) => {
        storage.setItem("Session", JSON.stringify(newSession));
        setSession(newSession);
    }


    const setSessionToState = () => {
        const savedSession = storage.getItem('Session');
        setSession(savedSession ? JSON.parse(savedSession) : {});
    };

    // const setTurn = (turn) => {
    //     setSession(prevSession => {
    //         let scores = room.game.scores;
    //         const updatedSession = { ...prevSession, game: { turn, scores } };
    //         storage.setItem("Session", JSON.stringify(updatedSession));
    //         return updatedSession;
    //     });
    // };

    
    return (
        <SessionContext.Provider
            value={{ session, updateSession, setSession }}
        >
            {children}
        </SessionContext.Provider>
    );
};


// Custom hook to use SessionContext
// export const useSession = () => useContext(SessionContext);

export const useSession = (): SessionContextType => {
    return useContext(SessionContext) as SessionContextType;
};