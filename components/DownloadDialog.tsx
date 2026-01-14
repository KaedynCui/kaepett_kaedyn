// components/DownloadDialog.tsx
type DownloadDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function DownloadDialog({ open, onClose }: DownloadDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-white/15 p-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          KaePett download
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          The app is currently in private beta. You can join the waitlist or
          get a demo build when it’s ready.
        </p>

        <div className="flex flex-col gap-3 mb-4">
          <button className="w-full rounded-full bg-white text-slate-950 text-sm font-semibold py-2">
            Get TestFlight build (iOS)
          </button>
          <button className="w-full rounded-full bg-slate-800 text-white text-sm font-semibold py-2">
            Get Android beta (APK)
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-slate-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}
