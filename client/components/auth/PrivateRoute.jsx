'use client'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

export default function PrivateRoute({ children }) {
  const router = useRouter()
  const { token } = useSelector((state) => state.auth)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!token) {
      router.push('/')
    } else {
      setChecked(true)
    }
  }, [token, router])

  if (!checked) return null // <-- This line is essential to avoid early render

  return <>{children}</>
}
