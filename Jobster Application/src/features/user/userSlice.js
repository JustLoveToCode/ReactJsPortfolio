import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from 'react-toastify';
import {getUserFromLocalStorage,addUserToLocalStorage,removeUserFromLocalStorage} from '../../utils/localStorage';
import {registerUserThunk,loginUserThunk,updateUserThunk,clearStoreThunk} from './userThunk';


// This is the Initial State of the User:
const initialState={
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage(),
};

export const registerUser=createAsyncThunk('user/registerUser',async(user, thunkAPI)=>{
  return registerUserThunk('/auth/register', user, thunkAPI);
});

export const loginUser = createAsyncThunk('user/loginUser', async(user, thunkAPI)=>{
  return loginUserThunk('/auth/login',user,thunkAPI);
});


export const updateUser=createAsyncThunk('user/updateUser',async(user,thunkAPI)=>{
return updateUserThunk('/auth/updateUser',user,thunkAPI);
});

export const clearStore=createAsyncThunk('user/clearStore', clearStoreThunk)
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
    // Toggling the SideBar:
      toggleSidebar:(state)=>{
        state.isSidebarOpen=!state.isSidebarOpen;
      },
      logoutUser:(state, {payload})=>{
    // Logging out the User:
    // The state.user become null:
        state.user = null
        state.isSidebarOpen = false
        removeUserFromLocalStorage()
        if(payload){
          toast.success(payload)
        }
      }
    },
    extraReducers: (builder) => {
// Using the builder.addCase Method Here
// for the registerUser:
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
        })
    // Using the addCase Method Here:
        .addCase(registerUser.fulfilled, (state, { payload }) => {
          const { user } = payload;
          state.isLoading = false;
          state.user = user;
    // When the registerUser is Fulfilled:
          addUserToLocalStorage(user)
    // Assuming you have a function addUserToLocalStorage to handle Local Storage:
          toast.success(`Hello ${user.name}, Welcome to the Portal Here.`);
        })
    // Using the addCase Method Here:
        .addCase(registerUser.rejected, (state, { payload }) => {
          state.isLoading = false;
          toast.error(payload);
        })

    // Using the loginUser Here:
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
  // Using the addCase Method Here:
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
  // Adding and Persisting the user to the LocalStorage:
  // When loginUser.fulfilled is satisfied:
        addUserToLocalStorage(user)
  // Assuming you have a function addUserToLocalStorage to handle Local Storage:
        toast.success(`Hello ${user.name}, Welcome to the Portal Here.`);
      })
  // Using the addCase Method Here:
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled,(state, {payload})=>{
        const {user} = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`User Updated Successfully!`)
      })
      .addCase(updateUser.rejected,(state, {payload})=>{
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected,()=>{
        toast.error('There was an Error Here...')
      })


    },
});

export const {toggleSidebar, logoutUser} = userSlice.actions;
export default userSlice.reducer;