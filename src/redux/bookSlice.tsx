import { createSlice } from '@reduxjs/toolkit';

/*interface BookState {
  books: {
    pedidos: new Array<any>(),
    meuCarrinho: new Array<any>(),
  };
}

const initialState: BookState = {
  books: {
     pedidos: new Array<any>(),
    meuCarrinho: new Array<any>(),
  },
};*/

export const bookSlice = createSlice({
  name: 'books',
  initialState: {
    pedidos: new Array<any>(),
    meuCarrinho: new Array<any>(),
  },
  reducers: {
    estadoAtual: (state) => {
      return state;
    },
    addCarrinho: (state, { payload }) => {
      state.meuCarrinho.push(payload);
      return state;
    },
    atualizaCarrinho: (state, { payload }) => {
      state.meuCarrinho = state.meuCarrinho.filter((item) => item.cod !== payload);
      return state;
    },
    carrinhoVazio: (state) => {
      state.meuCarrinho = new Array<any>();
      return state;
    },
  },
});

export const { estadoAtual, addCarrinho, atualizaCarrinho, carrinhoVazio } = bookSlice.actions;
export const booksReducer = bookSlice.reducer;
