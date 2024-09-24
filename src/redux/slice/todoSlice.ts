import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITask} from '../../constants/types';

const initialState: {todos: ITask[]} = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    // Adding new todo
    addTodo: (state, action: PayloadAction<ITask>) => {
      return {...state, todos: [...state.todos, action.payload]};
    },
  },
});

export const {addTodo} = todoSlice.actions;
export default todoSlice.reducer;
