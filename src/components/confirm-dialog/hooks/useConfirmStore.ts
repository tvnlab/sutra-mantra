import { create } from "zustand";

interface ConfirmStore {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  openConfirm: (
    title: string,
    content: React.ReactNode,
    onConfirmCallback: () => void,
    onCancelCallback: () => void
  ) => void;
  closeConfirm: () => void;
}

const useConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  title: "",
  content: null,
  onConfirm: () => {},
  onCancel: () => {},
  openConfirm: (title, content, onConfirmCallback, onCancelCallback) =>
    set({
      isOpen: true,
      title,
      content,
      onConfirm: onConfirmCallback,
      onCancel: onCancelCallback,
    }),
  closeConfirm: () =>
    set({
      isOpen: false,
      title: "",
      content: null,
      onConfirm: () => {},
      onCancel: () => {},
    }),
}));

export default useConfirmStore;
