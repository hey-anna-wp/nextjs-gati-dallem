// src/components/common/SignupModal.tsx
"use client";

import { useOverlay } from "@/hooks/useOverlay";
import Modal from "@/components/common/Modal";

interface SignupModalProps {
  title?: string;
  message: string;
  onConfirm?: () => void;
}

export default function SignupModal({ title, message, onConfirm }: SignupModalProps) {
  const { close } = useOverlay();

  const handleRedirect = () => {
    onConfirm?.();
    close();
  };

  // "\\n" → 실제 개행으로 정규화 후 앞 2줄만 사용
  const [line1 = "", line2 = ""] = message.replaceAll("\\n", "\n").split(/\r?\n/).slice(0, 2);

  return (
    <Modal className="gap-10 p-6 md:gap-10 md:p-10">
      <div className="grid gap-6">
        <Modal.Header onClose={handleRedirect}>{title}</Modal.Header>
        <div className="flex-center text-center text-lg font-semibold md:text-2xl">
          {/* 박스는 그대로, 줄은 2개만 렌더 + 간격 */}
          <div className="text-center leading-8 [word-break:keep-all]">
            <p className="mb-2">{line1}</p>
            <p className="mt-0">{line2}</p>
          </div>
        </div>
      </div>
      <Modal.OneButton onClick={handleRedirect}>확인</Modal.OneButton>
    </Modal>
  );
}
