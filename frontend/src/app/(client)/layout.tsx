import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--background)]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
