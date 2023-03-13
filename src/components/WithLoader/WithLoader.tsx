import React, { FC } from "react";
import Loader from "components/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader: FC<WithLoaderProps> = ({
  loading,
  children,
}: WithLoaderProps) => {
  return (
    <div>
      {children}
      {loading && <Loader></Loader>}
    </div>
  );
};
export default WithLoader;
