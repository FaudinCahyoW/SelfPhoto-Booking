"use client";

import { CardFormComp } from "@/components/admin-component/CardFormComp";
import { InputComponent } from "@/components/booking-component/InputComponent";
import { useAdmin } from "@/hooks/useAdmin";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ServicePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const { handleSubmit, register, setValue, reset } = useForm<ServiceFormType>({
    defaultValues: {
      service_type: "",
      service_desc: "",
      price_service: undefined,
      imageFile: null,
    },
  });

  const { addService, success } = useAdmin();

  useEffect(() => {
    if (success) {
      (reset(), setPreview(null));
    }
  }, [success, reset]);

  const onSubmit = async (data: ServiceFormType) => {
    try {
      await addService(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full flex justify-center p-4 min-h-screen">
      <CardFormComp
        onSubmit={handleSubmit(onSubmit)}
        inputs={
          <div className="flex flex-col space-y-4 w-full text-left">
            <span className="text-emerald-400 font-bold tracking-wider uppercase pt-2.5">
              Add Booking Content
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              <InputComponent
                id="service_type"
                label="Service Type"
                type="text"
                placeholder="Enter service type"
                {...register("service_type", {
                  required: true,
                })}
              />

              <InputComponent
                id="price_service"
                label="Price"
                type="number"
                placeholder="Enter price"
                {...register("price_service", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label
                htmlFor="service_desc"
                className="text-sm font-medium text-gray-300"
              >
                Description
              </label>

              <textarea
                id="service_desc"
                rows={4}
                placeholder="Type your service description..."
                {...register("service_desc", {
                  required: true,
                })}
                className="w-full px-3 py-2 h-44 bg-neutral-900 text-gray-200 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 placeholder:text-gray-600 resize-y transition-all text-sm"
              />
            </div>

            <section className="space-y-3 w-full">
              <h3 className="text-gray-300 font-semibold text-sm text-center sm:text-left">
                Add Image
              </h3>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="service_img"
                  className="relative flex items-center justify-center w-full h-45 bg-neutral-900/30 border border-dashed border-gray-800 rounded-2xl cursor-pointer hover:bg-neutral-900/60 hover:border-gray-700 transition-all duration-200 overflow-hidden "
                >
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-64 object-cover"
                      />

                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                        <p className="text-white font-medium">
                          Click to change image
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center text-gray-400 p-4">
                      <svg
                        className="w-8 h-8 mb-3 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                        />
                      </svg>

                      <p className="mb-1 text-sm text-gray-300">
                        <span className="font-semibold text-emerald-500">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>

                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG, GIF
                      </p>
                    </div>
                  )}

                  <input
                    id="service_img"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;

                      setValue("imageFile", file, {
                        shouldValidate: true,
                      });

                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>
            </section>
          </div>
        }
      />
    </section>
  );
}
