import Image from "next/image";
import logo from '../../../public/logo2.png'
export default function AppLogo({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <div>
      <Image
        src={logo}
        className="object-cover rounded-full"
        alt="app-logo"
        width={width}
        height={height}
      />
    </div>
  );
}
