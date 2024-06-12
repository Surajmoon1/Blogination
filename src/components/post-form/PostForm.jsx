import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE, Loading } from "../index";
import appwriteServices from "../../appwriteServices/postsAndFileService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
      featuredImage: post?.featuredImage || null
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);

    if (post) {
      const file = data.featuredImage[0]
        ? await appwriteServices.uploadFile(data.featuredImage[0])
        : null;

      if (file) {
        appwriteServices.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteServices.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteServices.uploadFile(data.featuredImage[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await appwriteServices.createPost({
          ...data,

          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    setLoading(false);
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return loading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Left section */}
      <div className="w-full md:w-2/3 px-2 mb-6">
        <Input
          label="Title "
          placeholder="Title"
          required={true}
          errors={errors.title}
          className=" bg-gray-400 focus:outline-1 focus:outline-[#eaa79c] placeholder:text-gray-700 indent-2 text-black text-lg font-medium focus:bg-gray-100"
          {...register("title", { required: true })}
        />

        <Input
          label="Post ID "
          placeholder="Post ID"
            required={true}
            errors={errors.slug}
          className=" placeholder:text-gray-700 indent-2 outline-none bg-gray-400 text-black text-lg font-medium cursor-not-allowed"
          readOnly
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content "
          name="content"
          required={true}
          control={control}
          defaultValue={getValues("content")}
          errors={errors.content}
          {...register("content", { required: true })}
        />
      </div>
      {/* Left section end */}

      {/*right section */}
      <div className="w-full md:w-1/3 px-2">
        <Input
          label="Featured Image "
          type="file"
          required={true}
          errors={errors.featuredImage}
          className="mb-4 bg-gray-400 placeholder:text-gray-700 indent-2 text-black text-base font-medium"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteServices.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["Active", "Inactive"]}
          label="Status "
          required={true}
          errors={errors.status}
          className="mb-4 bg-gray-400 indent-2 text-black text-base font-medium"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full rounded-xl py-2 font-bold duration-300 ease-in text-xl text-black hover:bg-blue-800 hover:text-white "
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
      {/* right section end */}
    </form>
  );
}

export default PostForm;
