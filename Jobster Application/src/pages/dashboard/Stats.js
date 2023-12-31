import {useEffect} from 'react';
import {StatsContainer, Loading, ChartsContainer} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import { showStats } from '../../features/job/allJobs/allJobsSlice';


const Stats=()=>{
    const {isLoading, monthlyApplications} = useSelector((store)=>store.allJobs);
    // Using the useDispatch Hook:
    const dispatch = useDispatch();

    // Using the useEffect Hook Here that will run only Once:
    useEffect(()=>{
        dispatch(showStats())
    }, []);

    return(
    <>
    <StatsContainer/>
    {/* Using the And && Operator to check if it is Loading State */}
    {/* monthlyApplications is an Array, using the .length to access
    the Number of the items in the Array */}
    {monthlyApplications.length>0 && <ChartsContainer/>}
    </>
    )
}

export default Stats