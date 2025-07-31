import { Button } from '@/components/atoms';
import { Modal } from '@/components/organisms';
import React, { useState } from 'react'
import { MediaUpload } from './MediaUpload';

export const  MediaUploadWizard=() => {
    const [isOpen, setIsOpen] = useState<boolean>(false);



  return (
    <div>
        <Button onClick={() => setIsOpen(true)}
            text="Upload Media"
            variant="outline"
            size="sm"
            className="w-full"
        />
        <Modal
            size="md"
            isModalOpen={isOpen}
            setIsModalOpen={setIsOpen}
            closeModal={() => setIsOpen(false)}
            modalTitle="Upload Media"
            modalActionText="Upload"
            modalActionOnClick={() => {
                // Handle upload logic here
                setIsOpen(false);
            }}
        >
                <MediaUpload />
        </Modal>
      
    </div>
  )
}

