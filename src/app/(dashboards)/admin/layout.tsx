import { Container, AdminSidebar } from "@/components";
import MobileSidebar from "@/components/admin-dashboard/MobileSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Container As={"main"}>
        <MobileSidebar />
        <div className="grid md:grid-cols-12 gap-4 lg:gap-8">
          <aside className="hidden lg:block col-span-12 lg:col-span-3 p-6">
            <AdminSidebar />
          </aside>
          <section className="min-h-screen col-span-12 lg:col-span-9">{children}</section>
        </div>
      </Container>
    </>
  );
};

export default layout;
