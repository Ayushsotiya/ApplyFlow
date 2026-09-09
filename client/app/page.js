import React from 'react'
import Homepage from '@/components/common/Homepage'
import OpenRoute from '@/components/auth/OpenRoute'
const page = () => {
  return (
    <OpenRoute>
      <Homepage />
    </OpenRoute>
  )
}

export default page