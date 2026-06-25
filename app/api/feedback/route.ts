import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { palette_id, palette_title, reviewer_name, rating, comment } = body;

    if (!reviewer_name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!rating && !comment?.trim()) {
      return NextResponse.json(
        { error: "A rating or comment is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("feedback").insert({
      palette_id,
      palette_title,
      reviewer_name: reviewer_name.trim(),
      rating: rating || null,
      comment: comment?.trim() || null,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Feedback error:", err);
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}
