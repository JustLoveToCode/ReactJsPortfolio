import {useEffect} from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import {useSelector,useDispatch} from 'react-redux';
import Loading from './Loading';
import { getAllJobs } from '../features/job/allJobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';



const JobsContainer=()=>{
    // Using the Object Destructuring to get the jobs and isLoading Properties:
    const {jobs, isLoading,page,totalJobs,numOfPages,search, searchStatus, searchType,sort} = useSelector((store)=>store.allJobs);
    // Using the useDispatch() Method Here:
    const dispatch = useDispatch();
    // If isLoading to be true:
    // Using the useEffect Hook and render the dispatch Method Conditionally:
    // When the page,searchType, searchStatus and sort is Changed:
    useEffect(()=>{
        dispatch(getAllJobs());
    },[page,search,searchStatus, searchType, sort])
    // If isLoading is true:
    if(isLoading){
        return(
            <Loading center/>
        )
    }
    // If there is No Jobs to Display:
    if(jobs.length === 0){
        return(
        <Wrapper>
        <h2>There is No Jobs Available</h2>
        </Wrapper>
    )
}


return(
    <Wrapper>
    {/* Using the && Operator Here */}
    <h3>{totalJobs} Job{jobs.length>1 && 's'} Found Here </h3>
    <div className="jobs">
    {/* Using the map Method to iterate through the jobs array */}
    {jobs.map((job)=>{
        return <Job key={job._id} {...job}/>
    })}
    </div>
    {/* If the numOfPages is More than 1, Display the PageBtnContainer */}
    {numOfPages>1 &&<PageBtnContainer/>}
    </Wrapper>
    )
}

export default JobsContainer