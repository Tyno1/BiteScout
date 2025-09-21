"use client";

import { IconButton } from "@/components/atoms";
import { X } from "lucide-react";
import { useRef } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function UserModal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef(null);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <IconButton icon={<X />} variant="plain" color="danger" size="sm" onClick={onClose} />

        {children}
      </div>
    </div>,
    document.body
  );
}
