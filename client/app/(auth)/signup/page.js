import React from 'react'
import OpenRoute from '@/components/auth/OpenRoute'
import Signup from '@/components/auth/signup';
function page() {
  return (
    <div>
      <OpenRoute>
        <Signup />
      </OpenRoute>
    </div>
  )
}

export default page