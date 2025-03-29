import Header from "../../components/Header/Header";

export type TPageLayout = {
  children: React.ReactNode;
};
const PageLayout = ({ children }: TPageLayout) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default PageLayout;
