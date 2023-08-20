import React, { createContext, useReducer } from 'react';

export const AppReducer = (state, action) => {
    let new_expenses = [];
    switch (action.type) {
        case 'ADD_QUANTITY':
            // let updatedqty = false;
            state.expenses.map((expense)=>{
                if(expense.name === action.payload.name) {
                    expense.quantity = expense.quantity + action.payload.quantity;
                   // updatedqty = true;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state,
            };

        case 'RED_QUANTIY':
            state.expenses.map((expense)=>{
                if(expense.name === action.payload.name) {
                    expense.quantity = expense.quantity + action.payload.quantity;
                }
                expense.quantity = expense.quantity < 0 ? 0: expense.quantity;
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state,
            };
        case 'DELETE_ITEM':
            state.expense.map((expense)=>{
                if(expense.name === action.payload.name){
                    expense.quantiy = 0;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state,
            };
        case 'CHG_LOCATION':
            action.type = "DONE";
            state.Location = action.payload;
            return {
                ...state
            }
        default:
            return state;
    }
};

const initialState = {
    expenses: [
        {id: "Shirt", name: 'Shirt', quanity: 0, unitprice: 500},
        {id: "Jeans", name: 'Jeans', quanity: 0, unitprice: 300},
        {id: "Dress", name: 'Dress', quanity: 0, unitprice: 400},
        {id: "Dinner set", name: 'Dinner set', quanity: 0, unitprice: 600},
        {id: "Bags", name: 'Bags', quanity: 0, unitprice: 200},
    ],
    Location: 'E'
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, item)=> {
        return (total = total + (item.unitprice*item.quanity));
    }, 0);
    state.CartValue = totalExpenses;

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: state.CartValue,
                dispatch,
                Location: state.Location
            }}
            >
                {props.children}
        </AppContext.Provider>
    );
};
