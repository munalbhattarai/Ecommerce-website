export default function ErrorMessage({
    message = "Something went wrong.",
}) {
    return (
        <div className="flex min-h-40 items-center justify-center">
            <p className="text-red-500">
                {message}
            </p>
        </div>
    );
}