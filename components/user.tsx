import LogoutButton from "./auth/logout-button"

export const IsUser=()=>{
    return <div className="w-full h-full flex items-center gap-2 justify-center">
        <p>you are a user, to create a store first log out and then log in as an admin (github login or credentials)</p><LogoutButton/>
    </div>
}