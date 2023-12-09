import { Account } from 'Models';
import { Article } from 'Models/Article.model';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getArticleById(id: number) {
    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/article/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllArticle() {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/article`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function UpdateArticle(article: Article) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/article`, article);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating article:', e);
    }

    return null;
}

export async function AddArticle(article: Article) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/article`, article);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error add article:', e);
    }

    return null;
}

export async function DeleteArticleById(articleId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/article?articleId=${articleId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error delete article:', e);
    }

    return null;
}


