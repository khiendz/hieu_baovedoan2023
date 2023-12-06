import { Member } from "Models";
import { MemberRole } from "Models/MemberRole";
import { AddMemberRole, DeleteMemberRole, UpdateMemberRole } from "services/member-role-service";
import { AddMember, DeleteMember, UpdateMember } from "services/member-services";

export const changeMemberRole = async (memberRole: MemberRole) => {
    try {
        const result = await UpdateMemberRole(memberRole);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddMemberRole = async (memberRole: MemberRole) => {
    try {
        const result = await AddMemberRole(memberRole);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheMemberRole = async (memberRoleId: number) => {
    if (!memberRoleId) return null;

    try {
        const result = await DeleteMemberRole(memberRoleId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, members: MemberRole[], setMemberRoles: any) => {
    const result = await clearTheMemberRole(key);
    const newData = members.filter(
        (item: MemberRole) => item.MemberRoleId !== key
    );
    if (result.status == 200)
        setMemberRoles(newData);
    return result;
};

export const handleAdd = async (memberRole: MemberRole, setMemberRoles: any, memberRoles: MemberRole[]) => {
    const result = await handleAddMemberRole(memberRole);
    if (result?.data && result.status == 200)
        setMemberRoles([
            { ...result?.data },
            ...memberRoles,
        ]);
    return result;
};
