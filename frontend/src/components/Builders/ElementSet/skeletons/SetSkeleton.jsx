import React, { Fragment } from "react";

import Flexer from "../../../Elements/Layout/Container/Flexer";
import HeaderSkeleton from "./HeaderSkeleton";
import ContentSkeleton from "./ContentSkeleton";

const SetSkeleton = ({
  columnOneHeader,
  columnTwoHeader,
  columns = 2,
  elementObjectColOne,
  elementObjectColTwo,
  contentType,
  openDialogColOne,
  openDialogColTwo,
}) => {
  return (
    <Fragment>
      {columns === 1 ? (
        <Flexer fd="column">
          <HeaderSkeleton headerData={columnOneHeader} />
          <ContentSkeleton
            elementObject={elementObjectColOne}
            contentType={contentType}
            openDialog={openDialogColOne}
          />
        </Flexer>
      ) : (
        <Flexer fd="column">
          <HeaderSkeleton headerData={columnOneHeader} />
          <Flexer j="sb" a="fs">
            <Flexer j="sb" mt={0}>
              <Flexer
                j="c"
                a={columnOneHeader.alignment}
                fd="column"
                mt={16}
                w="98%"
              >
                <ContentSkeleton
                  elementObject={elementObjectColOne}
                  contentType={contentType}
                  openDialog={openDialogColOne}
                />
              </Flexer>
            </Flexer>
            <Flexer j="sb" mt={0}>
              <Flexer
                j="c"
                a={columnTwoHeader.alignment}
                fd="column"
                mt={16}
                w="98%"
              >
                <ContentSkeleton
                  elementObject={elementObjectColTwo}
                  contentType={contentType}
                  openDialog={openDialogColTwo}
                />
              </Flexer>
            </Flexer>
          </Flexer>
        </Flexer>
      )}
    </Fragment>
  );
};

export default SetSkeleton;
