import {Link} from 'react-router-dom';
import img from '../assets/images/not-found.svg';
// This is for the Wrapper Component Here:
import Wrapper from '../assets/wrappers/ErrorPage';

const Error=()=>{
    return(
    // .min-height to be 100% of the Screen:
    <Wrapper className="full-page">
        <div>
            <img src={img} alt='Not Found'/>
            <h3>Ooh, Page Is Not Found</h3>
            <p>We Cannot Seem to Find the Page that you are Looking For</p>
            <Link to="/">Back To HomePage</Link>
        </div>
    </Wrapper>
    )
}

export default Error