import StatItem from "./StatItem"
import {FaSuitcaseRolling, FaCalendarCheck, FaBug} from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import {useSelector} from 'react-redux';



const StatsContainer =()=>{
    const {stats} = useSelector((store)=>store.allJobs)
    const defaultStats = [
        {
          title: 'pending applications',
          count: stats.pending || 0,
          icon: <FaSuitcaseRolling />,
          color: '#e9b949',
          bcg: '#fcefc7',
        },
        {
          title: 'interviews scheduled',
          count: stats.interview || 0,
          icon: <FaCalendarCheck />,
          color: '#647acb',
          bcg: '#e0e8f9',
        },
        {
          title: 'jobs declined',
          count: stats.declined || 0,
          icon: <FaBug />,
          color: '#d66a6a',
          bcg: '#ffeeee',
        },
      ];

// Iterating Over the Array:
return <Wrapper>
{/* Using the Map Method to Iterate Over */}
{/* The Map method will return a Number of Items
depending on How many items it has Iterated through using the
map Method */}
{defaultStats.map((item,index)=>{
// Passing the key and the index Here:
// Using the ...item to spread out the properties:
    return <StatItem key={index} {...item}/>

})}

</Wrapper>

}

export default StatsContainer