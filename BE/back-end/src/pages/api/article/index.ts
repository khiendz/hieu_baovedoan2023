import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Article } from '@prisma/client';
import { apiHandler } from '@/helpers/api';
import { saveFile } from '@/services/file';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetArticle();

        if (!result) {
            return res.status(400).json({ error: 'Invalid article ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const article = req.body;

        const result = await UpdateArticle(article);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the article' });
        }

        return res.json({ ...result });
    }  else if (req.method === 'POST') {
        const article = req.body;

        const result = await AddArticle(article);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new article' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const {articleId} = req.query;

        const result = await DeleteArticle(parseInt(articleId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a article' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetArticle = async () => {
    try {
        const articles = await prisma.article.findMany();

        if (articles) {
            return {
                data: articles,
                message: "Success",
                status: "200"
            };
        } else {
            return {
                data: null,
                message: "No Success",
                status: "500"
            };
        }
    } catch (error) {
        console.error(error);
        return {
            tour: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const AddArticle = async (article: Article) => {
    try {

        const addArticleResult = await prisma.article.create({
            data: {
                Content: article.Content.toString(),
                Description: article.Description.toString(),
                Title: article.Title,
                Thumb: ""
            },
        });

        if (article.Thumb) {
            const filename = await saveFile(article.Thumb, addArticleResult.ArticleId);
            addArticleResult.Thumb = filename;
        }

        await prisma.article.update({
            where: {
                ArticleId: addArticleResult.ArticleId
            },
            data: addArticleResult
        });

        if (addArticleResult) {
            return {
                data: addArticleResult,
                message: "Success",
                status: "200"
            };
        } else {
            return {
                data: null,
                message: "No Success",
                status: "500"
            };
        }
    } catch (error) {
        console.error(error);
        return {
            tour: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const UpdateArticle = async (article: Article) => {
    try {
        const updatedArticle = await prisma.article.update({
            where: {
                ArticleId: article?.ArticleId
            },
            data: {
                Content: article.Content.toString(),
                Description: article.Description.toString(),
                Title: article.Title,
                Thumb: article.Thumb
            },
        });

        if (updatedArticle.Thumb && !updatedArticle.Thumb.startsWith("file")) {
            const filename = await saveFile(updatedArticle.Thumb, updatedArticle.ArticleId);
            updatedArticle.Thumb = filename;
        }

        await prisma.article.update({
            where: {
                ArticleId: updatedArticle.ArticleId
            },
            data: updatedArticle
        });

        return {
            data: updatedArticle,
            message: "Success",
            status: "200"
        };
    } catch (e) {
        console.error(e);
        return {
            data: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const DeleteArticle= async (articleId: number) => {
    try {
        const deleteResult = await prisma.article.delete({
            where: {
                ArticleId: articleId
            }
        });

        return {
            data: deleteResult,
            message: "Success",
            status: "200"
        };
    } catch (e) {
        console.error(e);
        return {
            data: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

export default apiHandler(handler,["GET"]);

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
  }