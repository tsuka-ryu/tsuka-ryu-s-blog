import { blog } from "@/lib/source";
import { stopwords as japaneseStopwords } from "@orama/stopwords/japanese";
import { createTokenizer } from "@orama/tokenizers/japanese";
import { createFromSource } from "fumadocs-core/search/server";

export const { GET } = createFromSource(blog, {
  // https://docs.orama.com/docs/orama-js/supported-languages/using-japanese-with-orama
  components: {
    tokenizer: createTokenizer({
      language: "japanese",
      stopWords: japaneseStopwords,
    }),
  },
});
