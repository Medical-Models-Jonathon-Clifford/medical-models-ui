import Image from 'next/image';
import stubProfilePic from '../../public/stub-profile-img.png';

export function ProfileIcon() {
  return (
    <Image src={stubProfilePic} alt="Profile Icon" width={32} height={32} />
  );
}
