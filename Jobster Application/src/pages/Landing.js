import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import {Link} from 'react-router-dom';

// Using the Wrapper Component By Importing them:
// from the wrappers folder:
import Wrapper from '../assets/wrappers/LandingPage';
// Import the Logo from the Components:
import {Logo} from '../components';

const Landing =()=>{
    return(
    <Wrapper>
    <main>
        <nav>
            <Logo/>
        </nav>

        <div className="container page">
            <div className="info">
                <h1>
                    Job <span>Tracking</span> App
                </h1>
                <p>
                    lorem euhdue heudbe e uede uedue uede buedbe
                    eudue eudhe beudbe busb beudbe bwudbw feybe utnhi
                    edei ede g tg ty yhyhy sxsx bgbg hyuhj eded yy6y6
                    crfrfr  gtgt tgyhyh uju urffrfr sedee frgtgt hyhy
                    ededef ttgtg tfrfr swpdwp ediiefn rjfinrf ruubr eufe
                    firnf ifgt iyhyhp hjiyhny eduebu rufnr hykhmy hyomh
                </p>

                <Link to="/register" className="btn btn-hero">Login/Register
                </Link>

            </div>

            <img src={main} alt="Job Hunt" className="img main-img"/>
        </div>
    </main>
    </Wrapper>
    )
}


export default Landing;

