import React,{useState} from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useSelector } from 'react-redux';



const ChartsContainer =()=>{
    const [barChart, setBarchart] = useState(true)
    // Using an Alias for monthlyApplications with the data Properties:
    const {monthlyApplications:data} = useSelector((store)=>store.allJobs)
    return(
    <Wrapper>
        <h4>Monthly Applications</h4>
        
        <button type="button" onClick={()=>setBarchart(!barChart)}>
        {/* If it is true, it will show the Area Chart..., Otherwise it will show Bar Chart */}
        {barChart?'Area Chart...':'Bar Chart...'}
        </button>
        {/* If it is true, display BarChart Component, Otherwise display AreaChart Component */}
        {barChart?<BarChart data={data}/>:<AreaChart data={data}/>}
    </Wrapper>
    )
}


export default ChartsContainer