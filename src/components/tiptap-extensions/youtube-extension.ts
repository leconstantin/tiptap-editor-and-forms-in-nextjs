// components/tiptap-extensions/youtube-extension.ts
import Youtube from "@tiptap/extension-youtube";

export const ResponsiveYoutube = Youtube.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      class: {
        default: null,
        parseHTML: () => null,
        renderHTML: () => null, // we'll apply class manually
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const { src, width, height } = HTMLAttributes;

    return [
      "div",
      {
        class: "relative w-full pt-[56.25%] overflow-hidden rounded-xl my-4", // 16:9 aspect ratio
      },
      [
        "iframe",
        {
          src,
          width: width || "100%",
          height: height || "100%",
          class:
            "absolute top-0 left-0 w-full h-full rounded-xl ring-2 ring-muted hover:ring-blue-400 transition-all",
          frameborder: "0",
          allow:
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowfullscreen: "true",
        },
      ],
    ];
  },
});
