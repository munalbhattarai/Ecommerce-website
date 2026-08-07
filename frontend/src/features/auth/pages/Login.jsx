import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuth from "../hooks/useAuth";
import { loginSchema } from "../validation/authSchema";

export default function Login() {
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        await login(data);
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username")}
                    />

                    {errors.username && (
                        <p>{errors.username.message}</p>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                    />

                    {errors.password && (
                        <p>{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>

            </form>
        </div>
    );
}