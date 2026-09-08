import React from 'react'
import LoginPage from '@/components/auth/login'
import OpenRoute from '@/components/auth/OpenRoute'
const page = () => {
  return (
    <>
      <OpenRoute>
        <LoginPage />
      </OpenRoute>
    </>
  )
}

export default page