"use client";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 ml-auto"
    >
      {pending ? (
        <span className="flex justify-between gap-4 items-center">
          <SpinnerMini /> <span>{pendingLabel} </span>
        </span>
      ) : (
        <span>{children} </span>
      )}
    </button>
  );
}

export default SubmitButton;
