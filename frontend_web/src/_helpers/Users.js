export const Users = {
    getPrivileges: (user) => user && user.profile && user.profile.role ? user.profile.role.privileges : []
}