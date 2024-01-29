type MessageType = "error" | "success";
const classesByType: Record<MessageType, { wrapperClass: string; buttonClass: string }> = {
  "error": {
    wrapperClass: "bg-red-100 text-red-800",
    buttonClass: "bg-red-100 hover:bg-red-200 focus:ring-red-400",
  },
  "success": {
    wrapperClass: "bg-green-100 text-green-800",
    buttonClass: "bg-green-100 hover:bg-green-200 focus:ring-green-400",
  }
};

type AlertMessageProps = {
  messageType: MessageType;
  messageContent: string;
  onClickCloseButton: Function
}

export default function AlertMessage(props: AlertMessageProps) {
  return (
    <div className={`flex items-center p-4 mb-4 rounded-lg ${classesByType[props.messageType].wrapperClass}`} role="alert">
      <div className="text-sm font-medium">
        {props.messageContent}
      </div>
      <button
        type="button"
        className={`ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 ${classesByType[props.messageType].buttonClass}`}
        data-dismiss-target="#alert-message"
        aria-label="Close"
        onClick={() => props.onClickCloseButton()}
      >
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>
  );
}
