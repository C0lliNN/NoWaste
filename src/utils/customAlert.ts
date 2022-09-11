import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 2500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

export function fireError(message: string): void {
  toast.error(message, defaultOptions);
}
