import {FaLocationArrow, FaBriefcase, FaCalendarAlt} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import {useDispatch} from 'react-redux';
import { deleteJob, setEditJob } from '../features/job/jobSlice';
import JobInfo from './JobInfo';
// Import for the Moment.js Extension:
import moment from 'moment';

const Job =({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    status,
})=>{
    // Using the useDispatch Method:
    const dispatch = useDispatch();
    // This is the Moment.Js to create the Date Format:
    const date = moment(createdAt).format("MMM Do, YYYY")
    return(
    <Wrapper>
        <header>
            <div className="main-icon">
    {/* charAt JavaScript Methods to get the First Character
    using the charAt(0) or charAt(int) here */}
                {company.charAt(0)}
            </div>
            <div className="info">
                <h5>{position}</h5>
                <p>{company}</p>
            </div>
        </header>
        <div className="content">
            <div className="content-center">
                <JobInfo icon={<FaLocationArrow/>} text={jobLocation}/>
                <JobInfo icon={<FaCalendarAlt/>} text={date}/>
                <JobInfo icon={<FaBriefcase/>} text={jobType}/>
                {/* This is creating the Different Background of ${status} in
                the className here*/}
                {/* This is creating the ${status} here for the Different Text Here*/}
                <div className={`status ${status}`}>{`${status}`}</div>
            </div>
            <footer className="actions">
                <Link to="/add-job" className="btn edit-btn"
                // This is the payload itself:
                // set the editJobId:_id here which is different:
                onClick={()=>{dispatch(setEditJob({editJobId:_id,position,company,jobLocation,
                jobType,status}))}}>
                    Edit Over Here
                </Link>
                <button
                type="button"
                className="btn delete-btn"
                onClick={()=>dispatch(deleteJob(_id))}>
                    Delete Here
                </button>
            </footer>
        </div>
    </Wrapper>
    )
}

export default Job;

