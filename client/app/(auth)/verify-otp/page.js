import React from 'react';
import OpenRoute from '@/components/auth/OpenRoute';
import Verify from '@/components/auth/verify';
const page = () => {
  return (
    <div>
      <OpenRoute>
        <Verify />
      </OpenRoute>
    </div>
  )
}

export default page