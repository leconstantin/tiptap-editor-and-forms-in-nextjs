"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/tiptap-ui-primitive/dropdown-menu";
import { Button, ButtonProps } from "@/components/tiptap-ui-primitive/button";
import { ChevronDownIcon } from "../tiptap-icons/chevron-down-icon";
import { Check, Palette } from "lucide-react";
import { type Editor } from "@tiptap/react";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

export interface BubbleColorMenuItem {
  name: string;
  color: string | null;
}

export interface ColorButtonProps extends ButtonProps {
  editor?: Editor | null;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  { name: "Default", color: "#000000" },
  { name: "Purple", color: "#9333EA" },
  { name: "Red", color: "#E00000" },
  { name: "Yellow", color: "#EAB308" },
  { name: "Blue", color: "#2563EB" },
  { name: "Green", color: "#008A00" },
  { name: "Orange", color: "#FFA500" },
  { name: "Pink", color: "#BA4081" },
  { name: "Gray", color: "#A8A29E" },
];

export default function ColorSelectorButton({
  editor: providedEditor,
  ...buttonProps
}: ColorButtonProps) {
  const editor = useTiptapEditor(providedEditor);

  if (!editor) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-style="ghost" type="button" aria-label="Text color">
          <Palette className="size-4.5" />
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          {TEXT_COLORS.map(({ name, color }) => (
            <DropdownMenuItem key={name} asChild>
              <button
                onClick={() => {
                  editor.commands.unsetColor();
                  if (name !== "Default" && color) {
                    editor.chain().focus().setColor(color).run();
                  }
                }}
                className="flex w-full items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-700 hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <div className="flex items-center space-x-2">
                  <span
                    className="rounded-sm border border-stone-200 px-2 py-px font-medium"
                    style={{ color: color ?? undefined }}
                  >
                    A
                  </span>
                  <span>{name}</span>
                </div>
                {editor.isActive("textStyle", { color }) && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
