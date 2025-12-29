import { blog } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";
import { createTokenizer } from "@orama/tokenizers/japanese";
import { stopwords as japaneseStopwords } from "@orama/stopwords/japanese";

export const { GET } = createFromSource(blog, {
  // https://docs.orama.com/docs/orama-js/supported-languages/using-japanese-with-orama
  components: {
    tokenizer: createTokenizer({
      language: "japanese",
      stopWords: japaneseStopwords,
    }),
  },
});
