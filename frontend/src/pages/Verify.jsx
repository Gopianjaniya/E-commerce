// import React from 'react'
// import { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { useSearchParams } from 'react-router-dom'
// import { useEffect } from 'react'
// import { toast } from 'react-toastify'
// import axios from 'axios'

// export default function Verify() {
//     const{navigate,token,setcartItems,backendUrl}=useContext(ShopContext)
//     const{searchParams,setSearchParams}=useSearchParams()
//     const success = searchParams.get("success");
//     const orderId = searchParams.get("orderId");

//     const verifyPayment=async()=>{
//         try {
//             if(!token){
//                 return null
//             }
//             const response = await axios.post(backend+'/api/order/verifyStripe',{success,orderId},{Headers:{token}})
//             if(response.data.success){
//                 setcartItems({})
//                 navigate('/orders')
//             }else{
//                 navigate('/cart')
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
            
//         }
//     }
//     useEffect(()=>{
//         verifyPayment()
//     },[token])
//   return (
//     <div>Verify</div>
//   )
// }
