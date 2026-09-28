'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import DigitalTicketPass from '@/components/public/DigitalTicketPass';
import { dflStore } from '@/lib/store';
import { Match, Booking } from '@/lib/types';
import { formatDate, formatINR } from '@/lib/utils';
import {
  Ticket,
  User,
  CreditCard,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  ShieldCheck,
  AlertCircle,
  Smartphone,
  QrCode,
  Share2,
  Download,
  Lock,
  Loader2,
  RefreshCw,
} from 'lucide-react';

export default function BookingFlowPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const matchId = params?.id as string;
  const initialQty = Number(searchParams?.get('qty')) || 2;

  const [match, setMatch] = useState<Match | null>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Tickets
  const [quantity, setQuantity] = useState<number>(initialQty);

  // Step 2: Customer Details
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Step 3: Demo Payment
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'WALLET' | 'NETBANKING'>('UPI');
  const [upiApp, setUpiApp] = useState<'GPAY' | 'PHONEPE' | 'PAYTM'>('GPAY');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentProgressStep, setPaymentProgressStep] = useState(1);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Step 4: Confirmed Booking Result
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const matches = dflStore.getMatches();
    const found = matches.find((m) => m.id === matchId);
    setMatch(found || null);
  }, [matchId]);

  // Stepper labels
  const steps = [
    { num: 1, label: 'Tickets' },
    { num: 2, label: 'Details' },
    { num: 3, label: 'Payment' },
    { num: 4, label: 'Confirm' },
  ];

  if (!match) {
    return (
      <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Calendar className="w-12 h-12 text-slate-400 mb-4" />
          <h2 className="text-xl font-bold">Match Not Found</h2>
          <Link
            href="/matches"
            className="mt-4 px-5 py-2.5 rounded-xl bg-[#00E676] text-black font-bold text-xs"
          >
            ← Back to Matches
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const ticketPrice = match.ticketPrice;
  const subtotal = ticketPrice * quantity;
  const convenienceFee = 0; // ₹0 convenience fee for transparent pricing
  const totalAmount = subtotal + convenienceFee;

  // Validate step 2
  const validateStep2 = () => {
    const errors: { [key: string]: string } = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name';
    }
    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!agreedToTerms) {
      errors.agreedToTerms = 'You must agree to the Terms & Conditions';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (validateStep2()) {
      setCurrentStep(3);
    }
  };

  // Trigger Demo Payment
  const executePayment = (forceFailure: boolean = false) => {
    setIsProcessingPayment(true);
    setPaymentError(null);
    setPaymentProgressStep(1);

    // Simulate payment gateway stages
    setTimeout(() => setPaymentProgressStep(2), 700);
    setTimeout(() => setPaymentProgressStep(3), 1400);
    setTimeout(() => {
      setPaymentProgressStep(4);
      setTimeout(() => {
        setIsProcessingPayment(false);

        if (forceFailure) {
          setPaymentError('Demo payment was simulated as declined. Please try again.');
          return;
        }

        try {
          const booking = dflStore.createBooking({
            matchId: match.id,
            customerName: fullName.trim(),
            phone: `+91 ${mobileNumber.trim().replace(/^\+91/, '')}`,
            email: email.trim() || undefined,
            quantity,
            paymentMethod: `${paymentMethod} (Demo)`,
            paymentStatus: 'PAID',
          });

          setCreatedBooking(booking);
          setCurrentStep(4);

          // Confetti celebration
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch {
            // ignore if confetti blocked
          }
        } catch (err: any) {
          setPaymentError(err.message || 'Failed to complete booking. Please retry.');
        }
      }, 700);
    }, 2100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />

      {/* Booking Stepper Header */}
      <div className="border-b border-white/10 bg-[#080E17] py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 -z-0" />
            {steps.map((s) => {
              const isDone = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      isCurrent
                        ? 'bg-[#00E676] text-black ring-4 ring-[#00E676]/25 shadow-lg shadow-[#00E676]/30'
                        : isDone
                        ? 'bg-[#00E676] text-black'
                        : 'bg-[#101824] text-slate-400 border border-white/15'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-[11px] font-bold mt-1.5 ${
                      isCurrent ? 'text-[#00E676]' : isDone ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Flow Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex-1 w-full">
        {/* ================= STEP 1: TICKETS ================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-[#00E676] uppercase tracking-wider block mb-1">
                Step 1 of 4
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Select Tickets & Quantity
              </h2>
            </div>

            {/* Selected Match Card */}
            <div className="rounded-2xl card-glass p-5 border border-white/10">
              <div className="text-[11px] font-bold text-[#00E676] uppercase tracking-wider mb-2">
                Match {String(match.matchNumber).padStart(2, '0')} • {match.stage}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    src={match.teamALogo}
                    alt={match.teamAName}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 p-1 object-contain"
                  />
                  <img
                    src={match.teamBLogo}
                    alt={match.teamBName}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 p-1 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">
                    {match.teamAName} vs {match.teamBName}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{formatDate(match.date)}</span>
                    <span>•</span>
                    <span>{match.time}</span>
                    <span>•</span>
                    <span className="text-[#0ea5e9]">{match.venue}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Pass Selection */}
            <div className="rounded-2xl card-glass p-6 border border-white/10 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-lg">General Pass</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
                      Standard Entry
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Unreserved stadium gallery seating or standing with pitchside visibility.
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black text-white">
                    {formatINR(ticketPrice)}
                  </span>
                  <span className="text-[11px] text-slate-400 block">/ ticket</span>
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">Select Quantity</span>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-6 text-center font-black text-base">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="rounded-2xl card-glass p-5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Tickets ({quantity} × {formatINR(ticketPrice)})</span>
                <span className="font-bold text-white">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Convenience Fee</span>
                <span className="text-[#00E676] font-bold">FREE (₹0)</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-base font-black text-white">
                <span>Total Amount</span>
                <span className="text-[#00E676]">{formatINR(totalAmount)}</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-base text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-xl shadow-[#00E676]/25 hover:scale-[1.01]"
            >
              <span>Continue to Customer Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================= STEP 2: CUSTOMER DETAILS ================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-[#00E676] uppercase tracking-wider block mb-1">
                Step 2 of 4
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Enter Customer Details
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                No account required. Your tickets and unique QR codes will be tied to this name & phone.
              </p>
            </div>

            <div className="rounded-2xl card-glass p-6 border border-white/10 space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                  Full Name <span className="text-[#00E676]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                    }}
                    placeholder="e.g. Aadith C V"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border ${
                      formErrors.fullName ? 'border-rose-500' : 'border-white/10'
                    } text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00E676] transition-colors`}
                  />
                </div>
                {formErrors.fullName && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                  Mobile Number <span className="text-[#00E676]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-xs font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      if (formErrors.mobileNumber) setFormErrors({ ...formErrors, mobileNumber: '' });
                    }}
                    placeholder="98765 43210"
                    maxLength={14}
                    className={`w-full pl-14 pr-4 py-3 rounded-xl bg-white/5 border ${
                      formErrors.mobileNumber ? 'border-rose-500' : 'border-white/10'
                    } text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00E676] transition-colors`}
                  />
                </div>
                {formErrors.mobileNumber && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                  Email Address <span className="text-slate-400 text-[10px] normal-case">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aadith@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00E676] transition-colors"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (formErrors.agreedToTerms) setFormErrors({ ...formErrors, agreedToTerms: '' });
                    }}
                    className="mt-1 w-4 h-4 rounded text-[#00E676] accent-[#00E676] bg-white/5 border-white/10"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed">
                    I agree to the tournament entry{' '}
                    <Link href="/terms" target="_blank" className="text-[#00E676] underline">
                      Terms & Conditions
                    </Link>{' '}
                    and understand tickets cannot be exchanged after verification.
                  </span>
                </label>
                {formErrors.agreedToTerms && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.agreedToTerms}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/15"
              >
                Back
              </button>
              <button
                onClick={handleProceedToPayment}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-xl shadow-[#00E676]/25"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: DEMO PAYMENT ================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-[#00E676] uppercase tracking-wider block mb-1">
                Step 3 of 4
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Demo Payment Simulation
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Secure test checkout for DFL 2026. No real financial transaction or card charge will occur.
              </p>
            </div>

            {/* Processing Overlay if in flight */}
            {isProcessingPayment ? (
              <div className="rounded-3xl card-glass p-8 sm:p-12 border border-[#00E676]/30 text-center space-y-6 bg-[#0B131E]">
                <div className="w-16 h-16 rounded-full border-4 border-[#00E676]/20 border-t-[#00E676] animate-spin mx-auto" />
                <div>
                  <h3 className="text-xl font-bold text-white">Processing Payment...</h3>
                  <p className="text-xs text-slate-400 mt-1">Please do not refresh or close this tab.</p>
                </div>

                <div className="max-w-xs mx-auto space-y-3 text-left text-xs">
                  <div className={`flex items-center gap-3 ${paymentProgressStep >= 1 ? 'text-[#00E676] font-bold' : 'text-slate-400'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Connecting to payment gateway...</span>
                  </div>
                  <div className={`flex items-center gap-3 ${paymentProgressStep >= 2 ? 'text-[#00E676] font-bold' : 'text-slate-400'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verifying test authorization...</span>
                  </div>
                  <div className={`flex items-center gap-3 ${paymentProgressStep >= 3 ? 'text-[#00E676] font-bold' : 'text-slate-400'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirming seat allocation...</span>
                  </div>
                  <div className={`flex items-center gap-3 ${paymentProgressStep >= 4 ? 'text-[#00E676] font-bold' : 'text-slate-400'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Generating unique QR tickets...</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {paymentError && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
                    <span>{paymentError}</span>
                    <button
                      onClick={() => setPaymentError(null)}
                      className="text-xs underline font-bold"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                {/* Summary Strip */}
                <div className="rounded-2xl card-glass p-5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Payable Amount
                    </span>
                    <span className="text-2xl font-black text-[#00E676]">
                      {formatINR(totalAmount)}
                    </span>
                  </div>
                  <div className="text-right text-xs text-slate-300">
                    <p className="font-bold text-white">{fullName}</p>
                    <p className="text-slate-400">{quantity} General Pass{quantity > 1 ? 'es' : ''}</p>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="rounded-2xl card-glass p-6 border border-white/10 space-y-4">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Select Demo Payment Method
                  </h4>

                  {/* UPI */}
                  <label
                    onClick={() => setPaymentMethod('UPI')}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#00E676] bg-[#00E676]/5 shadow-sm'
                        : 'border-white/10 bg-white/[0.02] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-[#00E676]" />
                      <div>
                        <div className="text-sm font-bold text-white">UPI (Instant Simulation)</div>
                        <div className="text-[11px] text-slate-400">Google Pay, PhonePe, Paytm, BHIM</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="accent-[#00E676]"
                    />
                  </label>

                  {/* Card */}
                  <label
                    onClick={() => setPaymentMethod('CARD')}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'CARD'
                        ? 'border-[#00E676] bg-[#00E676]/5 shadow-sm'
                        : 'border-white/10 bg-white/[0.02] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#0ea5e9]" />
                      <div>
                        <div className="text-sm font-bold text-white">Credit / Debit Card (Demo)</div>
                        <div className="text-[11px] text-slate-400">Visa, Mastercard, RuPay test card</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'CARD'}
                      onChange={() => setPaymentMethod('CARD')}
                      className="accent-[#00E676]"
                    />
                  </label>

                  {/* NetBanking */}
                  <label
                    onClick={() => setPaymentMethod('NETBANKING')}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'NETBANKING'
                        ? 'border-[#00E676] bg-[#00E676]/5 shadow-sm'
                        : 'border-white/10 bg-white/[0.02] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                      <div>
                        <div className="text-sm font-bold text-white">Net Banking (Demo)</div>
                        <div className="text-[11px] text-slate-400">State Bank, HDFC, ICICI, Federal Bank</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'NETBANKING'}
                      onChange={() => setPaymentMethod('NETBANKING')}
                      className="accent-[#00E676]"
                    />
                  </label>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00E676] shrink-0" />
                  <span>
                    Simulated Sandbox Mode active. Architecture is plug-and-play ready for Razorpay/UPI gateway integration.
                  </span>
                </div>

                {/* Primary Pay Button & Failure Simulation */}
                <div className="space-y-2">
                  <button
                    onClick={() => executePayment(false)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-base text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-xl shadow-[#00E676]/25 hover:scale-[1.01]"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pay {formatINR(totalAmount)} (Demo Success)</span>
                  </button>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      ← Back to Details
                    </button>
                    <button
                      onClick={() => executePayment(true)}
                      className="text-xs text-rose-400 hover:underline"
                    >
                      Test Failed Payment Edge Case
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ================= STEP 4: CONFIRMATION & PASSES ================= */}
        {currentStep === 4 && createdBooking && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-[#00E676]/20 border border-[#00E676]/50 flex items-center justify-center mx-auto text-[#00E676] shadow-xl shadow-[#00E676]/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-white">Booking Confirmed!</h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Your passes for Defenders Football League 2026 are generated. Save or download your QR tickets below.
              </p>
            </div>

            {/* Booking ID Banner */}
            <div className="rounded-2xl card-glass p-6 border border-[#00E676]/30 text-center space-y-2 bg-[#0C1523]">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-widest">
                Official Booking ID
              </span>
              <div className="font-mono text-2xl sm:text-3xl font-black text-white tracking-wider">
                {createdBooking.id}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs font-bold border border-[#00E676]/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Amount Paid: {formatINR(createdBooking.totalAmount)}
              </div>
              <p className="text-xs text-slate-400 pt-1">
                You can retrieve these passes anytime on the{' '}
                <Link href="/track-ticket" className="text-[#00E676] underline">
                  Track Ticket
                </Link>{' '}
                page using your Booking ID and Phone.
              </p>
            </div>

            {/* Generated Individual Passes */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-[#00E676]" />
                  <span>Your Tickets ({createdBooking.tickets.length})</span>
                </h3>
                <span className="text-xs text-slate-400">
                  Each ticket has a unique QR code for entry
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {createdBooking.tickets.map((ticket) => (
                  <DigitalTicketPass key={ticket.id} ticket={ticket} />
                ))}
              </div>
            </div>

            {/* Post-booking action links */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/matches"
                className="px-6 py-3 rounded-xl font-bold text-xs text-slate-300 hover:text-white bg-white/5 border border-white/10"
              >
                Book More Matches
              </Link>
              <Link
                href={`/track-ticket?id=${createdBooking.id}&phone=${encodeURIComponent(createdBooking.phone)}`}
                className="px-6 py-3 rounded-xl font-bold text-xs text-black bg-[#00E676] hover:bg-[#00c853]"
              >
                Track Booking Timeline →
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
