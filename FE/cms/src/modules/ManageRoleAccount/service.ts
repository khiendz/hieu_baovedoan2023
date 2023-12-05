import { RoleAccount } from "Models";
import { AddRoleAccount, DeleteRoleAccountById, UpdateRoleAccount } from "services";

export const changeRoleAccount = async (roleAccount: RoleAccount) => {
    try {
        const result = await UpdateRoleAccount(roleAccount);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddRoleAccount = async (roleAccount: RoleAccount) => {
    try {
        const result = await AddRoleAccount(roleAccount);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheRoleAccount = async (roleAccountId: number) => {
    if (!roleAccountId) return null;

    try {
        const result = await DeleteRoleAccountById(roleAccountId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, roleAccounts: RoleAccount[], setRoleAccounts: any) => {
    const result = await clearTheRoleAccount(key);
    const newData = roleAccounts.filter(
        (item: RoleAccount) => item.RoleId !== key
    );
    setRoleAccounts(newData);
    return result;
};

export const handleAdd = async (roleAccount: RoleAccount, setRoleAccount: any, roleAccounts: RoleAccount[]) => {
    const result = await handleAddRoleAccount(roleAccount);
    setRoleAccount([
        result?.data,
        ...roleAccounts,
    ]);
    return result;
};
