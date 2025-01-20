import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../../core/res/constant/Constants';
export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async () => {
    const response = await axios.get(`${BASE_URL}pokemon`);
    return response.data.results;
  },
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    list: [] as {name: string}[],
    status: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemonList.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPokemonList.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default pokemonSlice.reducer;
