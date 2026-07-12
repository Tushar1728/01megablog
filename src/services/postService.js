import supabase from "../supabase/client.js";

class PostService{

    async createPost({title, slug, content, imageUrl, status, authorId}){
        try{
        const {data, error} = await supabase
            .from("posts")
            .insert({
                title,
                slug,
                content,
                author_id : authorId,
                img_url : imageUrl,
                status
            })
            .select()
            .single();

        if(error){
            throw error
        }

        return data;
        }catch(error){
            throw error;
        }
    }

    async updatePost(id, {title, slug, content, imageUrl, status}){
        try {
            const { data, error } = await supabase
            .from("posts")
            .update({
                title,
                slug,
                content,
                img_url: imageUrl,
                status
            })
            .eq("id", id)
            .select()
            .single()

            if(error){
                throw error
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    async deletePost(id){
        try {
            const {error} = await supabase
            .from("posts")
            .delete()
            .eq("id", id);

            if(error){
                throw error;
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug){
        try {
            const {data, error} = await supabase
            .from("posts")
            .select("*")
            .eq("slug", slug)
            .single();

            if(error){
                throw error;
            }

            return data;
        } catch (error) {
            throw error;
        }
    }
    
    async getPosts() {
        try {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("status", "active")
                .order("created_at", { ascending: false });

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            throw error;
        }
    }
}

const postService = new PostService();

export default postService;