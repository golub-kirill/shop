import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {
        category: "category1",
        title: "Item 1",
        description: "Description of item 1",
        price: 1000,
        image: "https://st2.depositphotos.com/1006753/7977/i/600/depositphotos_79773172-stock-photo-red-coffee-machine.jpg",
    },
    {
        category: "category2",
        title: "Item 2",
        description: "Description of item 2",
        price: 2000,
        image: "https://st2.depositphotos.com/1006753/7977/i/600/depositphotos_79773172-stock-photo-red-coffee-machine.jpg",
    },
    {
        category: "category1",
        title: "Item 3",
        description: "Description of item 3",
        price: 3000,
        image: "https://st2.depositphotos.com/1006753/7977/i/600/depositphotos_79773172-stock-photo-red-coffee-machine.jpg",
    },
    {
        category: "category1",
        title: "Item 4",
        description: "Description of item 4",
        price: 4000,
        image: "https://st2.depositphotos.com/1006753/7977/i/600/depositphotos_79773172-stock-photo-red-coffee-machine.jpg",
    },
    {
        category: "category3",
        title: "Item 5",
        description: "Description of item 5",
        price: 5000,
        image: "https://st2.depositphotos.com/1006753/7977/i/600/depositphotos_79773172-stock-photo-red-coffee-machine.jpg",
    },
    {
        category: "category3",
        title: "Item 6",
        description: "Description of item 6",
        price: 6000,
        image: "https://st2.depositphotos.com/1006753/7977/i/600/depositphotos_79773172-stock-photo-red-coffee-machine.jpg",
    },
];

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload);
        },
        removeItem: (state, action) => {
            state.splice(action.payload, 1);
        }
    }
});

export const { addItem, removeItem } = itemSlice.actions;
export default itemSlice.reducer;
