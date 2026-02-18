import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";

export default function AuthModal() {
  const navigate = useNavigate();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) navigate(-1);
      }}
    >
      <DialogContent
        onKeyDownCapture={(e) => e.stopPropagation()}
        onKeyUpCapture={(e) => e.stopPropagation()}
        className="sm:max-w-[560px] p-0 overflow-visible rounded-2xl bg-transparent border-none shadow-none [&>button]:hidden"
      >
        <Auth  />
      </DialogContent>
    </Dialog>
  );
}