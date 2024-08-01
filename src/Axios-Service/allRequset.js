import { commonRequest } from "./commonRequset"
import { serverURL } from "./serverURL"

export const register = async(data)=>{
    return commonRequest('POST',`${serverURL}/user/register`,data,"")
}
export const login = async(data)=>{
    return commonRequest('POST',`${serverURL}/user/login`,data,"")
}
export const googleAuth = async(data)=>{
    return commonRequest('POST',`${serverURL}/user/googleAuth`,data,"")
}

export const getExistingUsersAPI = async(searchValue,reqHeader)=>{
    return commonRequest('GET',`${serverURL}/existingusers?search=${searchValue}`,null,reqHeader)
}

export const getUsersMessagesAPI = async (sender, recipient,reqHeader) => {
    return commonRequest('GET', `${serverURL}/users/messages?sender=${sender}&recipient=${recipient}`,null,reqHeader);
}



