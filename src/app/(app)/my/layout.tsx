import MyPageTab from "@/components/my/MyPageTab";
import ProfileCard from "@/components/my/profile/ProfileCard";
import { cn } from "@/utils/classNames";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "md:flex-center flex flex-col items-start justify-stretch gap-6",
        "my-10.5 px-4 md:my-8 md:px-6 lg:my-12 lg:p-0",
        "lg:mx-auto lg:max-w-[1280px] lg:flex-row lg:gap-10",
      )}
    >
      <aside className="flex w-full flex-col items-stretch justify-center gap-1.5 md:gap-6 lg:w-fit lg:flex-0">
        <h2
          className={cn(
            "pl-2 md:p-0 lg:pt-3.5 lg:pl-2.5",
            "font-semibold text-gray-900 md:text-[32px]",
          )}
        >
          마이페이지
        </h2>
        <ProfileCard />
      </aside>
      <main className="flex w-full flex-col items-start justify-stretch gap-6">
        <div className="flex w-full justify-stretch lg:px-4">
          <MyPageTab />
        </div>
        {children}
      </main>
    </div>
  );
}
