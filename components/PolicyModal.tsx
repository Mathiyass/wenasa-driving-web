"use client";

import { X, AlertTriangle, ShieldCheck } from "lucide-react";

interface PolicyModalProps {
  policyType: "privacy" | "terms" | "refund" | "cookie";
  onClose: () => void;
}

export function PolicyModal({ policyType, onClose }: PolicyModalProps) {
  const titles = {
    privacy: "Privacy Policy (Sri Lanka PDPA Act No. 9 of 2022)",
    terms: "Terms of Service & Driving School Regulations",
    refund: "Refund & Lesson Cancellation Policy",
    cookie: "Cookie Policy & Data Subject Rights",
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Legal Notice</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              {titles[policyType]}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer" aria-label="Close legal modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legal Disclaimer Watermark */}
        <div className="p-3 bg-amber-950/40 border-b border-amber-800/40 text-[11px] text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span><strong>DRAFT NOTICE:</strong> This legal draft requires independent formal legal counsel review before commercial publication.</span>
        </div>

        {/* Policy Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {policyType === "privacy" && (
            <>
              <h4 className="font-bold text-white text-base">1. Data Controller Information</h4>
              <p>Wenasa Driving School, No.12, 5 Hanwella - Kirindiwela - Urapola Rd, Kirindiwela, acts as the designated Data Controller under the Sri Lanka Personal Data Protection Act (PDPA No. 9 of 2022).</p>
              
              <h4 className="font-bold text-white text-base">2. Purpose of Processing</h4>
              <p>We process personal data (including NIC numbers, photographs, medical fitness certificates, and contact details) exclusively for the lawful purpose of driver training, scheduling NTMI medical appointments, and registering applications with the Department of Motor Traffic (DMT).</p>

              <h4 className="font-bold text-white text-base">3. Data Subject Rights</h4>
              <p>Under the PDPA, students have the right to request access to, rectification of, or erasure of their personal records, and to withdraw marketing consent at any time without prejudice to their driving course.</p>
            </>
          )}

          {policyType === "terms" && (
            <>
              <h4 className="font-bold text-white text-base">1. Course Enrollment</h4>
              <p>Students must be of statutory legal driving age for the vehicle category chosen and must hold a valid NTMI medical certificate prior to practical driving on public roads.</p>

              <h4 className="font-bold text-white text-base">2. Safety and Vehicle Operation</h4>
              <p>All practical driving lessons must take place in Wenasa-certified dual-control vehicles under the direct supervision of a licensed instructor. Instructions given by instructors must be adhered to at all times.</p>
            </>
          )}

          {policyType === "refund" && (
            <>
              <h4 className="font-bold text-white text-base">1. Lesson Rescheduling & Cancellation</h4>
              <p>Students may reschedule a scheduled practical driving slot with at least 24 hours prior notice at no penalty. Cancellations made with less than 2 hours notice may incur a vehicle reservation fee.</p>

              <h4 className="font-bold text-white text-base">2. Refund Eligibility</h4>
              <p>Course fee refund requests submitted prior to commencement of practical lessons are subject to an administrative processing deduction. Government exam stamp fees and NTMI medical payments paid directly to state authorities are non-refundable.</p>
            </>
          )}

          {policyType === "cookie" && (
            <>
              <h4 className="font-bold text-white text-base">1. Cookie Usage</h4>
              <p>We use essential cookies strictly to remember your language preference (Sinhala, English, Tamil) and maintain active login sessions. Optional analytics cookies require your explicit prior consent.</p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-850 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all border border-slate-700/60 active:scale-[0.98] cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
