import {Landing,Error, Register, ProtectedRoute} from './pages';
// Import from react-router-dom:
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// Import the ToastContainer:
import {ToastContainer} from 'react-toastify';
// Import the ReactToastify:
import 'react-toastify/dist/ReactToastify.css';
import {Profile, AddJob, AllJobs, Stats, SharedLayout} from './pages/dashboard';



// Using the Functional App Component Here:
function App() {
return(
  <div>
    <BrowserRouter>
      <Routes>
        {/* The Moment we Hit the "/" Route, 
        We will Display the <Stats/> Here */}
          <Route path="/" element={
        // Using the ProtectedRoute Here:
          <ProtectedRoute>
          <SharedLayout/>
          </ProtectedRoute>}>
            <Route index element={<Stats/>
          }/>
        {/* This is the Route that will return
        the Respective Components: */}
            <Route path="all-jobs" element={<AllJobs/>}/>
            <Route path="add-job" element={<AddJob/>}/>
            <Route path="profile" element={<Profile/>}/>
          </Route>

          <Route path="register" element={<Register/>}/>
          <Route path="landing" element={<Landing/>}/>
          <Route path="*" element={<Error/>}/>
      </Routes>
      <ToastContainer position="top-center"/>
    </BrowserRouter>
  </div>
)
}

export default App;
