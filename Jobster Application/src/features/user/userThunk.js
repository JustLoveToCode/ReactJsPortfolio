import customFetch,{checkForUnauthorizedResponse} from '../../utils/axios';
import {logoutUser} from './userSlice';
import {clearAllJobsState} from '../job/allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';


// Creating the registerUserThunk Function:
export const registerUserThunk = async(url, user, thunkAPI)=>{
    try{
// This is using the post Method:
        const resp = await customFetch.post(url, user);
        return resp.data;
    }
    catch(error){
        return checkForUnauthorizedResponse(error,thunkAPI);
    }
}

// Creating the loginUserThunk Function:
export const loginUserThunk = async(url, user, thunkAPI)=>{
    try{
        //customFetch is actually using the Axios Library:
        // This is using the post method:
        const resp = await customFetch.post(url, user)
        // This is where the User Object is Located:
        return resp.data;
    }
    catch(error){
      return checkForUnauthorizedResponse(error,thunkAPI);

    }
}

// Creating the updateUserThunk Function:
export const updateUserThunk = async(url, user, thunkAPI)=>{
  // Using the try and catch Method Here:
    try{
  // This is using the patch method:
        const resp = await customFetch.patch(url, user);
        return resp.data;
      } 

      catch(error){
  // This is for the error.response.status === 401:
        // if(error.response.status === 401){
        //   thunkAPI.dispatch(logoutUser())
        //   return thunkAPI.rejectWithValue('Unauthorized, Logging Out...')
        // }
  // For the Other Types of the Error:
        return thunkAPI.rejectWithValue(error.response.data.msg)
      }
}

// Using the clearStoreThunk Function:
export const clearStoreThunk = async (message, thunkAPI)=>{
  try{
  // Logout the User:
  thunkAPI.dispatch(logoutUser(message));
  // Clearing the Jobs Value:
  thunkAPI.dispatch(clearAllJobsState());
  // Clear Job Input:
  thunkAPI.dispatch(clearValues());
  // Indicate that the response is successful:
  return Promise.resolve();
  }
  catch{
  // Indicate that the response is not successful:
    return Promise.reject()

  }
}