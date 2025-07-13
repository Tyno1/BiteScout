import React from "react";
import { Button, IconButton } from "@/components/atoms";
import { X } from "lucide-react";
import ReactDOM from "react-dom";

type FoodCatalogueModalType = {
  setIsModalOpen: (isOpen: boolean) => void;
  closeModal: () => void;
  children: React.ReactNode;
  modalTitle: string;
  modalActionText: string;
  modalActionOnClick: () => void;
};
export function Modal({
  setIsModalOpen,
  closeModal,
  children,
  modalTitle,
  modalActionText,
  modalActionOnClick,
}: FoodCatalogueModalType) {
  return ReactDOM.createPortal(
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 bg-opacity-50 z-40"
        onClick={() => setIsModalOpen(false)}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{modalTitle}</h2>
              <IconButton
                variant="solid"
                color="danger"
                size="sm"
                onClick={closeModal}
                icon={<X size={14} />}
              />
            </div>

            {/* Modal Body */}
            <div className="p-6">{children}</div>

            {/* Modal Footer */}
            <div className="border-t p-6 flex justify-end gap-2">
              <Button
                variant="solid"
                color="black"
                text="Cancel"
                onClick={closeModal}
              />
              <Button
                variant="solid"
                color="primary"
                text={modalActionText}
                onClick={modalActionOnClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
