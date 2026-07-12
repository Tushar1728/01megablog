import supabase from "../supabase/client.js";

class AuthService{
    
    async signup({email, password}){
        try {
            const {data, error} = await supabase.auth.signUp({
                email,
                password
            });

            if(error){
                throw error
            }

            return data;
        } catch (error) {
            throw error
        }
    }

    async login({email, password}){
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if(error){
                throw error;
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            const {error} = await supabase.auth.signOut();

            if(error){
                throw error;
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
    try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
            throw error;
        }

        return data.user;
        
    } catch (error) {
        console.error("AuthService :: getCurrentUser ::", error);
        return null;
      }
    }
}

const authService = new AuthService();
export default authService;