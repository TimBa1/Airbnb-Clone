'use client'
import useRentModal from '@components/app/hooks/useRentModal'
import React from 'react'
import Modal from './Modal'

const RentModal = () => {
    const rentModal = useRentModal()
  return (
     <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        actionLabel='submit'
        title='Airbnb your Home'
     />
  )
}

export default RentModal
