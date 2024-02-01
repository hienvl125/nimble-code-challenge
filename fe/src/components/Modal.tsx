type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode
}

export default function Modal(props: ModalProps) {
  return (
    <>
      {props.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-screen-sm bg-white p-6 rounded-lg">
            {/* Close button positioned at the top-right corner */}
            <button
              className="text-sm absolute top-0 right-0 mt-6 mr-6 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() => props.onClose()}
            >
              Close
            </button>

            {props.children}
          </div>
        </div>
      )}
    </>
  );
};
