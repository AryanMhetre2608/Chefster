import { createSlice , PayloadAction } from "@reduxjs/toolkit";



interface Recipe {
  id: string
  name:string
  image:string
  cuisine:string
}
interface FavoritesState {
  favoriteRecipes: Recipe[]
}

const initialState: FavoritesState ={
  favoriteRecipes:[]

}

const favoritesSlice = createSlice({
  name:'favorites',
  initialState,
  reducers:{
    addToFavorites : (state , action:PayloadAction<Recipe>) =>{
      const exists = state.favoriteRecipes.find(recipe=>recipe.id === action.payload.id)
      if(!exists){
        state.favoriteRecipes.push(action.payload)
      }

    },
    removeFromFavorites : (state, action:PayloadAction<string>) =>{
      state.favoriteRecipes = state.favoriteRecipes.filter(recipe => recipe.id !== action.payload)


    }
  }

})

export const {addToFavorites , removeFromFavorites} = favoritesSlice.actions

export default  favoritesSlice.reducer
