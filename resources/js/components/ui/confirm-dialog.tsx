import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ConfirmDialogProps {
  /**
   * Controls whether the dialog is open
   */
  open: boolean;
  /**
   * Callback fired when the dialog open state changes
   */
  onOpenChange: (open: boolean) => void;
  /**
   * The title displayed in the dialog header
   */
  title: string;
  /**
   * The description displayed below the title
   */
  description: string;
  /**
   * Text for the confirm button
   * @default "Confirm"
   */
  confirmText?: string;
  /**
   * Text for the cancel button
   * @default "Cancel"
   */
  cancelText?: string;
  /**
   * Variant for the confirm button
   * @default "default"
   */
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  /**
   * Variant for the cancel button
   * @default "outline"
   */
  cancelVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  /**
   * Size for both buttons
   * @default "default"
   */
  buttonSize?: "default" | "sm" | "lg" | "icon";
  /**
   * Callback fired when the confirm button is clicked
   */
  onConfirm: () => void;
  /**
   * Callback fired when the cancel button is clicked
   * If not provided, will use onOpenChange(false)
   */
  onCancel?: () => void;
  /**
   * Additional CSS classes for the dialog content
   */
  className?: string;
  /**
   * Whether the confirm action is loading/processing
   * @default false
   */
  isLoading?: boolean;
  /**
   * Loading text to show when isLoading is true
   * @default "Processing..."
   */
  loadingText?: string;
}

/**
 * A reusable confirmation dialog component built on top of AlertDialog.
 * Provides a consistent interface for confirming destructive or important actions.
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "default",
  cancelVariant = "outline",
  buttonSize = "default",
  onConfirm,
  onCancel,
  className,
  isLoading = false,
  loadingText = "Processing...",
}) => {
  const handleCancel = React.useCallback(() => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  }, [onCancel, onOpenChange]);

  const handleConfirm = React.useCallback(() => {
    if (!isLoading) {
      onConfirm();
    }
  }, [onConfirm, isLoading]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={cn("max-w-md", className)}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel
            asChild
            onClick={handleCancel}
          >
            <Button
              variant={cancelVariant}
              size={buttonSize}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={confirmVariant}
              size={buttonSize}
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? loadingText : confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
