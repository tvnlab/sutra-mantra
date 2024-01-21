import React, { ReactNode, useCallback } from "react";
import Navbar from "@app/components/navbar";
import Sidebar from "@app/components/sidebar";
import Footer from "@app/components/footer/Footer";
import { usePathname } from "next/navigation";
import { createStandaloneToast } from "@chakra-ui/toast";
import useCheckAnonymous from "@app/hooks/common/useCheckAnonymous";
import useCheckAppMenu from "@app/hooks/common/useCheckAppMenu";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import ConfirmDialog from "@app/components/confirm-dialog";

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
  const { appMenus, isValidAccess } = useCheckAppMenu();

  // Check and handle anonymous user for the first time logged in
  useCheckAnonymous();

  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState<string>();

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

  const getActiveRoute = useCallback(
    (appMenus: RoutesType[]): string | boolean => {
      if (typeof window === "undefined") return "";
      const item = appMenus.find((v) => v.path === pathname);
      setCurrentRoute(item?.name || "");
      return item ? item.name : "";
    },
    [pathname]
  );

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    if (!appMenus?.length) return;
    getActiveRoute(appMenus);
  }, [pathname, appMenus, getActiveRoute]);

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
              {isValidAccess ? (
                children
              ) : (
                <div className="mt-10">
                  <Alert status="error" className="flex flex-col !bg-navy-50 rounded-md">
                    <AlertIcon className="max-w-18 mb-2"/>
                    <AlertTitle className="text-2xl mb-4">Your page is not found!</AlertTitle>
                    <AlertDescription className=" text-xl text-center">
                      You are trying to access a unavailable page or you do not
                      have permission to access. Please try again or contact the
                      Sutra Mantra Admin. Thank you!
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
      <ConfirmDialog />
    </div>
  );
}
