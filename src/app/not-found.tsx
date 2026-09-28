import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { ShieldAlert, ArrowLeft, Trophy } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center text-[#00E676]">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="font-mono text-5xl font-black text-white">404</div>
        <h1 className="text-xl font-bold text-white">Offside! Page Not Found</h1>
        <p className="text-xs text-slate-400">
          The pitch page or match record you are looking for has moved or does not exist.
        </p>
        <div className="pt-2 flex items-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-black bg-[#00E676] hover:bg-[#00c853] transition-all"
          >
            Go to Home Pitch
          </Link>
          <Link
            href="/matches"
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/10"
          >
            View Matches
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
