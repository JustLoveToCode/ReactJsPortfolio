import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
// Importing the axios from 'axios':
import axios from 'axios';

// This is the rootUrl:
const rootUrl = 'https://api.github.com';

// Creating the Context: We have Access to the Provider and Consumer:
// GithubContext.Provider or GithubContext.Consumer:
// Creating the Context using the React.createContext()
const GithubContext = React.createContext()

// Wrapping the children in the githubProvider:
// <githubProvider> <App/> </githubProvider>
const GithubProvider =({children})=>{
    // Using the useState Method:
    // This is the Initial State of the useState Hook:
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    // Request Loading: Using the useContext to get the requests:
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    // Using the useContext to get the error:
    // error have the {show:false, msg:""} Here:
    // properties name of show and msg here:
    const [error, setError] = useState({show:false, msg:""})

    // Functionality for searchGithubUser:
    const searchGithubUser = async(user)=>{
        // Default of toggleError would be show = false and msg = " ":
        // Setting it back to the Default of toggleError Function:
        toggleError()
        setIsLoading(true);
        // setLoading(true)
        // Using the axios Library to fetch the Individual User:
        const response = await axios(`${rootUrl}/users/${user}`).
        catch(err=>console.log(err))
        // If the response actually exist:
        if(response){
            setGithubUser(response.data);
            // Extracting the login and followers_url Properties:
            const {login, followers_url} = response.data;
            // repos
            // Promise.allSettled: It mean .then will only run when both Promise are settled:
            await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`),axios(`${followers_url}?per_page=100`)])
            // Using the then and catch for the resolved Promise and rejected Promise:
            .then((results)=>{
                console.log(results)
                // repos represent the first item result:
                // followers represent the second item result:
                const [repos,followers] = results;
                const status = 'fulfilled';
                if(repos.status === status){
                    setRepos(repos.value.data)
                }

                if(followers.status === status){
                    setFollowers(followers.value.data)
                }

            }).catch(err=>console.log(err))
            
        // Repos:
        //https://api.github.com/users/john-smilga/repos?per_page=100

        // Followers:
        //https://api.github.com/users/john-smilga/followers
            
        }

        // More Logic Here:
        else{
            toggleError(true, 'There is No User with that Associated Username');
        }
        checkRequests();
        setIsLoading(false);
    }
    // Check the rate
    const checkRequests = ()=>{
        // get request will return Promise:
        // extract the data object:
        axios(`${rootUrl}/rate_limit`).then(({data})=>{
        // remaining is the Variable we want to Extract:
        // from the axios Get Request here:
        // Object Destructuring and Nested Object Destructuring:
        let {rate:{remaining}} = data;
        // useState to set the requests here:
        setRequests(remaining)
        // If remaining is equal to 0:
        if(remaining === 0){
        // Invoke Error
        toggleError(true, 'You Have Exceeded your Hourly Rate Limit')
        }
        }).catch((err)=>console.log(err))
    };
    // Setting up the Error using toggleError:
    function toggleError(show = false,msg = ''){
        setError({show, msg})
    }
    // Run the checkRequests after the Component actually Mount:
    useEffect(checkRequests, []);


    return (
    // The children will have all the value that is created by
    // the GithubContextProvider here:
    <GithubContext.Provider value={{githubUser, repos, followers, requests, error,
    searchGithubUser, isLoading}}>{children}</GithubContext.Provider>)
}

// Exporting the GithubProvider and the GithubContext:
export {GithubProvider, GithubContext}


