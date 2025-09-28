import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { cn } from "@workspace/ui/lib/utils";

export interface CustomModalProps<T> {
  isOpen: T;
  setIsOpen: (value: T) => void;
  header: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  height?: string;
}

function Modal<T>({
  isOpen,
  setIsOpen,
  children,
  header,
  description,
  className,
}: CustomModalProps<T>) {
  const isDialogOpen = !!isOpen;
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsOpen(open as T);
      }}
    >
      <DialogContent
        className={cn(
          "flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5 max-h-[min(640px,80vh)]" +
            " sm:max-w-lg",
          className,
        )}
      >
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto">
          <div className="px-6 py-4">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
