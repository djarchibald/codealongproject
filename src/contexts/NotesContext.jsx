import { createContext, useContext, useReducer } from "react"
import { useLocalStorage } from "react-use";
import { useEffect } from "react";

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

//Runs automatically when a dispatch function is called.
// instructions type determines how we edit the state.
//the reducer must return something otherwise the state is set to null.
//whatever is returned is the new state.
// @Returns new state based on edited instructions provided.

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

// This is how we make our reducer state and reducer disptach global.
export const NoteDataContext = createContext(null);
export const NoteDispatchContext = createContext(null);

//custom hooks that provide direct access to one part of the reducer. e.g. read only data.
export function useNoteData(){
    return useContext(NoteDataContext);
}
//function to modify the data:
export function useNoteDispatch(){
    return useContext(NoteDispatchContext);
}
/**
 * NotesProvider wraps around the component tree. Any child component has ccess to this note via useNoteData and useNoteDisptach.
 * @param {*} props props.children should be a JSX element. THis notes provider wraps around that element. 
 * 
 */
export default function NotesProvider(props){
    //[readOnlyData, fucntiontoModifyData] = useReducer(reducerFucntion, initialDefaultData)
    const [notesData, notesDispatch] = useReducer(notesReducer, initialNotesData);

    const [persistentData, setPersistentData] = useLocalStorage('notes', initialNotesData);

    useEffect(() => {
        notesDispatch()
    }, []);
    
    useEffect(() => {
        console.log("Local Storage: " + persistentData);
      
    }, [persistentData]);

    useEffect(() => {
        setPersistentData(notesData);
    }, [notesData]);
    

    return (
        <NoteDataContext.Provider value={notesData}>
            <NoteDispatchContext.Provider value={notesDispatch}>
                {props.children}

            </NoteDispatchContext.Provider>
        </NoteDataContext.Provider>
    )
}