import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler =  async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "OPTIONS") {
    res.setHeader("Allow", "POST");
    return res.status(202).json({});
}

  if (req.method === 'GET') {
    const articleId = parseInt(req.query.id as string);

    if (!articleId) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    try {
      const article = await prisma.article.findUnique({
        where: {
           ArticleId: articleId,
        }
      });

      if (article) {
        res.status(200).json(article);
      } else {
        res.status(404).json({ error: 'article not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default apiHandler(handler,["GET"]);