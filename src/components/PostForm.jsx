import React, { useCallback } from "react";
import { useForm } from 'react-hook-form'
import Input from './Input.jsx'
import Select from './Select.jsx'
import RTE from './RTE.jsx'
import Button from './Button.jsx'
import storageService from '../services/storageService.js'
import postService from '../services/postService.js'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({post}){
    const {register, handleSubmit, watch,
        setValue, control, getValues} = useForm({
            defaultValues:{
                title: post?.title||'',
                slug: post?.slug || '',
                content: post?.content || '',
                status: post?.status || 'active'

            }
        })

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        if(post){
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null;

            if(file){
                storageService.deleteFile(post.img_url);
            }

            const updatedPost = await postService.updatePost(post.id, {...data, imageUrl: file ? file.path : post.img_url});

            if(updatedPost){
                navigate(`/post/${updatedPost.slug}`);
            }
        }else{
            const file = await storageService.uploadFile(data.image[0]);

            if(file){
                const filePath = file.path;
                data.imageUrl = filePath;
                delete data.image;

                const newPost = await postService.createPost({
                    ...data,
                    authorId: userData.id,
                });

                if(newPost){
                    navigate(`/post/${newPost.slug}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
    }

            return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === 'title') {
                setValue('slug', 
                    slugTransform(value.title),
                    {shouldValidate: true}
                )
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={storageService.getFileUrl(post.img_url)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}