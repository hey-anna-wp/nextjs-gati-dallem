import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useFavoriteStore } from "@/store/favoriteStore";
import Link from "next/link";

export interface NavigationItem {
  label: string;
  href: string;
  isActive: boolean;
}

interface NavigationProps {
  items: NavigationItem[];
}

export default function Navigation({ items }: NavigationProps) {
  return (
    <nav className="flex-center space-x-0 md:space-x-2 lg:space-x-4">
      {items.map((item) => (
        <NavigationLink key={item.href} item={item} />
      ))}
    </nav>
  );
}

interface NavigationLinkProps {
  item: NavigationItem;
}

function NavigationLink({ item }: NavigationLinkProps) {
  const { user } = useAuthStore();

  const favorites = useFavoriteStore().favorites;
  const favoriteCount = user?.id ? (favorites[user.id]?.count ?? 0) : 0;

  if (item.label === "찜한 모임" && !user) return <></>;

  const linkClasses = cn(
    // Base styles
    "flex-center transition-colors duration-200 flex-shrink-0",
    // Responsive sizing
    "h-8 md:h-14 lg:h-14 px-2 md:px-3 lg:px-4 text-xs md:text-base lg:text-base",
    // Active/Inactive states
    item.isActive
      ? "font-semibold md:font-semibold lg:font-bold text-white"
      : "font-medium text-purple-100 hover:text-white",
  );

  return (
    <Link href={item.href} className={linkClasses}>
      {item.label === "찜한 모임" ? (
        <FavoriteItem label={item.label} count={favoriteCount} />
      ) : (
        <span>{item.label}</span>
      )}
    </Link>
  );
}

interface FavoriteItemProps {
  label: string;
  count: number;
}

function FavoriteItem({ label, count }: FavoriteItemProps) {
  return (
    <div className="flex-center gap-1 md:gap-1 lg:gap-1">
      <span>{label}</span>
      <Badge count={count} />
    </div>
  );
}
