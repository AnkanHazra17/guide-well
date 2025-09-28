import React from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Loader } from "@workspace/ui/components/loader";

interface InfiniteScrollTriggerProps {
  canLoadMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  loadMoreText?: string;
  noMoreText?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

function InfiniteScrollTrigger({
  canLoadMore,
  isLoadingMore,
  onLoadMore,
  loadMoreText = "Load more",
  noMoreText = "No more items",
  className,
  ref,
}: InfiniteScrollTriggerProps) {
  return (
    <div className={cn("flex w-full justify-center py-2", className)} ref={ref}>
      <Button
        disabled={!canLoadMore || !isLoadingMore}
        variant="ghost"
        size="sm"
        onClick={onLoadMore}
      >
        {isLoadingMore ? <Loader /> : !canLoadMore ? noMoreText : loadMoreText}
      </Button>
    </div>
  );
}

export default InfiniteScrollTrigger;
