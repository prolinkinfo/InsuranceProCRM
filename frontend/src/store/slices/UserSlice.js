import { createSlice } from "@reduxjs/toolkit";

const LeadSlice = createSlice({
    name: "lead",
    initialState: [],
    reducers: {
        addLead: (state, action) => {
            state.push(action.payload)
        },
        leadList: (state, action) => action.payload,
        leadView: (state, action) => {
            console.log(action.payload);
            return [...state, action.payload];
        },
        leadDelete: (state, action) => { },
    }
})

export const { addLead, leadList, leadView } = LeadSlice.actions;

export default LeadSlice.reducer;