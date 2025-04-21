"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import { Youtube } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type Editor } from "@tiptap/react";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import { ButtonProps } from "@/components/tiptap-ui-primitive/button";

export interface YoutubeButtonProps extends ButtonProps {
  editor?: Editor | null;
}

export const YoutubeButton: React.FC<YoutubeButtonProps> = ({
  editor: providedEditor,
  ...buttonProps
}) => {
  const editor = useTiptapEditor(providedEditor);

  const [open, setOpen] = React.useState(false);
  const [height, setHeight] = React.useState(440);
  const [width, setWidth] = React.useState(900);
  const [url, setUrl] = React.useState("");

  const addYoutubeVideo = () => {
    if (!editor) return;

    const command = editor.commands as any;

    if (typeof command.setYoutubeVideo === "function") {
      command.setYoutubeVideo({
        src: url,
        width: Math.max(320, Number(width)) || 900,
        height: Math.max(180, Number(height)) || 440,
      });
      setOpen(false);
    } else {
      console.error(
        "setYoutubeVideo is not a function. Commands available:",
        Object.keys(command)
      );
    }
  };

  if (!editor || !editor.isEditable) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Toggle size="sm">
          <Youtube className="h-4 w-4" />
        </Toggle>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add YouTube video</DialogTitle>
          <DialogDescription>
            Enter the YouTube URL and desired size to embed.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="url" className="text-right w-16">
              URL
            </Label>
            <Input
              id="url"
              placeholder="https://www.youtube.com/watch?v=abc123"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          {/* <div className="flex items-center gap-4">
            <Label htmlFor="width" className="text-right w-16">
              Width
            </Label>
            <Input
              id="width"
              type="number"
              min={320}
              max={1024}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="height" className="text-right w-16">
              Height
            </Label>
            <Input
              id="height"
              type="number"
              min={180}
              max={720}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div> */}
        </div>
        <DialogFooter>
          <Button type="button" onClick={addYoutubeVideo}>
            Embed Video
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
