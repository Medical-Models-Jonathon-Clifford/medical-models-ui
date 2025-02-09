import Image from 'next/image';
import stubProfilePic from '../../public/stub-profile-img.png';

export function ProfileIcon({ size = 32 }: { size: number }) {
  return (
    <Image src={stubProfilePic} alt="Profile Icon" width={size} height={size} />
  );
}
