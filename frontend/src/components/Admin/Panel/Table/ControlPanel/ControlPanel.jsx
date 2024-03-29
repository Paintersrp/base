import React from "react";
import Container from "../../../../Elements/Layout/Container/Container";
import Text from "../../../../Elements/Layout/Text/Text";
import ActionMixin from "./Mixins/ActionMixin";
import ApplicationFilterMixin from "./Mixins/ApplicationFilterMixin";
import MessageFilterMixin from "./Mixins/MessageFilterMixin";
import SearchMixin from "./Mixins/SearchMixin";

const ControlPanel = ({
  modelName,
  keys,
  isReadFilter,
  setIsReadFilter,
  isArchivedFilter,
  statusFilter,
  setIsArchivedFilter,
  setStatusFilter,
  handleClearFilters,
  selectedAction,
  handleActionSelect,
  selectedItems,
  handleMultipleDelete,
  handleMultipleItemActions,
  handleClearSearch,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <>
      <Text
        style={{
          marginBottom: 2,
          marginLeft: 4,
          fontSize: "0.9rem",
          color: "black",
        }}
      >
        Select an Action:
      </Text>
      <Container justify="flex-start">
        <ActionMixin
          keys={keys}
          selectedAction={selectedAction}
          handleActionSelect={handleActionSelect}
          selectedItems={selectedItems}
          handleMultipleDelete={handleMultipleDelete}
          handleMultipleItemActions={handleMultipleItemActions}
        />
        <SearchMixin
          handleClearSearch={handleClearSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {(keys.includes("is_read") || keys.includes("is_archived")) && (
          <MessageFilterMixin
            isReadFilter={isReadFilter}
            setIsReadFilter={setIsReadFilter}
            isArchivedFilter={isArchivedFilter}
            setIsArchivedFilter={setIsArchivedFilter}
            handleClearFilters={handleClearFilters}
          />
        )}
        {modelName === "application" && (
          <ApplicationFilterMixin
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            handleClearFilters={handleClearFilters}
          />
        )}
      </Container>
    </>
  );
};

export default ControlPanel;
