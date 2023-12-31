import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import {useSelector, useDispatch} from 'react-redux';
import { changePage } from '../features/job/allJobs/allJobsSlice';


const PageBtnContainer=()=>{
    // Using the useSelector to get the numOfPages and page Properties
    // page and numOfPages by default is 1:
    const {numOfPages, page} = useSelector((store)=>store.allJobs);
    // Using the useDispatch() Method:
    const dispatch = useDispatch();
    // Using the Array.from to Construct New Array:
    // When the numOfPages Changes, the Size of Array will Change:
    // The CallBack Function:
    // For Each Iteration, it will return index + 1 Here:
    // pages = [1,2,3,4,5,6,7..]
    // Creating the Arrays of Integers:
    const pages = Array.from({length:numOfPages}, (_,index)=>{
        return index + 1;
    });

    const nextPage=()=>{
        let newPage = page + 1;
        // If the newPage is greater than numOfPages
        // return to page 1 with newPage 1:
        if(newPage>numOfPages){
            newPage = 1;
        }
        // Using the dispatch Method to Change the Page:
        dispatch(changePage(newPage))

    }

    const prevPage=()=>{
        let newPage = page-1;
        // If the newPage is already at Page 1 and
        // the user continue to click Prev Page
        // It will go to the Last Page:
        if(newPage<1){
            newPage = numOfPages
        }
        // Using the dispatch Method to Change the Page:
        dispatch(changePage(newPage))

    }

    return(
    <Wrapper>
        {/* Using the Prev Button */}
        <button type="button" className="prev-btn" onClick={prevPage}>
            <HiChevronDoubleLeft/>
            Prev
        </button>

        {/* This will return the Button Container */}
        <div className="btn-container">
        {/* Using the map method */}
            {pages.map((pageNumber)=>{
                return(
                <button
                type="button"
                key={pageNumber}
                // Using the className to change the Styling of the Button:
                className={pageNumber === page?'pageBtn active': 'pageBtn'}
                // dispatch will take reference to the pageNumber
                // pageNumber is iterated from 1 to n:
                onClick={()=>dispatch(changePage(pageNumber))}
                >
                {pageNumber}
                </button>
                )
                
            })} 
        </div>

        {/* Using the Next Button */}
        <button type="button" className="next-btn" onClick={nextPage}>
            <HiChevronDoubleRight/>
            Next 
        </button>
    </Wrapper>
    )
}

export default PageBtnContainer