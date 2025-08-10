import { Button, IconButton } from "@/components/atoms";
import { X } from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

type ModalType = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  closeModal: () => void;
  children: React.ReactNode;
  modalTitle: string;
  modalDescription?: React.ReactNode;
  modalActionText: string | null;
  modalActionOnClick: () => void;
  isSubmitting?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};

export function Modal({
  isModalOpen,
  setIsModalOpen,
  closeModal,
  children,
  modalTitle,
  modalDescription,
  modalActionText,
  modalActionOnClick,
  isSubmitting = false,
  size = "md",
}: ModalType) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal
      modalRef.current?.focus();
    } else {
      // Restore focus when modal closes
      previousActiveElement.current?.focus();
    }
  }, [isModalOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
    
    // Trap focus within modal
    if (e.key === "Tab") {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }
  };

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 bg-opacity-50 z-40 backdrop-blur-sm"
        onClick={() => setIsModalOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsModalOpen(false);
          }
        }}
        role="button"
        tabIndex={-1}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            ref={modalRef}
            className={`bg-card rounded-lg shadow-2xl w-full ${sizeMap[size]} border border-foreground/10`}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6">
              <div className="flex-1 min-w-0 text-card-foreground">
                <h2 className="text-xl font-bold">{modalTitle}</h2>
                {modalDescription && (
                  <div className="mt-2 text-sm break-words">
                    {modalDescription}
                  </div>
                )}
              </div>
              <IconButton
                variant="plain"
                color="danger"
                size="sm"
                onClick={closeModal}
                icon={<X size={25} />}
              />
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">{children}</div>

            {/* Modal Footer */}
            <div className="p-6 flex justify-end gap-2">
              <Button
                variant="outline"
                color="neutral"
                text="Cancel"
                size="sm"
                onClick={closeModal}
              />
              {modalActionText && (
              <Button
                variant="outline"
                color="primary"
                size="sm"
                text={modalActionText}
                onClick={modalActionOnClick}
                disabled={isSubmitting}
              />
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
