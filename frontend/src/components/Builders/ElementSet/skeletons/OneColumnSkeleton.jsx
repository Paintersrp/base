import React, { Fragment } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Flexer from "../../../Elements/Layout/Container/Flexer";
import { Divider } from "@material-ui/core";
import Text from "../../../Elements/Layout/Text/Text";

const SectionSkeleton = ({ columnOneHeader, columnTwoHeader, columns = 2 }) => {
  return (
    <Fragment>
      {columns === 1 ? (
        <Flexer j="c" a="fe" fd="column" mt={16}>
          <div style={{ width: "100%", marginTop: 16, marginBottom: 16 }}>
            <Divider />
          </div>
          <Skeleton variant="text" width={250} height={40} />
          <Skeleton variant="text" width={325} height={20} />
          <Skeleton variant="text" width={225} height={17} />
          <div style={{ width: "100%", marginTop: 16, marginBottom: 16 }}>
            <Divider />
          </div>
          <Skeleton variant="rect" width="100%" height={500} />
        </Flexer>
      ) : (
        <Flexer fd="column">
          <div style={{ width: "100%", marginTop: 32, marginBottom: 0 }}>
            <Divider />
          </div>
          <Flexer j="sb">
            <Flexer j="sb" mt={0}>
              <Flexer
                j="c"
                a={columnOneHeader.alignment}
                fd="column"
                mt={16}
                w="98%"
              >
                {columnOneHeader.title ? (
                  <Text
                    t={columnOneHeader.headerType}
                    a={columnOneHeader.alignment || "fs"}
                  >
                    {columnOneHeader.title}
                  </Text>
                ) : (
                  <Skeleton variant="text" width={250} height={40} />
                )}
                {columnOneHeader.subtitleToggle && (
                  <Fragment>
                    {columnOneHeader.subtitle ? (
                      <Text
                        t={
                          columnOneHeader.headerType === "h1" ||
                          columnOneHeader.headerType === "h2"
                            ? "h4"
                            : columnOneHeader.headerType === "h3" ||
                              columnOneHeader.headerType === "h4"
                            ? "h6"
                            : null
                        }
                        a={columnOneHeader.alignment || "fs"}
                      >
                        {columnOneHeader.subtitle}
                      </Text>
                    ) : (
                      <Skeleton variant="text" width={325} height={20} />
                    )}
                  </Fragment>
                )}
                {columnOneHeader.taglineToggle && (
                  <Fragment>
                    {columnOneHeader.tagline ? (
                      <Text
                        t="body2"
                        a={columnOneHeader.alignment || "fs"}
                        c="secondary"
                        s="0.8rem"
                      >
                        {columnOneHeader.tagline}
                      </Text>
                    ) : (
                      <Skeleton variant="text" width={225} height={17} />
                    )}
                  </Fragment>
                )}

                <div style={{ width: "100%", marginTop: 16, marginBottom: 16 }}>
                  <Divider />
                </div>
                <Skeleton variant="rect" width="100%" height={500} />
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
                {columnTwoHeader.title ? (
                  <Text
                    t={columnTwoHeader.headerType}
                    a={columnTwoHeader.alignment || "fs"}
                  >
                    {columnTwoHeader.title}
                  </Text>
                ) : (
                  <Skeleton variant="text" width={250} height={40} />
                )}
                {columnTwoHeader.subtitleToggle && (
                  <Fragment>
                    {columnTwoHeader.subtitle ? (
                      <Text
                        t={
                          columnTwoHeader.headerType === "h1" ||
                          columnTwoHeader.headerType === "h2"
                            ? "h4"
                            : columnTwoHeader.headerType === "h3" ||
                              columnTwoHeader.headerType === "h4"
                            ? "h6"
                            : null
                        }
                        a={columnTwoHeader.alignment || "fs"}
                      >
                        {columnTwoHeader.subtitle}
                      </Text>
                    ) : (
                      <Skeleton variant="text" width={325} height={20} />
                    )}
                  </Fragment>
                )}
                {columnTwoHeader.taglineToggle && (
                  <Fragment>
                    {columnTwoHeader.tagline ? (
                      <Text
                        t="body2"
                        a={columnTwoHeader.alignment || "fs"}
                        c="secondary"
                        s="0.8rem"
                      >
                        {columnTwoHeader.tagline}
                      </Text>
                    ) : (
                      <Skeleton variant="text" width={225} height={17} />
                    )}
                  </Fragment>
                )}

                <div style={{ width: "100%", marginTop: 16, marginBottom: 16 }}>
                  <Divider />
                </div>
                <Skeleton variant="rect" width="100%" height={500} />
              </Flexer>
            </Flexer>
          </Flexer>
        </Flexer>
      )}
    </Fragment>
  );
};

export default SectionSkeleton;
