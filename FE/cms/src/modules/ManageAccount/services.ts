import { Account } from "Models";
import { AddAccount, DeleteAccountById, UpdateAccount } from "services";

export const changeAccount = async (account: Account) => {
    try {
        const result = await UpdateAccount(account);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddAccount = async (account: Account) => {
    try {
        const result = await AddAccount(account);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheAccount = async (accountId: number) => {
    if (!accountId) return null;

    try {
        const result = await DeleteAccountById(accountId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, accounts: Account[], setAccounts: any) => {
    const result = await clearTheAccount(key);
    const newData = accounts.filter(
        (item: Account) => item.AccountId !== key
    );
    if (result.status == 200)
    setAccounts(newData);
    return result;
};

export const handleAdd = async (account: Account, setAccounts: any, accounts: Account[]) => {
    const result = await handleAddAccount(account);
    if (result.data && result.status == 200)
    setAccounts([
        { ...result.data },
        ...accounts,
    ]);
    return result;
};
