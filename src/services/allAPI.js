import { BASE_URL } from  "./baseurl"
import { commonAPI } from  "./commonAPI"

//register api

export const registerAPI = async(user)=>{
    
 return   await commonAPI("POST",` ${BASE_URL}/user/register`,user, "")
}

//login api

export const loginAPI = async(user) =>{
   return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}


//add project
export const addProjectAPI = async(reqBody,reqHeader) =>{
   return await commonAPI("POST",`${BASE_URL}/project/add`,reqBody,reqHeader)
}

//home project
export const homeProjectAPI = async() =>{
   return await commonAPI("GET",`${BASE_URL}/projects/home-project`)
}

//all Project
export const allProjectAPI =async(searchKey,reqHeader)=>{
   return await commonAPI("GET",`${BASE_URL}/projects/all-project?search=${searchKey}`,"",reqHeader)
}

//userproject
export const allUserProject = async(reqHeader)=>{
   return await commonAPI("GET",`${BASE_URL}/user/all-project`,"",reqHeader) 
}

//editUserProject
export const editProjectAPI = async(projectId,reqBody,reqHeader)=>{
//path parameter: id -router
   return await commonAPI("PUT",`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader) 
}


//deleteProject
export const deleteProjectAPI = async(projectId,reqHeader)=>{
   //path parameter: id -router
      return await commonAPI("DELETE",`${BASE_URL}/project/remove/${projectId}`,{},reqHeader) 
   }
   

//editprofile
export const editProfileAPI = async(reqBody,reqHeader)=>{
   //path parameter: id -router
      return await commonAPI("PUT",`${BASE_URL}/user/edit`,reqBody,reqHeader) 
   }
