import supabase from "../supabase/client.js";

class StorageService {

    async uploadFile(file){
        try {
            const {data, error} = await supabase.storage
            .from("blog_images")
            .upload(`${Date.now()}-${file.name}`, file)

            if(error){
                throw error;
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(path) {
        try {
            const { error } = await supabase.storage
                .from("blog_images")
                .remove([path]);

            if (error) {
                throw error;
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    getFileUrl(path) {
        const { data } = supabase.storage
            .from("blog_images")
            .getPublicUrl(path);

        return data.publicUrl;
    }
}

const storageService = new StorageService();

export default storageService;