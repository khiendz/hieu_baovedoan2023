import { Member } from "Models";
import { AddMember, DeleteMember, UpdateMember } from "services/member-services";

export const changeMember = async (member: Member) => {
    try {
        const result = await UpdateMember(member);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddMember = async (member: Member) => {
    try {
        const result = await AddMember(member);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheMember = async (memberId: number) => {
    if (!memberId) return null;

    try {
        const result = await DeleteMember(memberId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, members: Member[], setMembers: any) => {
    const result = await clearTheMember(key);
    const newData = members.filter(
        (item: Member) => item.MemberId !== key
    );
    if (result.status == 200)
        setMembers(newData);
    return result;
};

export const handleAdd = async (member: Member, setMembers: any, members: Member[]) => {
    const result = await handleAddMember(member);
    if (result?.data && result.status == 200)
        setMembers([
            { ...result?.data },
            ...members,
        ]);
    return result;
};
