import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import { handleChange, clearValues, createJob, editJob} from '../../features/job/jobSlice';
import { useEffect } from 'react';

// Creating the AddJob Function:
const AddJob=()=>{
    // Using the Object Destructuring for the store Properties:
    const {isLoading, position, company, jobLocation, jobType, jobTypeOptions, status,
    statusOptions, isEditing, editJobId} = useSelector((store)=>store.job);

    const {user} = useSelector((store)=>store.user)
    // Using the useDispatch() Method:
    const dispatch = useDispatch();
    // This function is for the Button:
    const handleSubmit =(e)=>{
        e.preventDefault()
        if(!position || !company || !jobLocation){
            toast.error('Please Fill Out All the Fields');
            // Do not continue down the code block:
            return;
        }
        if(isEditing){
            dispatch(editJob({jobId:editJobId,job:{position,company,jobLocation,jobType,status}}))
        // Need the return statement, otherwise JavaScript will keep reading
        // the code downward:
        return
        }
        dispatch(createJob({position, company, jobLocation, jobType, status}))
    };

    // This function is for the input:
    const handleJobInput = (e)=>{
        const name = e.target.name
        const value = e.target.value
        dispatch(handleChange({name,value}))
    }
    // This will be Invoked Whenever
    // we Navigate to that Website Page:
    useEffect(()=>{
    if(!isEditing){
        dispatch(
            handleChange({
                name: 'jobLocation',
                value: user.location,
        })
    );
}
},[]);

    return(
    <Wrapper>
        <form className="form">
            {/* Using the Ternary Operator: */}
            <h3>{isEditing?'Edit Job': "Add Job"}</h3>

            <div className="form-center">
                {/* This is for position */}
                {/* Using the FormRow Component: */}
                <FormRow 
                type="text" 
                name="position"
                value={position} 
                handleChange={handleJobInput}
                />
                {/* This is for company */}
                {/* Using the FormRow Component: */}
                <FormRow 
                type="text" 
                name="company"
                value={company} 
                handleChange={handleJobInput}
                />
                {/* This is for Job Location */}
                {/* Using the FormRow Component: */}
                <FormRow 
                type="text" 
                name="jobLocation"
                // Provide Better Styling for the labelText:
                labelText="Job Location"
                value={jobLocation} 
                handleChange={handleJobInput}
                />

                {/* Status Application */}
                <FormRowSelect name="status"
                value={status} handleChange={handleJobInput}
                list = {statusOptions}/>

                {/* Job Type */}
                <FormRowSelect name="jobType"
                labelText="Job Type"
                value={jobType} handleChange={handleJobInput}
                list = {jobTypeOptions}/> 

            <div className="btn-container">
                <button type="button" className="btn btn-block clear-btn"
                onClick={()=>dispatch(clearValues())}>
                Clear Here
                </button>

                <button type="submit" className="btn btn-block submit-btn"
                onClick={handleSubmit} disabled={isLoading}>
                Submit Here
                </button>
            </div>
            </div>   

        </form>
    </Wrapper>
    )
}

export default AddJob