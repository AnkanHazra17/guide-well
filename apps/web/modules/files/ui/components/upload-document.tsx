import React, { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@workspace/ui/components/dropzone";
import { DialogFooter } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Loader } from "@workspace/ui/components/loader";

function UploadDocument({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    category: "",
    filename: "",
  });

  const addFile = useAction(api.private.files.addFile);

  const handleFileDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFiles([file]);
      if (!uploadForm.filename) {
        setUploadForm((prev) => ({ ...prev, filename: file.name }));
      }
    }
  };

  const handleCancel = () => {
    handleCloseModal();
    setUploadedFiles([]);
    setUploadForm({
      category: "",
      filename: "",
    });
  };

  const handleFileUpload = async () => {
    try {
      setIsUploading(true);
      const blob = uploadedFiles[0];
      if (!blob) return;
      const filename = uploadForm.filename || blob.name;

      await addFile({
        bytes: await blob.arrayBuffer(),
        fileName: filename,
        mimeType: blob.type || "text/plain",
        category: uploadForm.category,
      });
      handleCancel();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-3">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            onChange={(e) =>
              setUploadForm((prev) => ({ ...prev, category: e.target.value }))
            }
            type="text"
            placeholder="Enter category"
            value={uploadForm.category}
            className="bg-muted shadow-md"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="filename">
            Filename{" "}
            <span className="text-muted-foreground text-xs">(Optional)</span>
          </Label>
          <Input
            id="filename"
            onChange={(e) =>
              setUploadForm((prev) => ({ ...prev, filename: e.target.value }))
            }
            type="text"
            placeholder="Override default filename"
            value={uploadForm.filename}
            className="bg-muted shadow-md"
          />
        </div>
      </div>

      <Dropzone
        accept={{
          "application/pdf": [".pdf"],
          "text/csv": [".csv"],
          "text/plain": [".txt"],
        }}
        disabled={isUploading}
        maxFiles={1}
        onDrop={handleFileDrop}
        src={uploadedFiles}
        className="bg-muted shadow-md hover:bg-muted"
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleFileUpload}
          disabled={
            isUploading || uploadedFiles.length === 0 || !uploadForm.category
          }
        >
          {isUploading ? (
            <>
              <Loader /> Uploading...
            </>
          ) : (
            "Upload"
          )}
        </Button>
      </DialogFooter>
    </div>
  );
}

export default UploadDocument;
