import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Typography from "@tiptap/extension-typography";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import CharacterCount from "@tiptap/extension-character-count";

import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import TrailingNode from "./trailing-node-extension";
import Link from "./link-extension";
import { Selection } from "@/components/tiptap-extensions/selection-extension";

import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import Youtube from "@tiptap/extension-youtube";

export const commonExtensions = [
  StarterKit,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Underline,
  TaskList,
  TextStyle,
  Color,
  TaskItem.configure({ nested: true }),
  Highlight.configure({ multicolor: true }),
  Image.configure({
    HTMLAttributes: {
      class: "rounded-lg w-full h-auto aspect-video object-cover",
    },
  }),
  Selection,
  ImageUploadNode.configure({
    accept: "image/*",
    maxSize: MAX_FILE_SIZE,
    limit: 3,
    upload: handleImageUpload,
    onError: (error) => console.error("Upload failed:", error),
  }),
  Typography,
  Superscript,
  Subscript,
  CharacterCount,
  Youtube.configure({
    controls: false,
    nocookie: true,
    modestBranding: false,
    allowFullscreen: false,
    HTMLAttributes: {
      class:
        "w-full h-auto max-w-full rounded-lg ring-2 ring-muted hover:ring-blue-400 ease-in duration-200 aspect-video object-cover",
    },
  }),

  TrailingNode,
  Link.configure({ openOnClick: false }),
];
