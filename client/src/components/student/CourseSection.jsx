import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

const CourseSection = () => {
  const{allCourses}=useContext(AppContext)
  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn From The Best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>Discover Our Top-rated Courses Across Various categories.
        from Coding And Design<br/> To Business And Wellness,
        Our Courses Are Crafted To Deliver Results</p>


    <div className='grid grid-cols-auto px-4 md:px-0 md:my-16 my-10 gap-4'>
      {allCourses.slice(0,5).map((course,index)=><CourseCard key={index} course={course}/>)}
    </div>

        <Link to={'/course-list'} onClick={()=>scrollTo(0,0)}
        className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded'>Show All Courses</Link>
    </div>
  )
}

export default CourseSection
