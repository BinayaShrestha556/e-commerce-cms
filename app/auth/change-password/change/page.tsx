import SetPasswordForm from '@/components/auth/set-password'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div><Suspense fallback={<div>Loading...</div>}><SetPasswordForm/></Suspense></div>
  )
}

export default page