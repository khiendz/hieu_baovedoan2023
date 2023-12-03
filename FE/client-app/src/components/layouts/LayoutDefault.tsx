import Navigation from "components/Navigation/Navigation";
import Header from "components/Header";
import "app/global.scss";
import { RootStyleRegistry } from "modules/shared/components/Root-style-registry";
import Footer from "components/Footer/Footer";
import { AppProvider } from "contexts";
import { useEffect, useState } from "react";
import { userService } from "services";

const LayoutDefault = ({ children }: { children: React.ReactNode }) => {
  const [store,updateStore] = useState({});

  useEffect(() => {
    if (!userService.userValue) {
      userService.ReturnUnauthorize();
    }
  }, []);

  return (
    <>
      <AppProvider initialValues={{store: store, updateStore: updateStore}}>
        <Header></Header>
        <Navigation />
        <RootStyleRegistry>
          <div
            className="main-container dk-h-fit dk-w-full dk-flex dk-justify-center dk-items"
            style={{ minHeight: "1270px" }}
          >
            <div className="dk-w-[85%] dk-flex dk-justify-center dk-mt-5 dk-gap-8 dk-items dk-min-h-[118px]">
              <div className="container dk-w-full dk-min-h-[1180px]">
                {children}
              </div>
            </div>
          </div>
        </RootStyleRegistry>
        <Footer />
      </AppProvider>
    </>
  );
};

export default LayoutDefault;
