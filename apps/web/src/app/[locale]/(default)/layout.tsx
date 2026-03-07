import { Navbar } from "@/components/section/navbar";
import { Footer } from "@/components/section/footer";

type Props = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
  return (
    <div className="max-w-7xl mx-auto border-x border-border">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
