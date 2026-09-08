'use client'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'

const OpenRoute = (children) => {
    const router = useRouter()
    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        if (token) {
            router.push('/dashboard');
        }
    }, [token, router])

    if (!token) {
        return <>{children}</>
    }

    // Prevent rendering children while redirecting
    return null
}

export default OpenRoute
