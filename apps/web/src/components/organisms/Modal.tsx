import { Button, IconButton } from "@/components/atoms";
import { X } from "lucide-react";
import type React from "react";
import ReactDOM from "react-dom";

type FoodCatalogueModalType = {
	setIsModalOpen: (isOpen: boolean) => void;
	closeModal: () => void;
	children: React.ReactNode;
	modalTitle: string;
	modalActionText: string;
	modalActionOnClick: () => void;
	isSubmitting?: boolean;
};
export function Modal({
  setIsModalOpen,
  closeModal,
  children,
  modalTitle,
  modalActionText,
  modalActionOnClick,
  isSubmitting = false,
}: FoodCatalogueModalType) {
	return ReactDOM.createPortal(
		<>
			      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 bg-opacity-50 z-40"
        onClick={() => setIsModalOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsModalOpen(false);
          }
        }}
        role="button"
        tabIndex={0}
      />

			{/* Modal Content */}
			<div className="fixed inset-0 z-50">
				<div className="flex min-h-full items-center justify-center p-4">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
						{/* Modal Header */}
						<div className="flex justify-between items-center p-6">
							<h2 className="text-xl font-bold">{modalTitle}</h2>
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
								color="black"
								text="Cancel"
								size="sm"
								onClick={closeModal}
							/>
							              <Button
                variant="outline"
                color="primary"
                size="sm"
                text={modalActionText}
                onClick={modalActionOnClick}
                disabled={isSubmitting}
              />
						</div>
					</div>
				</div>
			</div>
		</>,
		document.body,
	);
}
