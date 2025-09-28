"use client";
import { usePaginatedQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { PlusIcon } from "lucide-react";
import DocumentsTable from "@/modules/files/ui/components/documents-table";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import Modal from "@/components/custom/modal";
import { useState } from "react";
import UploadDocument from "@/modules/files/ui/components/upload-document";

function FilesView() {
  const [newFileModalOpen, setNewFileModalOpen] = useState(false);
  const files = usePaginatedQuery(
    api.private.files.list,
    {},
    { initialNumItems: 10 },
  );

  const {
    topElementRef,
    handleLoadMore,
    canLoadMore,
    isLoadingMore,
    isLoadingFirstPage,
  } = useInfiniteScroll({
    status: files.status,
    loadMore: files.loadMore,
    loadSize: 10,
  });

  const handleOpenModal = () => {
    setNewFileModalOpen(true);
  };

  const handleCloseModal = () => {
    setNewFileModalOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col p-8">
      <div className="mx-auto w-full max-w-sceen-md">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl font-semibold">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Upload and manage documents for your AI assistant
          </p>
        </div>
        <div className="mt-8 rounded-lg border overflow-hidden">
          <div className="flex items-center justify-end border-b px-6 py-4">
            <Button size="sm" onClick={handleOpenModal}>
              <PlusIcon /> Add new
            </Button>
          </div>
          <DocumentsTable
            files={files.results}
            isLoadingFirstPage={isLoadingFirstPage}
            canLoadMore={canLoadMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={handleLoadMore}
            ref={topElementRef}
          />
        </div>
      </div>

      <Modal
        isOpen={newFileModalOpen}
        setIsOpen={setNewFileModalOpen}
        header="Upload document"
        description="Upload documents to your knowledge base for AI-powred search and retrival"
      >
        <UploadDocument handleCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
}

export default FilesView;
