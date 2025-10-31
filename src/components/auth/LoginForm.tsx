// components/auth/LoginForm.tsx
"use client";

import { useMemo, useState, type FormEvent } from "react";
import AuthInput from "./ui/AuthInput";
import AuthButton from "./ui/AuthButton";
import { AuthPasswordInput } from "./ui/AuthPasswordInput";
import { useSignin } from "@/apis/auths/auths.query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toSafePath } from "@/utils/auth/safePath";
import { toUserErrorMessage } from "@/apis/_errorMessage";
import { EMAIL_REGEX } from "@/constants/auth/constraints";
import FormErrorBanner from "./ui/FormErrorBanner";

type Props = { redirect?: string };

/**
 * LoginForm
 * - 이메일/비밀번호 입력 및 로그인 요청
 * - 클라이언트 유효성 검사 + React Query 기반 요청 처리
 */

const LoginForm = ({ redirect = "/" }: Props) => {
  const router = useRouter();
  // error 지우고 HttpApiError 통합 예정
  const { mutateAsync: signinMutate, isPending, error, reset } = useSignin();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [serverMsg, setServerMsg] = useState("");

  const isFormValid = useMemo(() => {
    const filled = email.trim().length > 0 && pw.trim().length > 0;
    const validEmail = EMAIL_REGEX.test(email.trim());
    return filled && validEmail && !isPending;
  }, [email, pw, isPending]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return; // 중복 제출 방지

    setEmailError("");
    setPwError("");
    setServerMsg("");
    reset();

    // 간단한 클라이언트 유효성 예시
    if (!email) setEmailError("이메일을 입력해 주세요.");
    if (!pw) setPwError("비밀번호를 입력해 주세요.");
    if (!email || !pw) return;

    // 로그인 API 호출 (useSignin 활용)
    try {
      await signinMutate({ email: email.trim(), password: pw });
      router.replace(toSafePath(redirect)); // 로그인 성공 시 안전 리다이렉트
    } catch (err) {
      setServerMsg(toUserErrorMessage(err, "로그인에 실패했습니다. 다시 시도해 주세요."));
    }
  };

  const fallbackMsg = error ? toUserErrorMessage(error, "") : "";
  const displayError = serverMsg || fallbackMsg;

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-[568px] max-w-full flex-col gap-2 rounded-2xl bg-white pt-14 pr-11 pb-11 pl-14 shadow-sm [box-shadow:0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(16,24,40,0.08)]`}
      noValidate // 브라우저 기본 검증 비활성 (커스텀 메시지 사용)
    >
      <h1 className="mb-4 text-center text-lg font-bold text-slate-900">로그인</h1>
      {displayError && <FormErrorBanner message={displayError} />}

      <label className="mb-1 text-[13px] font-medium text-slate-500">이메일</label>
      <AuthInput
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) setEmailError("");
          if (serverMsg) setServerMsg("");
          if (error) reset();
        }}
        invalid={!!emailError}
        className={`bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]`}
        aria-describedby="email-error"
        aria-invalid={!!emailError} // 접근성 보강
        autoComplete="username" // 브라우저 자동완성
      />
      {emailError && (
        <p id="email-error" className="mt-1 text-xs text-[#FF2727]">
          {emailError}
        </p>
      )}
      {/* 실시간 이메일 형식 안내 */}
      {email.length > 0 && !EMAIL_REGEX.test(email.trim()) && !emailError && (
        <p className="mt-1 text-xs text-[#FF2727]">올바른 이메일 형식을 입력해 주세요.</p>
      )}
      <label className="mt-4 mb-1 text-[13px] font-medium text-slate-500">비밀번호</label>
      <AuthPasswordInput
        placeholder="비밀번호를 입력해 주세요"
        value={pw}
        onChange={(e) => {
          setPw(e.target.value);
          if (pwError) setPwError("");
          if (serverMsg) setServerMsg("");
          if (error) reset();
        }}
        invalid={!!pwError}
        className={`bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]`}
        aria-describedby="pw-error"
        aria-invalid={!!pwError} // 접근성 보강
        autoComplete="current-password" // 브라우저 자동완성
      />
      {pwError && (
        <p id="pw-error" className="mt-1 text-xs text-[#FF2727]">
          {pwError}
        </p>
      )}

      <AuthButton type="submit" disabled={!isFormValid} className="mt-6">
        {isPending ? "로그인 중..." : "로그인"}
      </AuthButton>
      <p className="mt-3 text-center text-xs text-slate-500">
        같이 달램이 처음이신가요?{" "}
        <Link href="/signup" className="underline underline-offset-2 hover:text-slate-700">
          회원가입
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
// function toErrorMessage(err: unknown): import("react").SetStateAction<string> {
//   throw new Error("Function not implemented.");
// }
