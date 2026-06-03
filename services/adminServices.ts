import { getSupabase } from "@/lib/supabase";
import { Services } from "@/types/serviceType";
import { nanoid } from "nanoid";

export async function createService(
  payload: Omit<Services, "service_img">,
  file: File
) {
  const supabase = getSupabase();

  const fileName = `${nanoid(10)}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("service-images")
    .upload(fileName, file);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("service-images")
    .getPublicUrl(fileName);

  const { data, error } = await supabase
    .from("services_tb")
    .insert({
      ...payload,
      service_img: publicUrl,
    })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getOrder() {
  console.log("getOrder terpanggil");

  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("bookings_tb")
    .select("*, services_tb(*)");

  if (error) throw new Error(error.message);

  return data;
}

export async function getServices() {
  const supabase = getSupabase();

  const { data, error } = await supabase.from("services_tb").select();

  if (error) throw new Error(error.message);

  return data;
}
