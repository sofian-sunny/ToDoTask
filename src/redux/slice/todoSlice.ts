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
    removeTodo(state, action: PayloadAction<ITask>) {
      const index = state.todos.findIndex(
        todo => todo.id === action.payload.id,
      );
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
    setTodoStatus(state, action: PayloadAction<ITask>) {
      const index = state.todos.findIndex(
        todo => todo.id === action.payload.id,
      );
      state.todos[index].completed = action.payload.completed;
    },
  },
});

export const {addTodo, setTodoStatus, removeTodo} = todoSlice.actions;
export default todoSlice.reducer;
