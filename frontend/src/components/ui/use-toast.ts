import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

function toast({ title, description, variant }: ToastProps) {
  if (variant === "destructive") {
    sonnerToast.error(title, {
      description: description,
    })
  } else if (variant === "success") {
    sonnerToast.success(title, {
      description: description,
    })
  } else {
    sonnerToast(title, {
      description: description,
    })
  }
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => sonnerToast.dismiss(toastId),
  }
}

export { useToast, toast }
