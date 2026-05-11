import ProductCard from "@/components/ProductCard"
import { Toaster } from "react-hot-toast"
import DetailBooking from "./booking/[id]/page"

export default async function Home(){
  return(    
    // nanti ubah ke mx-auto & py-8 kalo udh jadi yg detail booking
  <main className=""> 
    {/* <ProductCard/> */}
    <DetailBooking/>
    < Toaster position="top-right" reverseOrder={false}/>
  </main>
  )
}