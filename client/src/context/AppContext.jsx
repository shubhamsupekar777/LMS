import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext=createContext()

export const AppContextProvider=(props)=>{
    const currency=import.meta.env.VITE_CURRENCY
    const navigate=useNavigate()

    const[allCourses,setAllCourses]=useState([])
    const[isEducator,setIsEducator]=useState(true)
    const[enrolledCourses,setEnrolledCourses]=useState([])


    //Fetch All Courses
    const fetchAllCourses=async()=>{
        setAllCourses(dummyCourses)
    }

    //Function To Calculate Average Rating To The Course
    const calculateRating=(course)=>{
        if(course.courseRating.length===0){
            return 0;
        }
        let totalRating=0
        course.courseRating.forEach((rating)=>{
            totalRating += rating.rating
        })
        return totalRating / course.courseRating.length
    }


    //Function to calculate Course Chapter Time
    const  calculateChapterTime=(chapter)=>{
        let time=0
        chapter.chapterContent.map((lecture)=>time += lecture.lectureDuration)
        return humanizeDuration(time * 60 *1000,{units:["h","m"]})
    }

    //Function To Calculate Course Duration
    const calculateCourseDuration=(course)=>{
        let time=0
        course.courseContent.map((chapter)=>chapter.chapterContent.map(
            (lecture)=> time += lecture.lectureDuration
        ))
         return humanizeDuration(time * 60 *1000,{units:["h","m"]})


    }

    //Function Calculate To No Of Lectures in the course
    const calculateNoOfLectures=(course)=>{
        let totalLectures=0;
        course.courseContent.forEach(chapter=>{
            if(Array.isArray(chapter.chapterContent)){
                totalLectures += chapter.chapterContent.length
            }

        });
        return totalLectures;


    }

    //Fetch User Enrolled Courses
    const fetchUserEnrolledCourses=async()=>{
        setEnrolledCourses(dummyCourses)
    }
 
    useEffect(()=>{
        fetchAllCourses()
        fetchUserEnrolledCourses();
    },[])

    const value={
        currency,allCourses,navigate,setIsEducator,calculateChapterTime,calculateCourseDuration,calculateNoOfLectures,enrolledCourses,fetchUserEnrolledCourses
        // calculateRating,
    }
    return(
        <AppContext.Provider value={value}>
           {props.children} 
        </AppContext.Provider>
    )
}