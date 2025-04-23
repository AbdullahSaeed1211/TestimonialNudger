import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  height?: number;
  showText?: boolean;
  className?: string;
  href?: string;
}

export function Logo({
  height = 40,
  showText = false,
  className = '',
  href = '/'
}: LogoProps) {
  const logoContent = (
    <div className={`flex items-center group ${className}`}>
      <Image
        src="/public/TestiomonialNudger.png"
        alt="Testimonial Nudger"
        width={height}
        height={height}
        priority
      />
      {showText && (
        <span className="ml-3 font-semibold text-xl group-hover:text-indigo-600 transition-colors">Testimonial Nudger</span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
} 