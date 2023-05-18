import { createContext, useContext, useReducer } from "react"

const initialNotesData = [
    {
        id: 1,
        title: "Welcome to the Note Taker!",
        description: "Make your notes here!",
        isCompleted: false,
        dueDate: new Date().setDate(new Date().getDate() +1), // current time + 1 day
        creayedAtDate: Date.now()
    }
]

const notesReducer = (previousState, instructions) => {
    let stateEditable = [...previousState];

    switch (instructions.type){
        case "create":
            console.log("TODO: Create note and add to state");
            break;
        case "update":
            console.log("TODO: Update specific not and overwroite it in state");
            break;
        case "delete":
            console.log("TODO: Delete note from state");
            break;
        case "sortByDueDate":
            console.log("Sorted state data by due date");
            break;
        case "sortByCreatedAtDate":
            console.log("Sorted by created at date");
            break; 
        case "sortByID":
            console.log("Sort by ID, this is the default order");
            break;
        default:
            console.log("Invalid instruction type provided, it was: " + instructions.type);
            return previousState;

    }

}

export const NoteDataContext = createContext(null);
export const NoteDispatchContext = createContext(null);

export function useNoteData(){
    return useContext(NoteDataContext);
}

export function useNoteDispatch(){
    return useContext(NoteDispatchContext);
}

export default function NotesProvider(props){
    const [notesData, notesDispatch] = useReducer(notesReducer, initialNotesData);

    return (
        <NoteDataContext.Provider value={notesData}>
            <NoteDispatchContext.Provider value={notesDispatch}>
                {props.children}

            </NoteDispatchContext.Provider>
        </NoteDataContext.Provider>
    )
}