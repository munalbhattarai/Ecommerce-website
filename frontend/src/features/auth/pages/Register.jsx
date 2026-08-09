import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "../validation/authSchema";
import { registerRequest } from "../api/authAPI";

export default function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {

        try {

            await registerRequest(data);

            console.log("Registration successful");

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div>

            <h1>Register</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input
                    type="text"
                    placeholder="Username"
                    {...register("username")}
                />

                {errors.username && (
                    <p>{errors.username.message}</p>
                )}


                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />

                {errors.email && (
                    <p>{errors.email.message}</p>
                )}


                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                />

                {errors.password && (
                    <p>{errors.password.message}</p>
                )}


                <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("password2")}
                />

                {errors.password2 && (
                    <p>{errors.password2.message}</p>
                )}


                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Creating account..."
                        : "Register"
                    }
                </button>

            </form>

        </div>
    );
}