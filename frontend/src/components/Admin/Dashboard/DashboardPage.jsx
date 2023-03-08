import React from "react";
import PageContainer from "../../Elements/Layout/PageContainer";
import Dashboard from "./Dashboard";

function DashboardPage() {
  return (
    <PageContainer backgroundColor="#F5F5F5" seoEdit={false}>
      <Dashboard />
    </PageContainer>
  );
}

export default DashboardPage;
