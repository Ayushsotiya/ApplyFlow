import React from 'react'
import Homepage from '@/components/common/Homepage'
import OpenRoute from '@/components/auth/OpenRoute'
const page = () => {
  return (
    <OpenRoute>
      <div>
        <Homepage />
      </div>
    </OpenRoute>
  )
}

export default page