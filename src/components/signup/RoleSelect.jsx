function RoleSelect({
    roles,
    registration,
    error,
    isLoading,
}) {
    return (
        <div className="flex flex-col">
            <label
                htmlFor="role_id"
                className="mb-2 text-sm font-bold leading-5 tracking-[0.1px] text-[#252B42]"
            >
                Account Type
            </label>

            <select
                id="role_id"
                disabled={isLoading}
                {...registration}
                className={`h-[48px] rounded-[5px] border bg-[#F9F9F9] px-4 text-sm text-[#252B42] outline-none transition-colors ${error
                    ? "border-[#E74040]"
                    : "border-[#E6E6E6] focus:border-[#23A6F0]"
                    } disabled:cursor-not-allowed disabled:opacity-60`}
            >
                {isLoading ? (
                    <option value="">Loading roles...</option>
                ) : (
                    roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.name}
                        </option>
                    ))
                )}
            </select>

            {error && (
                <p className="mt-1 text-xs leading-5 text-[#E74040]">
                    {error.message}
                </p>
            )}
        </div>
    );
}

export default RoleSelect;
