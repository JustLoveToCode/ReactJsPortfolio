import {showLoading, hideLoading, getAllJobs} from '../job/allJobs/allJobsSlice';
import customFetch, {checkForUnauthorizedResponse} from '../../utils/axios';
import {clearValues} from './jobSlice';




// Using the try and catch Method:
// for the createJobThunk Function:
export const createJobThunk = async(job, thunkAPI)=>{
    try{
        console.log("Current User Thunk", thunkAPI)
        console.log("Current User Slice:", thunkAPI.getState());
        console.log("Current User Slice", thunkAPI.getState().user);

        const resp = await customFetch.post('/jobs', job);
        thunkAPI.dispatch(clearValues());
        return resp.data

// Using the catch(error) Method to catch the error:
    } catch(error){
        return checkForUnauthorizedResponse(error, thunkAPI);
       
    }
}

// Using the try and catch Method:
// for the deleteJobThunk Function:
export const deleteJobThunk = async(jobId, thunkAPI)=>{
    thunkAPI.dispatch(showLoading());
    try{
        const resp = await customFetch.delete(`/jobs/${jobId}`);
        thunkAPI.dispatch(getAllJobs());
        return resp.data.msg;
    }
    catch(error){
        thunkAPI.dispatch(hideLoading());
        return checkForUnauthorizedResponse(error,thunkAPI);
    }
}



// Using the try and catch Method:
// for the editJobThunk Function:
export const editJobThunk = async({jobId,job}, thunkAPI)=>{
    try{
        const resp = await customFetch.patch(`/jobs/${jobId}`,job);
        thunkAPI.dispatch(clearValues());
        return resp.data;
    }
    catch(error){
        return checkForUnauthorizedResponse(error,thunkAPI);

    }
}
