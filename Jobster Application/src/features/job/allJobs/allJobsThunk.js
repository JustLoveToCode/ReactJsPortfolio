import customFetch, {checkForUnauthorizedResponse} from "../../../utils/axios";


export const getAllJobsThunk =  async(_,thunkAPI)=>{
    // console.log(thunkAPI.getState()) -- This will give you allJobs, job and user
    // Using the Object Destructuring to get the Various Properties from the allJobs:
    // getState() is the method that return the Current State of the Redux Store:
    // This will access the entire state object:
    const {page,search,searchStatus, searchType, sort} = thunkAPI.getState().allJobs;
    // Using the Query String Parameter:
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    // If the search actually exist:
    if(search){
        url = url + `&search=${search}`;
    }
    // Using the try and catch Method:
    try{
        // Using the Axios Library for the customFetch Method:
        const resp = await customFetch.get(url);
        return resp.data;
    }
    catch(error){
        return checkForUnauthorizedResponse(error,thunkAPI);
    }
}

export const showStatsThunk = async(_,thunkAPI)=>{
    // Using the try and catch Method:
    try{
        const resp = await customFetch.get('/jobs/stats');
        return resp.data;
    }

    catch(error){
        return checkForUnauthorizedResponse(error,thunkAPI)
    }
}