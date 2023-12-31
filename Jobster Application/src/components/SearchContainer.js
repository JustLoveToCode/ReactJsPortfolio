import {FormRow, FormRowSelect} from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import {useSelector, useDispatch} from 'react-redux';
import {handleChange, clearFilters} from '../features/job/allJobs/allJobsSlice';


const SearchContainer =()=>{
    // Using the useSelectors Method to get the Properties for store.allJobs:
    const {isLoading, search, searchStatus, searchType, sort, sortOptions} = useSelector((store)=>store.allJobs);

    // Using the useSelectors Method to get the Properties for store.job:
    const {jobTypeOptions, statusOptions} = useSelector((store)=>store.job);

    // Invoking the useDispatch() Methods:
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        // As you type into the Search Box, there will be a Loading Spinner:
        if (isLoading) return;
        // handleChange({name:'page', value:2}): This is the payload:
        // Getting the e.target.name and e.target.value Here
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
    };
    
    // This handleSubmit Function is to Clear the Filters:
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(clearFilters())

    }
    return(
        <Wrapper>
            <form className="form">
                <h4>Search Form</h4>
                <div className="form-center">
                    {/* Search Position, name need to match exactly*/}
                    <FormRow type="text" name="search" value={search} handleChange={handleSearch}/>
                    {/* Search by Status, name need to match exactly */}
                    <FormRowSelect labelText="status" name="searchStatus" value={searchStatus}
                    // Using the Spread Operator ...statusOptions:
                    handleChange={handleSearch} list={['all', ...statusOptions]}/>
                    {/* Search by Type, name need to match exactly */}
                    <FormRowSelect labelText="type" name="searchType" value={searchType}
                    // Using the Spread Operator ...jobTypeOptions:
                    handleChange={handleSearch} list={['all', ...jobTypeOptions]}/>
                    {/* sort, and the name need to match exactly */}
                    <FormRowSelect name="sort" value={sort} handleChange={handleSearch}
                    list={sortOptions}/>
                    {/* Using the button HTML element */}
                    <button className="btn btn-block btn-danger" disabled={isLoading}
                    // Using the onClick to do the handleSubmit Function:
                    onClick={handleSubmit}>Clear Filters</button>
                </div>
            </form>
        </Wrapper>  
    )
}

export default SearchContainer;