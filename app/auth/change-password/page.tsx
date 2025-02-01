import ResetForm from '@/components/auth/password-reset-form'
import React, { Suspense } from 'react'

const ChangePasswordPage = () => {
  return (
    <div><Suspense fallback={<div>Loading...</div>}><ResetForm/></Suspense></div>
  )
}

export default ChangePasswordPage