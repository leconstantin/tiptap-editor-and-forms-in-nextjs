import EditorForm from "@/components/form/editorForm";
import ModeToggle from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="overflow-hidden  px-6 py-10">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <Button asChild className="cursor-pointer w-fit">
            <Link href="/blogs">Blogs</Link>
          </Button>
          <ModeToggle />
        </div>

        <EditorForm />
      </div>
    </div>
  );
}
