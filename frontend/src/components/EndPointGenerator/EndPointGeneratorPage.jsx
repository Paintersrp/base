import React from "react";
import PageContainer from "../Elements/Layout/PageContainer";
import EndPointGenerator from "./EndPointGenerator";

function GeneratorPage() {
  return (
    <PageContainer seoEdit={false} backgroundColor="#F5F5F5">
      <EndPointGenerator />
    </PageContainer>
  );
}

export default GeneratorPage;
