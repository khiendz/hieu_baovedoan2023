import { Article } from "Models/Article.model";
import { AddArticle, DeleteArticleById, UpdateArticle } from "services/article-service";

export const changeArticle = async (article: Article) => {
    try {
        const result = await UpdateArticle(article);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddArticle = async (article: Article) => {
    try {
        const result = await AddArticle(article);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheArticle = async (articleId: number) => {
    if (!articleId) return null;

    try {
        const result = await DeleteArticleById(articleId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, articles: Article[], setArticles: any) => {
    const result = await clearTheArticle(key);
    const newData = articles.filter((item: Article) => item.ArticleId !== key);
    if (result.status == 200)
        setArticles(newData);
    return result;
};

export const handleAdd = async (article: Article, articles: Article[], setArticles: any) => {
    const result = await handleAddArticle(article);
    if (result)
        setArticles([{ ...result.data }, ...articles]);
    return result;
};