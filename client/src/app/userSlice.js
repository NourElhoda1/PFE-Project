// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit" ;
// import AuthAxios from "../helpers/request";

// //! Get all users
// export const getAllUsers = createAsyncThunk('users/getAllUsers' , async () => {
//     return AuthAxios.get('http://localhost:8000/v1/users')
//     .then(response => response.data.docs)
//     .catch(error => console.log(error.response))
// })

// //! Create new user
// export const register = createAsyncThunk('users/register' , async ( user , { rejectWithValue } ) => {
//     return AuthAxios.post('http://localhost:8000/v1/users/register' , user)
//     .then(response => {
//         const returnData = { messageSuccess : response.data.message } ;
//         return returnData ;
//     }).catch(error => rejectWithValue(error.response.data.errors)) ;
// })

// //! User profile
// export const userProfile = createAsyncThunk('users/userProfile' , async () => {
//     return AuthAxios.get(`http://localhost:8000/v1/user/profile`)
//     .then(response => response.data) 
//     .catch(error => console.log(error)) ;
// })

// //! Update profile info 
// export const updateProfileInfo = createAsyncThunk('users/updateProfileInfo' , async ( newInformation , { rejectWithValue } ) => {
//     return AuthAxios.put(`http://localhost:8000/v1/user/profile/update/information` , newInformation)
//     .then(response => {
//         const returnData = { messageSuccess : response.data.message , info :newInformation } ;
//         return returnData ;
//     }) 
//     .catch(error => rejectWithValue(error)) ;
// })


// //! blockOrUnblock user
// export const blockOrUnblock = createAsyncThunk('users/blockOrUnblock' , async ( id ) => {
//     return AuthAxios.delete(`http://localhost:8000/v1/users/block-unblock/${id}`)
//     .then(response => {
//         const returnData = { id : id , message : response.data.message }
//         return returnData
//     })
//     .catch(error => console.log(error.response))
// })

// const userSlice = createSlice({
//     name : 'users' ,

//     initialState : {
//         users : [] ,
//         user : '' ,
//         status : '' ,
//         error : '' ,
//         success : ''
//     } ,

//     reducers : {
//         refreshUser : (state , action) => {
//             const index = state.users.findIndex(user => user._id === action.payload._id) ;
//             state.users[index] = action.payload ;
//         }
//     } ,

//     extraReducers : ( builder ) => {
//         builder

//         //! Get all users
//         .addCase(getAllUsers.fulfilled , (state , action) => {
//             state.status = 'fulfilled'
//             state.users = action.payload 
//         })
//         .addCase(getAllUsers.rejected , (state , action) => {
//             state.status = 'rejected'
//             state.error = action.payload 
//         })
//         .addCase(getAllUsers.pending , (state , action) => {
//             state.status = 'pending'
//         })

//         //! Create new user
//         .addCase(register.fulfilled , (state , action) => {
//             state.status = 'fulfilled'
//         })
//         .addCase(register.rejected , (state , action) => {
//             state.status = 'rejected'
//             state.error = action.payload 
//         })
//         .addCase(register.pending , (state , action) => {
//             state.status = 'pending'
//         })

//         //! Get user profile
//         .addCase(userProfile.fulfilled , (state , action) => {
//             state.status = 'fulfilled' ;
//             state.user = action.payload ;
//         })
//         .addCase(userProfile.rejected , (state , action) => {
//             state.status = 'rejected'
//             state.error = action.payload 
//         })
//         .addCase(userProfile.pending , (state , action) => {
//             state.status = 'pending'
//         })

//         //! Update profile information
//         .addCase(updateProfileInfo.fulfilled , (state , action) => {
//             state.status = 'fulfilled' ;
//             state.success = action.payload.messageSuccess ;
//             state.user.first_name = action.payload.info.first_name ;
//             state.user.last_name = action.payload.info.last_name ;
//             state.user.user_name = action.payload.info.user_name ;
//             state.user.email = action.payload.info.email ;
//         })
//         .addCase(updateProfileInfo.rejected , (state , action) => {
//             state.status = 'rejected'
//             state.error = action.payload 
//         })
//         .addCase(updateProfileInfo.pending , (state , action) => {
//             state.status = 'pending'
//         })

//         //! blockOrUnblock user
//         .addCase(blockOrUnblock.fulfilled , (state , action) => {
//             state.status = 'fulfilled'
//             state.users = state.users.filter(user => user._id !== action.payload.id)
//         })
//         .addCase(blockOrUnblock.rejected , (state , action) => {
//             state.status = 'rejected'
//             state.error = action.payload 
//         })
//         .addCase(blockOrUnblock.pending , (state , action) => {
//             state.status = 'pending'
//         })
//     }
// }) ;

// export const { refreshUser } = userSlice.actions ;
// export default userSlice.reducer ;