'use client'
import LoadingCard from '../Card/LoadingCard'
import AppWrapper from '../AppWrapper/AppWrapper'

export default function LoadingPage () {
   return (
      <AppWrapper>
         {Array.from({ length: 4 }, (_,i) => i+1).map(v => (
            <LoadingCard 
               key={v}
               styles={{ 
                  width: "100%", height: "150px", borderRadius: "15px",
                  marginBottom: "30px"
               }}
            />
         ))}
      </AppWrapper>
   )
}
