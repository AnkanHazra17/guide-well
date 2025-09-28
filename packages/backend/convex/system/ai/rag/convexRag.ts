import { RAG } from "@convex-dev/rag";
import { components } from "../../../_generated/api";
import { openai } from "@ai-sdk/openai";

const convexRag = new RAG(components.rag, {
  textEmbeddingModel: openai.embedding("text-embedding-3-small"),
  embeddingDimension: 1536,
});

export default convexRag;
