import React, { ReactNode } from "react";
import Navbar from "@app/components/navbar";
import Sidebar from "@app/components/sidebar";
import Footer from "@app/components/footer/Footer";
import { usePathname } from "next/navigation";
import { appMenus } from "@app/utils/routes";
import { createStandaloneToast } from "@chakra-ui/toast";

const { ToastContainer, toast } = createStandaloneToast({
  defaultOptions: {
    position: "top",
    title: "Notification",
    duration: 5000,
    isClosable: true,
  },
});

export const toastGlobal = toast;

interface MainLayoutProps {
  [x: string]: any;
  children: ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  const { children, ...rest } = props;
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(appMenus);
  }, [pathname]);

  const getActiveRoute = (appMenus: RoutesType[]): string | boolean => {
    let activeRoute = "My Homes";
    if (typeof window === "undefined") return false;
    for (let i = 0; i < appMenus.length; i++) {
      if (window.location.href.indexOf(appMenus[i].path) !== -1) {
        setCurrentRoute(appMenus[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (appMenus: RoutesType[]): string | boolean => {
    if (typeof window === "undefined") return false;
    let activeNavbar = false;
    for (let i = 0; i < appMenus.length; i++) {
      if (window.location.href.indexOf(appMenus[i].path) !== -1) {
        return appMenus[i].secondary || false;
      }
    }
    return activeNavbar;
  };
  if (typeof document !== "undefined") {
    document.documentElement.dir = "ltr";
  }
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSideNav={() => setOpen(true)}
              brandText={currentRoute}
              secondary={getActiveNavbar(appMenus)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              {children}
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
