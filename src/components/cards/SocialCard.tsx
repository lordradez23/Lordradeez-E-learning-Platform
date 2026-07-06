import Link from "next/link";

const SocialCard = ({ href,icon,title }: { href: string  ; icon: React.ReactNode; title: string}) => {
  return (
    <Link href={href} target="_blank">
      <div className="flex items-center gap-2 border border-gray-300 rounded-md p-3">
        <span className="text-primary">{icon}</span>
        <span>{title}</span>
      </div>
    </Link>
  );
}

export default SocialCard