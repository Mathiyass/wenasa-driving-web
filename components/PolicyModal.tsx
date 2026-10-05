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
    <div className="fixed inset-0 z-50 bg-[#0d0c0a]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#141310] rounded-3xl max-w-2xl w-full border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0d0c0a] text-white flex items-center justify-between border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#fcc438] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>[ REGULATORY NOTICE ]</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#f5f2eb] mt-1">
              {titles[policyType]}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-[#a8a295] hover:text-white hover:bg-white/5 transition-colors cursor-pointer" aria-label="Close legal modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legal Disclaimer Watermark */}
        <div className="p-3.5 bg-[#fcc438]/10 border-b border-[#fcc438]/20 text-[11px] font-mono text-[#fcc438] flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 text-[#fcc438]" />
          <span><strong>DRAFT NOTICE:</strong> This legal draft requires independent formal legal counsel review before commercial publication.</span>
        </div>

        {/* Policy Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#a39e93] leading-relaxed">
          {policyType === "privacy" && (
            <>
              <h4 className="font-bold text-[#f5f2eb] text-sm">1. Data Controller Information</h4>
              <p>Wenasa Driving School, No.12, 5 Hanwella - Kirindiwela - Urapola Rd, Kirindiwela, acts as the designated Data Controller under the Sri Lanka Personal Data Protection Act (PDPA No. 9 of 2022).</p>
              
              <h4 className="font-bold text-[#f5f2eb] text-sm">2. Purpose of Processing</h4>
              <p>We process personal data (including NIC numbers, photographs, medical fitness certificates, and contact details) exclusively for the lawful purpose of driver training, scheduling NTMI medical appointments, and registering applications with the Department of Motor Traffic (DMT).</p>

              <h4 className="font-bold text-[#f5f2eb] text-sm">3. Data Subject Rights</h4>
              <p>Under the PDPA, students have the right to request access to, rectification of, or erasure of their personal records, and to withdraw marketing consent at any time without prejudice to their driving course.</p>
            </>
          )}

          {policyType === "terms" && (
            <>
              <h4 className="font-bold text-[#f5f2eb] text-sm">1. Course Enrollment</h4>
              <p>Students must be of statutory legal driving age for the vehicle category chosen and must hold a valid NTMI medical certificate prior to practical driving on public roads.</p>

              <h4 className="font-bold text-[#f5f2eb] text-sm">2. Safety and Vehicle Operation</h4>
              <p>All practical driving lessons must take place in Wenasa-certified dual-control vehicles under the direct supervision of a licensed instructor. Instructions given by instructors must be adhered to at all times.</p>
            </>
          )}

          {policyType === "refund" && (
            <>
              <h4 className="font-bold text-[#f5f2eb] text-sm">1. Lesson Rescheduling & Cancellation</h4>
              <p>Students may reschedule a scheduled practical driving slot with at least 24 hours prior notice at no penalty. Cancellations made with less than 2 hours notice may incur a vehicle reservation fee.</p>

              <h4 className="font-bold text-[#f5f2eb] text-sm">2. Refund Eligibility</h4>
              <p>Course fee refund requests submitted prior to commencement of practical lessons are subject to an administrative processing deduction. Government exam stamp fees and NTMI medical payments paid directly to state authorities are non-refundable.</p>
            </>
          )}

          {policyType === "cookie" && (
            <>
              <h4 className="font-bold text-[#f5f2eb] text-sm">1. Cookie Usage</h4>
              <p>We use essential cookies strictly to remember your language preference (Sinhala, English, Tamil) and maintain active login sessions. Optional analytics cookies require your explicit prior consent.</p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#0d0c0a] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#d0c5ab] hover:bg-[#e4dcce] text-[#0d0c0a] rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
