import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  // Password allows special chars but we can sanitize if needed. Email is validated by .email()
  password: z.string().min(6).max(100),
  role: z.enum(['owner', 'developer'])
});

const updateUserSchema = z.object({
  // UUID format is strictly enforced, preventing any SQLi/XSS
  userId: z.string().uuid(),
  role: z.enum(['owner', 'developer']).optional(),
  password: z.string().min(6).max(100).optional()
});

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== "developer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = createUserSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.warn("Zod validation failed (create user):", validationResult.error);
      return NextResponse.json({ error: "Geçersiz giriş bilgileri (Invalid input)" }, { status: 400 });
    }

    const { email, password, role } = validationResult.data;

    const adminAuth = createAdminClient().auth.admin;
    
    const { data, error } = await adminAuth.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role }
    });

    if (error) throw error;

    return NextResponse.json({ success: true, user: data.user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== "developer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = updateUserSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.warn("Zod validation failed (update user):", validationResult.error);
      return NextResponse.json({ error: "Geçersiz giriş bilgileri (Invalid input)" }, { status: 400 });
    }

    const { userId, role, password } = validationResult.data;

    if (!role && !password) {
      return NextResponse.json({ error: "Güncellenecek veri yok (No data provided)" }, { status: 400 });
    }

    const adminAuth = createAdminClient().auth.admin;
    
    // Get existing metadata first to not override other things
    const { data: existingUser, error: fetchError } = await adminAuth.getUserById(userId);
    if (fetchError) throw fetchError;

    const updatePayload = {};
    if (role) {
      updatePayload.user_metadata = { ...existingUser.user.user_metadata, role };
    }
    if (password) {
      updatePayload.password = password;
    }

    const { data, error } = await adminAuth.updateUserById(userId, updatePayload);

    if (error) throw error;

    return NextResponse.json({ success: true, user: data.user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== "developer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Prevent deleting oneself
    if (userId === user.id) {
      return NextResponse.json({ error: "Kendinizi silemezsiniz." }, { status: 400 });
    }

    const adminAuth = createAdminClient().auth.admin;
    
    const { error } = await adminAuth.deleteUser(userId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
